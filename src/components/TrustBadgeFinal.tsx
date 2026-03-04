type Props = {
  pct?: number | null;
};

export function TrustBadgeFinal({ pct }: Props) {
  if (pct == null) {
    return (
      <span className="text-xs px-2 py-1 rounded bg-secondary text-muted-foreground">
        Trust —
      </span>
    );
  }

  const value = Math.round(pct);

  let color =
    "bg-red-500/15 text-red-500 border border-red-500/20";

  if (value >= 70) {
    color = "bg-green-500/15 text-green-500 border border-green-500/20";
  } else if (value >= 40) {
    color = "bg-yellow-500/15 text-yellow-500 border border-yellow-500/20";
  }

  return (
    <span
      className={`text-xs px-2 py-1 rounded font-medium ${color}`}
    >
      Trust {value}%
    </span>
  );
}

export default TrustBadgeFinal;