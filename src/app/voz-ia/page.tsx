'use client'

import { useState } from 'react'
import { Download, Mic, Play, Sparkles } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'

const voices = [
  {
    id: 'rachel',
    name: 'Rachel',
    tone: 'Narrativa / Neutra',
    color: 'from-fuchsia-600 to-pink-400',
    preview: '/audios/rachel-preview.mp3'
  },
  {
    id: 'bella',
    name: 'Bella',
    tone: 'Cálida / Emocional',
    color: 'from-orange-500 to-yellow-400',
    preview: '/audios/bella-preview.mp3'
  },
  {
    id: 'matthew',
    name: 'Matthew',
    tone: 'Comercial / Directa',
    color: 'from-green-500 to-lime-400',
    preview: '/audios/matthew-preview.mp3'
  }
]

const casos = [
  {
    icon: '🎞',
    label: 'Narrar vídeo',
    texto: 'Descubre lo nuevo en solo 30 segundos…',
    voz: 'rachel'
  },
  {
    icon: '🛍',
    label: 'Describir producto',
    texto: 'Esta camiseta cambia de color con la luz del sol.',
    voz: 'bella'
  },
  {
    icon: '📣',
    label: 'Anuncio corto',
    texto: '¡Atención! Nueva promoción válida solo hoy.',
    voz: 'matthew'
  },
  {
    icon: '🧠',
    label: 'Tutorial o curso',
    texto: 'Bienvenido al módulo 1: fundamentos del diseño IA.',
    voz: 'rachel'
  },
  {
    icon: '📖',
    label: 'Lectura',
    texto: 'Informe Q2: crecimiento del 23 % respecto al trimestre anterior.',
    voz: 'rachel'
  }
]

export default function VozIA() {
  const [text, setText] = useState('')
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null)

  const handlePreview = (voiceId: string) => {
    const audio = new Audio(voices.find(v => v.id === voiceId)?.preview || '')
    audio.play()
  }

  const handleCasoUso = (caso: typeof casos[0]) => {
    setText(caso.texto)
    setSelectedVoice(caso.voz)
    toast(`✨ Plantilla cargada: ${caso.label}`)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0c011c] to-[#000214] text-white px-6 py-14 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 text-center flex items-center gap-2">
        <Mic className="w-8 h-8 text-purple-400" /> Voz IA Avanzada
      </h1>

      {/* Casos de uso */}
      <div className="flex flex-wrap gap-4 justify-center mb-10">
        {casos.map((caso) => (
          <button
            key={caso.label}
            onClick={() => handleCasoUso(caso)}
            className="text-sm font-medium px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all"
          >
            {caso.icon} {caso.label}
          </button>
        ))}
      </div>

      {/* Selección de voz */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
        {voices.map((voice) => (
          <div
            key={voice.id}
            className={`rounded-2xl p-4 shadow-xl cursor-pointer transition bg-gradient-to-br ${voice.color} ${
              selectedVoice === voice.id ? 'ring-4 ring-white/40 scale-[1.03]' : 'opacity-90 hover:opacity-100'
            }`}
            onClick={() => setSelectedVoice(voice.id)}
          >
            <h3 className="text-lg font-semibold">{voice.name}</h3>
            <p className="text-sm opacity-90">{voice.tone}</p>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handlePreview(voice.id)
              }}
              className="mt-2 text-xs underline text-white/90 hover:text-white"
            >
              ▶ Escuchar muestra
            </button>
          </div>
        ))}
      </div>

      {/* Editor de texto */}
      <Textarea
        rows={6}
        placeholder="Escribe aquí el texto que quieres convertir a voz..."
        className="w-full max-w-2xl mb-6 resize-none bg-[#0d0d20] text-white border-white/10"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {/* Botón Generar */}
      <Button
        className="bg-gradient-to-br from-yellow-500 to-orange-500 hover:brightness-125 hover:scale-105 shadow-lg border border-white/20 text-white px-10 py-4 text-lg font-bold rounded-xl transition-all duration-300"
        onClick={() => {
          if (!selectedVoice || !text) {
            toast('⚠️ Faltan datos: selecciona una voz y escribe un texto.')
            return
          }

          toast('✅ Voz generada: Tu audio está listo para reproducir o descargar.')
        }}
      >
        <Sparkles className="w-5 h-5 mr-2" />
        Generar Voz
      </Button>
    </main>
  )
}
