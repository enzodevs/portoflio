// src/components/layout/ParallaxBackground.tsx
'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export function ParallaxBackground() {
  const [windowHeight, setWindowHeight] = useState(0)
  const { scrollY } = useScroll()
  
  useEffect(() => {
    setWindowHeight(window.innerHeight)
  }, [])

  const y = useTransform(scrollY, [0, windowHeight], [0, windowHeight * 0.3])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent"
        style={{ y }}
      />
      <div className="absolute inset-0 bg-grid-white/[0.02]" />
    </div>
  )
}