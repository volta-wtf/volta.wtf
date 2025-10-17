"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Icon } from "@/lib/icon"

import {
  AppLayout,
  AppHeader,
  AppContainer,
  AppSidebar,
  AppMain
} from '@/components/layout/AppLayout';

const styles = {
  name: "Style 1",
  description: "A modern and clean style",
  image: "https://via.placeholder.com/150",

  container: "flex px-8",
  aside: "w-2/10 px-12",
  main: "flex-1",
  content: "w-2/5 px-8 gap-4",
  preview: "px-12 gap-4",
}

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

const ScrollProgress = ({ className }: { className?: string }) => {
  return (
    <div className={cn("h-px w-full bg-border", className)}></div>
  )
}

function CustomAppHeader({ isPreviewOpen, togglePreview }: { isPreviewOpen: boolean; togglePreview: () => void }) {
  return (
    <div className={cn("fixed top-0 z-10 bg-background h-24 w-full ", styles.container)}>
      <div className={cn("flex flex-row items-center gap-4 pr-0!", styles.aside)}>
        <div className="text-2xl">styles</div>
        <Icon.Select sm className="shrink-0 text-black/60" />
        <ScrollProgress />
      </div>
      <div className={cn("flex flex-row", styles.main)}>

        <div className={cn(isPreviewOpen ? "" : "w-full! pr-0!", "flex flex-row items-center", styles.content)}>
           <div className="flex flex-row items-center gap-2">
             <Icon.Search className="shrink-0 text-black/60" />
             <input
              className="bg-transparent outline-none"
              type="text"
              placeholder="Type here to search"
              style={{
                width: "16ch",
                minWidth: "4ch",
                maxWidth: "80%",
              }}
              onInput={e => {
                const input = e.currentTarget;
                input.style.width = "10ch";
                input.style.width = (input.value.length > 0 ? input.value.length : input.placeholder.length) + "ch";
              }}
            />
          </div>
          <ScrollProgress />
        </div>

        <div className={cn("flex flex-1 items-center", styles.preview)}>
          <Button
             variant="ghost"
             size="icon"
             className="-ml-2"
             onClick={togglePreview}
           >
             <Icon.RightPanel className={cn("shrink-0 text-black/60 transition-transform",
               isPreviewOpen ? "" : "rotate-180"
             )} />
           </Button>
          <ScrollProgress className={cn(isPreviewOpen ? "w-full" : "hidden")} />
          <Button
             variant="ghost"
             size="icon"
             className="-mr-2"
             onClick={changeTheme}
           >
             <Icon.ThemeDark className="shrink-0 text-black/60" />
           </Button>
        </div>

      </div>
    </div>
  )
}

function AppAside() {
  return (
    <aside className={cn("flex flex-col", styles.aside)}>
      <div className="h-svh py-24">
        aside
      </div>
    </aside>
  )
}

function CustomAppMain({ isPreviewOpen, togglePreview }: { isPreviewOpen: boolean; togglePreview: () => void }) {
  return (
    <main className={cn("flex flex-row", styles.main)}>
      <section className={cn("flex flex-col", styles.content, isPreviewOpen ? "" : "flex-1 pr-12")}>
        <StylesGrid isPreviewOpen={isPreviewOpen} />
      </section>
      {isPreviewOpen && (
        <section className={cn("flex flex-1", styles.preview)}>
          <Preview />
        </section>
      )}
    </main>
  )
}

function StyleCard({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center min-w-20 bg-black/3 p-10", className)}>
      <p className="text-4xl font-bold">Aa</p>
    </div>
  )
}


function StylesGrid({ isPreviewOpen }: { isPreviewOpen: boolean }) {
  return (
    <div className={`grid ${isPreviewOpen ? "grid-cols-2" : "grid-cols-5"} gap-2`}>
      {Array.from({ length: 30 }).map((_, i) => (
        <StyleCard key={i} className="col-span-1" />
      ))}
    </div>
  )
}

function Preview() {

  return (
    <div>
      preview
    </div>
  )
}

export default function Page() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(true)

  // const { user, logout, isFavorite } = useAuth()

  const togglePreview = () => {
    setIsPreviewOpen(!isPreviewOpen)
  }

  return (
    <>
      <CustomAppHeader isPreviewOpen={isPreviewOpen} togglePreview={togglePreview} />
      <div className={cn("min-h-svh", styles.container)}>
        <AppAside />
        <CustomAppMain isPreviewOpen={isPreviewOpen} togglePreview={togglePreview} />
      </div>
    </>
  )
}
