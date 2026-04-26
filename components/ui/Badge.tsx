interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "herb";
  className?: string;
}

const variants = {
  default: "bg-primary-light/30 text-primary-dark",
  accent: "bg-accent-light/20 text-accent-dark",
  herb: "bg-herb-light/30 text-herb",
};

export default function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
