// =============================================================================
// protocolSelection.ts
// Optimal protocol selection = SET COVER problem.
//
// Elements to cover: the microorganisms the user selected.
// Sets: protocols, each covering the microorganisms its PCR kit detects.
//
// Optimization hierarchy (strict, in this order):
//   1. MINIMUM number of protocols that cover all requested microorganisms.
//   2. Among minimum-size solutions: LEAST waste — total redundant detections across the
//      whole plan (targets outside the request, PLUS requested targets detected by >1 kit).
//   3. Tie-break: LOWEST total time.
//
// Computes the EXACT optimum (not greedy) for <= 31 coverable micros via increasing-size
// search over a bitmask of the requested set, with an admissible suffix-union prune. The
// search is exact: it never discards a candidate that could change the answer. If the node
// budget is exceeded — or more than 31 micros are coverable (number masks can't hold them) —
// it falls back to a deterministic greedy cover and flags `exact: false`.
//
// NOTE ON CORRECTNESS: an earlier version pre-filtered "dominated" candidates (a kit whose
// requested-coverage was a strict subset of another, no-slower kit). That is safe for goals
// (1) and (3) but NOT for goal (2): the dominated kit can carry LESS over-coverage, so
// removing it could delete the minimum-waste solution. The prefilter is gone. At catalog
// scale (<= ~15 relevant kits per request) the exact search is cheap enough to not need it.
// =============================================================================

export interface SelectableProtocol {
  id: string;
  name: string;
  /** Microorganism ids this protocol detects */
  detects: string[];
  /** Total workflow time in hours (for tie-breaking) */
  totalTimeHours: number;
}

export interface SelectionResult<T extends SelectableProtocol = SelectableProtocol> {
  /** Chosen protocols, ordered by how much of the requested set they cover (desc) */
  protocols: T[];
  /** Requested microorganisms NO protocol can cover */
  uncoverable: string[];
  /** Sum of the chosen protocols' times */
  totalTimeHours: number;
  /** Detected microorganisms the user did NOT request (over-coverage) */
  overCoverage: string[];
  /** true if the solution is the exact optimum; false if greedy fallback was used */
  exact: boolean;
  /** For each chosen protocol, which requested microorganisms it covers (partitioned: each
   *  requested micro is attributed to exactly one chosen protocol, highest-coverage first) */
  coverageByProtocol: { protocolId: string; covers: string[] }[];
}

const MAX_NODES = 2_000_000; // safety budget for the exact search
const MAX_EXACT_BITS = 31;   // number masks hold 31 bits reliably in JS; beyond → greedy

/**
 * Selects the optimal set of protocols to cover the requested microorganisms.
 */
export function selectOptimalProtocols<T extends SelectableProtocol>(
  selectedMicroIds: string[],
  protocols: T[]
): SelectionResult<T> {
  const target = [...new Set(selectedMicroIds)];

  // --- 1. Determine what is coverable; set aside orphan (uncoverable) micros.
  const coverableSet = new Set<string>();
  for (const p of protocols) for (const m of p.detects) if (target.includes(m)) coverableSet.add(m);
  const uncoverable = target.filter(m => !coverableSet.has(m));
  const need = target.filter(m => coverableSet.has(m));

  if (need.length === 0) {
    return { protocols: [], uncoverable, totalTimeHours: 0, overCoverage: [], exact: true, coverageByProtocol: [] };
  }

  const targetSet = new Set(target);

  // "Waste" of a plan = total redundant detections. For each micro the plan detects, count how
  // many chosen protocols detect it:
  //   - requested  → every detection beyond the first is wasted (n - 1)
  //   - unrequested → every detection is wasted (n)
  // Minimizing it favours kits that tightly fit what still needs covering (precision-first),
  // penalizing both over-coverage and requested-target redundancy.
  const wasteOf = (combo: T[]): number => {
    const counts = new Map<string, number>();
    for (const c of combo) for (const m of c.detects) counts.set(m, (counts.get(m) ?? 0) + 1);
    let waste = 0;
    counts.forEach((n, m) => { waste += targetSet.has(m) ? n - 1 : n; });
    return waste;
  };

  // --- 2. Exact search when the coverable set fits in a number mask; otherwise greedy.
  let chosen: T[];
  let exact: boolean;

  if (need.length > MAX_EXACT_BITS) {
    if (typeof process !== "undefined" && process.env && process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.warn(`[protocolSelection] ${need.length} coverable micros (> ${MAX_EXACT_BITS}); using greedy fallback.`);
    }
    chosen = greedyCover(need, protocols, targetSet);
    exact = false;
  } else {
    const res = exactCover(need, protocols, wasteOf);
    chosen = res.combo;
    exact = res.exact;
    if (!exact || chosen.length === 0) {
      // Budget exhausted (or, defensively, no leaf found) → deterministic greedy.
      chosen = greedyCover(need, protocols, targetSet);
      exact = false;
    }
  }

  // --- 3. Assemble the result. Order chosen protocols by requested coverage (desc), then
  //         attribute each requested micro to exactly one protocol (partition, for display).
  const coverCount = (p: T) => p.detects.reduce((n, m) => n + (targetSet.has(m) ? 1 : 0), 0);
  const ordered = [...chosen].sort((a, b) => coverCount(b) - coverCount(a));

  const coverageByProtocol: { protocolId: string; covers: string[] }[] = [];
  const assigned = new Set<string>();
  for (const p of ordered) {
    const covers = p.detects.filter(m => targetSet.has(m) && !assigned.has(m));
    covers.forEach(m => assigned.add(m));
    coverageByProtocol.push({ protocolId: p.id, covers });
  }

  const overSet = new Set<string>();
  for (const p of ordered) for (const m of p.detects) if (!targetSet.has(m)) overSet.add(m);

  return {
    protocols: ordered,
    uncoverable,
    totalTimeHours: Math.round(ordered.reduce((s, p) => s + p.totalTimeHours, 0) * 10) / 10,
    overCoverage: [...overSet],
    exact,
    coverageByProtocol,
  };
}

// -----------------------------------------------------------------------------
// Exact set cover via increasing-size search over a requested-set bitmask.
// -----------------------------------------------------------------------------
function exactCover<T extends SelectableProtocol>(
  need: string[],
  protocols: T[],
  wasteOf: (combo: T[]) => number
): { combo: T[]; exact: boolean } {
  // Map coverable micros to bits.
  const bitOf = new Map<string, number>();
  need.forEach((m, i) => bitOf.set(m, i));
  const FULL = need.length === 31 ? 0x7fffffff : (1 << need.length) - 1;

  // Candidates = protocols that cover at least one requested micro, with their requested mask.
  type Cand = { p: T; mask: number; coverCount: number };
  const cands: Cand[] = [];
  for (const p of protocols) {
    let mask = 0;
    for (const m of p.detects) { const b = bitOf.get(m); if (b !== undefined) mask |= (1 << b); }
    if (mask !== 0) cands.push({ p, mask, coverCount: popcount(mask) });
  }

  // Most-covering first: lets the search reach FULL with fewer picks and makes the suffix-union
  // bound tighter (high-coverage masks accumulate early).
  cands.sort((a, b) => b.coverCount - a.coverCount);
  const n = cands.length;

  // suffixUnion[i] = OR of masks of cands[i..n-1]. If (covered | suffixUnion[start]) !== FULL,
  // no selection drawn from [start..] can ever complete the cover → prune. Admissible: it
  // over-estimates reachable coverage, so it only prunes provably-dead branches.
  const suffixUnion = new Array<number>(n + 1).fill(0);
  for (let i = n - 1; i >= 0; i--) suffixUnion[i] = suffixUnion[i + 1] | cands[i].mask;

  // Strict tie-break hierarchy: (1) fewest protocols → (2) least waste → (3) lowest time.
  type Sol = { combo: T[]; time: number; waste: number };
  const better = (a: Sol, b: Sol) =>
    a.combo.length !== b.combo.length ? a.combo.length < b.combo.length
    : a.waste !== b.waste ? a.waste < b.waste
    : a.time < b.time;

  let best: Sol | null = null;
  let nodes = 0;
  let exact = true;

  const stack: Cand[] = [];
  const rec = (start: number, covered: number, depth: number, k: number): void => {
    if (++nodes > MAX_NODES) { exact = false; return; }
    if (depth === k) {
      if (covered === FULL) {
        const combo = stack.map(c => c.p);
        const sol: Sol = { combo, time: combo.reduce((s, p) => s + p.totalTimeHours, 0), waste: wasteOf(combo) };
        if (!best || better(sol, best)) best = sol;
      }
      return;
    }
    // Prune: not enough coverage left in the suffix to ever reach FULL.
    if ((covered | suffixUnion[start]) !== FULL) return;
    const remaining = k - depth;
    for (let i = start; i <= n - remaining; i++) {
      stack.push(cands[i]);
      rec(i + 1, covered | cands[i].mask, depth + 1, k);
      stack.pop();
      if (!exact) return;
    }
  };

  // Increasing k: the first size that yields any cover is the minimum-protocol solution.
  // Within that k we still enumerate every combination, so waste/time tie-breaks are exact.
  for (let k = 1; k <= n; k++) {
    rec(0, 0, 0, k);
    if (best || !exact) break;
  }

  return { combo: best ? (best as Sol).combo : [], exact };
}

// -----------------------------------------------------------------------------
// Deterministic greedy cover (fallback). Works for any number of micros (no bitmask).
// Picks the protocol with the largest marginal gain, ties broken by lowest time.
// -----------------------------------------------------------------------------
function greedyCover<T extends SelectableProtocol>(
  need: string[],
  protocols: T[],
  targetSet: Set<string>
): T[] {
  const remaining = new Set(need);
  const pool = protocols.filter(p => p.detects.some(m => remaining.has(m)));
  const gainOf = (p: T) => p.detects.reduce((n, m) => n + (remaining.has(m) ? 1 : 0), 0);
  const chosen: T[] = [];
  while (remaining.size && pool.length) {
    pool.sort((a, b) => gainOf(b) - gainOf(a) || a.totalTimeHours - b.totalTimeHours);
    const pick = pool.shift()!;
    if (gainOf(pick) === 0) break;
    chosen.push(pick);
    pick.detects.forEach(m => remaining.delete(m));
  }
  return chosen;
}

function popcount(n: number): number {
  let c = 0;
  while (n) { n &= n - 1; c++; }
  return c;
}
