import { DashboardOverview } from "@/features/dashboard/dashboard-overview";
import { Button } from "@/components/ui/button";
import { Download, Filter, Plus } from "lucide-react";
import { ReactNode } from "react";

export default function Page({
  children,
}: {
  children: ReactNode;
}) {

  return (
    <div className="px-4">
      <div className="flex justify-end gap-2">
        <Button variant="secondary" leftIcon={<Filter />}>
          Filtres avancés
        </Button>
        <Button leftIcon={<Download />} variant="secondary">
          Exporter
        </Button>
        <Button leftIcon={<Plus />}>Ajouter Véhicule</Button>
      </div>
      <DashboardOverview />
      {children}
    </div>
  );
}
