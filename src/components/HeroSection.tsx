'use client'

import { motion } from 'framer-motion'
import { Typewriter } from 'react-simple-typewriter'

export default function HeroSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="relative h-screen flex flex-col justify-center items-center px-6 text-center bg-black text-white overflow-hidden"
    >
      {/* 🔮 Animerad bakgrund */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] animate-pulse opacity-50" />
      </div>

      {/* 🌟 Glow-rubrik */}
      <h1 className="z-10 text-6xl md:text-8xl font-extrabold tracking-tight bg-gradient-to-br from-white to-green-400 bg-clip-text text-transparent drop-shadow-lg">
        Kodkompaniet
      </h1>

      {/* 👨‍💻 Typande text */}
      <p className="z-10 text-xl md:text-2xl mt-6 h-10 font-mono text-green-400">
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

      {/* 🔘 CTA-knappar */}
      <div className="z-10 flex gap-4 mt-10">
        <button className="bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-6 rounded-xl text-lg shadow-lg transition">
          Boka gratis rådgivning
        </button>
        <button className="border border-white hover:bg-white hover:text-black py-3 px-6 rounded-xl text-lg shadow-md transition">
          Se exempel
        </button>
      </div>

      {/* ⬇ Scroll-indikator */}
      <div className="z-10 mt-20 animate-bounce text-green-400 font-mono opacity-60 text-sm">
        {'< scrolla ner />'}
      </div>
    </motion.section>
  )
}
