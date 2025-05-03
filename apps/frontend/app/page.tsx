'use client';

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"

export default function Home() {
  const [text, setText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  const [typingSpeed, setTypingSpeed] = useState(150)

  const phrases = [
    
    " introduction",
    " call with Six",
    
    
    
  ]

  useEffect(() => {
    const handleTyping = () => {
      const currentIndex = loopNum % phrases.length
      const fullText = phrases[currentIndex]

      const updatedText = isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1)

      setText(updatedText)

      if (!isDeleting && updatedText === fullText) {
        // Pause before starting to delete
        setTimeout(() => setIsDeleting(true), 1000)
      } else if (isDeleting && updatedText === "") {
        // Move to next phrase after deletion
        setIsDeleting(false)
        setLoopNum(loopNum + 1)
      }

      // Speed based on typing/deleting
      setTypingSpeed(isDeleting ? 30 : 150)
    }

    const timer = setTimeout(handleTyping, typingSpeed)
    return () => clearTimeout(timer)
  }, [text, isDeleting, loopNum, typingSpeed, phrases])

  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen w-full text-center px-4">
        <div className="absolute top-4 right-4 z-10">
          <ThemeToggle />
        </div>

        <div className="relative z-10">
          <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-pink-500">
            Six
          </h1>
          <div className="max-w-xl mx-auto">
            <p className="text-xl mb-1">Your AI matchmaker.</p>
            <p className="text-xl mb-4">A friend or a date — you pick</p>
            <div className="h-16 flex items-center justify-center">
              <p className="text-xl font-medium">
                <span>One </span>
                <span className={`bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-pink-500 ${isDeleting ? 'invisible' : ''}`}>
                  {text}
                  <span className="animate-pulse text-blue-500">|</span>
                </span>
              </p>
            </div>
          </div>

          <Link href="/prefrence">
            <Button className="rounded-full bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 text-white px-8 py-6 text-lg h-auto mt-4">
              Start
            </Button>
          </Link>
        </div>
      </section>

      {/* Chatbot Widget */}
      <div className="fixed bottom-4 right-4 z-50"></div>
    </main>
  )
}
