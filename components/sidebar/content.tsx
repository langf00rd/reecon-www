"use client";

import { SIDEBAR_MENU } from "@/lib/routes";
import { Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Input } from "../ui/input";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "../ui/sidebar";

export default function AppSidebarContent() {
  const { open } = useSidebar();
  const pathname = usePathname();
  return (
    <SidebarContent className="px-2 justify-between">
      <div className="space-y-4">
        {!open && (
          <SidebarGroup className={`text-[#626262] font-[450] p-0 mt-6`}>
            <SidebarGroupContent>
              <SidebarTrigger />
            </SidebarGroupContent>
          </SidebarGroup>
        )}
        {open && (
          <SidebarGroup>
            <SidebarGroupContent>
              <Input
                prefixIcon={<Search size={14} />}
                placeholder="Search..."
              />
            </SidebarGroupContent>
          </SidebarGroup>
        )}
        <SidebarMenu>
          {SIDEBAR_MENU.main.map((a) => (
            <SidebarMenuItem key={a.label} className={`${open && "px-2"}`}>
              <SidebarMenuButton asChild tooltip={a.label}>
                <Link
                  href={!a.enabled ? "#" : a.url}
                  className={`text-[#626262] font-[450]  ${!a.enabled && "opacity-40 cursor-not-allowed"} ${pathname === a.url && "bg-background text-primary shadow border"}`}
                >
                  <a.icon />
                  <span className="ml-1">{a.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </div>
      <SidebarMenu className="border-b pb-2">
        {SIDEBAR_MENU.secondaryNav.map((a) => (
          <SidebarMenuItem key={a.label}>
            <SidebarMenuButton asChild tooltip={a.label}>
              <Link
                href={a.url}
                className={`text-[#626262] font-[450] ${open && "px-4"}`}
              >
                <a.icon />
                <span className="ml-1">{a.label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarContent>
  );
}
