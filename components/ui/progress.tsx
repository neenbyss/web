"use client"

import { Progress as ProgressPrimitive } from "@base-ui/react/progress"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// 1. Definimos las variantes con CVA
const trackVariants = cva(
  "relative flex w-full items-center overflow-x-hidden rounded-full bg-muted",
  {
    variants: {
      size: {
        sm: "h-1",
        md: "h-2",
        lg: "h-4",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

const indicatorVariants = cva("h-full transition-all duration-500", {
  variants: {
    intent: {
      default: "bg-primary",
      success: "bg-emerald-500",
      warning: "bg-amber-500",
      danger: "bg-destructive",
    },
  },
  defaultVariants: {
    intent: "default",
  },
})

type ProgressProps = ProgressPrimitive.Root.Props
interface ProgressTrackProps extends ProgressPrimitive.Track.Props, VariantProps<typeof trackVariants> {}
interface ProgressIndicatorProps extends ProgressPrimitive.Indicator.Props, VariantProps<typeof indicatorVariants> {}

function Progress({ className, children, value, ...props }: ProgressProps) {
  return (
    <ProgressPrimitive.Root
      value={value}
      data-slot="progress"
      className={cn("flex flex-wrap gap-2", className)}
      {...props}
    >
      {children}
    </ProgressPrimitive.Root>
  )
}

function ProgressTrack({ className, size, ...props }: ProgressTrackProps) {
  return (
    <ProgressPrimitive.Track
      className={cn(trackVariants({ size }), className)}
      data-slot="progress-track"
      {...props}
    />
  )
}

function ProgressIndicator({ className, intent, ...props }: ProgressIndicatorProps) {
  return (
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      className={cn(indicatorVariants({ intent }), className)}
      {...props}
    />
  )
}

// ProgressLabel y ProgressValue se mantienen igual o pueden recibir estilos extra vía className
function ProgressLabel({ className, ...props }: ProgressPrimitive.Label.Props) {
  return <ProgressPrimitive.Label className={cn("text-xs font-semibold", className)} {...props} />
}

function ProgressValue({ className, ...props }: ProgressPrimitive.Value.Props) {
  return <ProgressPrimitive.Value className={cn("text-sm text-muted-foreground", className)} {...props} />
}

export { Progress, ProgressTrack, ProgressIndicator, ProgressLabel, ProgressValue }