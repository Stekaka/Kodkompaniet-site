'use client'

export default function SpaceBackgroundCanvas({ className = '' }) {
  return (
    <div
      className={`absolute inset-0 w-full h-full bg-gradient-to-b from-[#0a0a1a] via-[#18181b] to-black ${className}`}
      style={{
        backgroundImage: 'radial-gradient(ellipse at 60% 20%, #2dd4bf22 0%, transparent 70%), radial-gradient(ellipse at 30% 80%, #818cf822 0%, transparent 70%)',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      {/* Här kan du lägga till en canvas eller stjärn-svg om du vill */}
    </div>
  )
}