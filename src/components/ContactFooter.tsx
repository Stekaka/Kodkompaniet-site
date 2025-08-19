'use client'

import { Mail, Phone, MapPin, Clock, MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'

interface ContactFooterProps {
  onOpenContact: () => void
}

export default function ContactFooter({ onOpenContact }: ContactFooterProps) {
  return (
    <footer id="contact" className="bg-gradient-to-b from-gray-900 to-black text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-green-100 to-green-200 bg-clip-text text-transparent"
          >
            Låt oss skapa något fantastiskt tillsammans! 🚀
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto"
          >
            Vi älskar att prata webbutveckling, design och digital strategi. 
            Oavsett om du har en klar vision eller bara en känsla av vad du vill ha, 
            så hjälper vi dig att förverkliga det.
          </motion.p>
        </div>

        {/* Kontaktinformation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Telefon */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
              <Phone className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Ring oss</h3>
            <p className="text-green-400 font-mono text-lg">0709-60 72 08</p>
            <p className="text-gray-400 text-sm">Få kontakt direkt</p>
          </motion.div>

          {/* Email */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
              <Mail className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Skicka mejl</h3>
            <p className="text-green-400 font-mono text-lg">hej@kod.se</p>
            <p className="text-gray-400 text-sm">Få svar snabbt</p>
          </motion.div>

          {/* Plats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
              <MapPin className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Träffas på plats</h3>
            <p className="text-green-400 font-mono text-lg">Göteborg, Sverige</p>
            <p className="text-gray-400 text-sm">Vi bjuder på kaffe ☕</p>
          </motion.div>

          {/* Support */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
              <Clock className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Support</h3>
            <p className="text-green-400 font-mono text-lg">24/7 tillgänglig</p>
            <p className="text-gray-400 text-sm">Vi hjälper dig alltid</p>
          </motion.div>
        </div>

        {/* CTA-sektion */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center bg-gradient-to-r from-green-900/20 to-green-800/20 rounded-2xl p-8 border border-green-700/30"
        >
          <h3 className="text-2xl font-bold mb-4 text-white">
            Redo att starta ditt projekt? 🚀
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Vi bjuder alltid på kaffe och tar ett förutsättningslöst möte. 
            Låt oss diskutera dina idéer och se hur vi kan hjälpa dig att skapa något fantastiskt!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={onOpenContact}
              className="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-300 hover:to-green-400 text-black font-semibold py-3 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Boka gratis rådgivning
            </button>
            <a 
              href="mailto:hej@kodkompaniet.se" 
              className="border border-green-400 text-green-400 hover:bg-green-400 hover:text-black font-semibold py-3 px-8 rounded-xl text-lg transition-all duration-300"
            >
              Skicka direkt mejl
            </a>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center mt-12 pt-8 border-t border-gray-700"
        >
          <p className="text-gray-400">
            © 2025 Kodkompaniet. Alla rättigheter förbehållna. 
            Byggt med ❤️ och ☕ i Stockholm.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
