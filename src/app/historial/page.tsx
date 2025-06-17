'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

type Log = {
  id: string;
  prompt: string;
  result_url: string;
  created_at: string;
};

export default function HistorialPage() {
  const supabase = createClientComponentClient();
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLogs() {
      const { data, error } = await supabase
        .from('generation_logs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error al obtener el historial:', error.message);
      } else {
        setLogs(data as Log[]);
      }

      setLoading(false);
    }

    fetchLogs();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🕓 Historial de Generaciones</h1>

      {loading && <p className="text-white">Cargando...</p>}

      {logs.length === 0 && !loading && (
        <p className="text-gray-300">No has generado contenido aún.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {logs.map((log) => (
          <div key={log.id} className="bg-gray-800 text-white rounded-xl p-4 shadow-md">
            <img src={log.result_url} alt="Imagen generada" className="rounded mb-3" />
            <p className="text-sm mb-1"><strong>Prompt:</strong> {log.prompt}</p>
            <p className="text-xs text-gray-400">{new Date(log.created_at).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
