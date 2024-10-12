"use client";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ReactLenis } from 'lenis/react'

/** 
import { TopButton } from "@/components/layout/top-button";
import { Announcement } from "@/components/layout/announcement";
*/

export default function GlobalTemplate({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <ReactLenis
        root
        options={{
          duration: 0.8,
          syncTouch: true
          
        }}
      >
        <div className="flex flex-col h-full min-h-screen">
            <Header />
            {children}
            <Footer />
            {/**<Announcement />*/}
            {/**<TopButton /> */}
        </div>
      </ReactLenis>
    )
}