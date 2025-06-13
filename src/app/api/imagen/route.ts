import { NextRequest, NextResponse } from 'next/server';
import openai from '@/lib/openai';
import supabase from '@/lib/supabaseAdmin';

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    // Prompt Enhancer IA
    const enhanced = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'Eres un experto en ingeniería de prompts para generación de imágenes IA. Tu tarea es reescribir el prompt del usuario de forma que DALL·E 3 lo entienda claramente, especificando detalles visuales, contexto, ángulo de cámara, iluminación, estilo artístico y evitando ambigüedades. No incluyas explicaciones, solo el nuevo prompt optimizado.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 300,
    });

    const enhancedPrompt = enhanced.choices[0].message.content;

    // Generación de imagen IA
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: enhancedPrompt,
      n: 1,
      size: '1024x1024'
    });

    const imageUrl = response.data[0].url;

    // Auditoría IA posterior
    const audit = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'Eres un experto en control de calidad IA para imágenes generadas. Evalúa si la imagen probablemente cumple con el objetivo visual. Responde: "Cumple bien", "Cumple parcialmente" o "No cumple".'
        },
        {
          role: 'user',
          content: `Prompt original: ${prompt}\nPrompt optimizado: ${enhancedPrompt}\nImagen generada: ${imageUrl}`
        }
      ],
      max_tokens: 50,
    });

    const auditResult = audit.choices[0].message.content;

    // Guardamos en Supabase (persistencia real SaaS)
    await supabase.from('generations').insert([
      {
        type: 'image',
        prompt,
        result: imageUrl
      }
    ]);

    return NextResponse.json({ imageUrl, audit: auditResult });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}