// src/app/page.tsx
import { Header } from '@/components/layout/Header'
import { ParallaxBackground } from '@/components/layout/ParallaxBackground'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Projects } from '@/components/sections/Projects'
import { Skills } from '@/components/sections/Skills'
import { Contact } from '@/components/sections/Contact'

export default function Home() {
  return (
    <main className="min-h-screen">
      <ParallaxBackground />
      <Header />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </main>
  )
}