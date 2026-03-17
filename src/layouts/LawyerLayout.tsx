import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { LawyerSidebar } from "@/components/LawyerSidebar";
import CursorGradient from "@/components/CursorGradient";

const LawyerLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background relative">
        <CursorGradient />
        <LawyerSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center border-b border-border bg-card/80 backdrop-blur-sm px-4 sticky top-0 z-40">
            <SidebarTrigger className="mr-4" />
            <span className="text-sm font-medium text-muted-foreground">Lawyer Dashboard</span>
          </header>
          <main className="flex-1 relative z-10">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default LawyerLayout;
