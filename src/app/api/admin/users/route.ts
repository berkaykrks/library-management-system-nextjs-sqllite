import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  return NextResponse.json(users);
}

export async function POST(req: Request) {
    const { name, email, password, role } = await req.json();
  
    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: 'Eksik bilgi' }, { status: 400 });
    }
  
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: 'Bu email zaten kayıtlı' }, { status: 409 });
    }
  
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password, // düz şifre, istersen hash ekleriz
        role,
      },
    });
  
    return NextResponse.json(user);
  }
  
