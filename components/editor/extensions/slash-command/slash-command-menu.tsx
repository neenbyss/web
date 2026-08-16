import {
  useImperativeHandle,
  useState,
  useMemo,
  useSyncExternalStore,
} from "react"
import { type SuggestionKeyDownProps } from "@tiptap/suggestion"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import type { SlashCommandCategory, SlashCommandItem } from "./slash-command"
import { Label } from "@/components/ui/label"
import { Kbd } from "@/components/ui/kbd"
import { Button } from "@/components/ui/button"

export interface SlashState {
  items: SlashCommandCategory[]
  command: (item: SlashCommandItem) => void
}

export interface SlashStore {
  get: () => SlashState
  set: (state: SlashState) => void
  subscribe: (listener: () => void) => () => void
}

/** Store externo simple para actualizar el contenido del popup sin re-montar. */
export function createSlashStore(initial: SlashState): SlashStore {
  let state = initial
  const listeners = new Set<() => void>()
  return {
    get: () => state,
    set: (next) => {
      state = next
      listeners.forEach((l) => l())
    },
    subscribe: (l) => {
      listeners.add(l)
      return () => listeners.delete(l)
    },
  }
}

export interface SlashCommandMenuHandle {
  onKeyDown: (props: SuggestionKeyDownProps) => boolean
}

export interface SlashCommandMenuProps {
  store: SlashStore
  ref?: React.Ref<SlashCommandMenuHandle>
}

export const SlashCommandMenu = ({ store, ref }: SlashCommandMenuProps) => {
  // useSyncExternalStore garantiza el re-render al cambiar el store (sin depender
  // de updateProps ni de la sincronía de refs).
  const state = useSyncExternalStore(store.subscribe, store.get, store.get)
  const { items } = state

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [prevItems, setPrevItems] = useState(items)
  if (items !== prevItems) {
    setPrevItems(items)
    setSelectedIndex(0)
  }

  const flatItems = useMemo(() => items.flatMap((cat) => cat.items), [items])

  const selectItem = (index: number) => {
    const item = flatItems[index]
    if (item) store.get().command(item)
  }

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }) => {
      if (flatItems.length === 0) return false
      if (event.key === "ArrowUp") {
        setSelectedIndex(
          (prev) => (prev - 1 + flatItems.length) % flatItems.length
        )
        return true
      }
      if (event.key === "ArrowDown") {
        setSelectedIndex((prev) => (prev + 1) % flatItems.length)
        return true
      }
      if (event.key === "Enter") {
        selectItem(selectedIndex)
        return true
      }
      return false
    },
  }))

  if (flatItems.length === 0) {
    return (
      <Card className="z-40 w-72 animate-in bg-popover p-3 text-sm text-muted-foreground shadow-md duration-150 fade-in-0 zoom-in-95">
        Sin resultados
      </Card>
    )
  }

  let globalIndex = 0

  return (
    <Card className="z-40 flex max-h-80 w-72 animate-in flex-col gap-0 overflow-hidden bg-popover p-0 shadow-md duration-150 fade-in-0 zoom-in-95">
      <div className="flex flex-col gap-1 overflow-y-auto p-1.5">
        {items?.map((category) => {
          if (!category?.items || category.items.length === 0) return null

          return (
            <div key={category.type} className="flex flex-col">
              <Label className="px-3 pt-2 pb-2 text-[0.7rem] tracking-wide opacity-50">
                {category.type}
              </Label>

              {category.items.map((item) => {
                const currentIndex = globalIndex++
                const isSelected = currentIndex === selectedIndex

                return (
                  <Button
                    key={item.title}
                    variant="ghost"
                    className={cn(
                      "h-8 w-full gap-2.5 px-2 text-left font-normal capitalize",
                      isSelected
                        ? "bg-accent text-accent-foreground"
                        : "opacity-50"
                    )}
                    onClick={() => selectItem(currentIndex)}
                    onMouseEnter={() => setSelectedIndex(currentIndex)}
                  >
                    {item.icon}
                    <span className="truncate text-sm font-medium text-foreground">
                      {item.title}
                    </span>{" "}
                    <div className="flex min-w-0 flex-col"></div>
                    {item.hint ? (
                      <Kbd className="ml-auto shrink-0 text-[0.7rem] bg-transparent px-0">
                        {item.hint}
                      </Kbd>
                    ): <span className="ml-auto opacity-0 "> P </span>}
                  </Button>
                )
              })}
            </div>
          )
        })}
      </div>

      <div className="border-t border-border p-1.5">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-full justify-between px-2 text-[0.7rem] text-muted-foreground"
        >
          Cerrar Menú
          <Kbd>ESC</Kbd>
        </Button>
      </div>
    </Card>
  )
}
