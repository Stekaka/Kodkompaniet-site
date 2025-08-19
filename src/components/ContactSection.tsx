'use client'

interface ContactSectionProps {
  onOpenContact: () => void
}

export default function ContactSection({ onOpenContact }: ContactSectionProps) {
  return (
    <section id="contact" className="bg-gradient-to-b from-black to-gray-900 text-white py-32 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8">Redo att snacka?</h2>
        <p className="text-lg mb-10 text-gray-300">
          Hör av dig så tar vi ett förutsättningslöst möte – vi bjuder på kaffet ☕
        </p>
        <button
          onClick={onOpenContact}
          className="inline-block bg-green-500 hover:bg-green-600 text-black font-bold py-4 px-8 rounded-xl transition text-lg"
        >
          Boka gratis rådgivning
        </button>
      </div>
    </section>
  )
}
