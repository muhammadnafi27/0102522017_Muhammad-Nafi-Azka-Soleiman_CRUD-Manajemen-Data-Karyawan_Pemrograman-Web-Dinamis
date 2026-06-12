"use client";

import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/employees": "Data Karyawan",
  "/employees/new": "Tambah Karyawan",
};

export default function Topbar() {
  const pathname = usePathname();

  // Cocokkan judul halaman
  let title = "HRMS";
  for (const [path, label] of Object.entries(pageTitles)) {
    if (pathname === path || (path !== "/" && pathname.startsWith(path))) {
      title = label;
    }
  }
  if (pathname.includes("/edit")) title = "Edit Karyawan";

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-10 shrink-0">
      <div>
        <h2 className="text-base font-semibold text-slate-800">{title}</h2>
        <p className="text-xs text-slate-400">HRMS · Manajemen Data Karyawan</p>
      </div>
      <div className="flex items-center gap-3">
        <button className="relative p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-full transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-teal-500 rounded-full border-2 border-white"></span>
        </button>
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-bold text-sm">
          AD
        </div>
      </div>
    </header>
  );
}
