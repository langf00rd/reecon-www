import { AppSidebar } from "@/components/app-sidebar";
import { AppProvider } from "@/components/providers/app";
import { ResponsivenessProvider } from "@/components/providers/responsiveness";
import HelpSidebar from "@/components/sidebar/help";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ResponsivenessProvider>
      <SidebarProvider>
        <TooltipProvider>
          <AppProvider>
            <AppSidebar />
            <Toaster />
            <main className="relative w-full overflow-y-scroll h-screen p-10">
              {children}
            </main>
            <HelpSidebar />
          </AppProvider>
        </TooltipProvider>
      </SidebarProvider>
    </ResponsivenessProvider>
  );
}
