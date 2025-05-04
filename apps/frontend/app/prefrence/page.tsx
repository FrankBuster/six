"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SelectionPage() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const options = [
    { id: "friend", label: "A Friend" },
    { id: "date", label: "A Date" },
  ]

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
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

      <h1 className="mb-8 text-xl md:text-2xl tracking-tight font-serif text-gray-800 dark:text-gray-300 transition-colors duration-300">
        I&apos;m looking for...
      </h1>

      <div className="mb-8 flex flex-col gap-4 w-full max-w-xs">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => setSelectedOption(option.id)}
            className={`w-full px-6 py-4 rounded-full border-2 text-xl md:text-2xl font-serif transition-all duration-300 ${
              selectedOption === option.id
                ? "border-4 border-pink-500"
                : "border-2 border-gray-300 hover:border-pink-400"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    <Link href="/results">
      <Button
        size="lg"
        className="text-xl px-8 py-6 font-serif text-white bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 rounded-full transition duration-300 ease-in-out"
        disabled={!selectedOption}
      >
        Next
      </Button>
    </Link>
    </div>
  )
}
