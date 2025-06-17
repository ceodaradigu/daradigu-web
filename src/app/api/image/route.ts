import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  console.log('=== INICIO POST /api/image ===');

  try {
    const body = await request.json();
    console.log('JSON recibido:', body);

    return NextResponse.json({ message: 'Handler funcionando', data: body });
  } catch (error: any) {
    console.error('Error en /api/image:', error.message);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
