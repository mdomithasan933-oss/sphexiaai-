type VerificationBadgeProps = {
  score?: number | null;
  className?: string;
};

export function VerificationBadge({ score, className }: VerificationBadgeProps) {
  const s = typeof score === "number" ? score : 0;

  let label = "Unverified";
  let style = "bg-muted/20 text-muted-foreground border-border";

  if (s >= 4) {
    label = "Verified+";
    style = "bg-emerald-500/15 text-emerald-300 border-emerald-500/30";
  } else if (s >= 2) {
    label = "Verified";
    style = "bg-sky-500/15 text-sky-300 border-sky-500/30";
  }

  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium",
        style,
        className ?? "",
      ].join(" ")}
      title={`Verification score: ${s}`}
    >
      {label}
    </span>
  );
}

export default VerificationBadge;