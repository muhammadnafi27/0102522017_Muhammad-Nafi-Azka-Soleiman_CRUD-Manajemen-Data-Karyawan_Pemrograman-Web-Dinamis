import { Bell, Search } from "lucide-react";

export default function Topbar() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 shadow-sm flex items-center justify-between px-6 z-10">
      <div className="flex items-center text-slate-500 bg-slate-100 px-3 py-2 rounded-lg w-96">
        <Search size={18} className="text-slate-400" />
        <input 
          type="text" 
          placeholder="Cari karyawan atau data..." 
          className="bg-transparent border-none outline-none w-full ml-2 text-sm text-slate-700 placeholder-slate-400"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-full transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
      </div>
    </header>
  );
}
