"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ThemeToggle } from "@/components/ui/theme-toggle"

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    phone: "",
    instagram: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleGenderChange = (value: string) => {
    setFormData((prev) => ({ ...prev, gender: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/loading")
    // In a real app, you would submit the form data to your backend here
    setTimeout(() => {
      router.push("/questions/1")
    }, 2000)
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md rounded-lg bg-background p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-8">Let's get to know you</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">What's your name?</Label>
            <Input
              id="name"
              name="name"
              placeholder="Your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>I identify as:</Label>
            <RadioGroup value={formData.gender} onValueChange={handleGenderChange} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="man" id="man" />
                <Label htmlFor="man">Man</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="woman" id="woman" />
                <Label htmlFor="woman">Woman</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">Other</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">What's your phone number?</Label>
            <Input
              id="phone"
              name="phone"
              placeholder="+1 (000) 000-0000"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="instagram">What's your Instagram handle?</Label>
            <Input
              id="instagram"
              name="instagram"
              placeholder="@username"
              value={formData.instagram}
              onChange={handleChange}
              required
            />
          </div>

          <p className="text-sm text-muted-foreground">
            Accepting our follow request is required for the AI to process your match accurately.
          </p>

          <Button
            type="submit"
            className="w-full rounded-full bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 text-white py-6"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  )
}
