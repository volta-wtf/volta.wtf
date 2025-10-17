"use client"

import { useState } from "react"
import { Toaster } from "@/registry/components/ui/toaster"

import {
  AppLayout,
  AppHeader,
  AppContainer,
  AppSidebar,
  AppMain
} from '@/components/layout/AppLayout';

import { MainNavigation } from '@/components/layout/MainNavigation';
import { PreviewToggler } from '@/components/layout/PreviewToggler';
import { SearchInput } from '@/components/layout/SearchInput';
import { CategoryFilter } from '@/components/layout/CategoryFilter';

export default function Page() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <AppLayout>
      <AppHeader isPreviewOpen={isPreviewOpen}>
        <PreviewToggler
          data-slot="actions"
          isPreviewOpen={isPreviewOpen}
          togglePreview={() => setIsPreviewOpen(!isPreviewOpen)}
        />
      </AppHeader>

      <AppContainer>
        <AppMain isPreviewOpen={isPreviewOpen}>
          <section data-slot="content">
            <div className="">
              <h2 className="text-2xl font-bold mb-4">Layout Demo</h2>
              <p className="text-muted-foreground">
                Esta es una demostración básica de la estructura del layout.
              </p>
            </div>
          </section>
        </AppMain>
      </AppContainer>

      <Toaster />
    </AppLayout>
  )
}
