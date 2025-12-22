import Image from "next/image";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useI18n } from "@/context/i18n.context";
import { AuthHeader } from "@/components/features/auth/auth-header";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { t } = useI18n();
  return (
    <div className={cn("", className)} {...props}>
      <AuthHeader title={t("common.brand")} />
      <form className="mt-8 space-y-5">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium  ">
            {t("auth.emailLabel")}
          </label>
          <Input
            id="email"
            type="email"
            placeholder={t("auth.emailPlaceholder")}
            className=""
            required
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="text-sm font-medium text-[#3c3c3c]"
          >
            {t("auth.passwordLabel")}
          </label>
          <Input
            id="password"
            type="password"
            placeholder={t("auth.passwordPlaceholder")}
            className=""
            required
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-foreground">
            <input
              type="checkbox"
              className=" "
            />
            {t("auth.rememberMe")}
          </label>
          <Button
          asChild
            variant="link"
            className="font-semibold underline-offset-4 hover:underline"
          >
            <Link href="/forgot-password">{t("auth.forgotPassword")}</Link>
          </Button>
        </div>

        <Button type="submit" className="w-full justify-center">
          {t("auth.submit")}
        </Button>
        <Button
          variant="outline"
          className="w-full justify-center"
          leftIcon={
            <Image
              src="/assets/azuread.svg"
              alt="Azure AD"
              width={20}
              height={20}
            />
          }
        >
          {t("auth.signInWithAzure")}
        </Button>
      </form>
      <div className="mt-8 flex items-start gap-2 text-muted-foreground">
        <AlertTriangle className="size-4" />
        <p className="text-xs text-center">
          {t("auth.securityNotice")}
        </p>
      </div>
    </div>
  );
}
