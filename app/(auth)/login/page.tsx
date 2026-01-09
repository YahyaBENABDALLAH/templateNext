"use client";
import { LoginForm } from "@/features/auth/login-form";

export default function LoginPage() {
  return (
    <div className="relative flex flex-1">
      <div className="relative flex flex-1 w-full items-center justify-center px-1 md:px-10">
        <div className="relative z-10 w-full max-w-[360px]">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
