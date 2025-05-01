"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"
import { ChatbotWidget } from "@/components/chatbot"
import { ThemeToggle } from "@/components/ui/theme-toggle"

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener("loadeddata", () => {
        setIsVideoLoaded(true)
      })
    }
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen w-full text-center px-4">
        <div className="absolute top-4 right-4 z-10">
          <ThemeToggle />
        </div>

        <div className="relative z-10">
          <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
            Six
          </h1>
          <div className="max-w-xl mx-auto">
            <p className="text-xl mb-4">One quick call with our AI. One introduction that could change everything.</p>
            <p className="text-lg mb-8 text-muted-foreground">Low effort. High return. What do you have to lose?</p>
          </div>

          <Link href="/signup">
            <Button className="rounded-full bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 text-white px-8 py-6 text-lg h-auto">
              Start
            </Button>
          </Link>
        </div>
      </section>

      

      {/* Chatbot Widget */}
      <div className="fixed bottom-4 right-4 z-50">
        <ChatbotWidget />
      </div>
    </main>
  )
}
