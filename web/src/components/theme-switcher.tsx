"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [value, setValue] = useState(theme || "system");

  useEffect(() => {
    setValue(theme || "system");
  }, [theme]);

  return (
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={(value) => setTheme(value)}
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
