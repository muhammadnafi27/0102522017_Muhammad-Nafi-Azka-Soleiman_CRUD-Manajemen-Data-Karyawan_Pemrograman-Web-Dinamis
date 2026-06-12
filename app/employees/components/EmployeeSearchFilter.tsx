"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useEffect } from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Search } from "lucide-react";

export function EmployeeSearchFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [statusFilter, setStatusFilter] = useState(searchParams.get("status") || "");

  // Menggunakan debounce untuk search agar tidak re-render setiap ketikan
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      createQueryString(searchTerm, statusFilter);
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, statusFilter]);

  const createQueryString = useCallback(
    (search: string, status: string) => {
      const params = new URLSearchParams(searchParams.toString());
      
      // Kembalikan ke halaman 1 setiap ada perubahan filter/search
      params.set("page", "1");

      if (search) {
        params.set("search", search);
      } else {
        params.delete("search");
      }

      if (status) {
        params.set("status", status);
      } else {
        params.delete("status");
      }

      router.push(`/employees?${params.toString()}`);
    },
    [searchParams, router]
  );

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-teal-600">
          <Search size={18} />
        </div>
        <Input 
          type="text" 
          placeholder="Cari berdasarkan nama atau email..." 
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="w-full sm:w-48">
        <Select 
          value={statusFilter} 
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Semua Status</option>
          <option value="active">Aktif</option>
          <option value="probation">Probation</option>
          <option value="inactive">Nonaktif</option>
        </Select>
      </div>
    </div>
  );
}
