// src/app/api/test-supabase/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseAnon = createClient(supabaseUrl, anonKey);
const supabaseService = createClient(supabaseUrl, serviceRoleKey);

export async function GET() {
  try {
    // Test lectura con anon
    const { data: anonData, error: anonError } = await supabaseAnon
      .from('user_credits')
      .select('*');

    // Test lectura con service_role
    const { data: adminData, error: adminError } = await supabaseService
      .from('user_credits')
      .select('*');

    return NextResponse.json({
      anon: {
        error: anonError?.message || null,
        data: anonData || null,
      },
      service_role: {
        error: adminError?.message || null,
        data: adminData || null,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: 'Error interno al probar Supabase' },
      { status: 500 }
    );
  }
}
