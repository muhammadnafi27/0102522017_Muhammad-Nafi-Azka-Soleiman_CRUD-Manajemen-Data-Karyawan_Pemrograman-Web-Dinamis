import { cn } from "@/lib/utils";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-medium rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
    
    const variants = {
      primary: "bg-gradient-to-r from-teal-500 to-teal-600 text-white hover:from-teal-600 hover:to-teal-700 shadow-sm focus:ring-teal-500",
      secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200 focus:ring-slate-500",
      outline: "border-2 border-slate-200 bg-transparent text-slate-700 hover:bg-slate-50 focus:ring-slate-500",
      ghost: "bg-transparent text-slate-600 hover:bg-slate-100 focus:ring-slate-500 hover:text-slate-900",
      danger: "bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 focus:ring-red-500",
    };

    const sizes = {
      sm: "h-9 px-3 text-sm",
      md: "h-10 px-4 py-2 text-sm",
      lg: "h-12 px-6 text-base",
      icon: "h-10 w-10 p-2",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
