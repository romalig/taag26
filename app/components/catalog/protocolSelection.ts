// =============================================================================
// protocolSelection.ts
// Optimal protocol selection = SET COVER problem.
//
// Elements to cover: the microorganisms the user selected.
// Sets: protocols, each covering the microorganisms its PCR kit detects.
//
// Optimization hierarchy:
//   1. MINIMUM number of protocols that cover all requested microorganisms.
//   2. Among minimum-size solutions: LEAST waste (redundant detections across the plan —
//      targets outside the request, plus requested targets detected by >1 protocol).
//   3. Tie-break: LOWEST total time.
//
// Computes the EXACT optimum (not greedy). At catalog scale (<= ~15 micros,
// <= ~50 protocols) the space is small; we use increasing-size search with
// bitmask pruning. If the space exceeds a safety budget, we fall back to
// greedy and flag it in the result (`exact: false`).
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
  /** For each chosen protocol, which requested microorganisms it covers */
  coverageByProtocol: { protocolId: string; covers: string[] }[];
}

const MAX_NODES = 2_000_000; // presupuesto de seguridad para la búsqueda exacta

/**
 * Selecciona el conjunto óptimo de protocolos para cubrir los microorganismos pedidos.
 */
export function selectOptimalProtocols<T extends SelectableProtocol>(
  selectedMicroIds: string[],
  protocols: T[]
): SelectionResult<T> {
  const target = [...new Set(selectedMicroIds)];

  // --- 1. Determinar qué es cubrible y descartar microorganismos huérfanos
  const coverableSet = new Set<string>();
  for (const p of protocols) for (const m of p.detects) if (target.includes(m)) coverableSet.add(m);
  const uncoverable = target.filter(m => !coverableSet.has(m));
  const need = target.filter(m => coverableSet.has(m));

  if (need.length === 0) {
    return { protocols: [], uncoverable, totalTimeHours: 0, overCoverage: [], exact: true, coverageByProtocol: [] };
  }

  // --- 2. Mapear microorganismos cubribles a bits
  const bitOf = new Map<string, number>();
  need.forEach((m, i) => bitOf.set(m, i));
  const FULL = need.length === 31 ? 0x7fffffff : (1 << need.length) - 1; // hasta 31 micros (suficiente)

  // Pre-filtrar protocolos: solo los que aportan algo, con su máscara de cobertura.
  type Cand = { p: T; mask: number; coverCount: number };
  const candsRaw: Cand[] = protocols
    .map(p => {
      let mask = 0;
      for (const m of p.detects) { const b = bitOf.get(m); if (b !== undefined) mask |= (1 << b); }
      return { p, mask, coverCount: popcount(mask) };
    })
    .filter(c => c.mask !== 0);

  // Eliminar protocolos dominados (otro cubre un superconjunto en ≤ tiempo) para reducir el espacio.
  const cands = candsRaw.filter((c, i) =>
    !candsRaw.some((o, j) =>
      j !== i && (o.mask & c.mask) === c.mask && o.mask !== c.mask && o.p.totalTimeHours <= c.p.totalTimeHours
    )
  );

  // --- 3. Búsqueda exacta por tamaño creciente (k = 1,2,3,...)
  const sortedByCover = [...cands].sort((a, b) => b.coverCount - a.coverCount);
  let nodes = 0;
  let exact = true;

  type Sol = { combo: Cand[]; time: number; waste: number };
  // Tie-break hierarchy: (1) fewest protocols → (2) least over-coverage → (3) lowest time.
  // Precision-first: a kit detecting exactly what was asked beats a faster kit that also
  // detects extra targets (e.g. Elevia 1.1 Salmonella-only beats Elevia 2.9 Salmonella+Entero).
  const better = (a: Sol, b: Sol) =>
    a.combo.length !== b.combo.length ? a.combo.length < b.combo.length
    : a.waste !== b.waste ? a.waste < b.waste
    : a.time < b.time;

  // "Waste" = total redundant detections across the whole plan. For each microorganism the
  // plan detects, count how many of the chosen protocols detect it:
  //   - if it was requested: every detection beyond the first is wasted (N-1)
  //   - if it was NOT requested: every detection is wasted (N)
  // This penalizes both over-coverage (targets outside the request) AND redundancy (the same
  // requested target detected by more than one protocol). Minimizing it picks the kits that
  // most tightly fit what still needs covering, not just the request as a whole.
  const wasteOf = (combo: Cand[]) => {
    const counts = new Map<string, number>();
    for (const c of combo) for (const m of c.p.detects) counts.set(m, (counts.get(m) ?? 0) + 1);
    let waste = 0;
    counts.forEach((n, m) => { waste += target.includes(m) ? n - 1 : n; });
    return waste;
  };

  let best: Sol | null = null;
  const upperK = cands.length; // no se necesitan más protocolos que candidatos

  outer:
  for (let k = 1; k <= upperK; k++) {
    // recursión que elige combinaciones de tamaño exactamente k
    const chosen: Cand[] = [];
    const rec = (start: number, covered: number, depth: number): void => {
      if (++nodes > MAX_NODES) { exact = false; return; }
      if (depth === k) {
        if (covered === FULL) {
          const time = chosen.reduce((s, c) => s + c.p.totalTimeHours, 0);
          const sol: Sol = { combo: [...chosen], time, waste: wasteOf(chosen) };
          if (!best || better(sol, best)) best = sol;
        }
        return;
      }
      const remaining = k - depth;
      for (let i = start; i <= cands.length - remaining; i++) {
        // poda: ¿pueden los protocolos restantes (mejores por cobertura) completar FULL?
        chosen.push(sortedByCover[i]);
        rec(i + 1, covered | sortedByCover[i].mask, depth + 1);
        chosen.pop();
        if (!exact) return;
      }
    };
    rec(0, 0, 0);
    if (best || !exact) break outer; // encontrado el mínimo k, o agotado presupuesto
  }

  // --- 4. Respaldo greedy si la búsqueda exacta se agotó sin solución
  if (!best) {
    exact = false;
    const greedy: Cand[] = [];
    let covered = 0;
    const pool = [...cands];
    while (covered !== FULL && pool.length) {
      pool.sort((a, b) => {
        const ga = popcount(b.mask & ~covered) - popcount(a.mask & ~covered);
        return ga !== 0 ? ga : a.p.totalTimeHours - b.p.totalTimeHours;
      });
      const pick = pool.shift()!;
      if ((pick.mask & ~covered) === 0) break;
      greedy.push(pick); covered |= pick.mask;
    }
    best = { combo: greedy, time: greedy.reduce((s, c) => s + c.p.totalTimeHours, 0), waste: wasteOf(greedy) };
  }

  // --- 5. Armar resultado, ordenando por cobertura del set pedido (desc)
  const chosenCands = [...best.combo].sort((a, b) => b.coverCount - a.coverCount);
  const coverageByProtocol: { protocolId: string; covers: string[] }[] = [];
  const assigned = new Set<string>();
  for (const c of chosenCands) {
    const covers = c.p.detects.filter(m => target.includes(m) && !assigned.has(m));
    covers.forEach(m => assigned.add(m));
    coverageByProtocol.push({ protocolId: c.p.id, covers });
  }
  const overSet = new Set<string>();
  for (const c of chosenCands) for (const m of c.p.detects) if (!target.includes(m)) overSet.add(m);

  return {
    protocols: chosenCands.map(c => c.p),
    uncoverable,
    totalTimeHours: Math.round(best.combo.reduce((s, c) => s + c.p.totalTimeHours, 0) * 10) / 10,
    overCoverage: [...overSet],
    exact,
    coverageByProtocol,
  };
}

function popcount(n: number): number {
  let c = 0;
  while (n) { n &= n - 1; c++; }
  return c;
}