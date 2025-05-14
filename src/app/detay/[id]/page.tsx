// app/detay/[id]/page.tsx

import { PrismaClient } from '@prisma/client';
import { getCurrentUser } from '@/lib/getUser';
import { redirect } from 'next/navigation';
import Navbar from '@/components/Navbar';
import BookBorrowButton from '@/components/BookBorrowButton';

const prisma = new PrismaClient();

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  const book = await prisma.book.findUnique({
    where: { id },
    include: { category: true },
  });


  if (!book) {
    return <div className="container-xl mt-5 text-white">Kitap bulunamadı</div>;
  }

  return (
    <div
      style={{
        background: 'radial-gradient(ellipse at top left, #0a0f20, #141e30)',
        color: '#fff',
        minHeight: '100vh',
        fontFamily: 'Montserrat, sans-serif',
      }}
    >
      <Navbar user={user} />

      <div className="container-xl mt-5">
        <div className="row align-items-center g-5">
          <div className="col-md-6">
            <h1 className="display-5 fw-bold">{book.title}</h1>
            <p className="text-white-50 mt-3">
              by {book.author} | {book.category?.name} | ⭐ 5
            </p>
            <p className="text-white-50">
              Durum: {book.isAvailable ? 'Mevcut' : 'Ödünçte'}
            </p>
            <p className="mt-3 text-white-50">{book.description}</p>

            {book.isAvailable ? (
              <BookBorrowButton bookId={book.id} />
            ) : (
              <button disabled className="btn btn-secondary mt-3">Şu an ödünçte</button>
            )}
          </div>

          <div className="col-md-6 text-center">
            <img
              src={book.imageUrl || '/default-book.jpg'}
              alt={book.title}
              className="book-cover"
              style={{
                width: '100%',
                maxWidth: '280px',
                borderRadius: '12px',
                boxShadow: '0 15px 30px rgba(0, 0, 0, 0.5)',
                transform: 'rotateY(-8deg)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
