"use client";
import { OTPForm } from "@/features/auth/otp-form";

export default function OTPPage() {
  return (
    <div className="flex flex-1">
      <div className="flex flex-1 w-full items-center justify-center px-1 md:px-10">
        <div className="relative z-10 w-full max-w-[360px]">
          <OTPForm />
        </div>
      </div>
    </div>
  );
}
