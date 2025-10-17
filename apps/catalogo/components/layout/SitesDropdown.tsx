import { Icon } from "@/components/media/icon"

export const SitesDropdown = () => {
  return (
    <div className="-ml-2 flex flex-row items-center gap-2 px-2 rounded-md hover:bg-accent">
      <div className="text-2xl text-foreground">styles</div>
      <Icon.Select sm className="shrink-0 text-current" />
    </div>
  )
}