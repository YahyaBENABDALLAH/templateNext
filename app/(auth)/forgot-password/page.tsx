"use client";

import { ForgotPasswordForm } from "@/components/features/auth/forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <div className="relative flex flex-1">
      <div className="relative flex flex-1 w-full items-center justify-center px-1 md:px-10">
        <div className="relative z-10 w-full max-w-[360px]">
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
}
