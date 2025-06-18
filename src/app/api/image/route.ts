import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getSession } from '@/lib/auth';

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

  // 🔁 Generar imagen con Stability AI
  const response = await fetch('https://api.stability.ai/v2beta/stable-image/generate/core', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.STABILITY_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      prompt,
      model: 'stable-diffusion-xl-v1',
      aspect_ratio: '1:1',
      output_format: 'url'
    })
  });

  const result = await response.json();

  if (!response.ok || !result.image) {
    return NextResponse.json({ error: 'Image generation failed' }, { status: 500 });
  }

  const image = result.image;

  // 🔁 Descontar crédito
  const { error: updateError } = await supabase
    .from('user_credits')
    .update({ credits: credits - 1 })
    .eq('user_id', userId);

  if (updateError) {
    return NextResponse.json({ error: 'Error updating credits' }, { status: 500 });
  }

  // 🔁 Log de generación
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
  }

  return NextResponse.json({ image });
}
