"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { ROUTES } from "@/lib/routes";
import Link from "next/link";
import { Button } from "../ui/button";

export const ResponsivenessProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="w-screen flex-col gap-4 h-screen flex items-center justify-center">
        <p className="text-xl">Please use a larger device to use this app.</p>
        <Link href={ROUTES.index}>
          <Button>Go home</Button>
        </Link>
      </div>
    );
  }

  return children;
};
