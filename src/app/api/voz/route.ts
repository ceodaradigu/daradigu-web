import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { text } = await req.json()

  if (!text) {
    return NextResponse.json({ error: 'Texto vacío' }, { status: 400 })
  }

  const apiKey = process.env.ELEVENLABS_API_KEY
  const voiceId = 'EXAVITQu4vr4xnSDxMaL' // voz predeterminada (Rachel)

  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'xi-api-key': apiKey!,
    },
    body: JSON.stringify({
      text,
      model_id: 'eleven_monolingual_v1',
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75,
      },
    }),
  })

  const audioBuffer = await response.arrayBuffer()

  return new Response(audioBuffer, {
    status: 200,
    headers: {
      'Content-Type': 'audio/mpeg',
    },
  })
}
