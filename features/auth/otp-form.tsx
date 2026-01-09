"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useI18n } from "@/context/i18n.context";
import { cn } from "@/lib/utils";
import { AuthHeader } from "@/features/auth/auth-header";

type OTPFormProps = React.ComponentProps<"div"> & {
  email?: string;
};

export function OTPForm({
  className,
  email = "y.ait@bkam.ma",
  ...props
}: OTPFormProps) {
  const { t } = useI18n();
  const router = useRouter();
  const [code, setCode] = React.useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push("/login");
  };

  return (
    <div
      className={cn("flex flex-col items-center text-center", className)}
      {...props}
    >
      <AuthHeader title={t("otp.title")} />
      <div className="mt-4 space-y-2 text-muted-foreground">
        <p className="text-base">{t("otp.subtitle")}<span className=" font-semibold"> { email }</span></p>
        <p className="text-sm ">{t("otp.helper")}</p>
      </div>
      <form onSubmit={handleSubmit} className="mt-6 w-full">
        <div className="flex justify-center">
          <InputOTP
            id="otp"
            inputMode="numeric"
            maxLength={6}
            value={code}
            onChange={(value) => setCode(value)}
          >
            <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
              <InputOTPSlot className="h-8 w-8 md:h-15 md:w-15" index={0} />
              <InputOTPSlot className="h-8 w-8 md:h-15 md:w-15" index={1} />
              <InputOTPSlot className="h-8 w-8 md:h-15 md:w-15" index={2} />
              <InputOTPSeparator color="gray" className="hidden md:block" />
              <InputOTPSlot className="h-8 w-8 md:h-15 md:w-15" index={3} />
              <InputOTPSlot className="h-8 w-8 md:h-15 md:w-15" index={4} />
              <InputOTPSlot className="h-8 w-8 md:h-15 md:w-15" index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Button
          type="submit"
          className="mt-6 w-full justify-center font-semibold"
        >
          {t("otp.submit")}
        </Button>
        <div className="mt-6 text-muted-foreground">
          <p className="text-sm">{t("otp.resendQuestion")}</p>
          <Button variant="link" size="sm" className="h-auto text-brand-solid-hover">
            {t("otp.resendAction")}
          </Button>
        </div>

        <Button
          asChild
          variant="muted"
          className="mb-5 mt-6 flex items-center justify-center text-sm text-tertiary font-semibold"
        >
          <Link href="/login" className="gap-2 text-secondary-solid inline-flex">
            <ArrowLeft className="h-4 w-4 text-muted-foreground" />
            {t("otp.back")}
          </Link>
        </Button>
      </form>
    </div>
  );
}
