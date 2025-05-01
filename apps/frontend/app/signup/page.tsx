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
    phoneNumber: "",
    instagramUsername: "",
    age: "",
    preference: "friends" as "dating" | "friends",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleGenderChange = (value: string) => {
    setFormData((prev) => ({ ...prev, gender: value === prev.gender ? "" : value }))
  }

  const handlePreferenceChange = (value: "dating" | "friends") => {
    setFormData((prev) => ({ ...prev, preference: value }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (!/^[a-zA-Z\s-']+$/.test(formData.name)) {
      newErrors.name = 'Invalid characters in name';
    }

    // Gender validation
    // Gender validation is optional
    // No validation needed for gender as it's optional


    // Phone validation
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Invalid phone number format';
    }

    // Instagram validation - only check if empty
    if (!formData.instagramUsername) {
      newErrors.instagramUsername = 'Instagram handle is required';
    }

    // Age validation
    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else {
      const ageNum = parseInt(formData.age);
      if (ageNum < 18) {
        newErrors.age = 'You must be at least 18 years old';
      } else if (ageNum > 120) {
        newErrors.age = 'Please enter a valid age';
      }
    }

    setError(Object.values(newErrors).join(', ') || null);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch("http://localhost:5000/api/follow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          targetUsername: formData.instagramUsername.replace('@', '') // Remove @ if present
        }),
      })

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to process Instagram handle");
      }

      const data = await response.json();
      if (data.success) {
        router.push("/success");
      } else {
        throw new Error(data.message || "Failed to process request");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setIsSubmitting(false)
    }
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
            {error && error.includes('Name is required') && <p className="text-sm text-red-500 mt-1">Name is required</p>}
            {error && error.includes('Invalid characters in name') && <p className="text-sm text-red-500 mt-1">Invalid characters in name</p>}
          </div>

          <div className="space-y-2">
            <Label>I identify as:</Label>
            <RadioGroup value={formData.gender} onValueChange={handleGenderChange} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female">Female</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">Other</Label>
              </div>
            </RadioGroup>
            {error && error.includes('Please select a gender') && <p className="text-sm text-red-500 mt-1">Please select a gender</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="age">How old are you?</Label>
            <Input
              type="number"
              id="age"
              name="age"
              placeholder="Enter your age"
              value={formData.age}
              onChange={handleChange}
              min="18"
              max="120"
              required
            />
            {error && error.includes('Age is required') && <p className="text-sm text-red-500 mt-1">Age is required</p>}
            {error && error.includes('You must be at least 18 years old') && <p className="text-sm text-red-500 mt-1">You must be at least 18 years old</p>}
            {error && error.includes('Please enter a valid age') && <p className="text-sm text-red-500 mt-1">Please enter a valid age</p>}
          </div>

          <div className="space-y-2">
            <Label>Looking for:</Label>
            <RadioGroup value={formData.preference} onValueChange={handlePreferenceChange} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dating" id="dating" />
                <Label htmlFor="dating">Dating</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="friends" id="friends" />
                <Label htmlFor="friends">Friends</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber">What's your phone number?</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              placeholder="+1 (000) 000-0000"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            {error && error.includes('Phone number is required') && <p className="text-sm text-red-500 mt-1">Phone number is required</p>}
            {error && error.includes('Invalid phone number format') && <p className="text-sm text-red-500 mt-1">Invalid phone number format</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="instagramUsername">What's your Instagram handle?</Label>
            <Input
              id="instagramUsername"
              name="instagramUsername"
              placeholder="@username"
              value={formData.instagramUsername}
              onChange={handleChange}
              required
            />
            {error && error.includes('Instagram handle is required') && <p className="text-sm text-red-500 mt-1">Instagram handle is required</p>}
          </div>

          <p className="text-sm text-muted-foreground">
            Accepting our follow request is required for the AI to process your match accurately.
          </p>

          {error && !error.includes('Name is required') && !error.includes('Invalid characters in name') && !error.includes('Please select a gender') && !error.includes('Age is required') && !error.includes('You must be at least 18 years old') && !error.includes('Please enter a valid age') && !error.includes('Phone number is required') && !error.includes('Invalid phone number format') && !error.includes('Instagram handle is required') && <p className="text-sm text-red-500">{error}</p>}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 text-white py-6"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  )
}
