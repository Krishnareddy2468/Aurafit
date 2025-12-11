"use client"

import type React from "react"

import { useState } from "react"
import { CheckCircle2 } from "lucide-react"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail("")
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  return (
    <section
      className="py-20 md:py-28 text-white"
      style={{ background: "linear-gradient(90deg, #a78bfa 0%, #34d399 100%)" }}
    >
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="mb-4 text-balance leading-tight font-serif text-5xl md:text-6xl font-light">
          Discover Your Style
        </h2>
        <p className="mb-10 font-light text-white/90">
          Get exclusive access to new collections, personalized recommendations, and insider styling tips.
        </p>

        {submitted ? (
          <div className="flex items-center justify-center gap-2 animate-in fade-in text-lg font-light">
            <CheckCircle2 className="h-6 w-6" />
            Thank you for subscribing!
          </div>
        ) : (
          <form className="flex flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-lg bg-white/20 px-5 py-4 font-light placeholder:text-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50 text-white"
              required
            />
            <button
              type="submit"
              className="rounded-lg bg-white px-8 py-4 font-semibold text-[#a78bfa] whitespace-nowrap transition duration-200 hover:bg-white/90 active:scale-95"
            >
              Subscribe
            </button>
          </form>
        )}

        <p className="mt-4 text-xs font-light text-white/70">We respect your privacy. Unsubscribe anytime.</p>
      </div>
    </section>
  )
}
