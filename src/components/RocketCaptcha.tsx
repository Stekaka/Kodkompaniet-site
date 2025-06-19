'use client'

import { useRef, useState } from 'react'

export default function RocketCaptcha({ onVerify }: { onVerify: () => void }) {
  const [dragged, setDragged] = useState(false)
  const rocketRef = useRef<HTMLDivElement>(null)

  function handleDragStart(e: React.DragEvent) {
    e.dataTransfer.effectAllowed = 'move'
  }
  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragged(true)
    onVerify()
  }
  function handleDragOver(e: React.DragEvent) {
    e.preventDefault()
  }

  return (
    <div className="flex items-center gap-4 mt-4 select-none">
      <div
        ref={rocketRef}
        draggable={!dragged}
        onDragStart={handleDragStart}
        className={`w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-lime-400 shadow-lg cursor-grab transition ${dragged ? 'opacity-50' : ''}`}
        title="Dra raketen"
        aria-label="Dra raketen"
      >
        🚀
      </div>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={`flex-1 h-12 rounded-full border-2 border-dashed border-lime-400 flex items-center justify-center text-lime-600 bg-white/40 transition ${dragged ? 'bg-lime-100 border-solid border-green-400' : ''}`}
        style={{ minWidth: 120 }}
      >
        {dragged ? 'Verifierad!' : 'Dra raketen hit →'}
      </div>
    </div>
  )
}