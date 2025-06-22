// SpacePortalSectionV2.tsx – förbättrad version med mobilfix och bibehållen desktop-effekt
'use client'

import { Canvas } from '@react-three/fiber'
import { useRef, useEffect, useState } from 'react'
import SpacePortalStars from './SpacePortalStars'

function lerp(input: number, inputRange: number[], outputRange: number[]) {
  for (let i = 1; i < inputRange.length; i++) {
    if (input <= inputRange[i]) {
      const t = (input - inputRange[i - 1]) / (inputRange[i] - inputRange[i - 1])
      return outputRange[i - 1] + t * (outputRange[i] - outputRange[i - 1])
    }
  }
  return outputRange[outputRange.length - 1]
}

export default function SpacePortalSectionV2() {
  const [progress, setProgress] = useState(0)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  useEffect(() => {
    const handleScroll = () => {
      if (!wrapperRef.current) return
      const rect = wrapperRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const totalScroll = rect.height - windowHeight
      const scrolled = Math.min(Math.max(-rect.top, 0), totalScroll)
      setProgress(scrolled / (totalScroll || 1))
    }
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleScroll)
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  const textOpacity = lerp(progress, [0, 0.08, 0.18, 0.35, 0.5], [0, 0.7, 1, 1, 0])
  const textScale = lerp(
    progress,
    [0, 0.08, 0.18, 0.35, 0.5],
    isMobile ? [0.2, 0.6, 1.2, 1.8, 2.4] : [0.05, 0.3, 1, 2, 6]
  )
  const textZ = lerp(
    progress,
    [0, 0.15, 0.4, 0.6, 1],
    isMobile ? [-300, -100, 0, 200, 500] : [-1200, -200, 0, 400, 1200]
  )

  return (
    <section
      className="relative"
      style={{
        minHeight: isMobile ? '160vh' : '120vh',
        background: 'linear-gradient(to bottom, #0a0a1a 0%, #18181b 60%, #000 100%)',
      }}
    >
      <div
        ref={wrapperRef}
        className="spaceportal-section"
        style={{
          height: isMobile ? '220vh' : '180vh',
          position: 'relative',
          overflowX: 'hidden',
          zIndex: 10,
        }}
      >
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <SpacePortalStars progress={progress} />
          </Canvas>
        </div>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            zIndex: 2,
            opacity: textOpacity,
            transform: `scale(${textScale}) translateZ(${textZ}px)`,
            transition: 'opacity 0.1s, transform 0.1s',
            willChange: 'opacity, transform',
            padding: '0 1rem',
            maxWidth: '100vw',
            perspective: '1000px',
          }}
        >
          <h1
            className="spaceportal-text"
            style={{
              color: 'white',
              fontSize: isMobile ? '2rem' : '3rem',
              fontWeight: 'bold',
              textShadow: '0 0 32px #fff, 0 0 8px #fff',
              textAlign: 'center',
              letterSpacing: '0.04em',
              margin: 0,
            }}
          >
            Step into our world
          </h1>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />
      </div>
    </section>
  )
}
