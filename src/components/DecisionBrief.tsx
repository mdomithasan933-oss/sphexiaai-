import React from "react";

type BriefProduct = {
  slug?: string;
  name?: string;
  brand?: string | null;

  // scores (optional)
  score_perf?: number | null;
  score_cam?: number | null;
  score_batt?: number | null;
  reliability_score?: number | null;

  // badges (optional)
  risk_badge?: string | null;
  trust_pct?: number | null;
  verification_score?: number | null;
};

type Props = {
  // Optional: Results.tsx থেকে pass করলে brief smarter হবে
  products?: BriefProduct[];
};

function safeNum(v: any): number | null {
  const n = typeof v === "number" ? v : v == null ? null : Number(v);
  return Number.isFinite(n) ? n : null;
}

function topReasonLabel(p: BriefProduct): string[] {
  const perf = safeNum(p.score_perf);
  const cam = safeNum(p.score_cam);
  const batt = safeNum(p.score_batt);
  const rel = safeNum(p.reliability_score);

  const pairs: { k: string; v: number }[] = [];
  if (perf != null) pairs.push({ k: "Strong everyday performance", v: perf });
  if (batt != null) pairs.push({ k: "Reliable battery life", v: batt });
  if (cam != null) pairs.push({ k: "Good camera performance", v: cam });
  if (rel != null) pairs.push({ k: "High reliability / low issues", v: rel });

  // sort desc by score
  pairs.sort((a, b) => b.v - a.v);

  // take top 2 reasons; fallback
  const reasons = pairs.slice(0, 2).map((x) => x.k);
  if (reasons.length === 0) return ["Optimized for your priority", "Balanced overall value"];
  if (reasons.length === 1) return [reasons[0], "Balanced overall value"];
  return reasons;
}

export default function DecisionBrief({ products }: Props) {
  const top1 = products?.[0];
  const top2 = products?.[1];

  // If no data yet, show a stable brief (never disappears)
  const title = top1?.name ? `Why ${top1.name} ranks #1` : "Decision Brief";
  const compareLine =
    top1?.name && top2?.name ? `${top1.name} vs ${top2.name}` : null;

  const reasons = top1 ? topReasonLabel(top1) : ["Optimized for your priority", "Balanced overall value"];

  return (
    <div className="glass-card rounded-xl p-6 space-y-3">
      <div className="flex items-center gap-2">
        <span aria-hidden>⚡</span>
        <div className="text-lg font-semibold">Decision Brief</div>
      </div>

      <div className="text-base font-semibold">{title}</div>

      {compareLine ? (
        <div className="text-sm text-muted-foreground">
          Very close decision — evaluate trade-offs:{" "}
          <span className="text-foreground">{compareLine}</span>
        </div>
      ) : (
        <div className="text-sm text-muted-foreground">
          Quick summary based on your filters.
        </div>
      )}

      <div className="pt-2">
        <div className="text-sm font-semibold">WHY #1</div>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
          {reasons.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}