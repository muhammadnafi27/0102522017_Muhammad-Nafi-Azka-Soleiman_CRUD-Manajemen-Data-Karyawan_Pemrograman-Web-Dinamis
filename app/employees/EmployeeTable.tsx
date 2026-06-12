import Link from "next/link";
import { Pencil } from "lucide-react";
import DeleteButton from "./DeleteButton";
import { Prisma } from "@prisma/client";

// Define the type based on the query we'll run
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
              <th className="px-6 py-4 font-semibold">Nama & Email</th>
              <th className="px-6 py-4 font-semibold">Posisi</th>
              <th className="px-6 py-4 font-semibold">Departemen</th>
              <th className="px-6 py-4 font-semibold">Keahlian</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {employees.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                  Belum ada data karyawan.
                </td>
              </tr>
            ) : (
              employees.map((employee) => (
                <tr key={employee.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{employee.name}</div>
                    <div className="text-slate-500 text-xs mt-0.5">{employee.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    {employee.position?.name || "-"}
                  </td>
                  <td className="px-6 py-4">
                    {employee.position?.department?.name || "-"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {employee.skills.length > 0 ? (
                        employee.skills.map(skill => (
                          <span key={skill.id} className="bg-teal-50 text-teal-700 text-[10px] px-2 py-1 rounded-md font-medium border border-teal-100">
                            {skill.name}
                          </span>
                        ))
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      employee.status === 'active' ? 'bg-green-100 text-green-700' : 
                      employee.status === 'inactive' ? 'bg-red-100 text-red-700' : 
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {employee.status === 'active' ? 'Aktif' : 
                       employee.status === 'inactive' ? 'Nonaktif' : 'Probation'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link 
                        href={`/employees/${employee.id}/edit`}
                        className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                        title="Edit"
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
