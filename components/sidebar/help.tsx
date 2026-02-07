"use client";

import { useHelpSidebar } from "@/hooks/use-help-sidebar";
import { EXCEPTIONS_HELP, RECON_HELP } from "@/lib/content/help";
import { HelpSidebarKeys } from "@/lib/enums";
import { ROUTES } from "@/lib/routes";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import Balancer from "react-wrap-balancer";
import { Button } from "../ui/button";

export default function HelpSidebar() {
  const pathname = usePathname();
  const { hide, isOpen } = useHelpSidebar();

  function getHelpData() {
    if (pathname === ROUTES.reconciliation) return RECON_HELP;
    if (pathname === ROUTES.exceptions) return EXCEPTIONS_HELP;
    return [];
  }

  const helpData = getHelpData();

  if (helpData.length < 1 || !isOpen(HelpSidebarKeys.RECON)) return null;

  return (
    <motion.div
      className="hidden bg-white w-125 border-l md:flex flex-col justify-between"
      initial={{
        x: 100,
        opacity: 0,
      }}
      animate={{
        x: 0,
        opacity: 1,
      }}
      transition={{
        type: "tween",
      }}
    >
      <div>
        <div className="border-b p-7 py-4">
          <h3 className="font-medium!">How it works</h3>
        </div>
        <div className="p-7">
          <ul className="space-y-5">
            {helpData.map((a) => (
              <li key={a.title} className="flex items-start gap-3">
                <div>
                  <a.icon size={22} className="text-primary" />
                </div>
                <div className="relative -top-1 text-sm">
                  <h4 className="capitalize">{a.title.toLowerCase()}</h4>
                  <p>
                    <Balancer>{a.description}</Balancer>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t p-7 py-4">
        <Button
          variant="secondary"
          onClick={() => hide(HelpSidebarKeys.RECON)}
          className="w-full"
        >
          Hide
        </Button>
      </div>
    </motion.div>
  );
}
