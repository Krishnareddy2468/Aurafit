"use client"

import { useState } from "react"
import { Heart } from "lucide-react"

export default function FeaturedProducts() {
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set())

  const products = [
    {
      id: 1,
      name: "Performance Leggings",
      price: "$148",
      category: "Bottoms",
      image: "/man-wearing-black-athletic-leggings-fitness.jpg",
    },
    {
      id: 2,
      name: "Support Sports Bra",
      price: "$98",
      category: "Tops",
      image: "/woman-wearing-premium-sports-bra-athletic.jpg",
    },
    {
      id: 3,
      name: "Luxury Hoodie",
      price: "$158",
      category: "Outerwear",
      image: "/man-and-woman-wearing-cream-luxury-athletic-hoodie.jpg",
    },
    {
      id: 4,
      name: "Training Tank",
      price: "$68",
      category: "Tops",
      image: "/woman-in-black-athletic-tank-top-training.jpg",
    },
  ]

  const toggleLike = (id: number) => {
    const newLiked = new Set(likedIds)
    if (newLiked.has(id)) newLiked.delete(id)
    else newLiked.add(id)
    setLikedIds(newLiked)
  }

  return (
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="mb-3 text-foreground">Featured</h2>
            <p className="font-light text-muted-foreground">Bestsellers from our latest collection</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="relative mb-4 overflow-hidden rounded-xl bg-muted aspect-square">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
                <button
                  onClick={() => toggleLike(product.id)}
                  className="absolute top-4 right-4 rounded-full bg-white/80 p-2 opacity-0 backdrop-blur-sm transition duration-200 group-hover:opacity-100"
                >
                  <Heart
                    className={`h-4 w-4 ${likedIds.has(product.id) ? "fill-[#14b8a6] text-[#14b8a6]" : "text-foreground"}`}
                  />
                </button>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                  {product.category}
                </p>
                <h3 className="text-sm font-light text-foreground transition group-hover:text-[#14b8a6]">
                  {product.name}
                </h3>
                <p className="text-sm font-semibold text-[#14b8a6]">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
