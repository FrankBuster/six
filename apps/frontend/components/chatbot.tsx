"use client"

import { useEffect, useRef } from "react"

export function ChatbotWidget() {
  const chatbotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Create the chatbot element after the component mounts
    if (chatbotRef.current) {
      const chatbotElement = document.createElement("elevenlabs-convai")
      chatbotElement.setAttribute("agent-id", "H6UTjQ3MVWQC1tDOdMgD")
      chatbotRef.current.appendChild(chatbotElement)
    }

    return () => {
      // Clean up when component unmounts
      if (chatbotRef.current && chatbotRef.current.firstChild) {
        chatbotRef.current.removeChild(chatbotRef.current.firstChild)
      }
    }
  }, [])

  return <div ref={chatbotRef}></div>
}
