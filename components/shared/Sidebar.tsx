"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Users, LayoutDashboard, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/employees", label: "Data Karyawan", icon: Users },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Load sidebar collapsed state from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("sidebar-collapsed");
    if (stored === "true") {
      setIsCollapsed(true);
    }
  }, []);

  const handleToggle = () => {
    const nextState = !isCollapsed;
    setIsCollapsed(nextState);
    localStorage.setItem("sidebar-collapsed", String(nextState));
  };

  return (
    <aside
      className={cn(
        "relative my-4 ml-4 h-[calc(100vh-2rem)] bg-gradient-to-b from-teal-950 via-teal-900 to-teal-950 text-teal-50 flex flex-col shadow-2xl z-20 shrink-0 rounded-2xl border border-teal-800/50 transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Collapse Toggle Button */}
      <button
        onClick={handleToggle}
        className="absolute -right-3 top-7 w-6 h-6 rounded-full bg-white hover:bg-teal-50 text-teal-600 border border-teal-200 shadow-md flex items-center justify-center cursor-pointer transition-all z-30 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-1"
        title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
      >
        <ChevronLeft
          size={14}
          className={cn(
            "transition-transform duration-300 text-teal-600",
            isCollapsed && "rotate-180"
          )}
        />
      </button>

      {/* Brand Header */}
      <div className={cn(
        "p-6 border-b border-teal-800/40 flex flex-col justify-center transition-all duration-300",
        isCollapsed ? "items-center px-4" : "items-start"
      )}>
        <h1 className={cn(
          "font-bold tracking-tight transition-all duration-300 text-white",
          isCollapsed ? "text-xl" : "text-2xl"
        )}>
          {isCollapsed ? (
            <span>H<span className="text-teal-400">.</span></span>
          ) : (
            <span>HRMS<span className="text-teal-400">.</span></span>
          )}
        </h1>
        {!isCollapsed && (
          <p className="text-[10px] text-teal-300/60 mt-1 uppercase font-semibold tracking-wider truncate w-full">
            Manajemen Data Karyawan
          </p>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 py-6 px-3 space-y-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative flex items-center rounded-xl transition-all duration-200 font-medium text-sm overflow-hidden",
                isCollapsed 
                  ? "justify-center p-3 mx-1" 
                  : "gap-3 px-4 py-3.5 mx-1",
                isActive
                  ? "bg-gradient-to-r from-teal-800/90 to-teal-700/50 text-white shadow-lg border-l-4 border-teal-400 shadow-teal-950/20"
                  : "text-teal-200 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon 
                size={20} 
                className={cn(
                  "shrink-0 transition-transform duration-200 group-hover:scale-110",
                  isActive ? "text-teal-400" : "text-teal-300/80 group-hover:text-white"
                )} 
              />
              
              {!isCollapsed && (
                <span className="truncate transition-all duration-300">{item.label}</span>
              )}

              {/* Active Dot indicator when expanded */}
              {!isCollapsed && isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-teal-400 shadow-glow" />
              )}

              {/* CSS Tooltip when collapsed */}
              {isCollapsed && (
                <div className="absolute left-full ml-4 px-3 py-2 bg-teal-950 text-white text-xs font-semibold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap shadow-xl border border-teal-800/60 z-50">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div className={cn(
        "p-3 m-3 rounded-xl bg-teal-900/40 border border-teal-800/30 transition-all duration-300",
        isCollapsed ? "flex justify-center" : "flex items-center gap-3"
      )}>
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-inner border border-teal-300/20">
          AD
        </div>
        {!isCollapsed && (
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-white truncate">Admin User</p>
            <p className="text-xs text-teal-300/70 truncate">Administrator</p>
          </div>
        )}
      </div>
    </aside>
  );
}

