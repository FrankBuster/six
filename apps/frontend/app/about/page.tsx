import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function About() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-3xl">
        <Link href="/">
          <Button variant="ghost" size="icon" className="mb-12">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>

        <h1 className="text-4xl font-bold mb-6">About Us</h1>

        <div className="space-y-6 text-lg">
          <p>Series is the first AI social network designed to connect you with your next inspiration.</p>

          <p>
            Our platform uses advanced AI to match you with content, ideas, and people that will inspire your next
            creative breakthrough.
          </p>

          <p>Founded in 2025, we're on a mission to create meaningful connections in the digital age.</p>
        </div>
      </div>
    </main>
  )
}
