import { registryItemSchema, type Registry } from "./schema"
import { z } from "zod"

import { blocks } from "@/registry/config/registry-blocks"
import { charts } from "@/registry/config/registry-charts"
import { examples } from "@/registry/config/registry-examples"
import { hooks } from "@/registry/config/registry-hooks"
import { internal } from "@/registry/config/registry-internal"
import { lib } from "@/registry/config/registry-lib"
import { themes } from "@/registry/config/registry-themes"
import { ui } from "@/registry/config/registry-ui"

const DEPRECATED_ITEMS = [
  "toast",
  "toast-demo",
  "toast-destructive",
  "toast-simple",
  "toast-with-action",
  "toast-with-title",
]

// Shared between index and style for backward compatibility.
const NEW_YORK_V4_STYLE = {
  type: "registry:style",
  dependencies: ["class-variance-authority", "lucide-react"],
  devDependencies: ["tw-animate-css"],
  registryDependencies: ["utils"],
  cssVars: {},
  files: [],
}

export const registry = {
  name: "shadcn/ui",
  homepage: "https://ui.shadcn.com",
  items: z.array(registryItemSchema).parse(
    [
      {
        name: "index",
        ...NEW_YORK_V4_STYLE,
      },
      {
        name: "style",
        ...NEW_YORK_V4_STYLE,
      },
      ...ui,
      ...blocks,
      ...charts,
      ...lib,
      ...hooks,
      ...themes,
      ...examples,
      ...internal,
    ]
      .filter((item) => {
        return !DEPRECATED_ITEMS.includes(item.name)
      })
      .map((item) => {
        // Temporary fix for dashboard-01.
        if (item.name === "dashboard-01") {
          item.dependencies?.push("@tabler/icons-react")
        }

        if (item.name === "accordion" && "tailwind" in item) {
          delete item.tailwind
        }

        return item
      })
  ),
} satisfies Registry
