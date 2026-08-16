import { IconXFilled } from "@tabler/icons-react"
import { Button } from "../ui/button"

export function Annoucement() {
  return (
    <div className="relative flex h-12 w-full items-center justify-center bg-linear-to-l from-purple-600 to-primary">
      <div className="container-screen-2xl flex items-center gap-4 justify-between">
        <p>
            Website a 50% de tu primera web completa
        </p>
        <Button size="icon-xs" variant={"ghost"}>
          <IconXFilled />
        </Button>
      </div>
    </div>
  )
}
