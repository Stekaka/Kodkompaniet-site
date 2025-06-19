'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function 3DStars() {
  const group = useRef<THREE.Group>(null)
  // Skapa 300 stjärnor med random positioner
  const stars = useMemo(
    () =>
      Array.from({ length: 300 }, () => [
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40,
        -Math.random() * 80,
      ]),
    []
  )

  // Långsam rotation för parallax-effekt
  useFrame(() => {
    if (group.current) {
      group.current.rotation.z += 0.0005
      group.current.rotation.x += 0.0002
    }
  })

  return (
    <group ref={group}>
      {stars.map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.13, 8, 8]} />
          <meshBasicMaterial color="white" />
        </mesh>
      ))}
    </group>
  )
}