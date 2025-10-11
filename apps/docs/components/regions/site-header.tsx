import Link from "next/link"

import { source } from "@/lib/source"
import { Button } from "@/registry/components/ui/button"

export function SiteHeader() {
  const pageTree = source.pageTree

  return (
    <header className="bg-background sticky top-0 z-50 w-full border-b">
      <div className="container-wrapper px-6">
        <div className="flex h-(--header-height) items-center gap-4">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="font-semibold"
          >
            <Link href="/">
              VOLTA Docs
            </Link>
          </Button>
          <nav className="ml-auto flex items-center gap-4">
            <Button
              asChild
              variant="ghost"
              size="sm"
            >
              <Link href="/docs">
                Documentation
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="sm"
            >
              <Link href="/docs/components">
                Components
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
