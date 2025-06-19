'use client'

import { Canvas } from '@react-three/fiber'
import { useEffect } from 'react'
import PricingSection from '@/components/PricingSection'
import HeroSection from '@/components/HeroSection'
import ProcessSection from '@/components/ProcessSection'
import ContactSection from '@/components/ContactSection'
import PortfolioSection from '@/components/PortfolioSection'
import SpacePortalSectionV2 from '@/components/SpacePortalSectionV2'
import SpaceBackgroundCanvas from '@/components/SpaceBackgroundCanvas'
import SpacePortalStars from '@/components/SpacePortalStars'

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative">
      <Canvas
        className="fixed inset-0 w-full h-[200vh] z-0"
        style={{
          position: 'fixed',
          inset: 0,
          width: '100vw',
          height: '200vh',
          zIndex: 0,
          pointerEvents: 'none',
        }}
        camera={{ position: [0, 0, 1] }}
      >
        <color attach="background" args={['black']} />
        <SpacePortalStars progress={0} />
      </Canvas>
      <div className="relative z-10">
        <HeroSection />
        <SpacePortalSectionV2 hideStars />
        <ProcessSection />
        <PricingSection />
        <ContactSection />
        <PortfolioSection />
      </div>
    </div>
  )
}