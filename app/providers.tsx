"use client";

import * as React from "react";
import { I18nProvider } from "@/context/i18n.context";
import { ThemeProvider } from "@/context/theme.context";
import { ReactQueryProvider } from "@/context/react-query.context";

function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
    >
      <ReactQueryProvider>
        <I18nProvider>
          {children}
        </I18nProvider>
      </ReactQueryProvider>
    </ThemeProvider>
  );
}

export { AppProviders };
