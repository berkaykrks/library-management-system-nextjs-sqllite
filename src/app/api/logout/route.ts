import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST() {
  const cookie = serialize('session', '', {
    path: '/',
    maxAge: 0, // cookie'yi sil
  });

  const res = NextResponse.json({ message: 'Çıkış yapıldı' });
  res.headers.set('Set-Cookie', cookie);
  return res;
}
