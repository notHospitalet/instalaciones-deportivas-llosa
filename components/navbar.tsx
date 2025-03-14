"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"

const routes = [
  { href: "/", label: "Inicio" },
  { href: "/reservas-deportivas", label: "Deportes" },
  { href: "/reservas-gimnasio", label: "Gimnasio" },
  { href: "/reservas-piscina", label: "Piscina" },
  { href: "/contacto", label: "Contacto" },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white",
      )}
    >
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-10 h-10 overflow-hidden rounded-full bg-green-100 transition-transform group-hover:scale-110">
              <Image
                src="/placeholder.svg?height=40&width=40"
                alt="La Llosa Logo"
                width={40}
                height={40}
                className="object-contain p-1"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-green-700 leading-tight">La Llosa</span>
              <span className="text-xs text-green-600/80 leading-tight -mt-1">Servicios Deportivos</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  pathname === route.href
                    ? "bg-green-100 text-green-800"
                    : "text-gray-700 hover:bg-green-50 hover:text-green-700",
                )}
              >
                {route.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%] sm:w-[350px] bg-white">
              <SheetHeader className="mb-6">
                <SheetTitle className="text-green-700">Menú</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-2">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "px-4 py-3 rounded-md text-base font-medium transition-colors",
                      pathname === route.href
                        ? "bg-green-100 text-green-800"
                        : "text-gray-700 hover:bg-green-50 hover:text-green-700",
                    )}
                  >
                    {route.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

