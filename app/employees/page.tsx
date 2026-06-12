import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus, Users, UserCheck, Clock, UserX } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Prisma } from "@prisma/client";

// Import komponen karyawan
import EmployeeTable from "./components/EmployeeTable";
import { EmployeeSearchFilter } from "./components/EmployeeSearchFilter";
import { EmployeePagination } from "./components/EmployeePagination";

export const dynamic = "force-dynamic";

const ITEMS_PER_PAGE = 5;

export default async function EmployeesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;

  const search = typeof resolvedParams.search === "string" ? resolvedParams.search : undefined;
  const status = typeof resolvedParams.status === "string" ? resolvedParams.status : undefined;
  const page = typeof resolvedParams.page === "string" ? Number(resolvedParams.page) : 1;
  const currentPage = isNaN(page) || page < 1 ? 1 : page;
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;

  const whereCondition: Prisma.EmployeeWhereInput = {};
  if (search) {
    whereCondition.OR = [
      { name: { contains: search } },
      { email: { contains: search } },
    ];
  }
  if (status) {
    whereCondition.status = status;
  }

  const [employees, totalItems, totalEmployees, activeCount, probationCount, inactiveCount] =
    await Promise.all([
      prisma.employee.findMany({
        where: whereCondition,
        skip,
        take: ITEMS_PER_PAGE,
        include: {
          position: { include: { department: true } },
          skills: true,
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.employee.count({ where: whereCondition }),
      prisma.employee.count(),
      prisma.employee.count({ where: { status: "active" } }),
      prisma.employee.count({ where: { status: "probation" } }),
      prisma.employee.count({ where: { status: "inactive" } }),
    ]);

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Data Karyawan</h1>
          <p className="text-slate-500 text-sm mt-1">
            Total <span className="font-semibold text-slate-700">{totalEmployees}</span> karyawan terdaftar dalam sistem.
          </p>
        </div>
        <Link href="/employees/new">
          <Button className="gap-2 shadow-sm">
            <Plus size={18} />
            Tambah Karyawan
          </Button>
        </Link>
      </div>

      {/* Mini Stats Row */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="p-2 bg-teal-50 text-teal-600 rounded-lg shrink-0">
            <UserCheck size={18} />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900">{activeCount}</p>
            <p className="text-xs text-slate-500 font-medium">Aktif</p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="p-2 bg-teal-50 text-teal-600 rounded-lg shrink-0">
            <Clock size={18} />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900">{probationCount}</p>
            <p className="text-xs text-slate-500 font-medium">Probation</p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="p-2 bg-teal-50 text-teal-600 rounded-lg shrink-0">
            <UserX size={18} />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900">{inactiveCount}</p>
            <p className="text-xs text-slate-500 font-medium">Nonaktif</p>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Search & Filter Bar */}
        <div className="px-6 pt-5 pb-4 border-b border-slate-100">
          <EmployeeSearchFilter />
        </div>

        {/* Table */}
        <EmployeeTable employees={employees} />

        {/* Pagination */}
        <EmployeePagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
        />
      </div>
    </div>
  );
}
