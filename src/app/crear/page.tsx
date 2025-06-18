'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase';
import CreditCounter from '@/components/CreditCounter';

export default function Crear() {
  const supabase = createClient();
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    const res = await fetch('/api/image', {
      method: 'POST',
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    setImageUrl(data.imageUrl || '');
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white p-6">
      <h1 className="text-3xl font-bold mb-4 text-pink-400">Generador de Imágenes IA</h1>

      <CreditCounter />

      <input
        type="text"
        className="w-full max-w-xl p-4 rounded-md text-black mb-4"
        placeholder="Escribe un prompt para generar una imagen..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button
        onClick={generateImage}
        className="bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-3 rounded-lg font-bold"
        disabled={loading}
      >
        {loading ? 'Generando...' : '🎨 Generar Imagen'}
      </button>

      {imageUrl && (
        <div className="mt-8">
          <img src={imageUrl} alt="Resultado generado" className="max-w-xl rounded-lg shadow-xl" />
        </div>
      )}
    </div>
  );
}
