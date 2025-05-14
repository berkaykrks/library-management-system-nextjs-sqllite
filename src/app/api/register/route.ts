import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { name, email, password } = await request.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: 'Eksik bilgi' }, { status: 400 });
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({ error: 'Bu email zaten kayıtlı' }, { status: 409 });
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password,     // Şifreyi düz saklıyoruz (senin isteğinle)
      role: 'USER', // Zorunlu olarak USER atanıyor
    },
  });

  return NextResponse.json({ message: 'Kayıt başarılı' }, { status: 201 });
}
