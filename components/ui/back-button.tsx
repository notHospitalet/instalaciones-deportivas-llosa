import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

interface BackButtonProps {
  href: string
  label?: string
  className?: string
}

export function BackButton({ href, label = "Volver", className }: BackButtonProps) {
  return (
    <Link
      href={href}
      className={cn("inline-flex items-center text-green-700 hover:text-green-900 transition-colors mb-6", className)}
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      {label}
    </Link>
  )
}

