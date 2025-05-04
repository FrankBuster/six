"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    age: "",
    gender: "",
    phoneNumber: "",
    instagram: "",
    agreeToTerms: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <main className="min-h-screen bg-white text-black dark:bg-black dark:text-white flex flex-col items-center px-4 py-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="mb-4 w-20 h-20 md:w-28 md:h-28"
      >
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp_Image_2025-05-02_at_01.06.38_d839fae5-removebg-preview-P52XHHFvphG0yUUk5xcXsOcGzLqlQw.png"
          alt="Logo"
          width={112}
          height={112}
          className="w-full h-full object-contain"
        />
      </motion.div>

      <p className="text-center text-xl mb-4 opacity-80 -mt-2">
        the only form we&apos;ll ever ask you to fill
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <div className="space-y-2">
          <label htmlFor="firstName" className="text-lg font-light">
            Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full bg-zinc-100 dark:bg-zinc-800/80 text-black dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400 rounded-md px-4 py-2 focus:outline-none"
            placeholder="Enter your full name here"
          />
        </div>

        <div className="flex space-x-2">
          <div className="flex-1 space-y-2">
            <label htmlFor="age" className="text-lg font-light">
              Age
            </label>
            <input
              type="text"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full bg-zinc-100 dark:bg-zinc-800/80 text-black dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400 rounded-md px-4 py-2 focus:outline-none"
              placeholder="Age"
            />
          </div>

          <div className="flex-1 space-y-2">
            <label htmlFor="gender" className="text-lg font-light">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full bg-zinc-100 dark:bg-zinc-800/80 text-black dark:text-white px-4 py-[10px] rounded-md focus:outline-none"
            >
              <option value="" disabled>Select...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="phoneNumber" className="text-lg font-light">
            Phone number
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full bg-zinc-100 dark:bg-zinc-800/80 text-black dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400 rounded-md px-4 py-2 focus:outline-none"
            placeholder="Enter your phone number"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="instagram" className="text-lg font-light">
            Instagram
          </label>
          <input
            type="text"
            id="instagram"
            name="instagram"
            value={formData.instagram}
            onChange={handleChange}
            className="w-full bg-zinc-100 dark:bg-zinc-800/80 text-black dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400 rounded-md px-4 py-2 focus:outline-none"
            placeholder="Accept our request for verification"
          />
        </div>

        <p className="pt-1 text-xs text-zinc-600 dark:text-zinc-400 text-center leading-relaxed px-4">
          *Disclaimer: our matching algorithm reads between the lines and decodes your voice, tone, energy – the little
          things even your therapist wouldn't get
        </p>

        <div className="pt-6">
        <button
  type="submit"
  className="bg-gradient-to-r from-pink-500 to-blue-500 text-black hover:opacity-90 transition-opacity py-2.5 px-6 rounded-full text-lg font-medium mx-auto block"
>
  Join
</button>

        </div>
      </form>
    </main>
  )
}
