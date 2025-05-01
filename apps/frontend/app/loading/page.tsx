"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Loader } from "@/components/ui/loader"

export default function LoadingPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect after 3 seconds
    const timer = setTimeout(() => {
      router.push("/signup")
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="relative z-10">
        <Loader />
      </div>
    </div>
  )
}
