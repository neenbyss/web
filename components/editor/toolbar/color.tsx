import { IconChevronDown, IconCheck } from "@tabler/icons-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEditor } from "../core/useEditor"

interface NamedColor {
  name: string
  key: string
}

// Paleta con nombre; los valores apuntan a variables CSS que se adaptan al tema.
const COLORS: NamedColor[] = [
  { name: "Por defecto", key: "" },
  { name: "Gris", key: "gray" },
  { name: "Marrón", key: "brown" },
  { name: "Naranja", key: "orange" },
  { name: "Amarillo", key: "yellow" },
  { name: "Verde", key: "green" },
  { name: "Azul", key: "blue" },
  { name: "Púrpura", key: "purple" },
  { name: "Rosa", key: "pink" },
  { name: "Rojo", key: "red" },
]

const textVar = (key: string) => (key ? `var(--editor-color-${key})` : "")
const bgVar = (key: string) => (key ? `var(--editor-bg-${key})` : "")

function Swatch({ kind, color }: { kind: "text" | "bg"; color: string }) {
  return (
    <span
      className="flex size-6 shrink-0 items-center justify-center rounded border border-border/70 text-sm font-semibold"
      style={
        kind === "text"
          ? { color: color || undefined }
          : { backgroundColor: color || undefined }
      }
    >
      A
    </span>
  )
}

/** Menú unificado de color de texto y color de fondo (DropdownMenu, tipo Notion). */
export function ColorMenu() {
  const { editor } = useEditor()
  const activeText = editor.getTextColor?.() || ""
  const activeBg = editor.getTextBackgroundColor?.() || ""

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Color y fondo del texto"
            className={cn(
              "w-auto gap-1 px-2",
              (activeText || activeBg) && "text-foreground"
            )}
          />
        }
      >
        <span
          className="text-sm font-semibold"
          style={{
            color: activeText || undefined,
            backgroundColor: activeBg || undefined,
            padding: activeBg ? "0 0.25rem" : undefined,
            borderRadius: activeBg ? "0.2rem" : undefined,
            opacity: (activeText || activeBg) ? undefined : 0.7
          }}
        >
          A
        </span>
        <IconChevronDown className="ml-auto size-3.5 text-foreground!" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="max-h-80 w-56 overflow-y-auto">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Color</DropdownMenuLabel>

          {COLORS.map((c) => {
            const val = textVar(c.key)
            const active = activeText === val
            return (
              <DropdownMenuItem
                key={`t-${c.key || "default"}`}
                closeOnClick={false}
                onClick={() =>
                  c.key
                    ? editor.runSetTextColor(val)
                    : editor.runUnsetTextColor()
                }
              >
                <Swatch kind="text" color={val} />
                {c.name}
                {active && (
                  <IconCheck className="ml-auto size-4 text-muted-foreground" />
                )}
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel>Fondo</DropdownMenuLabel>

          {COLORS.map((c) => {
            const val = bgVar(c.key)
            const active = activeBg === val
            return (
              <DropdownMenuItem
                key={`b-${c.key || "default"}`}
                closeOnClick={false}
                onClick={() =>
                  c.key
                    ? editor.runSetTextBackground(val)
                    : editor.runUnsetTextBackground()
                }
              >
                <Swatch kind="bg" color={val} />
                {c.name}
                {active && (
                  <IconCheck className="ml-auto size-4 text-muted-foreground" />
                )}
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
