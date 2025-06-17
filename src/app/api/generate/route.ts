// src/app/api/generate/route.ts

import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  if (!prompt) {
    return NextResponse.json({ error: "Prompt requerido" }, { status: 400 });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 500
    });

    const result = completion.choices[0].message.content;
    return NextResponse.json({ result });
  } catch (error) {
    console.error("Error IA:", error);
    return NextResponse.json({ error: "Error interno IA" }, { status: 500 });
  }
}
