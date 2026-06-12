import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "danger" | "warning" | "outline" | "teal";
}

export function Badge({ children, variant = "default", className, ...props }: BadgeProps) {
  const variants = {
    default: "bg-slate-100 text-slate-700 border-transparent",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200",
    danger: "bg-red-50 text-red-700 border-red-200",
    warning: "bg-amber-50 text-amber-700 border-amber-200",
    outline: "bg-transparent text-slate-600 border-slate-200",
    teal: "bg-teal-50 text-teal-700 border-teal-200",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border transition-colors",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
