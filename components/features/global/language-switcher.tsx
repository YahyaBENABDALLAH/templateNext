"use client";

import { Check, Languages } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  supportedLanguages,
  useI18n,
  type SupportedLanguage,
} from "@/context/i18n.context";
import { cn } from "@/lib/utils";

const languageLabelKey: Record<SupportedLanguage, string> = {
  en: "common.english",
  fr: "common.french",
  ar: "common.arabic",
};

type LanguageSwitcherProps = {
  className?: string;
};

function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { language, changeLanguage, t } = useI18n();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          aria-label={t("common.language")}
          className={cn(
            "flex items-center gap-1",
            className
          )}
        >
          <Languages className="size-4" />
          <span className="font-medium uppercase tracking-wide">
            {language}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-40">
        {supportedLanguages.map((lng) => (
          <DropdownMenuItem
            key={lng}
            className="flex items-center gap-2"
            onSelect={() => changeLanguage(lng)}
          >
            <span className="flex-1">{t(languageLabelKey[lng])}</span>
            {lng === language && <Check className="size-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { LanguageSwitcher };
