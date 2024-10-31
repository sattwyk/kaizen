"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Wait until mounted on client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by rendering placeholder with same structure
  if (!mounted) {
    return (
      <ToggleGroup type="single" value="system" aria-label="Theme Mode">
        <ToggleGroupItem value="light" aria-label="Light Mode">
          <Sun className="h-5 w-5" />
        </ToggleGroupItem>
        <ToggleGroupItem value="dark" aria-label="Dark Mode">
          <Moon className="h-5 w-5" />
        </ToggleGroupItem>
        <ToggleGroupItem value="system" aria-label="System Default">
          <Monitor className="h-5 w-5" />
        </ToggleGroupItem>
      </ToggleGroup>
    );
  }

  return (
    <ToggleGroup
      type="single"
      value={theme || "system"}
      onValueChange={setTheme}
      aria-label="Theme Mode"
    >
      <ToggleGroupItem value="light" aria-label="Light Mode">
        <Sun className="h-5 w-5" />
      </ToggleGroupItem>
      <ToggleGroupItem value="dark" aria-label="Dark Mode">
        <Moon className="h-5 w-5" />
      </ToggleGroupItem>
      <ToggleGroupItem value="system" aria-label="System Default">
        <Monitor className="h-5 w-5" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
