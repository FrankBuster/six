"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"

export default function VideoPage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const router = useRouter()

  useEffect(() => {
    // Auto-play video when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Video autoplay failed:", error)
      })
    }
  }, [])

  const handleVideoEnd = () => {
    // Navigate to first question when video ends
    router.push("/questions/1")
  }

  return (
    <div className="relative w-full h-screen">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src="https://videos.pexels.com/video-files/2344549/2344549-uhd_2560_1440_25fps.mp4"
        onEnded={handleVideoEnd}
        muted
        playsInline
      />

      <div className="absolute bottom-10 left-0 right-0 flex flex-col items-center">
        <h1 className="text-6xl font-bold mb-4 text-white">Series</h1>
        <div className="w-64 h-1 bg-gray-300 rounded-full overflow-hidden">
          <div className="h-full bg-white animate-loading-bar"></div>
        </div>
      </div>
    </div>
  )
}
