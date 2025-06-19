'use client'

import { useEffect } from 'react'
import PricingSection from '@/components/PricingSection'
import HeroSection from '@/components/HeroSection'
import ProcessSection from '@/components/ProcessSection'
import ContactSection from '@/components/ContactSection'
import PortfolioSection from '@/components/PortfolioSection'
import SpacePortalSectionV2 from '@/components/SpacePortalSectionV2'



export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div>
        <HeroSection />
        <SpacePortalSectionV2 />
        <ProcessSection />
        <PricingSection />
        <ContactSection />
        <PortfolioSection />
      </div>
    </>
  )
}