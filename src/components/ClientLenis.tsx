'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

export default function ClientLenis() {
  useEffect(() => {
    // Only initialize Lenis on desktop for better performance
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return
    }

    const lenis = new Lenis({
      lerp: 0.06, // Reduced for smoother scrolling
      wheelMultiplier: 0.8, // Reduced for better performance
      touchMultiplier: 1.0, // Reduced for better performance
    })

    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    
    rafId = requestAnimationFrame(raf)
    
    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
      lenis.destroy()
    }
  }, [])
  
  return null
}