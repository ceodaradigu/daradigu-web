import { NextRequest, NextResponse } from 'next/server';
import openai from '@/lib/openai';

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt no recibido' }, { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'Eres un generador de contenido IA para Daradigu.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const resultadoIA = response.choices[0]?.message?.content;

    return NextResponse.json({ resultado: resultadoIA });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al generar contenido IA' }, { status: 500 });
  }
}