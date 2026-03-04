import { normalizeRisk } from "@/lib/productContract";

type RiskLevel = string | null | undefined;

type RiskBadgeProps = {
  level?: RiskLevel;
  className?: string;
};

export function RiskBadge({ level, className }: RiskBadgeProps) {
  const risk = normalizeRisk(level);

  let label = "Low Risk";
  let style = "bg-emerald-500/15 text-emerald-300 border-emerald-500/30";

  if (risk === "medium") {
    label = "Medium Risk";
    style = "bg-amber-500/15 text-amber-300 border-amber-500/30";
  } else if (risk === "high") {
    label = "High Risk";
    style = "bg-red-500/15 text-red-300 border-red-500/30";
  }

  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium",
        style,
        className ?? "",
      ].join(" ")}
      title={`Risk: ${risk}`}
    >
      {label}
    </span>
  );
}

export default RiskBadge;