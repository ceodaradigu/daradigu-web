import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  console.log('=== INICIO POST /api/image ===');

  try {
    const { prompt } = await request.json();
    console.log('Prompt recibido:', prompt);

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
        version: "db21e45e6c88c1c122a6d14b4b221baeb0e4ec6614a0364c0a2e1774e80b403b",
        input: {
          prompt: prompt,
          width: 1024,
          height: 1024,
          scheduler: "DDIM",
          guidance_scale: 7.5,
          num_inference_steps: 50,
          refine: "no_refiner"
        }
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Error en llamada inicial:", error);
      return NextResponse.json({ error: "Error al iniciar la predicción" }, { status: 500 });
    }

    const prediction = await response.json();
    const predictionId = prediction.id;

    let status = prediction.status;
    let output = null;

    while (status !== "succeeded" && status !== "failed") {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const pollResponse = await fetch(`https://api.replicate.com/v1/predictions/${predictionId}`, {
        headers: { "Authorization": `Token ${replicateApiKey}` }
      });

      const pollResult = await pollResponse.json();
      status = pollResult.status;

      if (status === "succeeded") {
        output = pollResult.output;
      }

      if (status === "failed") {
        console.error("La generación de imagen falló:", pollResult);
        return NextResponse.json({ error: "La generación de imagen falló" }, { status: 500 });
      }
    }

    console.log("Predicción completada:", output);
    return NextResponse.json({ result: output });

  } catch (error: any) {
    console.error('Error en /api/image:', error.message);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
