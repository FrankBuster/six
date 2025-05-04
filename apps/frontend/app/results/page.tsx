"use client"

import { useEffect, useState } from "react"
import { Confetti } from "@/components/ui/confetti"

export default function Results() {
  const changingWords = ["forms", "quizzes", "surveys", "applications"]
  const fixedWord = "NO"
  const [wordIndex, setWordIndex] = useState(0)
  const [fade, setFade] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setWordIndex((prevIndex) => (prevIndex + 1) % changingWords.length)
        setFade(true)
      }, 200)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-white dark:bg-black relative">
      {/* Confetti effect */}
      <Confetti />

      {/* Heading with blue-pink gradient word "SIX" */}
      <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4 font-serif">
        Welcome to{" "}
        <span className="bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent">
          SIX
        </span>
      </h1>

      {/* Changing subheading */}
      <h2 className="text-3xl font-medium h-10 font-mono text-gray-800 dark:text-gray-300">
        {fixedWord}{" "}
        <span
          className={`inline-block transition-opacity duration-500 ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        >
          {changingWords[wordIndex]}
        </span>
      </h2>
    </main>
  )
}
