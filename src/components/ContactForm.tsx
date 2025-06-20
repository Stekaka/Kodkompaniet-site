'use client'

import { useState } from 'react'
import RocketCaptcha from './RocketCaptcha'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  })
  const [verified, setVerified] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    // Byt ut mot ditt API eller Formspree
    const res = await fetch('https://formspree.io/f/your-form-id', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) setStatus('sent')
    else setStatus('error')
  }

  return (
    <section
      className="
        mx-auto
        my-8
        w-full
        max-w-md
        md:max-w-2xl
        p-4
        md:p-8
        rounded-3xl
        shadow-xl
        border
        border-lime-200/20
        bg-white/10
        backdrop-blur-lg
        flex
        flex-col
        md:flex-row
        gap-6
      "
      style={{
        maxWidth: '95vw',
        margin: '1.5rem auto',
      }}
    >
      {/* Kontaktinfo */}
      <div className="flex-1 bg-transparent p-8 flex flex-col justify-between min-w-[260px]">
        <div>
          <h2 className="text-2xl font-bold text-white drop-shadow-lg mb-2 tracking-tight">
            Vill du ringa oss istället?
          </h2>
          <p className="text-gray-200 mb-4">
            Vi älskar att prata webbutveckling, design och digital strategi. Slå oss en signal eller maila direkt!
          </p>
          <div className="flex items-center gap-2 text-lime-400 font-medium">
            <svg width="20" height="20" fill="none"><path d="M6.5 3.5A2 2 0 0 1 8.5 2h3a2 2 0 0 1 2 1.5l.5 2A2 2 0 0 1 12 7H8a2 2 0 0 1-2-1.5l.5-2Z" stroke="#22c55e" strokeWidth="1.5"/></svg>
            <span>070-123 45 67</span>
          </div>
          <div className="flex items-center gap-2 text-lime-400 font-medium mt-2">
            <svg width="20" height="20" fill="none"><path d="M3 5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5zm0 0l7 6 7-6" stroke="#22c55e" strokeWidth="1.5"/></svg>
            <span>hej@dittbolag.se</span>
          </div>
        </div>
        <div className="text-gray-400 text-xs mt-8">
          <span>Vi svarar oftast inom 1 arbetsdag.</span>
        </div>
      </div>
      {/* Formulär */}
      <form
        onSubmit={handleSubmit}
        className="flex-1 bg-transparent p-4 sm:p-8 flex flex-col gap-5 justify-center w-full"
        style={{ minWidth: 0, maxWidth: '100vw' }}
      >
        <h3 className="text-xl font-semibold text-white drop-shadow mb-2">
          Boka gratis rådgivning
        </h3>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            name="name"
            required
            placeholder="Namn"
            autoComplete="name"
            value={form.name}
            onChange={handleChange}
            className="px-4 py-2 w-full rounded-lg border border-lime-200/40 bg-white/30 text-gray-900 placeholder:text-gray-300 focus:border-lime-400 focus:ring-2 focus:ring-lime-200 transition outline-none"
          />
          <input
            type="text"
            name="company"
            placeholder="Företag (valfritt)"
            autoComplete="organization"
            value={form.company}
            onChange={handleChange}
            className="px-4 py-2 w-full rounded-lg border border-lime-200/40 bg-white/30 text-gray-900 placeholder:text-gray-300 focus:border-lime-400 focus:ring-2 focus:ring-lime-200 transition outline-none"
          />
          <input
            type="email"
            name="email"
            required
            placeholder="E-post"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            className="px-4 py-2 w-full rounded-lg border border-lime-200/40 bg-white/30 text-gray-900 placeholder:text-gray-300 focus:border-lime-400 focus:ring-2 focus:ring-lime-200 transition outline-none"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Telefon (valfritt)"
            autoComplete="tel"
            value={form.phone}
            onChange={handleChange}
            className="px-4 py-2 w-full rounded-lg border border-lime-200/40 bg-white/30 text-gray-900 placeholder:text-gray-300 focus:border-lime-400 focus:ring-2 focus:ring-lime-200 transition outline-none"
          />
          <textarea
            name="message"
            required
            placeholder="Vad vill du ha hjälp med?"
            rows={4}
            value={form.message}
            onChange={handleChange}
            className="px-4 py-2 w-full rounded-lg border border-lime-200/40 bg-white/30 text-gray-900 placeholder:text-gray-300 focus:border-lime-400 focus:ring-2 focus:ring-lime-200 transition outline-none resize-none"
          />
        </div>
        <RocketCaptcha onVerify={() => setVerified(true)} />
        <button
          type="submit"
          disabled={status === 'sending' || !verified}
          className="bg-gradient-to-r from-green-400 via-lime-400 to-green-500 hover:from-lime-300 hover:to-green-400 text-black font-semibold py-2 rounded-lg shadow-lg transition active:scale-95"
          style={{ letterSpacing: '.01em' }}
        >
          {status === 'sending' ? 'Skickar...' : 'Skicka'}
        </button>
        {status === 'sent' && (
          <p className="text-green-400 font-semibold text-center drop-shadow">
            Tack för ditt meddelande! Vi hör av oss snart.
          </p>
        )}
        {status === 'error' && (
          <p className="text-red-500 font-semibold text-center">Något gick fel. Försök igen!</p>
        )}
        <div className="text-xs text-gray-400 mt-2 text-center">
          Genom att skicka formuläret godkänner du vår hantering av personuppgifter.
        </div>
      </form>
    </section>
  )
}