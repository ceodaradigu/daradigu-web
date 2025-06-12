'use client';

import React from 'react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0F] via-[#14142A] to-[#1A1A3F] flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-[#1A1A3F] to-[#0A0A0F] p-10 rounded-3xl shadow-2xl w-full max-w-4xl border border-[#00FFFF]">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00FFFF] via-[#FF00FF] to-[#FF0070] mb-8 text-center">
          DARADIGU IA
        </h1>
        <p className="text-gray-300 text-xl text-center mb-10">
          Potencia creativa multimodal: diseño, vídeo, voz, copywriting, imágenes y marca impulsada por IA de última generación.
        </p>

        <div className="flex justify-center gap-6">
          <button className="px-8 py-4 bg-gradient-to-r from-[#00FFFF] to-[#FF00FF] rounded-xl text-white font-semibold shadow-lg hover:scale-105 transition">
            🚀 Empezar Ya
          </button>
          <button className="px-8 py-4 border border-[#00FFFF] text-[#00FFFF] rounded-xl font-semibold shadow-lg hover:bg-[#00FFFF] hover:text-black transition">
            🎯 Ver Demo IA
          </button>
        </div>
      </div>
    </div>
  );
}