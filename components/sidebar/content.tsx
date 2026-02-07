"use client";

import { SIDEBAR_MENU } from "@/lib/routes";
import { ChevronRight, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Input } from "../ui/input";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
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
          {SIDEBAR_MENU.main.map((a) =>
            a.children ? (
              <Collapsible key={a.label} className="group/collapsible">
                <SidebarMenuItem className={`${open && "px-2"}`}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton asChild tooltip={a.label}>
                      <Link
                        href={!a.enabled ? "#" : a.url}
                        className={`text-[#626262] font-[450]  ${!a.enabled && "opacity-40 cursor-not-allowed"} ${pathname === a.url && "bg-background text-primary shadow border"}`}
                      >
                        <a.icon />
                        <span className="ml-1">{a.label}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </Link>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {a.children?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.label}>
                          <SidebarMenuSubButton asChild>
                            <Link href={subItem.url}>
                              <subItem.icon />
                              <span>{subItem.label}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ) : (
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
            ),
          )}
        </SidebarMenu>
      </div>
      <SidebarMenu className="border-b pb-2">
        {SIDEBAR_MENU.secondary.map((a) => (
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
