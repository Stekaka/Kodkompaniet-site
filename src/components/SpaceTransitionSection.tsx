// 🌌 SpaceTransitionSection.tsx – ny avancerad sektion med Three.js
'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

function RotatingStars() {
  const group = useRef<any>()
  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.0008
      group.current.rotation.x += 0.0004
    }
  })
  return (
    <group ref={group}>
      <Stars radius={120} depth={60} count={20000} factor={4} fade speed={2} />
    </group>
  )
}

export default function SpaceTransitionSection() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0.15, 0.25], [0, 1])
  const scale = useTransform(scrollYProgress, [0.15, 0.25], [0.95, 1])

  return (
    <motion.section
      className="relative h-screen w-full"
      style={{ opacity }}
    >
      <Canvas className="absolute inset-0 z-0">
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} />
        <RotatingStars />
      </Canvas>

      <motion.div
        className="absolute inset-0 z-10 flex items-center justify-center"
        style={{ scale }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-white text-4xl md:text-6xl font-extrabold text-center drop-shadow-2xl"
        >
          Step into our world
        </motion.h2>
      </motion.div>
    </motion.section>
  )
}
