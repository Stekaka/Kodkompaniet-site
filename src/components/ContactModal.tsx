'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Phone, MapPin } from 'lucide-react'
import ContactForm from './ContactForm'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      window.scrollTo(0, parseInt(scrollY || '0') * -1)
    }
    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
    }
  }, [isOpen])

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!mounted) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
            onClick={onClose}
          />
          
          {/* Modal Container */}
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
            onClick={onClose}
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-[95vw] sm:max-w-4xl lg:max-w-5xl max-h-[95vh] sm:max-h-[95vh]"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking modal content
            >
              {/* Modal Content */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl shadow-2xl border border-gray-600/50 overflow-hidden backdrop-blur-xl"
                style={{
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.05)'
                }}
              >
                {/* Header */}
                <div className="relative p-2 sm:p-3 md:p-4 lg:p-6 pb-2 sm:pb-3 md:pb-4 border-b border-gray-600/30 bg-gradient-to-r from-gray-900/50 to-gray-800/50">
                  <button
                    onClick={onClose}
                    className="absolute top-1 right-1 sm:top-2 sm:right-2 md:top-4 md:right-4 p-1.5 sm:p-2 rounded-full bg-gray-800/80 hover:bg-gray-700 transition-all duration-200 group backdrop-blur-sm border border-gray-600/30"
                    aria-label="Stäng"
                  >
                    <X className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-white transition-colors" />
                  </button>
                  
                  <div className="text-center pr-10 sm:pr-12">
                    <div className="inline-flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                        <Mail className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                      </div>
                    </div>
                    <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 bg-gradient-to-r from-white via-green-100 to-green-200 bg-clip-text text-transparent">
                      Boka gratis rådgivning
                    </h2>
                    <p className="text-gray-300 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                      Låt oss diskutera ditt projekt över en kopp kaffe ☕ Vi hjälper dig att skapa något fantastiskt!
                    </p>
                  </div>
                </div>

                {/* Contact Info & Form */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-0">
                  {/* Contact Info */}
                  <div className="p-2 sm:p-3 md:p-4 lg:p-6 bg-gradient-to-br from-green-900/15 via-green-800/10 to-transparent border-b lg:border-b-0 lg:border-r border-gray-600/30 relative overflow-hidden">
                    {/* Decorative gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent pointer-events-none" />
                    
                    <div className="relative space-y-3 sm:space-y-4">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 bg-gradient-to-r from-green-200 to-green-100 bg-clip-text text-transparent">
                          Låt oss snacka webbutveckling! ☕
                        </h3>
                        <p className="text-gray-300 leading-relaxed text-xs sm:text-sm">
                          Vi älskar att prata om design, teknik och digital strategi. 
                          Oavsett om du har en klar vision eller bara en känsla av vad du vill ha, 
                          så hjälper vi dig att förverkliga det.
                        </p>
                      </div>
                      
                      <div className="space-y-3 sm:space-y-5">
                        <div className="flex items-center gap-3 sm:gap-4 p-2 sm:p-3 rounded-xl bg-gray-800/40 border border-gray-700/50 hover:bg-gray-800/60 transition-colors">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                            <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-gray-300 font-medium text-sm sm:text-base">070-123 45 67</p>
                            <p className="text-gray-500 text-xs sm:text-sm">Ring oss direkt</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 sm:gap-4 p-2 sm:p-3 rounded-xl bg-gray-800/40 border border-gray-700/50 hover:bg-gray-800/60 transition-colors">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                            <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-gray-300 font-medium text-sm sm:text-base">hej@kodkompaniet.se</p>
                            <p className="text-gray-500 text-xs sm:text-sm">Skicka ett mejl</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 sm:gap-4 p-2 sm:p-3 rounded-xl bg-gray-800/40 border border-gray-700/50 hover:bg-gray-800/60 transition-colors">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-gray-300 font-medium text-sm sm:text-base">Stockholm, Sverige</p>
                            <p className="text-gray-500 text-xs sm:text-sm">Vi träffas gärna på plats</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-4 sm:pt-6 border-t border-gray-600/30">
                        <div className="flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-green-900/20 border border-green-700/30">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-green-500/30 flex items-center justify-center flex-shrink-0">
                            <span className="text-green-400 text-xs sm:text-sm">⏱️</span>
                          </div>
                          <p className="text-green-200 text-xs sm:text-sm leading-relaxed">
                            Vi svarar oftast inom 1 arbetsdag och bjuder alltid på kaffet! ☕
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Contact Form */}
                  <div className="p-2 sm:p-3 md:p-4 lg:p-6 bg-gradient-to-br from-gray-900/30 to-gray-800/20 relative overflow-hidden">
                    {/* Decorative gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tl from-green-500/3 to-transparent pointer-events-none" />
                    
                    <div className="relative">
                      <ContactForm />
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
