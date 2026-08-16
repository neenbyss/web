import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { ComponentProps } from "react"

interface ToolbarButtonProps extends ComponentProps<typeof Button> {
  active?: boolean
  shortCut?: string
  tooltip?: string
}

export function ToolbarButton({
  active,
  tooltip,
  shortCut,
  className,
  ...props
}: ToolbarButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            size="icon-sm"
            variant="ghost"
            className={cn(active && "bg-primary hover:bg-primary! text-white!", className)}
            {...props}
          />
        }
      />
      {tooltip && <TooltipContent className="text-sm">{tooltip} {shortCut && <Kbd> {shortCut} </Kbd> }</TooltipContent>}
    </Tooltip>
  )
}
