"use client"

import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

export function Loader({ className }: { className?: string }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(100)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <div className="relative h-2 w-64 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-2000 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">Loading your experience...</div>
    </div>
  )
}
