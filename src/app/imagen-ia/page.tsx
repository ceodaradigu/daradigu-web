// src/app/imagen-ia/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { Sparkles, Loader2 } from "lucide-react";

export default function ImagenIA() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleGenerate = async () => {
    setLoading(true);
    setImageUrl("");

    try {
      await new Promise((res) => setTimeout(res, 2000));
      setImageUrl("https://placehold.co/800x500/0d102b/ffffff?text=🌌 Imagen IA Generada");
    } catch (error) {
      console.error("Error al generar imagen:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#090917] text-white px-6 py-12 flex flex-col items-center justify-start font-sans">
      {/* Fondo animado real con líneas y estrellas */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Degradado base */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1b004e] via-[#0b0431] to-[#0a011a]" />

        {/* Estrellas tipo parpadeo */}
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.05] mix-blend-screen" />

        {/* Líneas vectoriales animadas */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.06)_0%,_transparent_70%)] animate-slow-fade" />

        <div className="absolute w-[300%] h-[300%] -top-1/2 -left-1/2 bg-[conic-gradient(from_0deg_at_center,_#ffffff0a_0%,_transparent_100%)] animate-slow-rotate opacity-[0.04]" />
      </div>

      {/* Contenido */}
      <div className="relative z-10 max-w-5xl w-full text-center mt-24 lg:mt-40">
        <h1 className="text-5xl font-black mb-4 flex justify-center items-center gap-3 tracking-tight text-cyan-300 drop-shadow-[0_0_25px_#00ffff]">
          <Sparkles className="w-9 h-9 animate-pulse text-cyan-200 drop-shadow-[0_0_10px_#0ff]" />
          <span>Creador Visual IA</span>
        </h1>

        <p className="text-lg text-yellow-400 mb-10 drop-shadow-[0_0_6px_#ffcc00]">
          Describe algo impresionante. Daradigu lo transforma en imagen con IA.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ej: Un dragón holográfico volando sobre Tokyo"
            className="w-full sm:w-2/3 px-6 py-3 rounded-lg bg-[#12142c] text-white placeholder:text-cyan-200 border border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-300 shadow-[0_0_15px_#00ffff60]"
          />
          <button
            onClick={handleGenerate}
            disabled={!prompt || loading}
            className="px-8 py-3 rounded-lg font-bold text-black transition duration-300 disabled:opacity-50
              bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500
              shadow-[inset_0_0_8px_#fff,0_0_25px_#ffb300,0_0_15px_#ff9100]
              border border-yellow-300
              hover:brightness-125 hover:shadow-[inset_0_0_10px_#fff,0_0_40px_#ffb300,0_0_30px_#ff9100]"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Generar"}
          </button>
        </div>

        <div className="rounded-xl border border-yellow-400/40 bg-[#141424] p-6 min-h-[340px] shadow-[0_0_30px_#ffb34740] flex items-center justify-center transition-all duration-300">
          {!imageUrl && !loading && (
            <p className="text-yellow-300 italic text-center animate-pulse drop-shadow-[0_0_6px_#ffc107]">
              ✨ Tu creación aparecerá aquí. ¡Sorpréndete!
            </p>
          )}
          {loading && (
            <p className="text-cyan-300 animate-pulse">Generando imagen mágica...</p>
          )}
          {!loading && imageUrl && (
            <Image
              src={imageUrl}
              alt="Imagen generada por IA"
              width={800}
              height={500}
              className="rounded-lg shadow-xl border border-yellow-300/30"
            />
          )}
        </div>
      </div>
    </div>
  );
}
