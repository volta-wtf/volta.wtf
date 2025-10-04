import { IconGitBranch } from "@tabler/icons-react"

import { Button } from "@registry/ui/button"

export default function ButtonWithIcon() {
  return (
    <Button variant="outline" size="sm">
      <IconGitBranch /> New Branch
    </Button>
  )
}
