"use client";

import { Trash2 } from "lucide-react";
import { deleteEmployee } from "./actions";
import { useTransition } from "react";

export default function DeleteButton({ id }: { id: number }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm("Apakah Anda yakin ingin menghapus data karyawan ini? Tindakan ini tidak dapat dibatalkan.")) {
      startTransition(async () => {
        try {
          await deleteEmployee(id);
        } catch (error) {
          alert("Gagal menghapus data.");
        }
      });
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isPending}
      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
      title="Hapus"
    >
      <Trash2 size={18} />
    </button>
  );
}
