import fs from "fs"
import path from "path"

import { Index } from "@/registry/config/__index__"

// Helper function to resolve file paths from monorepo root
function resolveRegistryPath(filePath: string): string {
  if (path.isAbsolute(filePath)) {
    return filePath
  }

  // apps/docs is 2 levels deep from monorepo root
  const monorepoRoot = path.join(process.cwd(), '..', '..')
  return path.join(monorepoRoot, filePath)
}

export function processMdxForLLMs(content: string) {
  const componentPreviewRegex =
    /<ComponentPreview\s+[^>]*name="([^"]+)"[^>]*\/>/g

  return content.replace(componentPreviewRegex, (match, name) => {
    try {
      const component = Index[name]
      if (!component?.files) {
        return match
      }

      const src = component.files[0]?.path
      if (!src) {
        return match
      }

      const fullPath = resolveRegistryPath(src)
      let source = fs.readFileSync(fullPath, "utf8")
      source = source.replaceAll(`@/registry/`, "@/components/")
      source = source.replaceAll("export default", "export")

      return `\`\`\`tsx
${source}
\`\`\``
    } catch (error) {
      console.error(`Error processing ComponentPreview ${name}:`, error)
      return match
    }
  })
}
