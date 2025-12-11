"use client"

import { useState } from "react"

export default function AthleteShowcase() {
  const [hoveredId, setHoveredId] = useState(null)

  const athletes = [
    {
      id: 1,
      name: "Sofia & Marcus",
      title: "Professional Athletes",
      image: "/professional-man-and-woman-athletes-in-premium-act.jpg",
      specialty: "Performance Duo",
    },
    {
      id: 2,
      name: "Emma & James",
      title: "Fitness Coaches",
      image: "/fit-male-and-female-fitness-coaches-training-in-lu.jpg",
      specialty: "Strength Training",
    },
    {
      id: 3,
      name: "Jasmine & Alex",
      title: "Wellness Instructors",
      image: "/male-and-female-yoga-instructor-in-premium-yoga-we.jpg",
      specialty: "Wellness",
    },
    {
      id: 4,
      name: "Lisa & David",
      title: "CrossFit Athletes",
      image: "/male-and-female-crossfit-athletes-in-professional-.jpg",
      specialty: "Competition",
    },
  ]

  return (
    <section className="py-20 md:py-28 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-serif font-light text-foreground mb-3">
            Meet the AuraFit Collective
          </h2>
          <p className="text-muted-foreground font-light text-lg">Inspiring athletes reshaping fitness fashion</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {athletes.map((athlete) => (
            <div
              key={athlete.id}
              onMouseEnter={() => setHoveredId(athlete.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group cursor-pointer"
            >
              <div className="relative aspect-square bg-muted rounded-2xl overflow-hidden mb-5">
                <img
                  src={athlete.image || "/placeholder.svg"}
                  alt={athlete.name}
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/70 to-black/0 transition duration-500 flex items-end p-4 ${
                    hoveredId === athlete.id ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div>
                    <p className="text-white font-light text-sm mb-1">{athlete.specialty}</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-serif font-light text-foreground group-hover:text-[#14b8a6] transition">
                  {athlete.name}
                </h3>
                <p className="text-xs text-muted-foreground font-light">{athlete.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
