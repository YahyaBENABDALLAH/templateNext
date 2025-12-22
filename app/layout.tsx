import type { Metadata } from "next";
import "../styles/globals.css";
import { AppFooter } from "@/components/layout/app-footer";
import { AppProviders } from "./providers";
import { defaultLanguage, getDirection } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "BKAM Fleet Management",
  description: "BKAM Fleet Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialLanguage = defaultLanguage;
  const initialDirection = getDirection(initialLanguage);

  return (
    <html lang={initialLanguage} dir={initialDirection}>
      <body
        className={`antialiased flex min-h-svh flex-col`}
      >
        <AppProviders initialLanguage={initialLanguage}>
          <main className="flex flex-1">{children}</main>
          <AppFooter />
        </AppProviders>
      </body>
    </html>
  );
}
