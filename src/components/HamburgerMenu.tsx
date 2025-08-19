'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import clsx from 'clsx'

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* 🍔 Hamburger / X button */}
      <button
        aria-label="Toggle menu"
        onClick={() => setOpen(!open)}
        className="fixed top-6 right-6 z-50 w-10 h-10 flex flex-col justify-center items-center gap-1 group"
      >
        <motion.span
          className={clsx(
            'w-7 h-0.5 bg-lime-400 rounded origin-center',
            open && 'rotate-45 translate-y-[6px]'
          )}
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className="w-5 h-0.5 bg-lime-400 rounded opacity-80 origin-center"
          animate={{ opacity: open ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className={clsx(
            'w-6 h-0.5 bg-lime-400 rounded opacity-60 origin-center',
            open && '-rotate-45 -translate-y-[6px]'
          )}
          animate={{ rotate: open ? -45 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </button>

      {/* 🌌 Menu Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/90 backdrop-blur-xl text-white flex flex-col items-center justify-center"
            onClick={() => setOpen(false)} // 🔥 stänger när man klickar utanför
          >
            <nav
              className="space-y-10 text-center"
              onClick={(e) => e.stopPropagation()} // 🔒 förhindrar stängning när man klickar på länkarna
            >
              {[
                { href: '/', label: 'Start' },
                { href: '#process', label: 'Process' },
                { href: '#pricing', label: 'Priser' },
                { href: '#portfolio', label: 'Portfolio' },
                { href: '#contact', label: 'Kontakt' }
              ].map(({ href, label }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 * i }}
                >
                  <Link
                    href={href}
                    className="text-3xl md:text-5xl font-bold text-white hover:text-lime-400 transition-all"
                    onClick={() => setOpen(false)}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
