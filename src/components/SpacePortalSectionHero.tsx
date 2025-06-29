// SpacePortalSectionV2.tsx – förbättrad version med mobilfix och bibehållen desktop-effekt
'use client'

import { Canvas } from '@react-three/fiber'
import { useRef, useEffect, useState } from 'react'
import SpacePortalStars from './SpacePortalStars'
import { Typewriter } from 'react-simple-typewriter'

function lerp(input: number, inputRange: number[], outputRange: number[]) {
  for (let i = 1; i < inputRange.length; i++) {
    if (input <= inputRange[i]) {
      const t = (input - inputRange[i - 1]) / (inputRange[i] - inputRange[i - 1])
      return outputRange[i - 1] + t * (outputRange[i] - outputRange[i - 1])
    }
  }
  return outputRange[outputRange.length - 1]
}

export default function SpacePortalSectionHero() {
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

  // Titelpaketet fade/scale ut
  const heroOpacity = lerp(progress, [0, 0.08, 0.18, 0.35, 0.5], [1, 1, 0.7, 0.2, 0])
  const heroScale = lerp(progress, [0, 0.08, 0.18, 0.35, 0.5], [1, 1, 0.95, 0.9, 0.8])

  // "Utmana det normala!" fade/scale in och kommer närmare
  const utmanaOpacity = lerp(progress, [0.35, 0.5, 0.7, 1], [0, 0.5, 1, 1])
  const utmanaScale = lerp(progress, [0.35, 0.5, 1], [0.7, 1.2, 2.2])
  const utmanaZ = lerp(progress, [0.35, 0.5, 1], [0, 200, 800])

  return (
    <section
      className="relative h-[100vh] w-full overflow-hidden"
      style={{
        minHeight: isMobile ? '160vh' : '120vh',
        background: 'linear-gradient(to bottom, #0a0a1a 0%, #18181b 60%, #000 100%)',
      }}
    >
      <div
        ref={wrapperRef}
        className="spaceportal-section"
        style={{
          height: isMobile ? '120vh' : '180vh',
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
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />
      </div>

      {/* Titelpaketet */}
      <div
        className="absolute inset-0 z-10 flex flex-col justify-center items-center px-6 text-center"
        style={{
          opacity: heroOpacity,
          transform: `scale(${heroScale})`,
          transition: 'opacity 0.2s, transform 0.2s',
          pointerEvents: heroOpacity < 0.05 ? 'none' : 'auto',
        }}
      >
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight bg-gradient-to-br from-white to-green-400 bg-clip-text text-transparent drop-shadow-lg">
          Kodkompaniet
        </h1>
        <p className="text-xl md:text-2xl mt-6 h-10 font-mono text-green-400">
          <Typewriter
            words={[
              'Vi bygger hemsidor som imponerar.',
              'Snabbt. Snyggt. Skräddarsytt.',
              'Utan byråpriser.'
            ]}
            loop={0}
            cursor
            cursorStyle="_"
            typeSpeed={55}
            deleteSpeed={30}
            delaySpeed={2000}
          />
        </p>
        <div className="flex gap-4 mt-10">
          <button
            className="
              px-7 py-3
              rounded-full
              bg-gradient-to-r from-green-400 via-lime-400 to-green-500
              text-black font-semibold text-lg
              shadow-lg shadow-green-900/10
              transition
              hover:scale-105 hover:shadow-xl hover:from-green-300 hover:to-green-400
              focus:outline-none focus:ring-2 focus:ring-green-300
              active:scale-95
            "
          >
            Boka gratis rådgivning
          </button>
          <button className="border border-white hover:bg-white hover:text-black py-3 px-6 rounded-xl text-lg shadow-md transition">
            Se exempel
          </button>
        </div>
        <div className="mt-20 animate-bounce text-green-400 font-mono opacity-60 text-sm">
          {'< scrolla ner />'}
        </div>
      </div>

      {/* Svävande text "Utmana det normala!" */}
      {/* <div
        className="absolute inset-0 z-20 flex flex-col justify-center items-center pointer-events-none"
        style={{
          opacity: utmanaOpacity,
          transform: `scale(${utmanaScale}) translateZ(${utmanaZ}px)`,
          transition: 'opacity 0.3s, transform 0.3s',
          willChange: 'opacity, transform',
        }}
      >
        <h2 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-2xl tracking-tight">
          Utmana det normala!
        </h2>
      </div> */}

      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          pointerEvents: 'none', // så att du inte blockerar scroll
        }}
      >
        <div style={{ pointerEvents: 'auto' }}>
          {/* Titel, text, knappar */}
        </div>
      </div>
    </section>
  )
}
