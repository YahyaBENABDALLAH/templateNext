"use client";

import * as React from "react";
import { I18nProvider } from "@/context/i18n.context";
import { ThemeProvider } from "@/context/theme.context";
import { ReactQueryProvider } from "@/context/react-query.context";
import type { SupportedLanguage } from "@/lib/i18n";

function AppProviders({
  children,
  initialLanguage,
}: {
  children: React.ReactNode;
  initialLanguage?: SupportedLanguage;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
    >
      <ReactQueryProvider>
        <I18nProvider initialLanguage={initialLanguage}>
          {children}
        </I18nProvider>
      </ReactQueryProvider>
    </ThemeProvider>
  );
}

export { AppProviders };
