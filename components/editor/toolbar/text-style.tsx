import { useEditor } from "../core/useEditor"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { levels } from "../core"
import { cn } from "@/lib/utils"
import {
  IconChevronDown,
  IconTypography,
  IconH1,
  IconH2,
  IconH3,
} from "@tabler/icons-react"
import { useMemo } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const styleItems = [
  { level: 0, label: "Texto", icon: <IconTypography className="size-4" /> },
  { level: 1, label: "Encabezado 1", icon: <IconH1 className="size-4" /> },
  { level: 2, label: "Encabezado 2", icon: <IconH2 className="size-4" /> },
  { level: 3, label: "Encabezado 3", icon: <IconH3 className="size-4" /> },
]

export function TextStyle() {
  const { editor } = useEditor()

  const activeItem = useMemo(() => {
    if (!editor.isHeading) return styleItems[0]
    const level = levels.find((l) => editor.isHeadingPerLevel(l))
    if (!level) return styleItems[0]
    return styleItems[level] || styleItems[0]
  }, [editor])

  return (
    <Tooltip>
      <DropdownMenu>
        <TooltipTrigger
          render={
            <DropdownMenuTrigger
              render={(triggerProps) => {
                const { onMouseDown, ...rest } = triggerProps
                return (
                  <Button
                    {...rest}
                    onMouseDown={(e) => {
                      e.preventDefault()
                      if (onMouseDown) onMouseDown(e)
                    }}
                    className={cn(
                      "h-9 min-w-50 justify-start gap-2 bg-muted/20 font-sans text-sm font-normal capitalize",
                      activeItem.level === 0 && "text-foreground/70"
                    )}
                    variant="ghost"
                    size="xs"
                  >
                    {activeItem.icon}
                    {activeItem.label}
                    <IconChevronDown className="ml-auto size-3.5 text-foreground!" />
                  </Button>
                )
              }}
            />
          }
        />
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>
              Estilos de Texto
            </DropdownMenuLabel>
            {styleItems.map((item) => (
              <DropdownMenuItem
                key={item.level}
                className={cn(
                  "flex items-center gap-2 text-sm font-normal capitalize",
                  (item.level === 0
                    ? !editor.isHeading
                    : editor.isHeadingPerLevel(item.level as 1 | 2 | 3)) &&
                    "bg-accent"
                )}
                onClick={(e) => {
                  e.preventDefault()
                  if (item.level === 0) editor.runParagraph()
                  else editor.runHeading(item.level as 1 | 2 | 3)
                }}
              >
                {item.icon}
                {item.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <TooltipContent className="text-sm">Estilos de Texto</TooltipContent>
    </Tooltip>
  )
}
