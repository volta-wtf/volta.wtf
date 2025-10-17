"use client"

import { cn } from "@/lib/utils"
import { Icon } from "@/components/media/icon"
import { Button } from "@/components/ui/button"

const changeTheme = () => {
  // Cambia el tema entre 'light' y 'dark' usando el provider de next-themes
  if (typeof window !== "undefined") {
    const currentTheme = document.documentElement.classList.contains("dark") ? "dark" : "light";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.classList.remove(currentTheme);
    document.documentElement.classList.add(nextTheme);
    // Si usas next-themes, lo ideal es usar el hook useTheme:
    // const { setTheme, theme } = useTheme();
    // setTheme(theme === "dark" ? "light" : "dark");
  }
}

export const ThemeToggler = ({ className }: { className?: string }) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={changeTheme}
      className={cn("group", className)}
    >
      <span className="relative inline-block">
        <Icon.ThemeDark className="text-current dark:opacity-0 transition-opacity duration-150" />
        <span className="absolute inset-0 flex items-center justify-center transition-opacity duration-150">
          <Icon.ThemeLight className="text-current opacity-0 dark:opacity-100 transition-opacity duration-150" />
        </span>
      </span>
    </Button>
  )
}