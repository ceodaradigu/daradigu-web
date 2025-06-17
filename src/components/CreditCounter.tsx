'use client';

import { useEffect, useState } from 'react';

export default function CreditCounter() {
  const [credits, setCredits] = useState<number | null>(null);

  useEffect(() => {
    async function fetchCredits() {
      const res = await fetch('/api/credits');
      const data = await res.json();
      setCredits(data.credits);
    }

    fetchCredits();
  }, []);

  const isLow = credits !== null && credits <= 3;

  const handleUpgrade = () => {
    alert('Función de mejora de plan próximamente disponible 🚀');
    // Aquí en el futuro conectaremos con Stripe o cambio de plan
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col items-end space-y-2">
      <div className="text-sm text-white bg-gray-800 p-2 rounded-xl shadow-lg">
        Créditos disponibles: {credits !== null ? credits : '...'}
      </div>

      {isLow && (
        <div className="bg-red-600 text-white p-3 rounded-xl shadow-lg animate-pulse flex flex-col items-end">
          <span className="text-sm mb-2">¡Te quedan pocos créditos!</span>
          <button
            onClick={handleUpgrade}
            className="bg-white text-red-600 font-bold px-3 py-1 rounded hover:bg-red-100"
          >
            Mejorar Plan
          </button>
        </div>
      )}
    </div>
  );
}
