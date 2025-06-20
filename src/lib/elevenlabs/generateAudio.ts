// src/lib/elevenlabs/generateAudio.ts
export async function generateAudio(text: string, voiceId: string): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY;

  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
    method: "POST",
    headers: {
      "xi-api-key": apiKey || "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
      model_id: "eleven_monolingual_v1",
      voice_settings: {
        stability: 0.3,
        similarity_boost: 0.75,
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`❌ Error desde ElevenLabs: ${errorText}`);
  }

  const audioBlob = await response.blob();
  const audioUrl = URL.createObjectURL(audioBlob);
  return audioUrl;
}
