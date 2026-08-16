"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  direction?: "horizontal" | "vertical";
  reverse?: boolean;
  pauseOnHover?: boolean;
  duration?: number;
  gap?: string;
  className?: string;
  duplicate?: number
}

export const Marquee = ({
  children,
  direction = "horizontal",
  reverse = false,
  pauseOnHover = false,
  duration = 25,
  gap = "1rem",
  className,
  duplicate = 2
}: MarqueeProps) => {
  const isHorizontal = direction === "horizontal";

  return (
    <div
      className={cn(
        "group flex overflow-hidden",
        isHorizontal ? "flex-row w-full" : "flex-col h-full",
        className
      )}
      style={{
        "--duration": `${duration}s`,
        "--gap": gap,
        gap: "var(--gap)",
      } as React.CSSProperties}
    >
      {/* Duplicamos el contenido para el loop infinito sin cortes */}
      {[...Array(duplicate)].map((_, index) => (
        <motion.div
          key={index}
          className={cn(
            "flex shrink-0 justify-around",
            isHorizontal 
              ? "flex-row animate-marquee" 
              : "flex-col animate-marquee-vertical",
            // Control de pausa desde el contenedor principal (group-hover)
            pauseOnHover && "group-hover:[animation-play-state:paused]",
            // Inversión de dirección
            reverse && "[animation-direction:reverse]"
          )}
          style={{ gap: "var(--gap)" }}
        >
          {children}
        </motion.div>
      ))}
    </div>
  );
};