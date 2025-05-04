"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Confetti } from "@/components/ui/confetti"

export default function Results() {
  const changingWords = ["No forms", "No quizzes", "No surveys", "No Swiping"]
  const fixedWord = ""
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

      {/* Spinning Logo */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="mb-8 w-24 h-24 md:w-32 md:h-32"
      >
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp_Image_2025-05-02_at_01.06.38_d839fae5-removebg-preview-P52XHHFvphG0yUUk5xcXsOcGzLqlQw.png"
          alt="Logo"
          width={128}
          height={128}
          className="w-full h-full object-contain"
        />
      </motion.div>

      {/* Heading with responsive font size */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-gray-900 dark:text-white whitespace-nowrap">
        Welcome to{" "}
        <span className="bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent">
          Six
        </span>
      </h1>

      {/* Changing subheading with gradient and pulse effect */}
      <h2 className="text-xl sm:text-2xl md:text-3xl font-medium h-10 text-gray-800 dark:text-gray-300">
        {fixedWord}{" "}
        <span
          className={`inline-block transition-opacity duration-500 ${fade ? "opacity-100" : "opacity-0"} bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-pink-500`}
        >
          {changingWords[wordIndex]}
          <span className="animate-pulse text-blue-500">|</span>
        </span>
      </h2>
    </main>
  )
}
