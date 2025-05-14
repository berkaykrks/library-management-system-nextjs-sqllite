import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { borrowId } = await req.json();

  if (!borrowId) {
    return NextResponse.json({ error: 'Eksik bilgi' }, { status: 400 });
  }

  const borrow = await prisma.borrow.update({
    where: { id: borrowId },
    data: { returnDate: new Date() },
    include: { book: true },
  });

  // Kitap tekrar müsait hale gelsin
  await prisma.book.update({
    where: { id: borrow.book.id },
    data: { isAvailable: true },
  });

  return NextResponse.json({ message: 'Kitap iade edildi' });
}
