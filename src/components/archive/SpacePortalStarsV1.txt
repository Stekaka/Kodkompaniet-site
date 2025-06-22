import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const STAR_COUNT = 1200
const STAR_COLORS = ['#fff', '#ffe9c6', '#b5d0ff', '#ffd6fa']

export default function SpacePortalStars({ progress }: { progress: number }) {
  const group = useRef<THREE.Group>(null)
  const stars = useRef<{ pos: THREE.Vector3, color: string, size: number }[]>([])
  const smoothed = useRef(0)

  if (stars.current.length === 0) {
    for (let i = 0; i < STAR_COUNT; i++) {
      const phi = Math.random() * 2 * Math.PI
      const costheta = Math.random() * 2 - 1
      const u = Math.random()
      const theta = Math.acos(costheta)
      const r = 60 * Math.cbrt(u)
      const color = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)]
      const size = 0.01 + Math.random() * 0.025
      stars.current.push({
        pos: new THREE.Vector3(
          r * Math.sin(theta) * Math.cos(phi),
          r * Math.sin(theta) * Math.sin(phi),
          r * Math.cos(theta)
        ),
        color,
        size,
      })
    }
  }

  useEffect(() => {
    let frame: number
    function animate() {
      smoothed.current += (progress - smoothed.current) * 0.08
      frame = requestAnimationFrame(animate)
    }
    animate()
    return () => cancelAnimationFrame(frame)
  }, [progress])

  useFrame(() => {
    const speed = 0.05 + smoothed.current * 1.2 // Mycket långsammare!
    if (group.current) {
      group.current.rotation.z = smoothed.current * 0.2
    }
    for (let i = 0; i < STAR_COUNT; i++) {
      const star = stars.current[i]
      star.pos.z += speed
      if (star.pos.z > 5) {
        star.pos.z = -60
      }
    }
    if (group.current) {
      // @ts-expect-error: group.current.children is not typed as Mesh[]
      group.current.children.forEach((mesh: THREE.Mesh, i: number) => {
        mesh.position.copy(stars.current[i].pos)
      })
    }
  })

  return (
    <group ref={group}>
      {stars.current.map((star, i) => (
        <mesh key={i} position={star.pos}>
          <sphereGeometry args={[star.size, 8, 8]} />
          <meshBasicMaterial color={star.color} />
        </mesh>
      ))}
    </group>
  )
}