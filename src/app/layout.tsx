import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

import { Outfit } from 'next/font/google'


export const metadata: Metadata = {
  title: {
    default: "Neenbyss - Arquitectos digitales",
    template: "%s | Neenbyss - Arquitectos digitales"
  },
  description: "",
};

const font = Outfit({
  subsets: ["latin"]
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={font.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
