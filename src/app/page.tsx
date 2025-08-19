'use client'

import { useEffect, Suspense, lazy, useState } from 'react'
import { usePathname } from 'next/navigation'
import SpacePortalSectionHero from '@/components/SpacePortalSectionHero'
import HamburgerMenu from '@/components/HamburgerMenu'
import LoadingSpinner from '@/components/LoadingSpinner'
import ContactModal from '@/components/ContactModal'

// Lazy load non-critical components
const PricingSection = lazy(() => import('@/components/PricingSection'))
const ProcessSection = lazy(() => import('@/components/ProcessSection'))
const ContactSection = lazy(() => import('@/components/ContactSection'))
const PortfolioSection = lazy(() => import('@/components/PortfolioSection'))

export default function Home() {
  const pathname = usePathname()
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="relative">
      <HamburgerMenu />
      <div className="relative z-10">
        <SpacePortalSectionHero onOpenContact={() => setIsContactModalOpen(true)} />
        <Suspense fallback={<LoadingSpinner />}>
          <ProcessSection />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <PricingSection onOpenContact={() => setIsContactModalOpen(true)} />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <ContactSection onOpenContact={() => setIsContactModalOpen(true)} />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <PortfolioSection />
        </Suspense>
      </div>
      
      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </div>
  )
}