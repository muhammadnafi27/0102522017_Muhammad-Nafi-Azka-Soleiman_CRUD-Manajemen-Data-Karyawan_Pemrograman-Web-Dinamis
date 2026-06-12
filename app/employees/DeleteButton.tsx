"use client";

import { Trash2 } from "lucide-react";
import { deleteEmployee } from "./actions";
import { useTransition } from "react";
import { Button } from "@/components/ui/Button";

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
    <Button 
      variant="ghost"
      size="icon"
      onClick={handleDelete}
      disabled={isPending}
      className="text-slate-400 hover:text-red-600 hover:bg-red-50"
      title="Hapus Data"
    >
      <Trash2 size={18} />
    </Button>
  );
}
