import prisma from "@/lib/prisma";
import EmployeeForm from "../components/EmployeeForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function NewEmployeePage() {
  const departments = await prisma.department.findMany({
    include: { positions: true }
  });
  
  const skills = await prisma.skill.findMany();

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <Link href="/employees" className="inline-flex items-center gap-2 text-sm text-teal-600 hover:text-teal-700 font-medium mb-4">
          <ArrowLeft size={16} />
          Kembali ke Data Karyawan
        </Link>
        <h1 className="text-2xl font-bold text-slate-900">Tambah Karyawan Baru</h1>
        <p className="text-slate-500 text-sm mt-1">Masukkan informasi detail karyawan baru.</p>
      </div>

      <EmployeeForm departments={departments} skills={skills} />
    </div>
  );
}
