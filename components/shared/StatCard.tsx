import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

export function StatCard({ title, value, icon, trend }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className="p-3 bg-teal-50 text-teal-600 rounded-xl">
          {icon}
        </div>
        {trend && (
          <div className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
            trend.isPositive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
          }`}>
            {trend.isPositive ? "+" : "-"}{trend.value}
          </div>
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
        <p className="text-3xl font-bold text-slate-900 mt-1 tracking-tight">{value}</p>
      </div>
    </div>
  );
}
