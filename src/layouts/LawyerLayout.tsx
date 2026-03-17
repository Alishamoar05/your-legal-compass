import { Outlet, useLocation } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { LawyerSidebar } from "@/components/LawyerSidebar";
import CursorGradient from "@/components/CursorGradient";
import { AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";

const LawyerLayout = () => {
  const location = useLocation();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background relative overflow-hidden">
        <CursorGradient />
        <LawyerSidebar />
        <div className="flex-1 flex flex-col relative z-10">
          <header className="h-14 flex items-center border-b border-border bg-card/80 backdrop-blur-sm px-4 sticky top-0 z-40">
            <SidebarTrigger className="mr-4" />
            <span className="text-sm font-medium text-muted-foreground">Lawyer Dashboard</span>
          </header>
          <main className="flex-1 relative p-4 md:p-6 overflow-y-auto">
            <AnimatePresence mode="wait">
              <PageTransition key={location.pathname}>
                <Outlet />
              </PageTransition>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default LawyerLayout;
