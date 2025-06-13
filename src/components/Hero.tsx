'use client';

import React from 'react';

export default function Hero() {
  return (
    <section className="text-white text-center py-24 bg-gradient-to-br from-purple-900 via-black to-blue-900">
      <h1 className="text-4xl font-extrabold mb-6">
        Tu copiloto IA para crear, automatizar y escalar.
      </h1>
      <p className="max-w-2xl mx-auto text-lg text-gray-300 mb-8">
        Daradigu IA transforma tus ideas en resultados reales. Contenido, diseños, automatizaciones y proyectos en minutos. Todo en un único sistema impulsado por IA multimodal.
      </p>
      <a href="#generador" className="px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-lg text-white text-lg font-semibold transition">
        Empezar ahora
      </a>
    </section>
  );
}