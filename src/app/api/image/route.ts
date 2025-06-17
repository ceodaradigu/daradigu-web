import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  if (!prompt) {
    return NextResponse.json({ error: "Prompt requerido" }, { status: 400 });
  }

  const replicateApiKey = process.env.REPLICATE_API_KEY;

  // Lanzamos la predicción inicial
  const predictionResponse = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      "Authorization": `Token ${replicateApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      version: "db21e45e6c88c1c122a6d14b4b221baeb0e4ec6614a0364c0a2e1774e80b403b", // SDXL 1.0 versión real
      input: { prompt }
    })
  });

  if (!predictionResponse.ok) {
    return NextResponse.json({ error: "Error al iniciar la predicción" }, { status: 500 });
  }

  const prediction = await predictionResponse.json();
  const predictionId = prediction.id;

  // Ahora hacemos polling hasta que esté completado
  let output = null;
  let status = prediction.status;

  while (status !== "succeeded" && status !== "failed") {
    await new Promise((resolve) => setTimeout(resolve, 1500)); // esperamos 1.5 segundos

    const pollResponse = await fetch(`https://api.replicate.com/v1/predictions/${predictionId}`, {
      headers: { "Authorization": `Token ${replicateApiKey}` }
    });

    const pollResult = await pollResponse.json();
    status = pollResult.status;

    if (status === "succeeded") {
      output = pollResult.output;
    }

    if (status === "failed") {
      return NextResponse.json({ error: "La generación de imagen falló" }, { status: 500 });
    }
  }

  return NextResponse.json({ result: output });
}
