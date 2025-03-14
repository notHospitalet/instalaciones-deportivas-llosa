import { cn } from "@/lib/utils"

interface PageHeaderProps {
  title: string
  description?: string
  className?: string
}

export function PageHeader({ title, description, className }: PageHeaderProps) {
  return (
    <div className={cn("mb-8", className)}>
      <h1 className="text-3xl font-bold text-green-800 mb-2">{title}</h1>
      {description && <p className="text-gray-600">{description}</p>}
    </div>
  )
}

