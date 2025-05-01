"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [videoEnded, setVideoEnded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const router = useRouter()

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  const handleVideoEnd = () => {
    setVideoEnded(true)
  }

  const goToQuestions = () => {
    router.push("/questions/1")
  }

  return (
    <section id="video" className="w-full min-h-screen flex flex-col items-center justify-center relative">
      {!isPlaying ? (
        <div className="flex flex-col items-center justify-center">
          <Button
            onClick={handlePlayVideo}
            variant="outline"
            size="icon"
            className="rounded-full bg-black text-white hover:bg-black/90 h-14 w-14 mb-6"
          >
            <ArrowRight className="h-6 w-6" />
          </Button>
          <p className="text-sm text-muted-foreground">Click to watch</p>
        </div>
      ) : (
        <>
          <video ref={videoRef} className="w-full h-screen object-cover" onEnded={handleVideoEnd} controls={false}>
            <source src="/placeholder-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {isPlaying && !videoEnded && (
            <div className="absolute bottom-10 left-0 right-0 flex flex-col items-center">
              <h1 className="text-6xl font-bold mb-4 text-white">Series</h1>
              <div className="w-64 h-1 bg-gray-300 rounded-full overflow-hidden">
                <div className="h-full bg-white animate-loading-bar"></div>
              </div>
            </div>
          )}

          {videoEnded && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <Button onClick={goToQuestions} className="rounded-full bg-white text-black hover:bg-white/90">
                Start Questionnaire
              </Button>
            </div>
          )}
        </>
      )}
    </section>
  )
}
