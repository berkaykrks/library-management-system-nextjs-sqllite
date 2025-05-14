'use client';

export default function BookCard({ book }: { book: any }) {
  return (
    <a
      href={`/detay/${book.id}`}
      style={{
        width: '140px',
        textAlign: 'center',
        textDecoration: 'none',
        color: 'inherit',
        transition: 'transform 0.3s ease',
        display: 'block',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'scale(1.35)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '140px',
          height: '200px',
          borderRadius: '6px',
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
        }}
      >
        <img
          src={book.imageUrl || '/default-book.jpg'}
          alt={book.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(1.1)',
            transition: 'all 0.3s ease',
          }}
        />
      </div>

      {/* Kitap Adı */}
      <p
        style={{        
            marginTop: '12px',
            fontWeight: 800,
            fontSize: '17px',
            color: '#ffffff',
            fontFamily: 'Montserrat, sans-serif',
            letterSpacing: '0.5px',
            lineHeight: '1.4',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.4)',
        }}
      >
        {book.title}
      </p>

      {/* Kategori */}
      <p
        style={{
          fontStyle: 'italic',
          fontSize: '14px',
          color: '#7f7f7f', 
          marginTop: '4px',
        }}
      >
        {book.category?.name || 'Kategori Yok'}
      </p>
    </a>
  );
}
