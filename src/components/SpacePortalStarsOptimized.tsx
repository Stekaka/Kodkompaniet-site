import { useRef, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const STAR_COUNT = 1200
const STAR_COLORS = ['#fff', '#ffe9c6', '#b5d0ff', '#ffd6fa']

export default function SpacePortalStarsOptimized({ progress }: { progress: number }) {
  const group = useRef<THREE.Group>(null)
  const instancedMesh = useRef<THREE.InstancedMesh>(null)
  const material = useRef<THREE.MeshBasicMaterial>(null)
  const smoothed = useRef(0)
  
  // Pre-calculate star positions and properties
  const starData = useMemo(() => {
    const data = new Float32Array(STAR_COUNT * 3) // x, y, z
    const colors = new Float32Array(STAR_COUNT * 3) // r, g, b
    const sizes = new Float32Array(STAR_COUNT)
    
    for (let i = 0; i < STAR_COUNT; i++) {
      const phi = Math.random() * 2 * Math.PI
      const costheta = Math.random() * 2 - 1
      const u = Math.random()
      const theta = Math.acos(costheta)
      const r = 60 * Math.cbrt(u)
      
      // Position
      const x = r * Math.sin(theta) * Math.cos(phi)
      const y = r * Math.sin(theta) * Math.sin(phi)
      const z = r * Math.cos(theta)
      
      data[i * 3] = x
      data[i * 3 + 1] = y
      data[i * 3 + 2] = z
      
      // Color
      const color = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)]
      const colorObj = new THREE.Color(color)
      colors[i * 3] = colorObj.r
      colors[i * 3 + 1] = colorObj.g
      colors[i * 3 + 2] = colorObj.b
      
      // Size
      sizes[i] = 0.01 + Math.random() * 0.025
    }
    
    return { positions: data, colors, sizes }
  }, [])

  // Smooth progress updates
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
    if (!instancedMesh.current || !material.current) return
    
    const speed = 0.05 + smoothed.current * 1.2
    
    // Update rotation
    if (group.current) {
      group.current.rotation.z = smoothed.current * 0.2
    }
    
    // Update star positions using instanced mesh
    const matrix = new THREE.Matrix4()
    const position = new THREE.Vector3()
    
    for (let i = 0; i < STAR_COUNT; i++) {
      // Get original position
      position.set(
        starData.positions[i * 3],
        starData.positions[i * 3 + 1],
        starData.positions[i * 3 + 2]
      )
      
      // Update Z position
      position.z += speed
      if (position.z > 5) {
        position.z = -60
      }
      
      // Update instance matrix
      matrix.setPosition(position)
      instancedMesh.current.setMatrixAt(i, matrix)
    }
    
    instancedMesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <group ref={group}>
      <instancedMesh
        ref={instancedMesh}
        args={[undefined, undefined, STAR_COUNT]}
        frustumCulled={false} // Disable frustum culling for better performance with many small objects
      >
        <sphereGeometry args={[0.01, 6, 6]} /> {/* Reduced geometry complexity */}
        <meshBasicMaterial
          ref={material}
          vertexColors
          transparent
          opacity={0.8}
        />
      </instancedMesh>
    </group>
  )
}
