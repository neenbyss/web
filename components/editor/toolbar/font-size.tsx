import { useEditor } from "../core/useEditor"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { IconChevronDown } from "@tabler/icons-react"
import { useMemo } from "react"

const fontSizes = [
  { label: "Por defecto", value: "" },
  { label: "12px", value: "12px" },
  { label: "13px", value: "13px" },
  { label: "14px", value: "14px" },
  { label: "15px", value: "15px" },
  { label: "16px", value: "16px" },
  { label: "18px", value: "18px" },
  { label: "20px", value: "20px" },
  { label: "24px", value: "24px" },
  { label: "28px", value: "28px" },
  { label: "32px", value: "32px" },
  { label: "36px", value: "36px" },
  { label: "48px", value: "48px" },
  { label: "64px", value: "64px" },
]

export function FontSize() {
  const { editor } = useEditor()
  const currentSize = editor.getFontSize?.() || ""
  const activeLabel = useMemo(
    () => fontSizes.find((s) => s.value === currentSize)?.label || "Tamaño",
    [currentSize],
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={(triggerProps) => {
          const { onMouseDown, ...rest } = triggerProps
          return (
            <Button {...rest}
              onMouseDown={(e) => { e.preventDefault(); if (onMouseDown) onMouseDown(e) }}
              className="h-9 min-w-20 justify-start bg-muted/20 font-sans text-sm font-normal"
              variant="ghost" size="xs"
            >
              {activeLabel}
              <IconChevronDown className="ml-auto size-3.5" />
            </Button>
          )
        }}
      />
      <DropdownMenuContent>
        {fontSizes.map((s) => (
          <DropdownMenuItem key={s.value}
            className={cn("flex items-center gap-2 text-sm font-normal", currentSize === s.value && "bg-accent")}
            onClick={(e) => {
              e.preventDefault()
              if (s.value) editor.runSetFontSize(s.value)
              else editor.runUnsetFontSize()
            }}
          >
            {s.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
