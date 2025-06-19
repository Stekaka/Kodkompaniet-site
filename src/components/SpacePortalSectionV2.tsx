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
    <div ref={wrapperRef} style={{ height: '180vh', position: 'relative' }}>
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
          transform: `translateZ(${textZ}px) scale(${textScale})`,
          transition: 'opacity 0.1s, transform 0.1s',
          willChange: 'opacity, transform',
        }}
      >
        <h1 style={{
          color: 'white',
          fontSize: '3rem',
          fontWeight: 'bold',
          textShadow: '0 0 32px #fff, 0 0 8px #fff',
          textAlign: 'center',
          letterSpacing: '0.04em',
        }}>
          Step into our world
        </h1>
      </div>
    </div>
  )
}
