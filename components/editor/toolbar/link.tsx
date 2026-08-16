"use client"

import { useState } from "react"
import { IconLink } from "@tabler/icons-react"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ToolbarButton } from "../components/ui/btn"
import { useEditor } from "../core/useEditor"
import { LinkForm } from "../components/link-form"

export function LinkButton() {
  const { editor } = useEditor()
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={({ onMouseDown, ...props }) => (
          <ToolbarButton
            tooltip="Enlace"
            shortCut="Ctrl + k"
            active={editor.isLink}
            {...props}
            onMouseDown={(e) => {
              e.preventDefault()
              onMouseDown?.(e)
            }}
          >
            <IconLink />
          </ToolbarButton>
        )}
      />
      <PopoverContent className="w-auto p-2">
        {/* remonta al abrir para precargar la URL actual */}
        {open && <LinkForm onDone={() => setOpen(false)} />}
      </PopoverContent>
    </Popover>
  )
}
