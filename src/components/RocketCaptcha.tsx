'use client'

import { useRef, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRocket } from '@fortawesome/free-solid-svg-icons'

export default function RocketCaptcha({ onVerify }: { onVerify: () => void }) {
  const [verified, setVerified] = useState(false)
  const [dragX, setDragX] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [maxDrag, setMaxDrag] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const thumbWidth = 40 // px, samma som ikonen

  // Dynamiskt maxDrag
  useEffect(() => {
    function updateMaxDrag() {
      if (trackRef.current) {
        setMaxDrag(trackRef.current.offsetWidth - thumbWidth)
      }
    }
    updateMaxDrag()
    window.addEventListener('resize', updateMaxDrag)
    return () => window.removeEventListener('resize', updateMaxDrag)
  }, [])

  // Start drag
  function handleStart(e: React.MouseEvent | React.TouchEvent) {
    if (verified) return
    setDragging(true)
    document.body.style.userSelect = 'none'
  }

  // Drag move
  function handleMove(e: MouseEvent | TouchEvent) {
    if (!dragging || verified) return
    let clientX = 0
    if ('touches' in e) {
      clientX = e.touches[0].clientX
    } else {
      clientX = e.clientX
    }
    const track = trackRef.current
    if (!track) return
    const rect = track.getBoundingClientRect()
    let x = clientX - rect.left - thumbWidth / 2
    x = Math.max(0, Math.min(x, maxDrag))
    setDragX(x)
    if (x >= maxDrag) {
      setVerified(true)
      setDragging(false)
      setTimeout(() => onVerify(), 300)
      document.body.style.userSelect = ''
    }
  }

  // End drag
  function handleEnd() {
    if (!verified) setDragX(0)
    setDragging(false)
    document.body.style.userSelect = ''
  }

  // Bind/unbind events
  useEffect(() => {
    if (!dragging) return
    const move = (e: any) => handleMove(e)
    const up = () => handleEnd()
    window.addEventListener('mousemove', move)
    window.addEventListener('touchmove', move)
    window.addEventListener('mouseup', up)
    window.addEventListener('touchend', up)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('touchmove', move)
      window.removeEventListener('mouseup', up)
      window.removeEventListener('touchend', up)
    }
  }, [dragging, verified, maxDrag])

  return (
    <div className="flex flex-col items-center gap-2 mt-6 w-full">
      <label className="text-sm text-gray-400 mb-1 select-none">
        Dra raketen till höger för att verifiera
      </label>
      <div
        ref={trackRef}
        className="relative w-full max-w-xs h-12 flex items-center select-none"
        style={{ touchAction: 'none' }}
      >
        {/* Track */}
        <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-full h-4 rounded-full transition-all duration-300
          ${verified ? 'bg-gradient-to-r from-lime-400 to-green-500' : 'bg-gray-200/60'}
        `} />
        {/* Progress fill */}
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-4 rounded-full pointer-events-none transition-all duration-300"
          style={{
            width: verified ? maxDrag + thumbWidth : dragX + thumbWidth / 2,
            background: verified
              ? 'linear-gradient(to right, #a3e635, #22c55e)'
              : 'linear-gradient(to right, #bef264, #d9f99d)',
            opacity: dragX > 0 || verified ? 1 : 0,
          }}
        />
        {/* Rocket thumb */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 z-10 cursor-pointer transition-all duration-200
            ${dragging ? 'scale-110 drop-shadow-lg' : ''}
          `}
          style={{
            left: verified ? maxDrag : dragX,
            pointerEvents: verified ? 'none' : 'auto',
            transition: verified ? 'left 0.3s, transform 0.2s' : 'left 0.1s, transform 0.2s',
          }}
          onMouseDown={handleStart}
          onTouchStart={handleStart}
        >
          <FontAwesomeIcon
            icon={faRocket}
            size="2x"
            className={`transition-all duration-300 ${verified ? 'text-green-500' : 'text-lime-500'}`}
            style={{
              filter: verified
                ? 'drop-shadow(0 0 8px #22c55e88)'
                : dragging
                ? 'drop-shadow(0 0 6px #bef26488)'
                : '',
            }}
          />
        </div>
        {/* Checkmark */}
        {verified && (
          <span className="absolute right-0 top-1/2 -translate-y-1/2 text-2xl text-green-500 animate-bounce z-10">
            ✓
          </span>
        )}
      </div>
      <div className="h-6">
        {verified ? (
          <span className="text-green-500 font-semibold transition-all duration-300">Verifierad!</span>
        ) : dragX > maxDrag * 0.8 ? (
          <span className="text-lime-500 font-medium transition-all duration-300">Nästan där...</span>
        ) : dragX > maxDrag * 0.3 ? (
          <span className="text-gray-400 transition-all duration-300">Fortsätt dra →</span>
        ) : (
          <span className="text-gray-300 transition-all duration-300"> </span>
        )}
      </div>
    </div>
  )
}