import Header from "@/components/header"
import Hero from "@/components/hero"
import Collections from "@/components/collections"
import FeaturedProducts from "@/components/featured-products"
import Newsletter from "@/components/newsletter"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="bg-background text-foreground">
      <Header />
      <Hero />
      <Collections />
      <FeaturedProducts />
      <Newsletter />
      <Footer />
    </main>
  )
}
