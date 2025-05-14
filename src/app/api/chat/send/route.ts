// app/api/chat/send/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getCurrentUser } from '@/lib/getUser';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  const { receiverId, content } = await req.json();

  if (!user || !receiverId || !content)
    return NextResponse.json({ error: 'Eksik bilgi' }, { status: 400 });

  const message = await prisma.message.create({
    data: {
      senderId: user.id,
      receiverId,
      content,
    },
  });

  return NextResponse.json(message);
}
