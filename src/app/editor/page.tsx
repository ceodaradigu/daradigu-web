'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import CreditCounter from '@/app/components/CreditCounter'; // ✅ añadimos el contador

export default function EditorPage() {
  const supabase = createClientComponentClient();
  const [inputPrompt, setInputPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  async function generarImagen(prompt: string, userId: string) {
    const res = await fetch('/api/image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, user_id: userId })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Error al generar la imagen');
    }

    return data.image;
  }

  const handleClick = async () => {
    try {
      const prompt = inputPrompt;
      const { data: { user } } = await supabase.auth.getUser();
      const userId = user?.id;

      if (!userId) {
        alert('Inicia sesión para generar imágenes');
        return;
      }

      const url = await generarImagen(prompt, userId);
      console.log('Imagen generada:', url);
      setImageUrl(url); // Muestra la imagen generada

    } catch (error: any) {
      console.error('Error:', error.message);
      alert(error.message);
    }
  };

  return (
    <div className="p-4">
      <CreditCounter /> {/* ✅ contador en la esquina superior derecha */}

      <h1 className="text-2xl font-bold mb-4">Editor IA</h1>

      <input
        type="text"
        placeholder="Escribe un prompt creativo..."
        value={inputPrompt}
        onChange={(e) => setInputPrompt(e.target.value)}
        className="border p-2 w-full mb-4 rounded"
      />

      <button
        onClick={handleClick}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Generar Imagen
      </button>

      {imageUrl && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Resultado:</h2>
          <img src={imageUrl} alt="Imagen generada por IA" className="rounded shadow-md" />
        </div>
      )}
    </div>
  );
}
