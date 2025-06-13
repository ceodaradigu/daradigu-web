'use client';

import React, { useState } from 'react';

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [audit, setAudit] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setImageUrl('');
    setAudit('');

    try {
      const res = await fetch('/api/imagen', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (data.imageUrl) {
        setImageUrl(data.imageUrl);
        setAudit(data.audit);
      } else {
        alert('Error al generar la imagen');
      }
    } catch (error) {
      alert('Error en la conexión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Generador de Imágenes IA</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="w-full border rounded p-2 text-white bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
          rows={3}
          placeholder="Describe la imagen que quieres generar..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          required
        />
        <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded">
          Generar Imagen
        </button>
      </form>

      {loading && <p className="mt-4">Generando imagen...</p>}

      {imageUrl && (
        <div className="mt-4 space-y-4">
          <img src={imageUrl} alt="Imagen generada por IA" className="rounded shadow" />
          <p className="text-sm text-gray-300">Auditoría IA: <span className="font-bold">{audit}</span></p>
        </div>
      )}
    </div>
  );
}