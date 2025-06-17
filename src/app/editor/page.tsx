"use client";

import { useState } from "react";

export default function EditorPage() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");

  const handleGenerate = async () => {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });

    const data = await res.json();
    if (data.result) {
      setResult(data.result);
    } else {
      setResult("Error generando respuesta IA.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h2 className="text-4xl font-bold mb-4">🎨 Editor IA Daradigu</h2>
      
      <textarea
        className="w-full max-w-xl p-4 mb-4 text-black"
        placeholder="Escribe tu prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button
        onClick={handleGenerate}
        className="px-6 py-2 bg-purple-600 text-white rounded shadow hover:bg-purple-700"
      >
        Generar IA
      </button>

      {result && (
        <div className="mt-6 w-full max-w-xl p-4 bg-gray-900 rounded">
          <h3 className="font-semibold mb-2">Resultado:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}
