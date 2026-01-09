"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AuthHeader } from "@/features/auth/auth-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/context/i18n.context";
import { cn } from "@/lib/utils";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { t } = useI18n();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className={cn("", className)} {...props}>
      <AuthHeader title={t("forgot.title")} />
      <p className="mt-4 text-sm text-muted-foreground">{t("forgot.subtitle")}</p>
      <form onSubmit={handleSubmit} className="flex flex-col mt-6 space-y-5">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium  ">
            {t("forgot.emailLabel")}
          </label>
          <Input
            id="email"
            type="email"
            placeholder={t("forgot.emailPlaceholder")}
            required
          />
        </div>

        <Button type="submit" className="w-full justify-center">
          {t("forgot.submit")}
        </Button>

       <Button
          asChild
          variant="muted"
          className="mb-5 mt-6 flex items-center justify-center text-sm text-tertiary font-semibold"
        >
          <Link href="/login" className="gap-2 text-secondary-solid inline-flex">
            <ArrowLeft className="h-4 w-4 text-muted-foreground" />
            {t("forgot.back")}
          </Link>
        </Button>
      </form>
    </div>
  );
}
