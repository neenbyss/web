import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import { PageTransition } from "@/components/transition/page-transition"

export default function Template({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <PageTransition>
      <Header />
      {children}
      <Footer />
    </PageTransition>
  )
}
