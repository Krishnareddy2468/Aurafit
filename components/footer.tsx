import { Instagram, Twitter, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-border/20 bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-4">
          <div>
            <h3
              className="mb-4 text-2xl font-light tracking-widest font-serif"
              style={{
                background: "linear-gradient(90deg, #a78bfa 0%, #34d399 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              AURAFIT
            </h3>
            <p className="max-w-xs font-light leading-relaxed text-background/70">
              AI-powered styling meets premium activewear. Discover your perfect fit.
            </p>
          </div>

          {[
            { title: "Shop", links: ["All Products", "New Arrivals", "Collections", "Sale"] },
            { title: "Support", links: ["Contact Us", "Shipping Info", "Returns", "Size Guide"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-sm font-semibold tracking-wide uppercase text-background">{col.title}</h4>
              <ul className="space-y-3 text-sm">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="font-light text-background/70 transition hover:text-background/100">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="mb-4 text-sm font-semibold tracking-wide uppercase text-background">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="text-background/70 transition hover:text-background/100">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/70 transition hover:text-background/100">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/70 transition hover:text-background/100">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 pt-8 flex flex-col items-center justify-between text-sm font-light text-background/70 md:flex-row">
          <p>&copy; 2025 AuraFit. All rights reserved.</p>
          <div className="mt-4 flex gap-6 text-xs md:mt-0">
            {["Privacy Policy", "Terms of Service", "Cookie Settings"].map((link) => (
              <a key={link} href="#" className="transition hover:text-background/100">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
