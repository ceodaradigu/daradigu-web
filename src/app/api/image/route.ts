import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  console.log('=== INICIO POST /api/image (STABILITY CORE FINAL DEFINITIVO) ===');

  try {
    const { prompt } = await request.json();
    console.log('Prompt recibido:', prompt);

    if (!prompt) {
      return NextResponse.json({ error: "Prompt requerido" }, { status: 400 });
    }

    const apiKey = process.env.STABILITY_API_KEY;

    const formData = new FormData();
    formData.append("prompt", prompt);
    formData.append("output_format", "png");

    const response = await fetch("https://api.stability.ai/v2beta/stable-image/generate/core", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Accept": "image/*"
      },
      body: formData
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Error Stability CORE:", error);
      return NextResponse.json({ error: "Error al generar imagen" }, { status: 500 });
    }

    const imageBuffer = await response.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString('base64');
    const imageDataUrl = `data:image/png;base64,${base64Image}`;

    console.log("Imagen generada correctamente.");
    return NextResponse.json({ result: imageDataUrl });

  } catch (error: any) {
    console.error('Error general en Stability CORE:', error.message);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
