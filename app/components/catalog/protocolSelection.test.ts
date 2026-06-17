// protocolSelection.test.ts — corre con:  npx tsx protocolSelection.test.ts
import { selectOptimalProtocols, type SelectableProtocol } from "./protocolSelection";

let passed = 0, failed = 0;
function check(name: string, cond: boolean, detail = "") {
  if (cond) { passed++; console.log(`  ✓ ${name}`); }
  else { failed++; console.log(`  ✗ ${name} ${detail}`); }
}
const ids = (r: { protocols: SelectableProtocol[] }) => r.protocols.map(p => p.id).sort();

// ---------------------------------------------------------------------------
console.log("TEST 1 — un solo multiplex cubre todo: elige 1 protocolo");
{
  const protos: SelectableProtocol[] = [
    { id: "MULTI", name: "Multiplex", detects: ["sal", "lis", "eco"], totalTimeHours: 27 },
    { id: "A", name: "A", detects: ["sal"], totalTimeHours: 25 },
    { id: "B", name: "B", detects: ["lis"], totalTimeHours: 25 },
  ];
  const r = selectOptimalProtocols(["sal", "lis", "eco"], protos);
  check("1 protocolo", r.protocols.length === 1);
  check("es el multiplex", r.protocols[0].id === "MULTI");
  check("exacto", r.exact);
  check("sin no-cubribles", r.uncoverable.length === 0);
}

// ---------------------------------------------------------------------------
console.log("TEST 2 — caso donde GREEDY falla y exacto gana (minimiza #protocolos)");
{
  // Pedido: {a,b,c,d}. Greedy tomaría BIG (cubre a,b,c) y luego forzaría un 2º para d => 2.
  // Pero {P_ab, P_cd} también son 2. El óptimo en #protocolos es 2 en ambos; el truco real:
  // construyamos un caso clásico donde greedy da 3 y óptimo da 2.
  // Universo {1,2,3,4,5,6}. Greedy elige el de 3 y luego necesita 2 más (total 3).
  // Óptimo: dos conjuntos de 3 que parten el universo (total 2).
  const protos: SelectableProtocol[] = [
    { id: "G", name: "greedy-trap", detects: ["3", "4", "5"], totalTimeHours: 10 }, // el más grande
    { id: "X", name: "X", detects: ["1", "2", "3"], totalTimeHours: 10 },
    { id: "Y", name: "Y", detects: ["4", "5", "6"], totalTimeHours: 10 },
    { id: "p1", name: "p1", detects: ["1"], totalTimeHours: 5 },
    { id: "p2", name: "p2", detects: ["2"], totalTimeHours: 5 },
    { id: "p6", name: "p6", detects: ["6"], totalTimeHours: 5 },
  ];
  const r = selectOptimalProtocols(["1", "2", "3", "4", "5", "6"], protos);
  check("óptimo = 2 protocolos (greedy daría 3)", r.protocols.length === 2, `dio ${r.protocols.length}`);
  check("elige X+Y", JSON.stringify(ids(r)) === JSON.stringify(["X", "Y"]), `dio ${ids(r)}`);
  check("exacto", r.exact);
}

// ---------------------------------------------------------------------------
console.log("TEST 3 — empate en #protocolos y sobre-cobertura: elige el de MENOR tiempo total");
{
  const protos: SelectableProtocol[] = [
    { id: "FAST", name: "fast", detects: ["a", "b"], totalTimeHours: 20 },
    { id: "SLOW", name: "slow", detects: ["a", "b"], totalTimeHours: 40 },
  ];
  const r = selectOptimalProtocols(["a", "b"], protos);
  check("1 protocolo", r.protocols.length === 1);
  check("elige el rápido", r.protocols[0].id === "FAST", `dio ${r.protocols[0].id}`);
}

// ---------------------------------------------------------------------------
console.log("TEST 3b — PRECISIÓN antes que velocidad: kit exacto lento gana a kit rápido con extras");
{
  // Caso real: Salmonella-only. EXACT detecta solo salmonella (lento). WIDE detecta
  // salmonella + enterobacteria (rápido). Precisión primero => gana EXACT.
  const protos: SelectableProtocol[] = [
    { id: "EXACT", name: "Elevia 1.1", detects: ["salmonella"], totalTimeHours: 8.5 },
    { id: "WIDE", name: "Elevia 2.9", detects: ["salmonella", "enterobacteria"], totalTimeHours: 1.83 },
  ];
  const r = selectOptimalProtocols(["salmonella"], protos);
  check("elige el exacto pese a ser más lento", r.protocols[0].id === "EXACT", `dio ${r.protocols[0].id}`);
  check("sin sobre-cobertura", r.overCoverage.length === 0);
}

// ---------------------------------------------------------------------------
console.log("TEST 4 — empate en #protocolos y tiempo: elige MENOR sobre-cobertura");
{
  const protos: SelectableProtocol[] = [
    { id: "TIGHT", name: "tight", detects: ["a", "b"], totalTimeHours: 20 },
    { id: "WIDE", name: "wide", detects: ["a", "b", "z", "y"], totalTimeHours: 20 },
  ];
  const r = selectOptimalProtocols(["a", "b"], protos);
  check("elige el de menor sobre-cobertura", r.protocols[0].id === "TIGHT", `dio ${r.protocols[0].id}`);
  check("reporta over-coverage correcto", r.overCoverage.length === 0);
}

// ---------------------------------------------------------------------------
console.log("TEST 5 — microorganismo no cubrible se reporta, no rompe");
{
  const protos: SelectableProtocol[] = [
    { id: "A", name: "A", detects: ["sal"], totalTimeHours: 25 },
  ];
  const r = selectOptimalProtocols(["sal", "ghost"], protos);
  check("cubre sal", ids(r).includes("A"));
  check("reporta ghost no-cubrible", r.uncoverable.includes("ghost"));
  check("solo 1 no-cubrible", r.uncoverable.length === 1);
}

// ---------------------------------------------------------------------------
console.log("TEST 6 — sin selección: resultado vacío válido");
{
  const r = selectOptimalProtocols([], []);
  check("vacío", r.protocols.length === 0 && r.uncoverable.length === 0 && r.exact);
}

// ---------------------------------------------------------------------------
console.log("TEST 7 — cobertura por protocolo no se solapa (cada micro asignado una vez)");
{
  const protos: SelectableProtocol[] = [
    { id: "P1", name: "P1", detects: ["a", "b", "c"], totalTimeHours: 27 },
    { id: "P2", name: "P2", detects: ["c", "d"], totalTimeHours: 25 },
  ];
  const r = selectOptimalProtocols(["a", "b", "c", "d"], protos);
  const allCovers = r.coverageByProtocol.flatMap(c => c.covers);
  check("sin micros duplicados entre protocolos", new Set(allCovers).size === allCovers.length, `covers=${allCovers}`);
  check("cubre los 4", new Set(allCovers).size === 4);
}

// ---------------------------------------------------------------------------
console.log("TEST 8 — real catalog data (from protocols.ts)");
{
  // smoke test against the real editable data
  const { PROTOCOLS } = require("./data/protocols");
  // Same canonical form as workflowData.normMicroId (inlined to keep the test self-contained).
  const normMicroId = (id: string): string => id.toLowerCase().replace(/[^a-z0-9]/g, "");
  const protos: SelectableProtocol[] = PROTOCOLS.map((p: any) => ({
    id: p.id, name: p.name, detects: p.targets.map(normMicroId),
    totalTimeHours: 1, // placeholder; set-cover tie-break not under test here
  }));
  // pedir 3 patógenos clásicos de Dairy (normalizados, como en producción)
  const r = selectOptimalProtocols(["salmonella_spp", "listeria_monocytogenes", "escherichia_coli_o157_h7"].map(normMicroId), protos);
  check("cubre los 3 patógenos", r.uncoverable.length === 0, `no-cubribles: ${r.uncoverable}`);
  check("usa pocos protocolos (≤2)", r.protocols.length <= 2, `usó ${r.protocols.length}`);
  check("exacto", r.exact);
  console.log(`    → ${r.protocols.length} protocolo(s), ${r.totalTimeHours}h: ${r.protocols.map(p => p.name).join(" + ")}`);
}

// ---------------------------------------------------------------------------
console.log("TEST 9 — minimiza redundancia entre protocolos (no solo over-coverage)");
{
  // Pedido cubierto por P1 salvo 1 target. Dos candidatos para el 2º protocolo:
  //   TIGHT detecta el faltante + 1 target ya pedido (poca redundancia)
  //   WIDE  detecta el faltante + 2 targets que P1 YA cubre (más redundancia)
  // Ambos tienen over-coverage 0 (todo está en el pedido), pero WIDE desperdicia más.
  // El más rápido es WIDE — antes ganaba por tiempo; ahora debe ganar TIGHT por waste.
  const protos: SelectableProtocol[] = [
    { id: "P1",    name: "p1",    detects: ["a", "b", "c", "d"], totalTimeHours: 5 },
    { id: "TIGHT", name: "tight", detects: ["d", "e"],           totalTimeHours: 9 },
    { id: "WIDE",  name: "wide",  detects: ["a", "b", "e"],      totalTimeHours: 1 },
  ];
  const r = selectOptimalProtocols(["a", "b", "c", "d", "e"], protos);
  const ids = r.protocols.map(p => p.id).sort();
  check("elige P1 + TIGHT (menor redundancia)", ids.join(",") === "P1,TIGHT", `dio ${ids.join(",")}`);
}

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);