"use client";

import { Trash2 } from "lucide-react";
import { deleteEmployeeAction } from "../actions";
import { useTransition } from "react";
import { Button } from "@/components/ui/Button";

export default function DeleteButton({ id }: { id: number }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (
      confirm(
        "Apakah Anda yakin ingin menghapus data karyawan ini? Tindakan ini tidak dapat dibatalkan."
      )
    ) {
      startTransition(async () => {
        try {
          await deleteEmployeeAction(id);
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
      className="text-teal-600 hover:text-teal-700 bg-teal-50 hover:bg-teal-100 h-10 w-10 border border-teal-200/40 shadow-sm"
      title="Hapus Data"
    >
      <Trash2 size={18} />
    </Button>
  );
}
