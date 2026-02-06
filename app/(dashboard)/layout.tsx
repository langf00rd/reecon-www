import { AppSidebar } from "@/components/app-sidebar";
import { ResponsivenessProvider } from "@/components/providers/responsiveness";
import HelpSidebar from "@/components/sidebar/help";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ResponsivenessProvider>
      <SidebarProvider>
        <AppSidebar />
        <Toaster />
        <main className="w-full overflow-y-scroll h-screen p-10">
          {children}
        </main>
        <HelpSidebar />
      </SidebarProvider>
    </ResponsivenessProvider>
  );
}
