import { Button } from "@/registry/components/ui/button"
import { Spinner } from "@/registry/components/ui/spinner"

export default function ButtonLoading() {
  return (
    <Button size="sm" variant="outline" disabled>
      <Spinner />
      Submit
    </Button>
  )
}
