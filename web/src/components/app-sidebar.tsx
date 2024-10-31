import { ThemeSwitcher } from "@/components/theme-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuth } from "@/lib/auth-actions";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import { ConnectWithGoogleButton } from "./connect-with-google-button";
import { GithubStarCard } from "./github-star-card";

export async function AppSidebar() {
  const { isAuthenticated } = await useAuth();

  if (isAuthenticated) return <AuthenticatedSidebar />;

  return <UnAuthenticatedSidebar />;
}

const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

function AuthenticatedSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <AppSidebarFooter />
    </Sidebar>
  );
}

function UnAuthenticatedSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="flex flex-grow flex-col items-center justify-center">
        <ConnectWithGoogleButton variant="secondary" />
      </SidebarContent>
      <AppSidebarFooter />
    </Sidebar>
  );
}

function AppSidebarFooter() {
  return (
    <SidebarFooter>
      <div className="flex justify-center">
        <GithubStarCard />
      </div>
      <ThemeSwitcher />
    </SidebarFooter>
  );
}
