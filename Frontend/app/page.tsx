import Navigation from "@/components/layout/navbar"
import HeroSection from "@/components/sections/hero-section"
import Footer from "@/components/layout/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <Footer />
    </main>
  )
}
