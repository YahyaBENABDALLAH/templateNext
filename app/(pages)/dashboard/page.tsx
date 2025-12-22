import { DashboardOverview } from "@/components/features/dashboard/dashboard-overview";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./table/columns";
import { Button } from "@/components/ui/button";
import { Download, Filter, Plus, Search } from "lucide-react";
import { PaymentStatus } from "@/enums";
import { type Payment } from "@/types";

import {
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

export default function Page() {
  const data: Payment[] = [
    {
      id: "fbb5ea84",
      amount: 191,
      status: PaymentStatus.Failed,
      email: "user1@example.com",
    },
    {
      id: "ec6fe637",
      amount: 26,
      status: PaymentStatus.Failed,
      email: "user2@example.com",
    },
    {
      id: "40e43848",
      amount: 167,
      status: PaymentStatus.Refunded,
      email: "user3@example.com",
    },
    {
      id: "4c6b201a",
      amount: 352,
      status: PaymentStatus.Failed,
      email: "user4@example.com",
    },
    {
      id: "8c62d95a",
      amount: 137,
      status: PaymentStatus.Paid,
      email: "user5@example.com",
    },
    {
      id: "eb03b391",
      amount: 157,
      status: PaymentStatus.Paid,
      email: "user6@example.com",
    },
    {
      id: "1cc14f5e",
      amount: 272,
      status: PaymentStatus.Canceled,
      email: "user7@example.com",
    },
    {
      id: "2bc08eb5",
      amount: 259,
      status: PaymentStatus.Refunded,
      email: "user8@example.com",
    },
    {
      id: "465cc59b",
      amount: 166,
      status: PaymentStatus.Refunded,
      email: "user9@example.com",
    },
    {
      id: "7d28f15c",
      amount: 122,
      status: PaymentStatus.Paid,
      email: "user10@example.com",
    },
    {
      id: "b3e47396",
      amount: 39,
      status: PaymentStatus.Pending,
      email: "user11@example.com",
    },
    {
      id: "3e7d41db",
      amount: 52,
      status: PaymentStatus.Refunded,
      email: "user12@example.com",
    },
    {
      id: "760b2911",
      amount: 498,
      status: PaymentStatus.Paid,
      email: "user13@example.com",
    },
    {
      id: "84ee3087",
      amount: 260,
      status: PaymentStatus.Canceled,
      email: "user14@example.com",
    },
    {
      id: "0278d9e1",
      amount: 230,
      status: PaymentStatus.Paid,
      email: "user15@example.com",
    },
    {
      id: "16b839a6",
      amount: 490,
      status: PaymentStatus.Pending,
      email: "user16@example.com",
    },
    {
      id: "71d00167",
      amount: 291,
      status: PaymentStatus.Canceled,
      email: "user17@example.com",
    },
    {
      id: "f5f923fd",
      amount: 184,
      status: PaymentStatus.Canceled,
      email: "user18@example.com",
    },
    {
      id: "8c56af58",
      amount: 217,
      status: PaymentStatus.Refunded,
      email: "user19@example.com",
    },
    {
      id: "72c793be",
      amount: 81,
      status: PaymentStatus.Pending,
      email: "user20@example.com",
    },
    {
      id: "ca970428",
      amount: 460,
      status: PaymentStatus.Canceled,
      email: "user21@example.com",
    },
    {
      id: "3733f3e9",
      amount: 105,
      status: PaymentStatus.Refunded,
      email: "user22@example.com",
    },
    {
      id: "329f08b5",
      amount: 112,
      status: PaymentStatus.Refunded,
      email: "user23@example.com",
    },
    {
      id: "7663f9e9",
      amount: 316,
      status: PaymentStatus.Canceled,
      email: "user24@example.com",
    },
    {
      id: "2536cbe7",
      amount: 363,
      status: PaymentStatus.Pending,
      email: "user25@example.com",
    },
    {
      id: "fb2e0374",
      amount: 54,
      status: PaymentStatus.Canceled,
      email: "user26@example.com",
    },
    {
      id: "95443491",
      amount: 320,
      status: PaymentStatus.Pending,
      email: "user27@example.com",
    },
    {
      id: "f19a6fea",
      amount: 82,
      status: PaymentStatus.Canceled,
      email: "user28@example.com",
    },
    {
      id: "f177ade4",
      amount: 285,
      status: PaymentStatus.Pending,
      email: "user29@example.com",
    },
    {
      id: "d92bbb82",
      amount: 258,
      status: PaymentStatus.Canceled,
      email: "user30@example.com",
    },
    {
      id: "ceee8c45",
      amount: 159,
      status: PaymentStatus.Failed,
      email: "user31@example.com",
    },
    {
      id: "323ca370",
      amount: 115,
      status: PaymentStatus.Canceled,
      email: "user32@example.com",
    },
    {
      id: "64f5b87a",
      amount: 386,
      status: PaymentStatus.Failed,
      email: "user33@example.com",
    },
    {
      id: "7a09c83d",
      amount: 134,
      status: PaymentStatus.Pending,
      email: "user34@example.com",
    },
    {
      id: "e9e47cee",
      amount: 87,
      status: PaymentStatus.Paid,
      email: "user35@example.com",
    },
    {
      id: "0b52417c",
      amount: 417,
      status: PaymentStatus.Refunded,
      email: "user36@example.com",
    },
    {
      id: "0e5f1323",
      amount: 469,
      status: PaymentStatus.Failed,
      email: "user37@example.com",
    },
    {
      id: "fb034f78",
      amount: 56,
      status: PaymentStatus.Failed,
      email: "user38@example.com",
    },
    {
      id: "44e390bc",
      amount: 318,
      status: PaymentStatus.Refunded,
      email: "user39@example.com",
    },
    {
      id: "d4170e72",
      amount: 447,
      status: PaymentStatus.Paid,
      email: "user40@example.com",
    },
  ];

  return (
    <main className="p-4">
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
      <section className="mt-10 space-y-4">
        <div className="flex">
          <InputGroup>
            <InputGroupInput placeholder="Search..." />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" leftIcon={<Filter />}>
                Open
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  Profile
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Billing
                  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Settings
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Keyboard shortcuts
                  <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>Email</DropdownMenuItem>
                      <DropdownMenuItem>Message</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>More...</DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuItem>
                  New Team
                  <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>GitHub</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuItem disabled>API</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <DataTable columns={columns} data={data} />
      </section>
    </main>
  );
}
