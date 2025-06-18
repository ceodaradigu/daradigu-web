// src/app/components/CreditCounter.tsx
'use client';

import { useState } from 'react';

export default function CreditCounter() {
  const [credits, setCredits] = useState(10); // placeholder

  return (
    <div className="text-sm text-white">
      Créditos disponibles: <strong>{credits}</strong>
    </div>
  );
}
