// 📦 PricingSection.tsx
'use client'

import { CheckCircle, Server, Rocket, Wrench } from 'lucide-react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function PricingSection() {
  return (
    <section id="pricing" className="snap-start min-h-screen bg-gradient-to-b from-white to-gray-100 text-black px-6 py-24">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Prispaket</h2>
        <p className="text-lg text-gray-600 mb-12">
          Välj ett paket som passar dig – vi har alternativ för alla typer av behov.
        </p>

        {/* Ikonrad */}
        <div className="flex flex-wrap justify-center gap-6 mb-16 text-sm text-gray-700">
          <div className="flex items-center gap-2"><Wrench className="w-5 h-5 text-green-500" /> Skräddarsydd kod</div>
          <div className="flex items-center gap-2"><Rocket className="w-5 h-5 text-green-500" /> Snabb leverans</div>
          <div className="flex items-center gap-2"><Server className="w-5 h-5 text-green-500" /> Hosting tillgängligt</div>
          <div className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500" /> Support ingår</div>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {/* Mallbaserad */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white border border-gray-200 rounded-2xl p-10 shadow-md transition-transform duration-300"
          >
            <h3 className="text-2xl font-semibold mb-4">Mallbaserad</h3>
            <ul className="space-y-3 text-gray-700 mb-6 text-left">
              <li className="flex items-center gap-2"><CheckCircle className="text-green-500 w-5 h-5" /> Färdig mall med din logga & färger</li>
              <li className="flex items-center gap-2"><CheckCircle className="text-green-500 w-5 h-5" /> Mobilanpassad & optimerad</li>
              <li className="flex items-center gap-2"><CheckCircle className="text-green-500 w-5 h-5" /> Leverans på 5–7 dagar</li>
            </ul>
            <p className="text-3xl font-extrabold text-green-600 mb-2">fr. 9 500 kr</p>
            <p className="text-sm text-gray-500">Hosting + support fr. 250 kr/mån</p>
          </motion.div>

          {/* Flexpaket */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative bg-gradient-to-br from-gray-900 to-gray-800 text-white border border-gray-700 rounded-2xl p-10 shadow-md transition-transform duration-300 overflow-hidden"
          >
            <div className="absolute top-4 right-4 bg-green-600 text-white text-xs uppercase font-bold px-3 py-1 rounded-full">Populärt val</div>

            <h3 className="text-2xl font-semibold mb-4">Flexpaket</h3>
            <ul className="space-y-3 text-gray-300 mb-6 text-left">
              <li className="flex items-center gap-2"><CheckCircle className="text-green-400 w-5 h-5" /> Mall + anpassad design</li>
              <li className="flex items-center gap-2"><CheckCircle className="text-green-400 w-5 h-5" /> Animationer & effekter</li>
              <li className="flex items-center gap-2"><CheckCircle className="text-green-400 w-5 h-5" /> Leverans ca 10 dagar</li>
            </ul>
            <p className="text-3xl font-extrabold text-green-400 mb-2">fr. 12 500 kr</p>
            <p className="text-sm text-gray-400">Hosting + support fr. 250 kr/mån</p>
          </motion.div>

          {/* Skräddarsydd */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-black text-white border border-gray-800 rounded-2xl p-10 shadow-md transition-transform duration-300"
          >
            <h3 className="text-2xl font-semibold mb-4">Skräddarsydd</h3>
            <ul className="space-y-3 text-gray-300 mb-6 text-left">
              <li className="flex items-center gap-2"><CheckCircle className="text-green-400 w-5 h-5" /> Design från grunden</li>
              <li className="flex items-center gap-2"><CheckCircle className="text-green-400 w-5 h-5" /> Kod helt utan mallar</li>
              <li className="flex items-center gap-2"><CheckCircle className="text-green-400 w-5 h-5" /> Leverans ca 2 veckor</li>
            </ul>
            <p className="text-3xl font-extrabold text-green-400 mb-2">fr. 14 500 kr</p>
            <p className="text-sm text-gray-400">Hosting + support fr. 250 kr/mån</p>
          </motion.div>
        </div>

        <div className="mt-16">
      <a
  href="#kontakt" // Anpassa efter sektion eller använd onClick
  className="inline-flex items-center gap-2 bg-gradient-to-r from-green-400 to-lime-500 hover:from-lime-500 hover:to-green-400 text-black font-semibold py-4 px-8 rounded-xl text-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105 group"
>
  Boka gratis rådgivning
  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
</a>
        </div>
      </div>
    </section>
  )
}
