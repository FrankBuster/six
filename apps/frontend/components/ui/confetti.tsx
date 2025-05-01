"use client"

import { useEffect } from "react"
import confetti from "canvas-confetti"

export function Confetti({ className }: { className?: string }) {
  useEffect(() => {
    const duration = 5 * 1000 // 5 seconds
    const animationEnd = Date.now() + duration
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"]

    // Function to fire confetti from a specific origin
    const fireConfetti = (origin: { x: number; y: number }) => {
      confetti({
        particleCount: 3,
        angle: origin.x === 0 ? 60 : 120,
        spread: 55,
        origin,
        colors,
        startVelocity: 45,
        gravity: 1,
        drift: origin.x === 0 ? 1 : -1,
      })
    }

    // Set up interval for continuous confetti
    const interval = setInterval(() => {
      if (Date.now() > animationEnd) {
        clearInterval(interval)
        return
      }

      // Fire from left side
      fireConfetti({ x: 0, y: 0.3 })

      // Fire from right side
      fireConfetti({ x: 1, y: 0.3 })
    }, 100)

    // Clean up
    return () => clearInterval(interval)
  }, [])

  // This component doesn't render anything visible
  return null
}
