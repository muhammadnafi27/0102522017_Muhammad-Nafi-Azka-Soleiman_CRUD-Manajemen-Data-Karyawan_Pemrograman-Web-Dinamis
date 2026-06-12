import prisma from "@/lib/prisma";
import EmployeeTable from "./EmployeeTable";
import Link from "next/link";
import { Plus } from "lucide-react";

// In Next.js 15, we don't need to specify `export const dynamic = "force-dynamic"` 
// if we're not using headers()/cookies() and want to let it be statically optimized where possible,
// but since this fetches from DB, we might want dynamic rendering. 
// Or we can rely on Server Actions revalidating paths.
export const dynamic = "force-dynamic";

export default async function EmployeesPage() {
  const employees = await prisma.employee.findMany({
    include: {
      position: {
        include: {
          department: true
        }
      },
      skills: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Data Karyawan</h1>
          <p className="text-slate-500 text-sm mt-1">Kelola data karyawan, departemen, dan posisi.</p>
        </div>
        <Link 
          href="/employees/new" 
          className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-lg font-medium shadow-sm transition-colors"
        >
          <Plus size={18} />
          Tambah Karyawan
        </Link>
      </div>

      <EmployeeTable employees={employees} />
    </div>
  );
}
