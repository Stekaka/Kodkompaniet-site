import { useEffect, useRef, useCallback, useState } from 'react'

interface UseThrottledScrollOptions {
  throttleMs?: number
  passive?: boolean
}

export function useThrottledScroll(
  callback: (progress: number) => void,
  options: UseThrottledScrollOptions = {}
) {
  const { throttleMs = 16, passive = true } = options // 16ms = 60fps
  const lastCall = useRef(0)
  const rafId = useRef<number | undefined>(undefined)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  const throttledCallback = useCallback((progress: number) => {
    const now = Date.now()
    if (now - lastCall.current >= throttleMs) {
      lastCall.current = now
      callback(progress)
      setProgress(progress)
    } else {
      // Schedule the call for the next frame if we're throttling
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }
      rafId.current = requestAnimationFrame(() => {
        lastCall.current = Date.now()
        callback(progress)
        setProgress(progress)
      })
    }
  }, [callback, throttleMs])

  const handleScroll = useCallback(() => {
    if (!wrapperRef.current) return
    
    const rect = wrapperRef.current.getBoundingClientRect()
    const windowHeight = window.innerHeight
    const totalScroll = rect.height - windowHeight
    const scrolled = Math.min(Math.max(-rect.top, 0), totalScroll)
    const newProgress = scrolled / (totalScroll || 1)
    
    throttledCallback(newProgress)
  }, [throttledCallback])

  useEffect(() => {
    const element = wrapperRef.current
    if (!element) return

    // Use passive listeners for better performance
    element.addEventListener('scroll', handleScroll, { passive })
    window.addEventListener('resize', handleScroll, { passive })
    
    // Initial call
    handleScroll()
    
    return () => {
      element.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }
    }
  }, [handleScroll, passive])

  return { progress, wrapperRef }
}
