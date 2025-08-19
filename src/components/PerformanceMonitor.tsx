'use client'

import { useEffect, useState, useRef } from 'react'

export default function PerformanceMonitor() {
  const [fps, setFps] = useState(0)
  const [memory, setMemory] = useState<{ used: number; total: number } | null>(null)
  const frameCount = useRef(0)
  const lastTime = useRef(performance.now())
  const isVisible = useRef(false)

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== 'development') return

    const updateFPS = () => {
      frameCount.current++
      const currentTime = performance.now()
      
      if (currentTime - lastTime.current >= 1000) {
        setFps(Math.round((frameCount.current * 1000) / (currentTime - lastTime.current)))
        frameCount.current = 0
        lastTime.current = currentTime
        
        // Memory info (Chrome only)
        if ('memory' in performance) {
          const mem = (performance as any).memory
          setMemory({
            used: Math.round(mem.usedJSHeapSize / 1024 / 1024),
            total: Math.round(mem.jsHeapSizeLimit / 1024 / 1024)
          })
        }
      }
      
      requestAnimationFrame(updateFPS)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting
      },
      { threshold: 0 }
    )

    const element = document.body
    if (element) {
      observer.observe(element)
    }

    requestAnimationFrame(updateFPS)

    return () => {
      observer.disconnect()
    }
  }, [])

  // Only show in development
  if (process.env.NODE_ENV !== 'development') return null

  return (
    <div className="fixed top-4 left-4 z-50 bg-black/80 text-white p-3 rounded-lg font-mono text-sm backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <div>
          <div className="text-green-400">FPS: {fps}</div>
          {memory && (
            <div className="text-blue-400">
              RAM: {memory.used}MB / {memory.total}MB
            </div>
          )}
        </div>
        <div className="text-xs text-gray-400">
          Dev Mode
        </div>
      </div>
    </div>
  )
}
