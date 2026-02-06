import { Sidebar } from "@/components/ui/sidebar";
import AppSidebarContent from "./sidebar/content";
import AppSidebarHeader from "./sidebar/header";
import { AppSidebarUser } from "./sidebar/user";

export function AppSidebar() {
  return (
    <Sidebar variant="floating" collapsible="icon">
      <AppSidebarHeader />
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
