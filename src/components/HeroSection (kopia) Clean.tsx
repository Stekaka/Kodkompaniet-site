'use client'

import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black text-white flex flex-col justify-center items-center px-6">
      {/* 🔮 Animated background glow */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        aria-hidden
      >
        <div className="absolute top-1/2 left-1/2 w-[150vw] h-[150vw] -translate-x-1/2 -translate-y-1/2 bg-gradient-radial from-green-500/20 via-transparent to-transparent blur-3xl opacity-40 animate-spin-slow" />
      </div>

      {/* 🌟 Animated text intro */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="z-10 text-5xl md:text-8xl font-extrabold bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent text-center leading-tight drop-shadow-xl"
      >
        Kod & Co.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="z-10 text-lg md:text-2xl mt-6 text-green-400 font-mono text-center"
      >
        Vi bygger hemsidor som imponerar – snabbt, snyggt & skräddarsytt.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="z-10 mt-10 flex gap-4 flex-wrap justify-center"
      >
        <button className="bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-6 rounded-xl text-lg shadow-md transition">
          Boka gratis rådgivning
        </button>
        <button className="border border-white hover:bg-white hover:text-black py-3 px-6 rounded-xl text-lg transition">
          Se exempel
        </button>
      </motion.div>

      {/* ⬇ Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 z-10 animate-bounce text-green-400 font-mono text-sm"
      >
        {'< scrolla ner />'}
      </motion.div>
    </section>
  )
}
