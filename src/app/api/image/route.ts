import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getSession } from '@/lib/auth';
import { generateImageFromPrompt } from '@/lib/openai'; // o stability si lo usas

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  const session = await getSession();

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user.id;

  // Verificar créditos
  const { data: creditData, error: creditError } = await supabase
    .from('user_credits')
    .select('credits')
    .eq('user_id', userId)
    .single();

  if (creditError || !creditData) {
    return NextResponse.json({ error: 'No credits found' }, { status: 500 });
  }

  const credits = creditData.credits;

  if (credits <= 0) {
    return NextResponse.json({ error: 'No credits available' }, { status: 403 });
  }

  // Generar imagen (reemplaza por tu función real si usas Stability AI)
  const image = await generateImageFromPrompt(prompt); // función propia o importada

  if (!image) {
    return NextResponse.json({ error: 'Image generation failed' }, { status: 500 });
  }

  // Descontar 1 crédito
  const { error: updateError } = await supabase
    .from('user_credits')
    .update({ credits: credits - 1 })
    .eq('user_id', userId);

  if (updateError) {
    return NextResponse.json({ error: 'Error updating credits' }, { status: 500 });
  }

  // Insertar en generación_logs
  const { error: logError } = await supabase
    .from('generation_logs')
    .insert([
      {
        user_id: userId,
        type: 'image',
        prompt,
        result_url: image,
      }
    ]);

  if (logError) {
    console.error('Log insert error:', logError.message);
    // No se detiene el proceso si el log falla
  }

  return NextResponse.json({ image });
}
