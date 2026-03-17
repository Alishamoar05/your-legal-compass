import { LayoutDashboard, MessageSquare, Search, User, FileText } from "lucide-react";
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
  { title: "Dashboard", url: "/client-dashboard", icon: LayoutDashboard },
  { title: "Ask AI", url: "/client-dashboard/chat", icon: MessageSquare },
  { title: "Document Summary", url: "/client-dashboard/documents", icon: FileText },
  { title: "Find Lawyer", url: "/client-dashboard/lawyers", icon: Search },
  { title: "Profile", url: "/client-dashboard/profile", icon: User },
];

export function ClientSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="p-4">
        <Link to="/client-dashboard" className="flex items-center gap-2">
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
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
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
