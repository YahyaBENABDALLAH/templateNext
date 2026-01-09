import { type ReactNode } from "react";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { LanguageSwitcher } from "@/features/global/language-switcher";
import { ThemeToggle } from "@/features/global/theme-toggle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { HeaderSearch } from "@/features/global/header-search";
import { Home } from "lucide-react";

export default function AuthenticatedLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SidebarProvider>
      <>
        <AppSidebar />
        <SidebarInset>
          <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center gap-2 border-b bg-background/80 px-4 backdrop-blur transition-[width,height] ease-linear supports-backdrop-filter:bg-background/60 group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex w-full items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <HeaderSearch />
              </div>
              <div className="flex items-center gap-2">
                <LanguageSwitcher />
                <ThemeToggle />
              </div>
            </div>
          </header>
          <div className="flex flex-1 flex-col ">
            <Breadcrumb className="m-4">
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                <Home className="size-4" />
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            {children}
          </div>
        </SidebarInset>
      </>
    </SidebarProvider>
  );
}
