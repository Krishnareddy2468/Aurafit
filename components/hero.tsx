"use client"

import { useState, useEffect } from "react"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"

const slideShowImages = [
  {
    src: "/hero-fitness-costumes.jpg",
    label: "Fitness",
    alt: "Beautiful men and women in premium fitness activewear",
  },
  {
    src: "/hero-casual-costumes.jpg",
    label: "Casual",
    alt: "Stylish men and women in casual wear",
  },
  {
    src: "/hero-business-costumes.jpg",
    label: "Business",
    alt: "Professional men and women in business attire",
  },
  {
    src: "/hero-traditional-costumes.jpg",
    label: "Traditional",
    alt: "Men and women in elegant traditional wear",
  },
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideShowImages.length)
      setImageLoaded(false)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slideShowImages.length) % slideShowImages.length)
    setImageLoaded(false)
  }

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slideShowImages.length)
    setImageLoaded(false)
  }

  const currentImage = slideShowImages[currentSlide]

  return (
    <section className="overflow-hidden bg-background py-16 pt-40 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
          <div className="space-y-8">
            <div className="space-y-6">
              <p className="text-xs font-semibold tracking-widest uppercase text-[#0d9488]">Powered by AI Styling</p>
              <h1 className="text-balance leading-tight text-foreground">Find Your Perfect Fit</h1>
              <div className="h-1 w-16 rounded-full" style={{ background: "#0d9488" }} />
            </div>

            <p className="max-w-xl font-light leading-relaxed text-muted-foreground">
              AI-powered styling meets premium activewear. Discover personalized outfit recommendations tailored to your
              body, style, and lifestyle.
            </p>

            <div className="flex flex-col gap-4 pt-4 sm:flex-row">
              <button
                className="flex items-center justify-center gap-2 rounded-2xl px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                style={{ backgroundColor: "#0d9488" }}
              >
                Try Style AI
                <ArrowRight className="h-4 w-4" />
              </button>
              <button className="rounded-2xl border-2 border-foreground/20 px-8 py-3 font-semibold text-foreground transition-all duration-300 hover:border-[#0d9488] hover:bg-[#0d9488]/5">
                Browse Collection
              </button>
            </div>
          </div>

          <div className="relative aspect-square">
            <div
              className="absolute inset-0 rounded-3xl blur-2xl opacity-40"
              style={{
                background: "linear-gradient(135deg, rgba(13, 148, 136, 0.3) 0%, rgba(20, 184, 166, 0.2) 100%)",
              }}
            />
            <div className="relative h-full w-full rounded-3xl overflow-hidden bg-muted">
              <img
                src={currentImage.src || "/placeholder.svg"}
                alt={currentImage.alt}
                onLoad={() => setImageLoaded(true)}
                className={`h-full w-full object-cover shadow-2xl transition-all duration-700 ${
                  imageLoaded ? "scale-100 opacity-100" : "scale-95 opacity-0"
                }`}
              />

              {/* Slide label */}
              <div className="absolute bottom-6 left-6 bg-black/40 backdrop-blur px-4 py-2 rounded-full">
                <p className="text-white font-semibold text-sm">{currentImage.label}</p>
              </div>

              {/* Previous button */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur transition-all duration-300"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {/* Next button */}
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur transition-all duration-300"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* Slide indicators */}
              <div className="absolute bottom-6 right-6 flex gap-2">
                {slideShowImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentSlide(index)
                      setImageLoaded(false)
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide ? "bg-white w-6" : "bg-white/50 w-2 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
