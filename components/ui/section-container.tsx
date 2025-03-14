import type React from "react"
import { cn } from "@/lib/utils"

interface SectionContainerProps {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
}

export function SectionContainer({ children, className, as: Component = "section" }: SectionContainerProps) {
  return (
    <Component className={cn("py-12 md:py-16", className)}>
      <div className="container mx-auto px-4">{children}</div>
    </Component>
  )
}

