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
import { cn } from "@/lib/utils"
import {
  IconChevronDown,
  IconLetterCase,
  IconLetterCaseLower,
  IconLetterCaseToggle,
  IconLetterCaseUpper,
} from "@tabler/icons-react"
import { useMemo } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const transforms = [
  {
    label: "Normal",
    value: "normal",
    icon: <IconLetterCaseToggle className="size-5" />,
  },
  {
    label: "Minúsculas",
    value: "lowercase",
    icon: <IconLetterCaseLower className="size-5" />,
  },
  {
    label: "MAYÚSCULAS",
    value: "uppercase",
    icon: <IconLetterCaseUpper className="size-5" />,
  },
  {
    label: "Capitalizado",
    value: "capitalize",
    icon: <IconLetterCase className="size-5" />,
  },
]

export function TextTransform() {
  const { editor } = useEditor()
  const currentTransform = editor.getTextTransform?.() || "normal"
  const activeItem = useMemo(() => {
    return transforms.find((t) => t.value === currentTransform) ?? transforms[0]
  }, [currentTransform])

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
                      "h-9 justify-start gap-2 font-sans text-sm font-normal capitalize px-1.5",
                      activeItem.value === "normal"
                        ? "text-foreground/70"
                        : "bg-primary/30"
                    )}
                    variant="ghost"
                    size="xs"
                  >
                    {activeItem.icon}
                    <IconChevronDown className="ml-auto size-3.5! text-foreground!" />
                  </Button>
                )
              }}
            />
          }
        />

        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Transformar Texto</DropdownMenuLabel>
            {transforms.map((t) => (
              <DropdownMenuItem
                key={t.value}
                className={cn(
                  "flex items-center gap-3 text-sm font-normal normal-case [&_svg]:size-5!",
                  currentTransform === t.value && "bg-accent"
                )}
                onClick={(e) => {
                  e.preventDefault()
                  if (t.value) editor.runSetTextTransform(t.value)
                  else editor.runUnsetTextTransform()
                }}
              >
                {t.icon}
                {t.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <TooltipContent className="text-sm">Transformar Texto</TooltipContent>
    </Tooltip>
  )
}
