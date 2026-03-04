import { safeNumber } from '@/lib/productContract';

interface ScoreBadgeProps {
  value: number | null | undefined;
  label?: string;
  className?: string;
}

export function ScoreBadge({ value, label, className = '' }: ScoreBadgeProps) {
  const num = safeNumber(value);
  return (
    <div className={`flex flex-col items-center gap-1 ${className}`}>
      <span className="text-2xl font-bold text-score">{num}</span>
      {label && <span className="text-xs text-muted-foreground">{label}</span>}
    </div>
  );
}
