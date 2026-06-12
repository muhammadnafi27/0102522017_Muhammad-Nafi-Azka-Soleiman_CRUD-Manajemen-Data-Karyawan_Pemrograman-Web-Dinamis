import Link from "next/link";
import { Pencil, FolderOpen } from "lucide-react";
import DeleteButton from "./DeleteButton";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "./StatusBadge";

type EmployeeWithRelations = Prisma.EmployeeGetPayload<{
  include: {
    position: { include: { department: true } };
    skills: true;
  };
}>;

export default function EmployeeTable({
  employees,
}: {
  employees: EmployeeWithRelations[];
}) {
  if (employees.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-14 h-14 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mb-4">
          <FolderOpen size={28} />
        </div>
        <h3 className="text-base font-semibold text-slate-900 mb-1">Data Tidak Ditemukan</h3>
        <p className="text-slate-500 text-sm max-w-xs mb-6">
          Tidak ada karyawan yang sesuai kriteria pencarian atau sistem masih kosong.
        </p>
        <Link href="/employees/new">
          <Button size="sm">Tambah Karyawan Baru</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-base">
        <thead>
          <tr className="bg-slate-50 text-slate-700 text-sm font-bold uppercase tracking-wider border-b border-slate-200/80">
            <th className="px-6 py-4 font-bold">Karyawan</th>
            <th className="px-6 py-4 font-bold">Jabatan</th>
            <th className="px-6 py-4 font-bold">Keahlian</th>
            <th className="px-6 py-4 font-bold">Status</th>
            <th className="px-6 py-4 font-bold text-right">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {employees.map((employee) => (
            <tr
              key={employee.id}
              className="hover:bg-teal-50/10 transition-colors group"
            >
              <td className="px-6 py-5.5">
                <div className="flex items-center gap-4.5">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-slate-200 bg-slate-100 relative shrink-0 shadow-md">
                    {employee.photoPath ? (
                      <Image
                        src={employee.photoPath}
                        alt={employee.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-teal-600 font-bold bg-teal-50 text-xl">
                        {employee.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-lg font-bold text-slate-900 truncate group-hover:text-teal-700 transition-colors">
                      {employee.name}
                    </p>
                    <p className="text-slate-500 text-sm truncate mt-0.5">{employee.email}</p>
                    <p className="text-xs text-slate-400 mt-1">
                      {employee.gender === "male" ? "Laki-laki" : "Perempuan"}
                    </p>
                  </div>
                </div>
              </td>

              {/* Kolom: Jabatan & Departemen */}
              <td className="px-6 py-5.5">
                <p className="font-semibold text-slate-900 text-base">
                  {employee.position?.name || "-"}
                </p>
                <p className="text-slate-500 text-sm mt-1.5 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-teal-400 shrink-0 shadow-sm"></span>
                  {employee.position?.department?.name || "-"}
                </p>
              </td>

              {/* Kolom: Keahlian */}
              <td className="px-6 py-5.5">
                <div className="flex flex-wrap gap-1.5 max-w-[220px]">
                  {employee.skills.length > 0 ? (
                    employee.skills.map((skill) => (
                      <Badge
                        key={skill.id}
                        variant="teal"
                        className="text-xs px-2.5 py-1 font-bold shadow-sm"
                      >
                        {skill.name}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-slate-400 text-sm italic">-</span>
                  )}
                </div>
              </td>

              {/* Kolom: Status */}
              <td className="px-6 py-5.5">
                <StatusBadge status={employee.status} />
              </td>

              {/* Kolom: Aksi */}
              <td className="px-6 py-5.5 text-right">
                <div className="flex items-center justify-end gap-2">
                  <Link href={`/employees/${employee.id}/edit`}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-teal-600 hover:text-teal-700 bg-teal-50 hover:bg-teal-100 h-10 w-10 border border-teal-200/40 shadow-sm"
                      title="Edit"
                    >
                      <Pencil size={18} />
                    </Button>
                  </Link>
                  <DeleteButton id={employee.id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
