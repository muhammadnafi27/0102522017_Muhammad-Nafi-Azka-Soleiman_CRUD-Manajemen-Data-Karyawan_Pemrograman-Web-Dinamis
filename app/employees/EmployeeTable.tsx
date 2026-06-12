import Link from "next/link";
import { Pencil } from "lucide-react";
import DeleteButton from "./DeleteButton";
import { Prisma } from "@prisma/client";
import Image from "next/image";

type EmployeeWithRelations = Prisma.EmployeeGetPayload<{
  include: {
    position: { include: { department: true } };
    skills: true;
  }
}>;

export default function EmployeeTable({ employees }: { employees: EmployeeWithRelations[] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-semibold">Profil</th>
              <th className="px-6 py-4 font-semibold">Informasi Dasar</th>
              <th className="px-6 py-4 font-semibold">Jabatan & Departemen</th>
              <th className="px-6 py-4 font-semibold">Keahlian</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {employees.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                  Belum ada data karyawan.
                </td>
              </tr>
            ) : (
              employees.map((employee) => (
                <tr key={employee.id} className="hover:bg-slate-50 transition-colors">
                  
                  {/* Profil (Foto) */}
                  <td className="px-6 py-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-200 bg-slate-100 relative shrink-0">
                      {employee.photoPath ? (
                        <Image 
                          src={employee.photoPath} 
                          alt={employee.name} 
                          fill 
                          className="object-cover" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400 font-medium text-xs">
                          {employee.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Informasi Dasar (Nama, Email, Gender) */}
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900">{employee.name}</div>
                    <div className="text-slate-500 text-xs mt-0.5 mb-1">{employee.email}</div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">
                      {employee.gender === 'male' ? 'Laki-laki' : 'Perempuan'}
                    </span>
                  </td>

                  {/* Jabatan & Departemen */}
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-800">{employee.position?.name || "-"}</div>
                    <div className="text-slate-500 text-xs mt-0.5">
                      {employee.position?.department?.name || "-"}
                    </div>
                  </td>

                  {/* Keahlian (Skills as badges) */}
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1 max-w-[200px]">
                      {employee.skills.length > 0 ? (
                        employee.skills.map(skill => (
                          <span key={skill.id} className="bg-teal-50 text-teal-700 text-[10px] px-2 py-1 rounded-md font-medium border border-teal-100">
                            {skill.name}
                          </span>
                        ))
                      ) : (
                        <span className="text-slate-400 text-xs italic">Belum ada skill</span>
                      )}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide ${
                      employee.status === 'active' ? 'bg-green-100 text-green-700' : 
                      employee.status === 'inactive' ? 'bg-red-100 text-red-700' : 
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {employee.status === 'active' ? 'Aktif' : 
                       employee.status === 'inactive' ? 'Nonaktif' : 'Probation'}
                    </span>
                  </td>

                  {/* Aksi */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link 
                        href={`/employees/${employee.id}/edit`}
                        className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                        title="Edit Data"
                      >
                        <Pencil size={18} />
                      </Link>
                      <DeleteButton id={employee.id} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
