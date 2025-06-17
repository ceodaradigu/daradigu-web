import Replicate from "replicate";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  console.log('=== INICIO POST /api/image ===');

  try {
    const { prompt } = await request.json();
    console.log('Prompt recibido:', prompt);

    if (!prompt) {
      return NextResponse.json({ error: "Prompt requerido" }, { status: 400 });
    }

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_KEY,
    });

    const output = await replicate.run(
      "stability-ai/sdxl:72f621d07",
      {
        input: {
          prompt: prompt,
          width: 1024,
          height: 1024,
          guidance_scale: 7.5,
          num_inference_steps: 50
        }
      }
    );

    console.log("Predicción completada:", output);
    return NextResponse.json({ result: output });

  } catch (error: any) {
    console.error('Error en /api/image:', error.message);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
