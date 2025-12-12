"use client"

import Link from "next/link"
import { Menu, ShoppingBag, X } from "lucide-react"
import { useState } from "react"
import AuraFitLogo from "./aurafit-logo"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <AuraFitLogo />
          <span
            className="hidden text-3xl font-bold tracking-wider sm:inline"
            style={{
              background: "linear-gradient(135deg, #0d9488 0%, #06b6d4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            AURAFIT
          </span>
        </Link>

        <nav className="hidden gap-8 md:flex">
          {["Shop", "Collection", "Style AI", "Contact"].map((item) => (
            <Link
              key={item}
              href="#"
              className="text-sm font-medium tracking-wide text-foreground hover:text-[#0d9488] transition-colors"
            >
              {item}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <ShoppingBag className="h-5 w-5 text-foreground" />
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-foreground">
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <nav className="space-y-3 border-t border-border/40 bg-background/80 p-4 md:hidden">
          {["Shop", "Collection", "Style AI", "Contact"].map((item) => (
            <Link key={item} href="#" className="block text-sm font-light text-foreground hover:text-[#0d9488]">
              {item}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
