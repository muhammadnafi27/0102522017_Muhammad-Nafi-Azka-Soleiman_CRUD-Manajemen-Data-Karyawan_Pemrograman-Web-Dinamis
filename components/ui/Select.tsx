import { cn } from "@/lib/utils";
import React from "react";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          className={cn(
            "flex h-11 w-full appearance-none rounded-xl border bg-white px-4 py-2 pr-10 text-sm text-slate-900 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500",
            error 
              ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" 
              : "border-slate-200 focus:border-teal-500 focus:ring-teal-500/20 hover:border-slate-300",
            className
          )}
          {...props}
        >
          {children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    );
  }
);
Select.displayName = "Select";
