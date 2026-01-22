import { SOLUTIONS, Solution } from "./solutionFinderCatalog";

const WEIGHTS = {
  speed: 0.5,
  precision: 0.3,
  system: 0.2
};

export function recommendSolution(
  challengeText: string
): Solution {
  const text = challengeText.toLowerCase();

  let best: Solution | null = null;
  let bestScore = -Infinity;

  for (const sol of SOLUTIONS) {
    let keywordBoost = 0;

    for (const k of sol.keywords) {
      if (text.includes(k)) keywordBoost += 0.3;
    }

    const score =
      sol.speed * WEIGHTS.speed +
      sol.precision * WEIGHTS.precision +
      sol.system * WEIGHTS.system +
      keywordBoost;

    if (score > bestScore) {
      bestScore = score;
      best = sol;
    }
  }

  return best!;
}