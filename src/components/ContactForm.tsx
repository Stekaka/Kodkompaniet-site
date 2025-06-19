'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', email: '', message: '' })

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
    <form
      onSubmit={handleSubmit}
      className="max-w-md w-full mx-auto bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-6 border border-gray-100"
      style={{
        boxShadow: '0 8px 32px 0 rgba(60,60,60,0.10), 0 1.5px 4px 0 rgba(60,60,60,0.06)',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <h2 className="text-2xl font-semibold text-gray-900 mb-2 text-center tracking-tight">Kontakta oss</h2>
      <div className="flex flex-col gap-4">
        <label className="relative">
          <span className="sr-only">Namn</span>
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <svg width="20" height="20" fill="none"><path d="M10 10a4 4 0 100-8 4 4 0 000 8zM2 18a8 8 0 0116 0H2z" stroke="#bbb" strokeWidth="1.5"/></svg>
          </span>
          <input
            type="text"
            name="name"
            required
            placeholder="Namn"
            autoComplete="name"
            value={form.name}
            onChange={handleChange}
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition outline-none bg-gray-50 text-gray-900"
          />
        </label>
        <label className="relative">
          <span className="sr-only">E-post</span>
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <svg width="20" height="20" fill="none"><path d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm0 0l7 6 7-6" stroke="#bbb" strokeWidth="1.5"/></svg>
          </span>
          <input
            type="email"
            name="email"
            required
            placeholder="E-post"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition outline-none bg-gray-50 text-gray-900"
          />
        </label>
        <label className="relative">
          <span className="sr-only">Meddelande</span>
          <span className="absolute left-3 top-3 text-gray-400 pointer-events-none">
            <svg width="20" height="20" fill="none"><path d="M4 4h12v12H4z" stroke="#bbb" strokeWidth="1.5"/><path d="M4 4l6 6 6-6" stroke="#bbb" strokeWidth="1.5"/></svg>
          </span>
          <textarea
            name="message"
            required
            placeholder="Meddelande"
            rows={4}
            value={form.message}
            onChange={handleChange}
            className="pl-10 pr-4 pt-3 pb-2 w-full rounded-lg border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition outline-none bg-gray-50 text-gray-900 resize-none"
          />
        </label>
      </div>
      <button
        type="submit"
        disabled={status === 'sending'}
        className="bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white font-semibold py-2 rounded-lg shadow transition active:scale-95"
        style={{ letterSpacing: '.01em' }}
      >
        {status === 'sending' ? 'Skickar...' : 'Skicka'}
      </button>
      {status === 'sent' && (
        <p className="text-green-600 font-semibold text-center">Tack för ditt meddelande! Vi hör av oss snart.</p>
      )}
      {status === 'error' && (
        <p className="text-red-600 font-semibold text-center">Något gick fel. Försök igen!</p>
      )}
    </form>
  )
}