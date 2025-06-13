import React from 'react';

export default async function Dashboard() {
  const res = await fetch('http://localhost:3000/api/generations', { cache: 'no-store' });
  const { data } = await res.json();

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Mis Generaciones IA</h1>
      <div className="space-y-6">
        {(!data || data.length === 0) && (
          <p className="text-center text-gray-400">No hay generaciones aún.</p>
        )}
        {data?.map((gen: any) => (
          <div key={gen.id} className="p-4 border rounded bg-gray-900">
            <p><strong>Tipo:</strong> {gen.type}</p>
            <p><strong>Prompt:</strong> {gen.prompt}</p>
            {gen.type === 'image' && (
              <div className="mt-4">
                <img src={gen.result} alt="Generación IA" className="rounded" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}