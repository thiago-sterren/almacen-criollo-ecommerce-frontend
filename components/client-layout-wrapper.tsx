"use client"

import { usePathname } from "next/navigation"
import NavBar from "./navbar"
import Footer from "./footer"
import { Toaster } from "sonner"
import useSyncCartStock from "@/api/useSyncCartStock"

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  useSyncCartStock()
  const pathname = usePathname()
  const showLayout = !pathname.startsWith("/checkout")

  return (
    <>
      {showLayout && <NavBar />}
      {children}
      {showLayout && <Footer />}
      <Toaster richColors position="bottom-right" />
    </>
  )
}