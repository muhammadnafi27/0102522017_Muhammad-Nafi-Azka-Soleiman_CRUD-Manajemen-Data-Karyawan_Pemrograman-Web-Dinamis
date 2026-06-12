"use client";

import { useState } from "react";
import { createEmployee, updateEmployee } from "./actions";
import Link from "next/link";
import { Prisma } from "@prisma/client";
import Image from "next/image";

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
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden max-w-3xl">
      {errorMsg && (
        <div className="bg-red-50 text-red-600 p-4 border-b border-red-100 text-sm font-medium">
          {errorMsg}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        
        {/* Photo Upload */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-slate-700">Foto Profil (Opsional, Maks 2MB)</label>
          <div className="flex items-center gap-4">
            {employee?.photoPath ? (
              <div className="w-16 h-16 rounded-full overflow-hidden border border-slate-200 relative shrink-0">
                <Image src={employee.photoPath} alt={employee.name} fill className="object-cover" />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 text-slate-400">
                <span>Foto</span>
              </div>
            )}
            <input 
              type="file" 
              name="photo" 
              accept="image/jpeg,image/png,image/webp"
              className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-slate-700">Nama Lengkap <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              defaultValue={employee?.name}
              required
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow"
              placeholder="Masukkan nama lengkap"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-slate-700">Email <span className="text-red-500">*</span></label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              defaultValue={employee?.email}
              required
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow"
              placeholder="email@perusahaan.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Jenis Kelamin <span className="text-red-500">*</span></label>
            <div className="flex items-center gap-6 mt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="gender" 
                  value="male" 
                  defaultChecked={employee?.gender === "male" || !employee}
                  className="w-4 h-4 text-teal-600 focus:ring-teal-500" 
                />
                <span className="text-sm text-slate-700">Laki-laki</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="gender" 
                  value="female" 
                  defaultChecked={employee?.gender === "female"}
                  className="w-4 h-4 text-teal-600 focus:ring-teal-500" 
                />
                <span className="text-sm text-slate-700">Perempuan</span>
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="status" className="text-sm font-medium text-slate-700">Status Karyawan <span className="text-red-500">*</span></label>
            <select 
              id="status" 
              name="status" 
              defaultValue={employee?.status || "active"}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow bg-white"
            >
              <option value="active">Aktif</option>
              <option value="inactive">Nonaktif</option>
              <option value="probation">Probation</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="departmentId" className="text-sm font-medium text-slate-700">Departemen <span className="text-red-500">*</span></label>
            <select 
              id="departmentId" 
              value={selectedDeptId}
              onChange={(e) => setSelectedDeptId(Number(e.target.value))}
              required
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow bg-white"
            >
              <option value="" disabled>Pilih Departemen</option>
              {departments.map(dept => (
                <option key={dept.id} value={dept.id}>{dept.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="positionId" className="text-sm font-medium text-slate-700">Posisi <span className="text-red-500">*</span></label>
            <select 
              id="positionId" 
              name="positionId" 
              defaultValue={employee?.positionId || ""}
              required
              disabled={!selectedDeptId}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow bg-white disabled:bg-slate-100 disabled:text-slate-400"
            >
              <option value="" disabled>Pilih Posisi</option>
              {availablePositions.map(pos => (
                <option key={pos.id} value={pos.id}>{pos.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium text-slate-700">Keahlian (Skills)</label>
          <div className="flex flex-wrap gap-4">
            {skills.map(skill => {
              const isChecked = employee?.skills.some(s => s.id === skill.id);
              return (
                <label key={skill.id} className="flex items-center gap-2 cursor-pointer bg-slate-50 border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors">
                  <input 
                    type="checkbox" 
                    name="skills" 
                    value={skill.id} 
                    defaultChecked={isChecked}
                    className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500" 
                  />
                  <span className="text-sm font-medium text-slate-700">{skill.name}</span>
                </label>
              );
            })}
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200 flex items-center justify-end gap-3">
          <Link 
            href="/employees"
            className="px-6 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
          >
            Batal
          </Link>
          <button 
            type="submit"
            disabled={isPending}
            className="px-6 py-2.5 rounded-lg bg-teal-600 text-white font-medium hover:bg-teal-700 shadow-sm transition-colors disabled:opacity-50"
          >
            {isPending ? "Menyimpan..." : isEditing ? "Simpan Perubahan" : "Tambah Karyawan"}
          </button>
        </div>

      </form>
    </div>
  );
}
