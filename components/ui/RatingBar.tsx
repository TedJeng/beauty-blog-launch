interface RatingBarProps {
  label: string;
  value: number;
  max?: number;
}

export default function RatingBar({ label, value, max = 5 }: RatingBarProps) {
  const percentage = (value / max) * 100;

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-text-light w-16 shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-cream-dark rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm font-medium text-text w-8 text-right">
        {value.toFixed(1)}
      </span>
    </div>
  );
}
