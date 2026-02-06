"use client";

import { SIDEBAR_MENU } from "@/lib/routes";
import { Search } from "lucide-react";
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
          {SIDEBAR_MENU.main.map((project) => (
            <SidebarMenuItem key={project.label}>
              <SidebarMenuButton asChild>
                <a
                  href={project.url}
                  className={`text-[#626262] font-[450] ${open && "px-4"}`}
                >
                  <project.icon />
                  <span className="ml-1">{project.label}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </div>
      <SidebarMenu className="border-b pb-2">
        {SIDEBAR_MENU.secondaryNav.map((project) => (
          <SidebarMenuItem key={project.label}>
            <SidebarMenuButton asChild>
              <a
                href={project.url}
                className={`text-[#626262] font-[450] ${open && "px-4"}`}
              >
                <project.icon />
                <span className="ml-1">{project.label}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarContent>
  );
}
