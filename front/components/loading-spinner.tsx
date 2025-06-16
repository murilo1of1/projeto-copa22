import { Loader2 } from "lucide-react"

interface LoadingSpinnerProps {
  message?: string
}

export function LoadingSpinner({ message = "Carregando..." }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <Loader2 className="h-8 w-8 animate-spin text-amber-400" />
      <p className="text-slate-400">{message}</p>
    </div>
  )
}
