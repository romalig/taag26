# Product & Protocol Selector — taag26

Self-contained React component. **No build step, no scripts.** You edit the data directly
in TypeScript files; changes show up on the next dev reload.

## Structure
```
src/components/workflow/
├─ WorkflowBuilder.tsx        ← UI component (don't normally edit)
├─ workflowData.ts            ← assembles data + helpers (don't edit)
├─ protocolSelection.ts       ← optimal set-cover algorithm (don't touch)
├─ protocolSelection.test.ts  ← 22 tests
└─ data/                      ← THE FILES YOU EDIT BY HAND
   ├─ microorganisms.ts       ← organisms the selector can target
   ├─ industries.ts           ← which organisms are relevant per industry
   ├─ products.ts             ← product master data (one entry per logical product)
   ├─ protocols.ts            ← 38 PCR kits (only those with protocol rows in source)
   └─ comparisons.ts          ← competitor comparison tables
```

## Data model (two-level normalization)

**products.ts** — each logical product once, with all its presentations (formats/sizes/
catalog codes) grouped in `presentations[]`. Editing a product's description is one place.

**protocols.ts** — each PCR kit. Every stage (sampling/enrichment/extraction) lists product
OPTIONS that reference a product by `productKey`. Catalog codes and descriptions are read
from products.ts (no duplication). Each option carries its own `sampleTypes` and time.

## How the selector works

1. Pick an **industry** → step 2 shows its validated microorganisms.
2. Pick **target microorganisms** → the set-cover algorithm chooses the fewest PCR kits that
   cover them, **precision-first**: a kit detecting exactly what was asked beats a faster kit
   that also detects extra targets.
3. Step 3 shows the recommended workflow:
   - A **Sample type** control (Environmental / Finished) when both apply; stage options are
     filtered to the chosen type.
   - Each stage shows the chosen product with its **cat# and description**. Stages with more
     than one option show an **"N options" link** to switch product/format/presentation.
   - The **PCR stage** shows an **"N kit options" link**: exact-match kits plus the next tier
     of kits with extra targets (e.g. Salmonella-only → Elevia 1.1 recommended, Elevia 2.9
     Salmonella+Enterobacteria as an alternative). Choosing a different kit **recomputes the
     whole chain** from that kit's validated products.

Default presentation order within a product: (1) lowest time, then (2) RTU-first for media /
Automated-first for extraction. In practice presentations share time, so RTU/Automated decides.

`totalTimeHours` is always the **sum of the chosen option per stage**.

## Run locally
1. Copy `src/components/workflow/` into your repo.
2. `npm install lucide-react`
3. Put a `bacteria.png` in `public/bacteria.png`.
4. Mount:
   ```tsx
   import WorkflowBuilder from "@/components/workflow/WorkflowBuilder";
   export default function Page() { return <WorkflowBuilder />; }
   ```
5. `npm run dev`

## Tests
```bash
npx tsx src/components/workflow/protocolSelection.test.ts   # → 22 passed
```

## ⚠ INVENTED / INFERRED DATA — review before production
Built for local review. Flagged `timeEstimated` / `descriptionEstimated` (shown with "est."):
- **Sampling times** invented (0.25h placeholder).
- **Extraction mode** (Manual/Automated) inferred from product line; **format ordering**
  (RTU-first) is a fixed assumption.
- **Sample type** (Environmental/Finished) inferred from each protocol row's matrix text.
- **`unlisted_…` products**: referenced in protocol rows but absent from the master catalog →
  no catalog code or description until your team adds them.

### Industry filtering
Kits are filtered to an industry by the kit's **declared** `mainIndustries` (from the source
`main_industries` field) — NOT by microorganism overlap. This is stronger than "detects a
relevant organism", but it is still *declared coverage*, not *per-matrix validation*: a kit
that lists "Confectionery" may only have a generic matrix row, not a chocolate-specific one.
For true per-matrix validation, the protocol rows' `matrix` text would need to be mapped to
industries — a further step. Also note `mainIndustries` and `industries.ts` don't fully agree
(e.g. a couple of kits declare an industry whose microorganisms aren't listed for it); worth
reconciling the two sources.

`Real-Time PCR`, enrichment, and most extraction times come from the source and are not estimated.

## Notes
- Only runtime dependency: `lucide-react`. Tailwind + styled-jsx come with Next.
- The combinatorics are independent per stage. Validate real-world combinations before production.