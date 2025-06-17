"use client";

import { useState } from "react";

export default function EditorPage() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleTextGeneration = async () => {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });

    const data = await res.json();
    setResult(data.result || "Error generando texto IA.");
  };

  const handleImageGeneration = async () => {
    const res = await fetch("/api/image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });

    const data = await res.json();
    const image = data.result?.output?.[0];
    setImageUrl(image || "");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 space-y-6">
      <h2 className="text-4xl font-bold mb-4">🎨 Editor IA Daradigu</h2>

      <textarea
        className="w-full max-w-xl p-4 text-black"
        placeholder="Escribe tu prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <div className="flex space-x-4">
        <button
          onClick={handleTextGeneration}
          className="px-6 py-2 bg-purple-600 text-white rounded shadow hover:bg-purple-700"
        >
          Generar Texto IA
        </button>

        <button
          onClick={handleImageGeneration}
          className="px-6 py-2 bg-pink-600 text-white rounded shadow hover:bg-pink-700"
        >
          Generar Imagen IA
        </button>
      </div>

      {result && (
        <div className="mt-6 w-full max-w-xl p-4 bg-gray-900 rounded">
          <h3 className="font-semibold mb-2">Resultado Texto:</h3>
          <p>{result}</p>
        </div>
      )}

      {imageUrl && (
        <div className="mt-6 w-full max-w-xl p-4 bg-gray-900 rounded">
          <h3 className="font-semibold mb-2">Imagen Generada:</h3>
          <img src={imageUrl} alt="Generado por IA" className="rounded w-full" />
        </div>
      )}
    </div>
  );
}
