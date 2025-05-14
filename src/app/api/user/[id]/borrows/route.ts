import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const borrows = await prisma.borrow.findMany({
    where: { userId: id },
    include: { book: true },
    orderBy: { borrowDate: 'desc' },
  });

  return NextResponse.json(borrows);
}
