"use client";

import { GithubStarCard } from "./github-star-card";
import { Icons } from "@/components/icons";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar";

const auth = false;

export function AppSidebar() {
  if (auth) return <AuthenticatedSidebar />;

  return <UnAuthenticatedSidebar />;
}

function AuthenticatedSidebar() {
  return null;
}

function UnAuthenticatedSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="flex flex-grow flex-col items-center justify-center">
        <Button variant="secondary">
          <Icons.google className="mr-2 h-5 w-5" />
          Connect to Google
        </Button>
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
