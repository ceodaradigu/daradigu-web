// src/app/api/image/route.ts

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  if (!prompt) {
    return NextResponse.json({ error: "Prompt requerido" }, { status: 400 });
  }

  const replicateApiKey = process.env.REPLICATE_API_KEY;

  const response = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      "Authorization": `Token ${replicateApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      version: "db21e45e6c88c1c122a6d14b4b221baeb0e4ec6614a0364c0a2e1774e80b403b", // SDXL 1.0 model version
      input: { prompt }
    })
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Error al generar imagen" }, { status: 500 });
  }

  const prediction = await response.json();

  return NextResponse.json({ result: prediction });
}
