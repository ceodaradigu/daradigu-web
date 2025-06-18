// src/components/Hero.tsx
"use client";

import { Button } from "@/components/ui/button";
import { SparklesIcon, ImageIcon, MicIcon, Settings2Icon } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center px-4 py-24 sm:py-32 lg:py-40 text-white bg-gradient-to-br from-[#0e0e2c] via-[#111132] to-[#1a1a40] overflow-hidden">
      {/* Glowing ring effect */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[40rem] h-[40rem] bg-gradient-radial from-fuchsia-600/30 to-transparent rounded-full blur-3xl animate-pulse z-0" />

      <div className="z-10">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]">
          DARADIGU <span className="text-fuchsia-400">IA</span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl max-w-xl mx-auto text-gray-300">
          Welcome to <span className="text-fuchsia-400 font-medium">multimodal efficiency</span>. 
          The all-in-one platform for creative minds and automation lovers.
        </p>

        <Button className="mt-8 text-base px-8 py-4 bg-fuchsia-500 hover:bg-fuchsia-600 rounded-xl transition-all duration-200 shadow-md shadow-fuchsia-500/30">
          🔮 Empezar ahora
        </Button>

        {/* Feature icons */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-fuchsia-400" />
            Imagen IA
          </div>
          <div className="flex items-center gap-2">
            <MicIcon className="h-5 w-5 text-fuchsia-400" />
            Voz IA
          </div>
          <div className="flex items-center gap-2">
            <Settings2Icon className="h-5 w-5 text-fuchsia-400" />
            Automatización
          </div>
        </div>
      </div>
    </section>
  );
}
