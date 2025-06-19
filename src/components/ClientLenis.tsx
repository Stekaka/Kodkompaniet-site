'use client'

import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'

export default function ClientLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
      lerp: 0.08,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
      infinite: false,
    })
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])
  return null
}