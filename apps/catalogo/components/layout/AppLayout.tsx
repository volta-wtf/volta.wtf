"use client"

import React from 'react'
import { cn } from '@/lib/utils'
import { SitesDropdown } from './SitesDropdown'
import { ScrollProgress } from './ScrollProgress'
import { ThemeToggler } from './ThemeToggler'
import { MenuToggler } from './MenuToggler'
import { SearchToggler } from './SearchToggler'

const styles = {
  name: "Style 1",
  description: "A modern and clean style",
  image: "https://via.placeholder.com/150",

  container: "flex px-2 md:px-4 lg:px-8",
  aside: "hidden xl:flex w-2/10 px-8",
  main: "flex-1",
  content: "w-1/3 lg:w-2/5 px-3 md:px-4 lg:px-8 gap-4",
  preview: "px-4 lg:px-8 gap-4",
  scroll: "min-h-svh py-18 md:py-24 overflow-y-auto overscroll-contain scroll-auto"
}

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-svh bg-background">
      {children}
    </div>
  )
}

interface AppHeaderProps {
  isPreviewOpen: boolean
  children: React.ReactNode
}

export function AppHeader({ isPreviewOpen, children }: AppHeaderProps) {
  const childrenArray = React.Children.toArray(children);

  const getSlot = (slotName: string) =>
    childrenArray.find(
      (child: React.ReactNode) => React.isValidElement(child) && (child as any).props['data-slot'] === slotName
    );

  return (
    <header className={cn("h-18 md:h-24 w-full fixed top-0 z-10 text-muted-foreground bg-background/80 backdrop-blur-lg", styles.container, "_block _lg:flex")}>
      <div className={cn(
        "flex-row items-center gap-4 ",
        styles.aside,
        "w-full md:w-1/3 lg:w-2/5 xl:w-2/10 px-4 lg:px-8 py-4 flex ",
        isPreviewOpen ? "hidden md:flex lg:w-2/5" : "pr-0 md:pr-4 _max-lg:pr-0!"
      )}>
        <SitesDropdown />
        <ScrollProgress />
      </div>
      <div data-slot="main" className={cn("flex flex-row", styles.main)}>
        <div
          className={cn(
            styles.content,
            "hidden md:flex flex-row items-center xl:pl-6",
            isPreviewOpen ? "hidden! xl:flex!" : "md:w-full! md:pl-0 lg:pl-0 pr-0!",
            !getSlot('content') && "pl-0!"
          )}
        >
          {getSlot('content')}
          <ScrollProgress target="#main-content" />
        </div>
        <div className={cn("flex flex-1 items-center", styles.preview)}>
          {getSlot('actions')}
          <ScrollProgress target="#main-preview" className={cn(isPreviewOpen ? "w-full" : "hidden")} />
          <div className="flex flex-row items-center gap-2 -mr-2 text-muted-foreground">
            <SearchToggler className="md:hidden" />
            <ThemeToggler />
            <MenuToggler className="xl:hidden" />
          </div>
        </div>
      </div>
    </header>
  )
}

export const AppContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={cn("h-svh", styles.container)}>
      {children}
    </div>
  )
}

export const AppSidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <aside className={cn("flex-col", styles.aside, styles.scroll)}>
      {children}
    </aside>
  )
}

interface AppMainProps {
  children: React.ReactNode
  isPreviewOpen: boolean
}

export const AppMain = ({ children, isPreviewOpen }: AppMainProps) => {
  const childrenArray = React.Children.toArray(children);

  const getSlot = (slotName: string) =>
    childrenArray.find(
      (child: React.ReactNode) => React.isValidElement(child) && (child as any).props['data-slot'] === slotName
    );

  return (
    <main className={cn("flex flex-row", styles.main)}>
      <section
        id="main-content"
        className={cn(
          styles.content, styles.scroll,
          "flex flex-col",
          isPreviewOpen ? "hidden md:block" : "flex-1 pr-12_",
          !getSlot('complement') && "px-12"
        )}
      >
        {getSlot('content')}
      </section>
      {isPreviewOpen && (
        <section
          id="main-preview"
          className={cn("flex flex-1", styles.preview, styles.scroll)}
        >
          {getSlot('complement')}
        </section>
      )}
    </main>
  )
}