'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import PricingSection from '@/components/PricingSection'
/* import HeroSection from '@/components/HeroSection' */
import ProcessSection from '@/components/ProcessSection'
import ContactSection from '@/components/ContactSection'
import PortfolioSection from '@/components/PortfolioSection'
import SpacePortalSectionV2 from '@/components/SpacePortalSectionV2' 
import SpacePortalSectionHero from '@/components/SpacePortalSectionHero'
import HamburgerMenu from '@/components/HamburgerMenu'

export default function Home() {
  const pathname = usePathname()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="relative">
      <HamburgerMenu />
      <div className="relative z-10">
        <SpacePortalSectionHero />
        {/* <HeroSection /> */}
        {/*  <SpacePortalSectionV2 /> */}
        <ProcessSection />
        <PricingSection />
        <ContactSection />
        <PortfolioSection />
      </div>
    </div>
  )
}