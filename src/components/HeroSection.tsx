'use client'

import { motion } from 'framer-motion'
import { Typewriter } from 'react-simple-typewriter'
import { useState } from 'react'
import ContactForm from './ContactForm'

export default function HeroSection() {
  const [showForm, setShowForm] = useState(false)

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
        Kod & Co.
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
          onClick={() => setShowForm(true)}
        >
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

      {/* 📞 Kontaktformulär */}
      {showForm && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          onClick={() => setShowForm(false)}
        >
          <div
            className="relative"
            onClick={e => e.stopPropagation()} // Hindra stängning när man klickar i formuläret
          >
            <button
              className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-gray-800"
              onClick={() => setShowForm(false)}
              aria-label="Stäng"
            >
              ×
            </button>
            <ContactForm />
          </div>
        </div>
      )}
    </motion.section>
  )
}
