"use client";

import { Button } from "@/components/ui/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export function EmployeePagination({ currentPage, totalPages, totalItems }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `/employees?${params.toString()}`;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-slate-50/50">
      <div className="text-sm text-slate-500">
        Menampilkan halaman <span className="font-semibold text-slate-900">{currentPage}</span> dari <span className="font-semibold text-slate-900">{totalPages}</span> 
        {" "}(Total {totalItems} data)
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push(createPageURL(currentPage - 1))}
          disabled={currentPage <= 1}
        >
          <ChevronLeft size={16} className="mr-1" />
          Sebelumnya
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push(createPageURL(currentPage + 1))}
          disabled={currentPage >= totalPages}
        >
          Selanjutnya
          <ChevronRight size={16} className="ml-1" />
        </Button>
      </div>
    </div>
  );
}
