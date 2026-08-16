"use client"

import { cn } from "@/lib/utils"

export interface ColorOption {
  label: string
  value: string
  color: string
}

interface ColorGridProps {
  colors: ColorOption[]
  value?: string
  onChange: (value: string) => void
}

export function ColorGrid({ colors, value, onChange }: ColorGridProps) {
  return (
    <div className="grid grid-cols-7 gap-1">
      {colors.map((c) => (
        <button
          key={c.value || "none"}
          type="button"
          className={cn(
            "size-6 cursor-pointer rounded-sm border border-border/50 transition-transform hover:scale-110",
            value === c.value && "ring-2 ring-ring ring-offset-1",
          )}
          style={{
            backgroundColor: c.color || "transparent",
            ...(c.value === ""
              ? { backgroundImage: "linear-gradient(45deg, transparent 45%, #ef4444 45%, #ef4444 55%, transparent 55%)" }
              : {}),
          }}
          title={c.label}
          onClick={() => onChange(c.value)}
        />
      ))}
    </div>
  )
}
