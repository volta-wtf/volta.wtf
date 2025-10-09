import { SearchIcon } from "lucide-react"

import { Button } from "@/registry/components/ui/button"
import { ButtonGroup } from "@/registry/components/ui/button-group"
import { Input } from "@/registry/components/ui/input"

export default function ButtonGroupInput() {
  return (
    <ButtonGroup>
      <Input placeholder="Search..." />
      <Button variant="outline" aria-label="Search">
        <SearchIcon />
      </Button>
    </ButtonGroup>
  )
}
