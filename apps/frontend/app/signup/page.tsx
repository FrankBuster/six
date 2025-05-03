"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import type React from "react"

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    genderPreferences: "",
    dateFriend: "",
    phoneNumber: "",
    instagram: "",
    agreeToTerms: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, agreeToTerms: checked }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (!/^[a-zA-Z\s-']+$/.test(formData.name)) {
      newErrors.name = 'Invalid characters in name';
    }

    // Phone validation
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Invalid phone number format';
    }

    // Instagram validation - only check if empty
    if (!formData.instagram) {
      newErrors.instagram = 'Instagram handle is required';
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
          targetUsername: formData.instagram.replace('@', ''), // Remove @ if present
          phoneNumber: formData.phoneNumber, // Add phone number
          name: formData.name, // Include name for better user identification
          age: formData.age, // Include additional user data
          genderPreferences: formData.genderPreferences,
          dateFriend: formData.dateFriend
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
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="w-full max-w-md px-4 py-8 mx-auto">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-light tracking-tight">I’m looking for...</h1>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900/50 text-white rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label 
              htmlFor="name"
              className="block text-xl font-semibold"
            >
              First Name
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="h-12 w-full rounded-xl border-none bg-zinc-900 text-white text-base placeholder:text-zinc-500"
              placeholder="your name"
            />
          </div>

          <div className="space-y-2">
            <Label 
              htmlFor="age" 
              className="block text-xl font-semibold"
            >
              Age
            </Label>
            <Input
              id="age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              className="h-12 w-full rounded-xl border-none bg-zinc-900 text-white text-base placeholder:text-zinc-500"
              placeholder="25"
            />
          </div>

          <div className="space-y-2">
            <Label 
              htmlFor="genderPreferences" 
              className="block text-xl font-semibold"
            >
              Gender 
            </Label>
            <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, genderPreferences: value }))}>
              <SelectTrigger className="h-12 w-full rounded-xl border-none bg-zinc-900 text-white">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 text-white">
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label 
              htmlFor="dateFriend" 
              className="block text-xl font-semibold"
            >
              Date / friend
            </Label>
            <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, dateFriend: value }))}>
              <SelectTrigger className="h-12 w-full rounded-xl border-none bg-zinc-900 text-white">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 text-white">
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="friend">Friend</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label 
              htmlFor="phoneNumber" 
              className="block text-xl font-semibold"
            >
              Phone number
            </Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="h-12 w-full rounded-xl border-none bg-zinc-900 text-white text-base placeholder:text-zinc-500"
              placeholder="+33612345678"
            />
          </div>

          <div className="space-y-2">
            <Label 
              htmlFor="instagram" 
              className="block text-xl font-semibold"
            >
              Instagram username
            </Label>
            <Input
              id="instagram"
              name="instagram"
              value={formData.instagram}
              onChange={handleChange}
              className="h-12 w-full rounded-xl border-none bg-zinc-900 text-white text-base placeholder:text-zinc-500"
              placeholder="@username"
            />
          </div>
          
          <div className="flex items-center space-x-2 pt-2">
            <Checkbox 
              id="agreeToTerms" 
              checked={formData.agreeToTerms}
              onCheckedChange={handleCheckboxChange}
              className="border-white data-[state=checked]:bg-white data-[state=checked]:text-black"
            />
            <Label 
              htmlFor="agreeToTerms" 
              className="text-sm text-zinc-400"
            >
              I agree to the terms and conditions
            </Label>
          </div>

          <Button 
            type="submit" 
            className="h-12 w-full rounded-xl bg-white text-black hover:bg-gray-200 mt-4 font-semibold text-base"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Call Me Six"}
          </Button>
        </form>
      </div>
    </div>
  )
}