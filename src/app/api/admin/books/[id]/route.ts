import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    await prisma.borrow.deleteMany({
      where: { bookId: id },
    });    
  
    await prisma.book.delete({ where: { id } });
  
    return NextResponse.json({ message: 'Kitap silindi' });
    
  }
