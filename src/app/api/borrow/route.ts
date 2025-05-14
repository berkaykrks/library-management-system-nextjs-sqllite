import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/getUser';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { bookId } = await req.json();
  const user = await getCurrentUser();

  if (!user || !bookId) {
    return NextResponse.json({ error: 'Eksik bilgi' }, { status: 400 });
  }

  // Kitap zaten ödünçte mi?
  const existing = await prisma.borrow.findFirst({
    where: { bookId, returnDate: null },
  });

  if (existing) {
    return NextResponse.json({ error: 'Kitap zaten ödünçte' }, { status: 400 });
  }

  // Borrow kaydı oluştur
  await prisma.borrow.create({
    data: { userId: user.id, bookId },
  });

  // Kitabı ödünçte olarak işaretle
  await prisma.book.update({
    where: { id: bookId },
    data: { isAvailable: false },
  });

  return NextResponse.json({ message: 'Kitap ödünç alındı' });
}
