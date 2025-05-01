"use client"

import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string
    className?: string
  }[]
  className?: string
  cursorClassName?: string
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const typingSpeed = isDeleting ? 50 : 100 // Faster when deleting
    const wordComplete = !isDeleting && currentText === words[currentWordIndex].text
    const textEmpty = isDeleting && currentText === ""

    const timeout = setTimeout(() => {
      // If we've completed typing the word
      if (wordComplete) {
        // If this is the last word, mark as complete
        if (currentWordIndex === words.length - 1) {
          setIsComplete(true)
          return
        }

        // Otherwise, start deleting after a pause
        setTimeout(() => {
          setIsDeleting(true)
        }, 1000)
        return
      }

      // If we've deleted the word
      if (textEmpty) {
        setIsDeleting(false)
        setCurrentWordIndex((prev) => (prev + 1) % words.length)
        return
      }

      // Otherwise, continue typing or deleting
      setCurrentText((prev) => {
        if (isDeleting) {
          return prev.slice(0, -1)
        } else {
          return words[currentWordIndex].text.slice(0, prev.length + 1)
        }
      })
    }, typingSpeed)

    return () => clearTimeout(timeout)
  }, [currentText, currentWordIndex, isDeleting, words, isComplete])

  return (
    <div className={cn("flex items-center space-x-1", className)}>
      <span className="inline-block">
        {currentText}
        {!isComplete && (
          <span className={cn("ml-0.5 inline-block h-4 w-0.5 animate-blink bg-black", cursorClassName)}></span>
        )}
      </span>
    </div>
  )
}
