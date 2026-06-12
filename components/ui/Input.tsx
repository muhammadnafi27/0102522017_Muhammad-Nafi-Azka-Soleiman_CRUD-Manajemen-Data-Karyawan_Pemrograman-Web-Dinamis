import { cn } from "@/lib/utils";
import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "flex h-11 w-full rounded-xl border bg-white px-4 py-2 text-sm text-slate-900 shadow-sm transition-colors placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500",
          error 
            ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" 
            : "border-slate-200 focus:border-teal-500 focus:ring-teal-500/20 hover:border-slate-300",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
