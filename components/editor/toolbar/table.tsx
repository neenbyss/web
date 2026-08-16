"use client"

import { useState } from "react"
import { IconTable } from "@tabler/icons-react"
import { useTiptap } from "@tiptap/react"

import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ToolbarButton } from "../components/ui/btn"
import { insertFilledTable } from "../extensions/nodes/table/insert-table"

const MAX = 8

/** Insertar tabla eligiendo el tamaño en un grid al pasar el ratón. */
export function TableButton() {
  const { editor } = useTiptap()
  const [open, setOpen] = useState(false)
  const [hover, setHover] = useState({ r: 0, c: 0 })

  if (!editor) return null

  const insert = (rows: number, cols: number) => {
    insertFilledTable(editor, rows, cols)
    setOpen(false)
    setHover({ r: 0, c: 0 })
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={({ onMouseDown, ...props }) => (
          <ToolbarButton
            tooltip="Insertar tabla"
            {...props}
            onMouseDown={(e) => {
              e.preventDefault()
              onMouseDown?.(e)
            }}
          >
            <IconTable />
          </ToolbarButton>
        )}
      />
      <PopoverContent className="w-auto p-2">
        <div
          className="grid gap-0.5"
          style={{ gridTemplateColumns: `repeat(${MAX}, 1fr)` }}
          onMouseLeave={() => setHover({ r: 0, c: 0 })}
        >
          {Array.from({ length: MAX * MAX }).map((_, i) => {
            const r = Math.floor(i / MAX) + 1
            const c = (i % MAX) + 1
            const active = r <= hover.r && c <= hover.c
            return (
              <button
                key={i}
                type="button"
                onMouseEnter={() => setHover({ r, c })}
                onClick={() => insert(r, c)}
                className={cn(
                  "size-5 rounded-[3px] border transition-colors",
                  active ? "border-primary bg-primary/30" : "border-border bg-muted/40",
                )}
              />
            )
          })}
        </div>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          {hover.r > 0 ? `${hover.r} × ${hover.c}` : "Elige el tamaño"}
        </p>
      </PopoverContent>
    </Popover>
  )
}
