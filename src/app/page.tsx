"use client"

import Header from "@/components/Header"
import Hero from "@/components/Hero"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main className="min-h-screen font-sans">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* Footer */}
      <Footer />
    </main>
  )
}
