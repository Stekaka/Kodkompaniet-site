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
    
    try {
      // Simulera formulärhantering - ersätt med din faktiska lösning
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Här kan du lägga till din egen formulärhantering
      // Till exempel: EmailJS, Netlify Forms, eller eget API
      
      setStatus('sent')
      setForm({ name: '', company: '', email: '', phone: '', message: '' })
      setVerified(false)
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <div className="w-full">
      {/* Formulär */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 w-full"
      >
        <h3 className="text-xl font-semibold text-white drop-shadow mb-2">
          Fyll i formuläret
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
    </div>
  )
}