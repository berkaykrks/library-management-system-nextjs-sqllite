import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/getUser';

const prisma = new PrismaClient();

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params as any;

    // Bağlı verileri önce sil
  await prisma.message.deleteMany({
    where: {
      OR: [{ senderId: id }, { receiverId: id }]
    }
  });

  await prisma.borrow.deleteMany({
    where: { userId: id }
  });
  await prisma.user.delete({
    where: { id },
  });

  return NextResponse.json({ message: 'Kullanıcı silindi' });
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params as any;
  const { role } = await request.json();
  const currentUser = await getCurrentUser();

  // Güvenlik kontrolü: admin kendi rolünü değiştiremez
  if (currentUser?.id === id) {
    return NextResponse.json({ error: 'Admin kendi rolünü değiştiremez.' }, { status: 403 });
  }

  // Rolü güncelle
  await prisma.user.update({
    where: { id },
    data: { role },
  });

  return NextResponse.json({ message: 'Rol güncellendi' });
}

