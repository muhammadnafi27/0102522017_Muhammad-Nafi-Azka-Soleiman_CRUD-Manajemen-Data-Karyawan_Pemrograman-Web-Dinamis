import Link from "next/link";
import { Users, LayoutDashboard, Settings } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-teal-900 text-teal-50 h-full flex flex-col shadow-xl z-20">
      <div className="p-6 border-b border-teal-800">
        <h1 className="text-2xl font-bold tracking-tight">HRMS<span className="text-teal-400">.</span></h1>
        <p className="text-xs text-teal-300/70 mt-1">Manajemen Data Karyawan</p>
      </div>
      
      <nav className="flex-1 py-6 px-4 space-y-2">
        <Link 
          href="/" 
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-teal-100 hover:bg-teal-800 hover:text-white transition-colors"
        >
          <LayoutDashboard size={20} />
          <span className="font-medium">Dashboard</span>
        </Link>
        <Link 
          href="/employees" 
          className="flex items-center gap-3 px-4 py-3 rounded-lg bg-teal-800 text-white shadow-sm transition-colors"
        >
          <Users size={20} />
          <span className="font-medium">Data Karyawan</span>
        </Link>
        <Link 
          href="#" 
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-teal-100 hover:bg-teal-800 hover:text-white transition-colors opacity-50 cursor-not-allowed"
        >
          <Settings size={20} />
          <span className="font-medium">Pengaturan</span>
        </Link>
      </nav>

      <div className="p-6 border-t border-teal-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-teal-700 flex items-center justify-center text-teal-100 font-bold">
            AD
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Admin User</p>
            <p className="text-xs text-teal-300">Administrator</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
