"use client"

import type React from "react"

import { Check } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface PriceCardProps {
  title: string
  description?: string
  price: string | React.ReactNode
  isSelected?: boolean
  onClick?: () => void
  className?: string
}

export function PriceCard({ title, description, price, isSelected = false, onClick, className }: PriceCardProps) {
  return (
    <Card
      className={cn(
        "cursor-pointer transition-all duration-200 hover:shadow-md",
        isSelected ? "ring-2 ring-green-500" : "",
        className,
      )}
      onClick={onClick}
    >
      <CardContent className="p-6 flex justify-between items-center">
        <div>
          <h3 className="font-bold text-lg">{title}</h3>
          {description && <p className="text-gray-600">{description}</p>}
        </div>
        <div className="flex items-center">
          <span className="text-2xl font-bold text-green-700 mr-2">{price}</span>
          {isSelected && <Check className="h-5 w-5 text-green-600" />}
        </div>
      </CardContent>
    </Card>
  )
}

