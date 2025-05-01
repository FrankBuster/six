"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

export function BackgroundBeams({
  className,
  beamColor1 = "var(--beam-color-1, #7000ff)",
  beamColor2 = "var(--beam-color-2, #ff00e5)",
}: {
  className?: string
  beamColor1?: string
  beamColor2?: string
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect()
      canvas.width = width
      canvas.height = height
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Parameters
    const beams = 10
    const beamLength = Math.min(canvas.width, canvas.height) * 0.4
    const beamWidth = 10
    const speed = 0.01

    const particles: {
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      color: string
    }[] = []

    // Create particles
    for (let i = 0; i < beams; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius: beamWidth,
        color: i % 2 === 0 ? beamColor1 : beamColor2,
      })
    }

    // Animation
    let animationFrameId: number
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle, i) => {
        // Move particles
        particle.x += particle.vx
        particle.y += particle.vy

        // Bounce off walls
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Draw beam
        ctx.save()
        ctx.translate(particle.x, particle.y)
        ctx.rotate(Math.atan2(particle.vy, particle.vx))

        // Create gradient with proper rgba colors
        const gradient = ctx.createLinearGradient(0, -particle.radius, beamLength, 0)
        if (particle.color.startsWith("rgba")) {
          // For rgba colors, create new rgba colors with different opacity
          const baseColor = particle.color.replace(/rgba$$(.*),\s*[\d.]+$$/, "rgba($1,")
          gradient.addColorStop(0, baseColor + " 0)")
          gradient.addColorStop(0.5, baseColor + " 0.4)")
          gradient.addColorStop(1, baseColor + " 0)")
        } else {
          // For hex colors, append hex opacity
          gradient.addColorStop(0, `${particle.color}00`)
          gradient.addColorStop(0.5, `${particle.color}66`)
          gradient.addColorStop(1, `${particle.color}00`)
        }

        ctx.fillStyle = gradient
        ctx.fillRect(0, -particle.radius, beamLength, particle.radius * 2)
        ctx.restore()

        // Check collisions with other particles
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - particle.x
          const dy = particles[j].y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < particle.radius + particles[j].radius) {
            // Simple collision response
            const angle = Math.atan2(dy, dx)
            const sin = Math.sin(angle)
            const cos = Math.cos(angle)

            // Rotate velocity vectors
            const vx1 = particle.vx * cos + particle.vy * sin
            const vy1 = particle.vy * cos - particle.vx * sin
            const vx2 = particles[j].vx * cos + particles[j].vy * sin
            const vy2 = particles[j].vy * cos - particles[j].vx * sin

            // Swap velocities
            particle.vx = vx2 * cos - vy1 * sin
            particle.vy = vy1 * cos + vx2 * sin
            particles[j].vx = vx1 * cos - vy2 * sin
            particles[j].vy = vy2 * cos + vx1 * sin
          }
        }
      })

      animationFrameId = window.requestAnimationFrame(render)
    }

    render()

    // Fade in
    setOpacity(1)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [beamColor1, beamColor2])

  return (
    <div className={cn("fixed inset-0 z-0 transition-opacity duration-1000", className)} style={{ opacity }}>
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  )
}
