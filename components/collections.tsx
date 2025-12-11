"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"

export default function Collections() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  const collections = [
    {
      id: 1,
      name: "PERFORM",
      description: "High-intensity training",
      image: "/man-wearing-black-athletic-leggings-in-gym-trainin.jpg",
    },
    {
      id: 2,
      name: "ESSENCE",
      description: "Everyday luxury",
      image: "/woman-and-man-in-cream-yoga-athletic-set-together.jpg",
    },
    {
      id: 3,
      name: "PULSE",
      description: "Sports collection",
      image: "/man-and-woman-wearing-sports-bra-and-athletic-tops.jpg",
    },
  ]

  return (
    <section className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-20 space-y-4">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#14b8a6]">Collections</p>
          <h2 className="text-foreground">Curated Collections</h2>
          <div
            className="h-1 w-12 rounded-full"
            style={{ background: "linear-gradient(90deg, #14b8a6 0%, #06b6d4 100%)" }}
          />
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {collections.map((collection) => (
            <div
              key={collection.id}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredId(collection.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative mb-8 overflow-hidden rounded-3xl shadow-lg aspect-square">
                <img
                  src={collection.image || "/placeholder.svg"}
                  alt={collection.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="mb-2 text-2xl font-light tracking-widest font-serif text-foreground">
                    {collection.name}
                  </h3>
                  <p className="text-sm font-light text-muted-foreground">{collection.description}</p>
                </div>
                <button
                  className="flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-80"
                  style={{
                    background: "linear-gradient(90deg, #14b8a6 0%, #06b6d4 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Explore
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
