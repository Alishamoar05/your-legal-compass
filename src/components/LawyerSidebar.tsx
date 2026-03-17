import { LayoutDashboard, FileText, TrendingUp, User } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { Scale } from "lucide-react";
import { Link } from "react-router-dom";

const items = [
  { title: "Dashboard", url: "/lawyer-dashboard", icon: LayoutDashboard },
  { title: "Document Analyzer", url: "/lawyer-dashboard/documents", icon: FileText },
  { title: "Case Predictor", url: "/lawyer-dashboard/case-predictor", icon: TrendingUp },
  { title: "Profile", url: "/lawyer-dashboard/profile", icon: User },
];

export function LawyerSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="p-4">
        <Link to="/lawyer-dashboard" className="flex items-center gap-2">
          <Scale className="h-6 w-6 text-sidebar-primary" />
          {!collapsed && (
            <span className="font-heading text-lg font-semibold text-sidebar-foreground">
              LawGenie
            </span>
          )}
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink
                      to={item.url}
                      end
                      className="hover:bg-sidebar-accent"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
