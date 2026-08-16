import "./globals.css"

import type { Metadata } from "next"
import { Geist, Geist_Mono, Gelasio } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"

import { cn } from "@/lib/utils"

const gelasioSerifHeading = Gelasio({
  subsets: ["latin"],
  variable: "--font-heading",
})

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: {
    default: "Neenbyss Studios — Arquitectos Digitales",
    template: "%s — Neenbyss Studios",
  },
  description:
    "Desarrollo de software, scripts FiveM y UI/UX a tu medida. Servicios profesionales completamente personalizados.",
}

export default function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable,
        gelasioSerifHeading.variable
      )}
    >
      <body>
        <ThemeProvider>
          <TooltipProvider delay={700}>
            {children}
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
