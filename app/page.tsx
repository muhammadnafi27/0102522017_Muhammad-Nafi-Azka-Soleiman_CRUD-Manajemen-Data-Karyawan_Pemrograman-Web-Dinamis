import prisma from "@/lib/prisma";
import Link from "next/link";
import {
  Users, Building2, Briefcase, TrendingUp,
  UserCheck, UserX, Clock, Plus, ArrowRight,
  Activity
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [
    totalEmployees,
    activeEmployees,
    inactiveEmployees,
    probationEmployees,
    departmentsCount,
    positionsCount,
    recentEmployees,
    skillStats,
  ] = await Promise.all([
    prisma.employee.count(),
    prisma.employee.count({ where: { status: "active" } }),
    prisma.employee.count({ where: { status: "inactive" } }),
    prisma.employee.count({ where: { status: "probation" } }),
    prisma.department.count(),
    prisma.position.count(),
    prisma.employee.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { position: { include: { department: true } } },
    }),
    prisma.skill.findMany({
      include: { _count: { select: { employees: true } } },
      orderBy: { employees: { _count: "desc" } },
      take: 5,
    }),
  ]);

  const activePercent = totalEmployees > 0 ? Math.round((activeEmployees / totalEmployees) * 100) : 0;

  return (
    <div className="max-w-7xl mx-auto space-y-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Selamat Datang, <span className="text-teal-600">Admin</span>
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Berikut adalah ringkasan data karyawan perusahaan Anda hari ini.
          </p>
        </div>
        <Link
          href="/employees/new"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white px-5 py-2.5 rounded-xl font-semibold shadow-md hover:shadow-lg hover:from-teal-600 hover:to-teal-700 transition-all"
        >
          <Plus size={18} />
          Tambah Karyawan
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-gradient-to-br from-teal-500 to-teal-700 rounded-2xl p-6 text-white shadow-lg shadow-teal-500/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-sm">
              <Users size={22} />
            </div>
            <span className="text-xs font-semibold bg-white/20 px-2.5 py-1 rounded-full backdrop-blur-sm">Total</span>
          </div>
          <p className="text-5xl font-bold tracking-tight">{totalEmployees}</p>
          <p className="text-teal-100 text-sm mt-1 font-medium">Total Karyawan</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2.5 bg-teal-50 text-teal-600 rounded-xl">
              <UserCheck size={22} />
            </div>
            <span className="text-xs font-semibold bg-teal-50 text-teal-600 px-2.5 py-1 rounded-full">{activePercent}%</span>
          </div>
          <p className="text-4xl font-bold text-slate-900 tracking-tight">{activeEmployees}</p>
          <p className="text-slate-500 text-sm mt-1 font-medium">Karyawan Aktif</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2.5 bg-teal-50 text-teal-600 rounded-xl">
              <Clock size={22} />
            </div>
            <span className="text-xs font-semibold bg-amber-50 text-amber-600 px-2.5 py-1 rounded-full">Percobaan</span>
          </div>
          <p className="text-4xl font-bold text-slate-900 tracking-tight">{probationEmployees}</p>
          <p className="text-slate-500 text-sm mt-1 font-medium">Masa Probation</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2.5 bg-teal-50 text-teal-600 rounded-xl">
              <UserX size={22} />
            </div>
            <span className="text-xs font-semibold bg-red-50 text-red-600 px-2.5 py-1 rounded-full">Nonaktif</span>
          </div>
          <p className="text-4xl font-bold text-slate-900 tracking-tight">{inactiveEmployees}</p>
          <p className="text-slate-500 text-sm mt-1 font-medium">Karyawan Nonaktif</p>
        </div>
      </div>

      {/* Struktur Perusahaan & Skills */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Company Structure Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <Activity size={18} className="text-teal-600" />
            <h2 className="font-bold text-slate-900">Struktur Perusahaan</h2>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-50 text-teal-600 rounded-lg"><Building2 size={18} /></div>
                <span className="text-sm font-medium text-slate-700">Departemen</span>
              </div>
              <span className="text-2xl font-bold text-slate-900">{departmentsCount}</span>
            </div>
            <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-50 text-teal-600 rounded-lg"><Briefcase size={18} /></div>
                <span className="text-sm font-medium text-slate-700">Posisi Jabatan</span>
              </div>
              <span className="text-2xl font-bold text-slate-900">{positionsCount}</span>
            </div>
            <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-50 text-teal-600 rounded-lg"><TrendingUp size={18} /></div>
                <span className="text-sm font-medium text-slate-700">Tingkat Aktif</span>
              </div>
              <span className="text-2xl font-bold text-teal-600">{activePercent}%</span>
            </div>
          </div>
        </div>

        {/* Gauge Chart Visual */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col items-center justify-center">
          <h2 className="font-bold text-slate-900 mb-4 self-start flex items-center gap-2">
            <TrendingUp size={18} className="text-teal-600" />
            Distribusi Status
          </h2>
          <div className="relative w-40 h-40 mb-4">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle cx="50" cy="50" r="38" fill="none" stroke="#f1f5f9" strokeWidth="14" />
              {/* Active */}
              <circle cx="50" cy="50" r="38" fill="none" stroke="#14b8a6" strokeWidth="14"
                strokeDasharray={`${(activeEmployees / (totalEmployees || 1)) * 239} 239`} strokeLinecap="round" />
              {/* Probation */}
              <circle cx="50" cy="50" r="38" fill="none" stroke="#f59e0b" strokeWidth="14"
                strokeDasharray={`${(probationEmployees / (totalEmployees || 1)) * 239} 239`}
                strokeDashoffset={`-${(activeEmployees / (totalEmployees || 1)) * 239}`} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center rotate-0">
              <span className="text-3xl font-bold text-slate-900">{totalEmployees}</span>
              <span className="text-xs text-slate-500">Karyawan</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-teal-500"></span><span className="text-slate-600">Aktif ({activeEmployees})</span></div>
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-400"></span><span className="text-slate-600">Probation ({probationEmployees})</span></div>
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-slate-200"></span><span className="text-slate-600">Nonaktif ({inactiveEmployees})</span></div>
          </div>
        </div>

        {/* Top Skills */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Briefcase size={18} className="text-teal-600" />
            Keahlian Terpopuler
          </h2>
          <div className="space-y-3">
            {skillStats.map((skill, index) => {
              const pct = totalEmployees > 0 ? Math.round((skill._count.employees / totalEmployees) * 100) : 0;
              return (
                <div key={skill.id}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-slate-700">{skill.name}</span>
                    <span className="text-xs text-slate-500">{skill._count.employees} orang</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: index === 0 ? '#14b8a6' : index === 1 ? '#0d9488' : index === 2 ? '#0f766e' : '#115e59',
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Employees */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-bold text-slate-900 text-lg">Karyawan Terbaru</h2>
          <Link
            href="/employees"
            className="text-sm text-teal-600 hover:text-teal-700 font-semibold flex items-center gap-1.5 transition-colors"
          >
            Lihat Semua <ArrowRight size={16} />
          </Link>
        </div>
        <div className="divide-y divide-slate-100">
          {recentEmployees.length === 0 ? (
            <p className="p-8 text-center text-slate-500 text-sm">Belum ada data karyawan.</p>
          ) : (
            recentEmployees.map((emp) => (
              <div key={emp.id} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-teal-50 text-teal-700 font-bold text-sm flex items-center justify-center shrink-0 border border-teal-100">
                  {emp.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 text-sm truncate">{emp.name}</p>
                  <p className="text-xs text-slate-500 truncate">{emp.position?.name} · {emp.position?.department?.name}</p>
                </div>
                <span className={`shrink-0 text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${
                  emp.status === 'active' ? 'bg-emerald-50 text-emerald-700' :
                  emp.status === 'inactive' ? 'bg-red-50 text-red-700' :
                  'bg-amber-50 text-amber-700'
                }`}>
                  {emp.status === 'active' ? 'Aktif' : emp.status === 'inactive' ? 'Nonaktif' : 'Probation'}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
