import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Logo } from "./logo";
import AppSidebarContent from "./sidebar/content";
import { AppSidebarUser } from "./sidebar/user";

export function AppSidebar() {
  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent w-full justify-between data-[state=open]:text-sidebar-accent-foreground"
            >
              <Logo />
              <SidebarTrigger />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <AppSidebarContent />
      <AppSidebarUser
        user={{
          name: "Langford Quarshie",
          email: "langford@reconn.co",
          avatar: "",
        }}
      />
    </Sidebar>
  );
}
