import prisma from "@/lib/prisma";
import EmployeeTable from "./EmployeeTable";
import Link from "next/link";
import { Plus, Users, Building2, Briefcase } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatCard } from "@/components/shared/StatCard";
import { Button } from "@/components/ui/Button";

export const dynamic = "force-dynamic";

export default async function EmployeesPage() {
  const [employees, departmentsCount, positionsCount] = await Promise.all([
    prisma.employee.findMany({
      include: {
        position: {
          include: { department: true }
        },
        skills: true
      },
      orderBy: { createdAt: 'desc' }
    }),
    prisma.department.count(),
    prisma.position.count()
  ]);

  const activeEmployees = employees.filter(e => e.status === 'active').length;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <PageHeader 
        title="Dashboard Karyawan" 
        description="Kelola data karyawan, departemen, dan pantau metrik utama perusahaan Anda."
        action={
          <Link href="/employees/new">
            <Button className="gap-2">
              <Plus size={18} />
              <span>Tambah Karyawan</span>
            </Button>
          </Link>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total Karyawan" 
          value={employees.length} 
          icon={<Users size={24} />} 
          trend={{ value: `${activeEmployees} Aktif`, isPositive: true }}
        />
        <StatCard 
          title="Departemen" 
          value={departmentsCount} 
          icon={<Building2 size={24} />} 
        />
        <StatCard 
          title="Posisi Jabatan" 
          value={positionsCount} 
          icon={<Briefcase size={24} />} 
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200 bg-slate-50/50">
          <h2 className="text-lg font-semibold text-slate-900">Daftar Karyawan</h2>
        </div>
        <EmployeeTable employees={employees} />
      </div>
    </div>
  );
}
