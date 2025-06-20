'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Background from '@/components/ui/hero-background'

export default function Home() {
  const frases = [
    'una ciudad flotante de cristal',
    'un logotipo futurista minimalista',
    'una canción hecha por una IA emocional'
  ]

  const [placeholder, setPlaceholder] = useState(frases[0])
  const [idea, setIdea] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholder((prev) => {
        const index = frases.indexOf(prev)
        return frases[(index + 1) % frases.length]
      })
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const handleGenerar = () => {
    if (idea.trim()) {
      window.location.href = `/imagen-ia?prompt=${encodeURIComponent(idea)}`
    }
  }

  return (
    <main className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black text-white">
      <Background />

      <div className="relative z-10 max-w-2xl w-full text-center px-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
          Daradigu IA: <span className="text-orange-500">Crea sin fricción</span>
        </h1>

        <p className="text-base sm:text-lg text-gray-300 mb-8">
          Diseña, automatiza y lanza ideas visuales y sonoras con IA real que piensa contigo.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
          <input
            type="text"
            placeholder={`Genera ${placeholder}`}
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            className="w-full sm:w-2/3 px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 backdrop-blur-md shadow-md"
          />
          <button
            onClick={handleGenerar}
            className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-semibold transition shadow-md"
          >
            Visualízala ahora
          </button>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/voz-ia"
            className="px-5 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white transition text-sm shadow"
          >
            Crear Voz IA 🎙️
          </Link>
          <Link
            href="/disenar"
            className="px-5 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white transition text-sm shadow"
          >
            Diseñar con IA 🧠
          </Link>
        </div>
      </div>
    </main>
  )
}
