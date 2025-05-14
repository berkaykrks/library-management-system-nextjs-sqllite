// components/BookBorrowButton.tsx 
'use client';
export default function BookBorrowButton({ bookId }: { bookId: string }) {
  const handleClick = async () => {
    const res = await fetch('/api/borrow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookId }), // userId backend'de cookie ile alınır
    });

    if (res.ok) {
      alert("Kitap ödünç alındı");
      window.location.href = "/profile";
    } else {
      const err = await res.json();
      alert(err.error || "Hata oluştu");
    }
  };

  return (

    <button onClick={handleClick}
      className="btn fw-semibold px-4 py-2 rounded-pill border-0 shadow"
      style={{
        background: 'linear-gradient(to right, #ffd89b, #19547b)',
        color: '#000',
        transition: 'all 0.3s ease',
        transform: 'translateY(0)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      📖 Ödünç Al
    </button>
  );
}
