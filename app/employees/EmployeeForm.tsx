"use client";

import { useState } from "react";
import { createEmployee, updateEmployee } from "./actions";
import Link from "next/link";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { UploadCloud, AlertCircle } from "lucide-react";

type DepartmentWithPositions = Prisma.DepartmentGetPayload<{
  include: { positions: true }
}>;

type EmployeeWithSkills = Prisma.EmployeeGetPayload<{
  include: { skills: true }
}>;

export default function EmployeeForm({
  departments,
  skills,
  employee
}: {
  departments: DepartmentWithPositions[];
  skills: { id: number; name: string }[];
  employee?: EmployeeWithSkills | null;
}) {
  const isEditing = !!employee;
  const [selectedDeptId, setSelectedDeptId] = useState<number | "">(
    employee ? departments.find(d => d.positions.some(p => p.id === employee.positionId))?.id || "" : ""
  );
  
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const availablePositions = departments.find(d => d.id === Number(selectedDeptId))?.positions || [];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    setErrorMsg(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Client-side File Validation
    const file = formData.get("photo") as File | null;
    if (file && file.size > 0) {
      if (file.size > 2 * 1024 * 1024) {
        setErrorMsg("Ukuran foto tidak boleh lebih dari 2MB.");
        setIsPending(false);
        return;
      }
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!allowedTypes.includes(file.type)) {
        setErrorMsg("Format file harus JPG, PNG, atau WEBP.");
        setIsPending(false);
        return;
      }
    }

    try {
      if (isEditing) {
        await updateEmployee(employee.id, formData);
      } else {
        await createEmployee(formData);
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Terjadi kesalahan sistem.");
      setIsPending(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden max-w-4xl mx-auto">
      {errorMsg && (
        <div className="bg-red-50 text-red-700 p-4 border-b border-red-100 text-sm font-medium flex items-center gap-3">
          <AlertCircle size={18} />
          <span>{errorMsg}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="p-8 space-y-8">
        
        {/* Photo Upload Area */}
        <div className="bg-slate-50/50 rounded-xl p-6 border border-slate-200 border-dashed flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md bg-slate-100 relative shrink-0">
            {employee?.photoPath ? (
              <Image src={employee.photoPath} alt={employee.name} fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                <UploadCloud size={28} className="mb-1 text-slate-300" />
              </div>
            )}
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-slate-900">Foto Profil (Opsional)</h3>
            <p className="text-xs text-slate-500 mb-3">Format JPG, PNG, atau WEBP. Maksimal ukuran 2MB.</p>
            <input 
              type="file" 
              name="photo" 
              accept="image/jpeg,image/png,image/webp"
              className="block w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 cursor-pointer transition-colors focus:outline-none"
            />
          </div>
        </div>

        {/* Section: Informasi Dasar */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">Informasi Dasar</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-slate-700">Nama Lengkap <span className="text-red-500">*</span></label>
              <Input 
                type="text" 
                id="name" 
                name="name" 
                defaultValue={employee?.name}
                required
                placeholder="Misal: Budi Santoso"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-slate-700">Alamat Email <span className="text-red-500">*</span></label>
              <Input 
                type="email" 
                id="email" 
                name="email" 
                defaultValue={employee?.email}
                required
                placeholder="budi.santoso@perusahaan.com"
              />
            </div>
            
            <div className="space-y-3">
              <label className="text-sm font-medium text-slate-700">Jenis Kelamin <span className="text-red-500">*</span></label>
              <div className="flex items-center gap-6 p-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="radio" 
                    name="gender" 
                    value="male" 
                    defaultChecked={employee?.gender === "male" || !employee}
                    className="w-4 h-4 text-teal-600 border-slate-300 focus:ring-teal-500 transition-colors" 
                  />
                  <span className="text-sm text-slate-700 group-hover:text-slate-900 font-medium">Laki-laki</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="radio" 
                    name="gender" 
                    value="female" 
                    defaultChecked={employee?.gender === "female"}
                    className="w-4 h-4 text-teal-600 border-slate-300 focus:ring-teal-500 transition-colors" 
                  />
                  <span className="text-sm text-slate-700 group-hover:text-slate-900 font-medium">Perempuan</span>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="status" className="text-sm font-medium text-slate-700">Status Karyawan <span className="text-red-500">*</span></label>
              <Select id="status" name="status" defaultValue={employee?.status || "active"}>
                <option value="active">Aktif</option>
                <option value="probation">Masa Percobaan (Probation)</option>
                <option value="inactive">Nonaktif</option>
              </Select>
            </div>
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* Section: Pekerjaan */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">Jabatan & Penempatan</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="departmentId" className="text-sm font-medium text-slate-700">Departemen <span className="text-red-500">*</span></label>
              <Select 
                id="departmentId" 
                value={selectedDeptId}
                onChange={(e) => setSelectedDeptId(Number(e.target.value))}
                required
              >
                <option value="" disabled>Pilih Departemen</option>
                {departments.map(dept => (
                  <option key={dept.id} value={dept.id}>{dept.name}</option>
                ))}
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="positionId" className="text-sm font-medium text-slate-700">Posisi Jabatan <span className="text-red-500">*</span></label>
              <Select 
                id="positionId" 
                name="positionId" 
                defaultValue={employee?.positionId || ""}
                required
                disabled={!selectedDeptId}
              >
                <option value="" disabled>Pilih Jabatan</option>
                {availablePositions.map(pos => (
                  <option key={pos.id} value={pos.id}>{pos.name}</option>
                ))}
              </Select>
            </div>
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* Section: Keahlian */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">Keahlian (Skills)</h3>
          <div className="flex flex-wrap gap-3">
            {skills.map(skill => {
              const isChecked = employee?.skills.some(s => s.id === skill.id);
              return (
                <label 
                  key={skill.id} 
                  className="flex items-center gap-2.5 cursor-pointer bg-white border border-slate-200 px-4 py-2.5 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all has-[:checked]:bg-teal-50 has-[:checked]:border-teal-300 shadow-sm"
                >
                  <input 
                    type="checkbox" 
                    name="skills" 
                    value={skill.id} 
                    defaultChecked={isChecked}
                    className="w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500" 
                  />
                  <span className="text-sm font-semibold text-slate-700">{skill.name}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-8 border-t border-slate-200 flex items-center justify-end gap-4 mt-8">
          <Link href="/employees">
            <Button type="button" variant="outline">Batal</Button>
          </Link>
          <Button type="submit" isLoading={isPending}>
            {isEditing ? "Simpan Perubahan" : "Simpan Karyawan Baru"}
          </Button>
        </div>

      </form>
    </div>
  );
}
