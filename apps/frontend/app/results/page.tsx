"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Phone } from "lucide-react"
import { Confetti } from "@/components/ui/confetti"
import { ChatbotWidget } from "@/components/chatbot"
import { ThemeToggle } from "@/components/ui/theme-toggle"

export default function Results() {
  // This would normally be determined by the user's answers
  const userColor = "Yellow"
  const userPersonality = "Optimistic"
  const phoneNumber = "(855) 714-1806"

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md text-center">
        <div className="mb-12">
          <Link href="/">
            <Button variant="ghost" size="icon" className="p-0">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
        </div>

        {/* Confetti effects */}
        <Confetti />

        <h1 className="text-4xl font-bold mb-4">Welcome to Series</h1>
        <p className="text-lg mb-10 text-muted-foreground">Your AI friend is ready to connect</p>

        <div className="mb-8">
          <p className="text-sm text-yellow-500 font-medium">Your Color</p>
          <h2 className="text-2xl font-bold">
            {userColor} ({userPersonality})
          </h2>
        </div>

        <Button className="w-full bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 rounded-full mb-8">
          Open iMessage
        </Button>

        <div className="flex items-center justify-center gap-2 mb-2">
          <Phone className="h-4 w-4" />
          <span className="font-medium">{phoneNumber}</span>
        </div>

        <p className="text-sm text-muted-foreground">Android user? Text "Join" to this number!</p>
      </div>

      {/* Chatbot Widget */}
      <div className="fixed bottom-4 right-4 z-50">
        <ChatbotWidget />
      </div>
    </main>
  )
}
