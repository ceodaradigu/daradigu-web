'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function CrearPage() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    const res = await fetch('/api/crear', {
      method: 'POST',
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    setResponse(data.result || 'No hubo respuesta.');
    setLoading(false);
  };

  return (
    <main className="min-h-screen p-8 text-center bg-gradient-to-b from-black to-indigo-950 text-white">
      <h1 className="text-3xl font-bold mb-6 text-fuchsia-400">Generador de Contenido IA</h1>

      <div className="max-w-xl mx-auto bg-zinc-900 p-6 rounded-xl shadow-lg border border-fuchsia-800">
        <input
          className="w-full p-3 text-black rounded-md mb-4"
          placeholder="Escribe tu prompt aquí..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          onClick={handleGenerate}
          className="bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white font-bold py-2 px-6 rounded hover:opacity-90 transition"
        >
          {loading ? 'Generando...' : '✨ Generar IA'}
        </button>

        {response && (
          <div className="mt-6 text-left bg-zinc-800 p-4 rounded-lg border border-zinc-700">
            <p className="text-fuchsia-300 font-semibold mb-2">Respuesta IA:</p>
            <p>{response}</p>
          </div>
        )}
      </div>
    </main>
  );
}
