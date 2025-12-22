import type { Metadata } from "next";
import "../styles/globals.css";
import { AppFooter } from "@/components/layout/app-footer";
import { AppProviders } from "./providers";

export const metadata: Metadata = {
  title: "BKAM Fleet Management",
  description: "BKAM Fleet Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body
        className={`antialiased flex min-h-svh flex-col`}
      >
        <AppProviders>
          <main className="flex flex-1">{children}</main>
          <AppFooter />
        </AppProviders>
      </body>
    </html>
  );
}
