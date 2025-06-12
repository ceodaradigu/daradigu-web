'use client';

import React, { useState } from 'react';

export default function CrearPage() {
  const [prompt, setPrompt] = useState('');
  const [resultado, setResultado] = useState('');
  const [loading, setLoading] = useState(false);

  const generarContenidoIA = async () => {
    if (!prompt) return;
    setLoading(true);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setResultado(data.resultado);
    } catch (error) {
      console.error('Error al generar contenido IA', error);
      setResultado('Error al generar contenido IA.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-10 bg-gradient-to-br from-[#0A0A0F] via-[#14142A] to-[#1A1A3F] text-white">
      <h1 className="text-4xl font-bold mb-10 text-center bg-gradient-to-tr from-[#00FFFF] via-[#FF00FF] to-[#FFD700] bg-clip-text text-transparent">
        Generador de Contenido IA
      </h1>

      <div className="max-w-4xl mx-auto bg-white/10 p-10 rounded-3xl border border-[#00FFFF] shadow-lg backdrop-blur-xl">

        <input
          type="text"
          placeholder="Escribe tu prompt aquí..."
          className="w-full p-5 rounded-xl text-black text-xl mb-6"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <button
          className={`font-extrabold py-4 px-10 rounded-xl text-xl transition-transform hover:scale-105 ${
            loading
              ? 'bg-gray-500 text-white'
              : 'bg-gradient-to-tr from-[#00FFFF] to-[#FF00FF] text-black'
          }`}
          onClick={generarContenidoIA}
          disabled={loading}
        >
          {loading ? 'Generando...' : '🚀 Generar IA'}
        </button>

        {resultado && (
          <div className="mt-10 p-8 bg-white/20 rounded-xl text-xl text-[#CCCCCC] shadow-inner">
            {resultado}
          </div>
        )}
      </div>
    </div>
  );
}