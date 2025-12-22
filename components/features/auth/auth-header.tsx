import Image from "next/image";

import { cn } from "@/lib/utils";

type AuthHeaderProps = {
  title: string;
  className?: string;
};

export function AuthHeader({ title, className }: AuthHeaderProps) {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center gap-2 text-center",
        className
      )}
    >
      <Image
        src="/assets/logobkam.svg"
        alt="Bank Al-Maghrib"
        width={64}
        height={64}
        className="h-16 w-16"
      />
      <h3 className="w-full font-semibold ">
        {title}
      </h3>
    </div>
  );
}
