'use client';

import React, { useState } from 'react';

export default function PromptForm() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse('');

    try {
      const res = await fetch('/api/crear', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (data.result) {
        setResponse(data.result);
      } else {
        setResponse('Error en la respuesta IA.');
      }
    } catch (error) {
      setResponse('Error al conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Generador IA Profesional Daradigu</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="w-full border rounded p-2 text-white bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
          rows={4}
          placeholder="Escribe aquí tu prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          required
        />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          Generar
        </button>
      </form>
      {loading && <p className="mt-4">Generando...</p>}
      {response && <div className="mt-4 whitespace-pre-line">{response}</div>}
    </div>
  );
}