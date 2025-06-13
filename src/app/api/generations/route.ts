import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@/lib/supabaseConstants';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function GET(req: NextRequest) {
  const { data, error } = await supabase
    .from('generations')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}