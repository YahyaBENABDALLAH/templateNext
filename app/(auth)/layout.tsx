import type { Metadata } from "next";
import { LanguageSwitcher } from "@/features/global/language-switcher";
import { ThemeToggle } from "@/features/global/theme-toggle";
export const metadata: Metadata = {
  title: "BKAM Fleet Management",
  description: "BKAM Fleet Management",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex flex-1">
      <div className="relative flex flex-1 w-full items-center justify-center px-6 md:px-10">
        <div className="absolute end-4 top-4 z-20 flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
        <div
          aria-hidden
          className="absolute inset-0 h-[35%] w-full bg-[url('/assets/loginbg.png')] bg-center bg-no-repeat"
        />
        {children}
      </div>
    </div>
  );
}
