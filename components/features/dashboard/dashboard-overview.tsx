import {
  Car,
  CheckCircle2,
  FileWarning,
  OctagonAlert,
  Wrench,
} from "lucide-react";
import { type DashboardItem } from "@/types";
import { StatCard } from "./stat-card";

const defaultItems: DashboardItem[] = [
  {
    id: "total",
    title: "Total",
    value: 350,
    subtitle: "Flotte complète",
    icon: Car,
    tone: "brand",
  },
  {
    id: "in-service",
    title: "En service",
    value: 109,
    subtitle: "Opérationnels",
    icon: CheckCircle2,
    tone: "success",
    highlighted: false,
  },
  {
    id: "maintenance",
    title: "En maintenance",
    value: 5,
    subtitle: "En cours",
    icon: Wrench,
    tone: "warning",
  },
  {
    id: "immobilized",
    title: "Immobilisés",
    value: 3,
    subtitle: "Hors service",
    icon: OctagonAlert,
    tone: "danger",
  },
  {
    id: "documents",
    title: "Alertes documents",
    value: 10,
    subtitle: "Action requise",
    icon: FileWarning,
    tone: "danger",
  },
];

type DashboardOverviewProps = {
  items?: DashboardItem[]
}

function DashboardOverview({ items = defaultItems }: DashboardOverviewProps) {
  return (
    <section className="">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mt-5">
        {items.map((item) => (
          <StatCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

export { DashboardOverview };
