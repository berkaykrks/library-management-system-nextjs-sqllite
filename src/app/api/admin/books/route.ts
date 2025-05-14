import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Listeleme
export async function GET() {
  const books = await prisma.book.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(books);
}

// Ekleme
export async function POST(request: NextRequest) {
  const { title, author, description, categoryId, imageUrl  } = await request.json();

  if (!title || !author || !description || !categoryId || !imageUrl) {
    return NextResponse.json({ error: 'Tüm alanlar gereklidir.' }, { status: 400 });
  }

  const book = await prisma.book.create({
    data: { title, author, description, categoryId,imageUrl},
  });

  return NextResponse.json(book);
}
