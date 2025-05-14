import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { serialize } from 'cookie';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: 'Kullanıcı bulunamadı' }, { status: 404 });
  }

  if (user.password !== password) {
    return NextResponse.json({ error: 'Şifre hatalı' }, { status: 401 });
  }

  // Kullanıcıyı session cookie olarak gönder
  const cookie = serialize('session', JSON.stringify({
    id: user.id,
    email: user.email,
    role: user.role,
    name: user.name, 
  }), {
    httpOnly: true,
    path: '/',
    //maxAge: 60 * 60 * 24 // 1 gün
  });

  const res = NextResponse.json({ role: user.role });
  res.headers.set('Set-Cookie', cookie);
  return res;
}
