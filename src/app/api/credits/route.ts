import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getSession } from '@/lib/auth';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: NextRequest) {
  const session = await getSession();

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user.id;

  const { data, error } = await supabase
    .from('user_credits')
    .select('credits')
    .eq('user_id', userId)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: 'No se pudo obtener créditos' }, { status: 500 });
  }

  return NextResponse.json({ credits: data.credits });
}

// 🔄 NUEVA FUNCIÓN PARA ACTUALIZAR CRÉDITOS
export async function PATCH(req: NextRequest) {
  const session = await getSession();

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user.id;
  const { newCredits } = await req.json();

  if (typeof newCredits !== 'number' || newCredits < 0) {
    return NextResponse.json({ error: 'Cantidad inválida' }, { status: 400 });
  }

  const { error } = await supabase
    .from('user_credits')
    .update({ credits: newCredits })
    .eq('user_id', userId);

  if (error) {
    return NextResponse.json({ error: 'No se pudo actualizar' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
