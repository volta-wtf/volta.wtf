"use client"

import { CircleHelp, SearchIcon } from "lucide-react"

import { AppSidebar } from "./components/app-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

const columns = ["Columna 1", "Columna 2", "Columna 3", "Columna 4"]

export default function BeastDemoPage() {
  return (
    <SidebarProvider className="min-h-svh bg-background">
      <AppSidebar />

      <SidebarInset>
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar..."
            className="h-12 rounded-2xl border-0 bg-muted/40 pl-11 shadow-none"
          />
        </div>
        <div className="bg-surface border border-region rounded-region p-4">
          asd
        </div>
        <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {columns.map((column) => (
            <div
              key={column}
              className="min-h-[calc(100svh-8rem)] rounded-2xl bg-muted/25"
            />
          ))}
        </div>

      </SidebarInset>

      <Button
        size="icon"
        variant="secondary"
        className="fixed right-6 bottom-6 z-50 size-10 rounded-full shadow-lg"
        aria-label="Ayuda"
      >
        <CircleHelp className="size-5" />
      </Button>
    </SidebarProvider>
  )
}
