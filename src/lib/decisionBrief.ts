export function generateDecisionBrief(products: any[]) {

  if (!products || products.length === 0) {
    return null;
  }

  const top = products[0];
  const second = products[1];

  const reasons: string[] = [];
  const tradeoffs: string[] = [];

  if (top.score_perf >= (second?.score_perf || 0)) {
    reasons.push("Strong performance for everyday use");
  }

  if (top.score_batt >= (second?.score_batt || 0)) {
    reasons.push("Reliable battery life");
  }

  if (top.score_reliability >= (second?.score_reliability || 0)) {
    reasons.push("Higher reliability score");
  }

  if (top.score_cam < (second?.score_cam || 0)) {
    tradeoffs.push("Camera slightly weaker than the next option");
  }

  return {
    title: `Why ${top.name} ranks #1`,
    reasons,
    tradeoffs
  };
}