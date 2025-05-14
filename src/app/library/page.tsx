import { PrismaClient } from '@prisma/client';
import { getCurrentUser } from '@/lib/getUser';
import { redirect } from 'next/navigation';
import Navbar from '@/components/Navbar';
import BookCard from '@/components/BookCard';

const prisma = new PrismaClient();

export default async function LibraryPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  const books = await prisma.book.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div style={{
      background: 'radial-gradient(circle at top left, #0a0f20, #141e30)',
      color: 'white',
      fontFamily: 'Montserrat, sans-serif',
      minHeight: '100vh',
    }}>
      <Navbar user={user} />
      <h2 style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: '80px',
        textAlign: 'center',
        marginTop: '60px',
        color: '#ffffff',
        textShadow: '2px 2px 4px rgba(0,0,0,0.6)',
        letterSpacing: '2px'
      }}>
        Kutuphane
      </h2>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 20px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '40px',
      }}>
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}
