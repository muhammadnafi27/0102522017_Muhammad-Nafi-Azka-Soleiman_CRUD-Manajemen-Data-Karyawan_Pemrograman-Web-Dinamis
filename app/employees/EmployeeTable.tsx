import Link from "next/link";
import { Pencil, FolderOpen } from "lucide-react";
import DeleteButton from "./DeleteButton";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

type EmployeeWithRelations = Prisma.EmployeeGetPayload<{
  include: {
    position: { include: { department: true } };
    skills: true;
  }
}>;

export default function EmployeeTable({ employees }: { employees: EmployeeWithRelations[] }) {
  if (employees.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-16 text-center">
        <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-4">
          <FolderOpen size={32} />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-1">Belum Ada Karyawan</h3>
        <p className="text-slate-500 max-w-sm mb-6">Mulai bangun tim Anda dengan menambahkan data karyawan pertama ke dalam sistem.</p>
        <Link href="/employees/new">
          <Button>Tambah Data Karyawan</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm whitespace-nowrap">
        <thead className="bg-white text-slate-500 border-b border-slate-200">
          <tr>
            <th className="px-6 py-4 font-semibold">Profil</th>
            <th className="px-6 py-4 font-semibold">Informasi Dasar</th>
            <th className="px-6 py-4 font-semibold">Jabatan & Dept.</th>
            <th className="px-6 py-4 font-semibold">Keahlian</th>
            <th className="px-6 py-4 font-semibold">Status</th>
            <th className="px-6 py-4 font-semibold text-right">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-slate-700">
          {employees.map((employee) => (
            <tr key={employee.id} className="hover:bg-slate-50/80 transition-colors group">
              
              {/* Profil (Foto) */}
              <td className="px-6 py-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm bg-slate-100 relative shrink-0">
                  {employee.photoPath ? (
                    <Image 
                      src={employee.photoPath} 
                      alt={employee.name} 
                      fill 
                      className="object-cover" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-teal-600 font-bold bg-teal-50 text-sm">
                      {employee.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
              </td>

              {/* Informasi Dasar */}
              <td className="px-6 py-4">
                <div className="font-semibold text-slate-900 group-hover:text-teal-700 transition-colors">{employee.name}</div>
                <div className="text-slate-500 text-xs mt-0.5 mb-1.5">{employee.email}</div>
                <Badge variant="outline" className="text-[10px] uppercase font-bold py-0">
                  {employee.gender === 'male' ? 'Laki-laki' : 'Perempuan'}
                </Badge>
              </td>

              {/* Jabatan & Departemen */}
              <td className="px-6 py-4">
                <div className="font-medium text-slate-800">{employee.position?.name || "-"}</div>
                <div className="text-slate-500 text-xs mt-0.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                  {employee.position?.department?.name || "-"}
                </div>
              </td>

              {/* Keahlian (Skills) */}
              <td className="px-6 py-4">
                <div className="flex flex-wrap gap-1.5 max-w-[220px]">
                  {employee.skills.length > 0 ? (
                    employee.skills.map(skill => (
                      <Badge key={skill.id} variant="teal" className="font-medium px-2 shadow-sm border-teal-100">
                        {skill.name}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-slate-400 text-xs italic">-</span>
                  )}
                </div>
              </td>

              {/* Status */}
              <td className="px-6 py-4">
                <Badge variant={
                  employee.status === 'active' ? 'success' : 
                  employee.status === 'inactive' ? 'danger' : 'warning'
                } className="uppercase tracking-wider text-[10px]">
                  {employee.status === 'active' ? 'Aktif' : 
                   employee.status === 'inactive' ? 'Nonaktif' : 'Probation'}
                </Badge>
              </td>

              {/* Aksi */}
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link href={`/employees/${employee.id}/edit`}>
                    <Button variant="ghost" size="icon" title="Edit Data" className="text-slate-400 hover:text-teal-600">
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
