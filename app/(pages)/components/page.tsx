import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  ArrowRight,
  Ban,
  Bike,
  Bus,
  CarFront,
  LayoutGrid,
  MailCheck,
  Package,
  Shield,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  StopCircle,
  Truck,
  Users2,
} from "lucide-react";

const ComponentsPage = () => {
  const badgeModes = [
    { label: "Achat", variant: "brand" as const },
    { label: "LLD", variant: "info" as const },
    { label: "Prestation", variant: "danger" as const },
  ];

  const badgeGammes = [
    { label: "VIP", icon: Sparkles },
    { label: "Convoi de fonds", icon: Shield },
    { label: "Vélo-moteur", icon: Bike },
    { label: "Berline", icon: CarFront },
    { label: "Utilitaire", icon: Package },
    { label: "Estafette", icon: Truck },
    { label: "Transport collectif", icon: Users2 },
    { label: "Autocar", icon: Bus },
  ];

  const badgeStatuses = [
    { label: "En service", variant: "success" as const },
    { label: "En maintenance", variant: "warning" as const },
    { label: "Immobilisé", variant: "danger" as const },
    { label: "En réserve", variant: "info" as const },
    { label: "En mission", variant: "brand" as const },
    { label: "Restitué", variant: "neutral" as const },
    { label: "Réformé", variant: "neutral" as const },
  ];

  return (
    <main className="min-h-screen bg-background  ">
      <div className="mx-auto flex  flex-col gap-10 p-4">
        <section className="rounded border bg-card/80 p-8 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h1 className="text-3xl font-semibold leading-tight">Buttons</h1>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <Button
              variant="primary"
              leftIcon={<Sparkles className="size-4" />}
            >
              Primary action
            </Button>
            <Button
              variant="secondary"
              leftIcon={<LayoutGrid className="size-4" />}
            >
              Secondary action
            </Button>
            <Button
              variant="muted"
              leftIcon={<SlidersHorizontal className="size-4" />}
            >
              Muted filter
            </Button>
            <Button
              variant="success"
              leftIcon={<ShieldCheck className="size-4" />}
            >
              Success
            </Button>
            <Button
              variant="warning"
              leftIcon={<AlertTriangle className="size-4" />}
            >
              Warning
            </Button>
            <Button
              variant="danger"
              leftIcon={<StopCircle className="size-4" />}
            >
              Danger
            </Button>
            <Button
              variant="outline"
              leftIcon={<StopCircle className="size-4" />}
            >
              Outline
            </Button>
            <Button variant="disabled" leftIcon={<Ban className="size-4" />}>
              Disabled variant
            </Button>
            <Button
              variant="primary"
              disabled
              leftIcon={<MailCheck className="size-4" />}
            >
              Disabled state
            </Button>
            <Button
              variant="link"
              rightIcon={<ArrowRight className="size-4" />}
            >
              Inline link
            </Button>
          </div>
          <div className="">
            <Button variant="success" size="icon">
              <SlidersHorizontal className="size-4" />
            </Button>
          </div>
        </section>
        <section className="mt-10 grid grid-cols-1 gap-10 rounded border bg-card/80 p-8 shadow-sm md:grid-cols-2 md:items-start">
          <div className="  space-y-4">
            <p className="text-sm font-medium text-muted-foreground">
              Typography scale
            </p>
            <div className="space-y-3">
              <div className="space-y-1">
                <h1>H1 / Display</h1>
                <p className="text-sm text-muted-foreground">
                  Base: display-md · Up-size on lg if needed
                </p>
              </div>
              <div className="space-y-1">
                <h2>H2 / Display Medium</h2>
                <p className="text-sm text-muted-foreground">
                  Base: display-sm · Up-size on lg if needed
                </p>
              </div>
              <div className="space-y-1">
                <h3>H3 / Display Small</h3>
                <p className="text-sm text-muted-foreground">
                  Base: display-xs · Up-size on md+
                </p>
              </div>
              <div className="space-y-1">
                <h4>H4 / Title</h4>
                <p className="text-sm text-muted-foreground">
                  Base: text-xl · Up-size on md+
                </p>
              </div>
              <div className="space-y-1">
                <p className="font-semibold">H5 / Section heading</p>
                <p className="text-sm text-muted-foreground">
                  Base: text-lg · Stable after md
                </p>
              </div>
              <div className="space-y-1">
                <p className="font-semibold">H6 / Eyebrow</p>
                <p className="text-sm text-muted-foreground">
                  Base: text-base · Tight leading
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-base leading-[var(--line-height-base)]">
                  Body / default paragraph
                </p>
                <p className="text-sm text-muted-foreground">
                  Base: text-base · Optional md:text-lg
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-sm  ">Body small · supportive</p>
                <span className="text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground">
                  Label
                </span>
                <span className="text-xs text-muted-foreground">Caption</span>
                <span className="font-mono text-sm text-muted-foreground">
                  Mono
                </span>
              </div>
            </div>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <h2 className="text-3xl font-semibold leading-tight">Badges</h2>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  Badge_Modes
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {badgeModes.map((badge) => (
                    <Badge key={badge.label} variant={badge.variant} size="sm">
                      {badge.label}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  Badge_Gammes
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {badgeGammes.map((badge) => {
                    const Icon = badge.icon;
                    return (
                      <Badge
                        key={badge.label}
                        variant="neutral"
                        size="sm"
                        leftIcon={
                          <Icon className="size-3" aria-hidden="true" />
                        }
                      >
                        {badge.label}
                      </Badge>
                    );
                  })}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  Badge_Statuts
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {badgeStatuses.map((badge) => (
                    <Badge key={badge.label} variant={badge.variant} size="sm">
                      {badge.label}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
 
      </div>
    </main>
  );
};

export default ComponentsPage;
