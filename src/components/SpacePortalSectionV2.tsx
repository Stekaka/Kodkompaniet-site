// SpacePortalSectionV2.tsx – förbättrad version med fungerande scroll, fullskärm och 3D-effekt
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
  const textScale = lerp(progress, [0, 0.08, 0.18, 0.35, 0.5], [0.05, 0.3, 1, 2, 6])
  const textZ = lerp(progress, [0, 0.15, 0.4, 0.6, 1], [-1200, -200, 0, 400, 1200])

  return (
    <section
      className="relative"
      style={{
        minHeight: '120vh', // eller mer om det behövs
        background: 'linear-gradient(to bottom, #0a0a1a 0%, #18181b 60%, #000 100%)',
      }}
    >
      <div
        ref={wrapperRef}
        className="spaceportal-section"
        style={{
          height: '180vh',
          position: 'relative',
          overflowX: 'hidden',
          zIndex: 10,
        }}
      >
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            width: '100vw',
            perspective: '1200px', // viktig för 3D-känsla!
          }}
        >
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
            transform: `scale(${textScale})`,
            transition: 'opacity 0.1s, transform 0.1s',
            willChange: 'opacity, transform',
            padding: '0 1rem',
            maxWidth: '100vw',
          }}
        >
          <h1
            className="spaceportal-text"
            style={{
              color: 'white',
              fontSize: '3rem',
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
