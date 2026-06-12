import { Badge } from "@/components/ui/Badge";

export function StatusBadge({ status }: { status: string }) {
  const isAct = status === "active";
  const isInc = status === "inactive";
  
  return (
    <Badge 
      variant={isAct ? 'success' : isInc ? 'danger' : 'warning'} 
      className="uppercase tracking-wider text-xs px-3 py-1 font-bold shadow-sm"
    >
      {isAct ? 'Aktif' : isInc ? 'Nonaktif' : 'Probation'}
    </Badge>
  );
}
