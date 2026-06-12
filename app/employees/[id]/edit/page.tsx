import prisma from "@/lib/prisma";
import EmployeeForm from "../../components/EmployeeForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

// Next.js 15: `params` is async. We need to await it.
export default async function EditEmployeePage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const employeeId = Number(id);

  if (isNaN(employeeId)) {
    notFound();
  }

  const employee = await prisma.employee.findUnique({
    where: { id: employeeId },
    include: { skills: true }
  });

  if (!employee) {
    notFound();
  }

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
        <h1 className="text-2xl font-bold text-slate-900">Edit Data Karyawan</h1>
        <p className="text-slate-500 text-sm mt-1">Perbarui informasi detail karyawan.</p>
      </div>

      <EmployeeForm departments={departments} skills={skills} employee={employee} />
    </div>
  );
}
