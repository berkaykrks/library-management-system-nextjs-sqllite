'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import BookBorrowButton from "@/components/BookBorrowButton"; // en üste ekle



export default function HomeClient({ user }: { user: any }) {
  const [books, setBooks] = useState([]);
  const [featuredBook, setFeaturedBook] = useState<any>(null);
  useEffect(() => {

    typeof document !== undefined
      ? require('bootstrap/dist/js/bootstrap')
      : null
    fetch('/api/admin/books')
      .then(res => res.json())
      .then(data => {
        setBooks(data);
        setFeaturedBook(data[0]); // sadece ilk kitabı vitrin için seçiyoruz
      });
  }, []);

  return (
    <div style={{ background: 'radial-gradient(ellipse at top left, #0a0f20, #141e30)', fontFamily: "'Montserrat', sans-serif", color: '#ffffff', minHeight: '100vh' }}>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg sticky-top shadow-sm bg-glass px-4 py-3">
        <div className="container-xl d-flex justify-content-between align-items-center">
          <a className="navbar-brand d-flex align-items-center text-white fw-bold fs-4" href="/">
            📘 <span className="ms-2">KitapEvi</span>
          </a>
          <div className="d-flex align-items-center gap-4">
            {user?.role === 'ADMIN' && (
              <a href="/admin" className="nav-link text-white position-relative">
                <span className="hover-underline">Admin</span>
              </a>
            )}
            <a href="/library" className="nav-link text-white position-relative">
              <span className="hover-underline">Kutuphane</span>
            </a>
            <a href="/chat" className="nav-link text-white position-relative">
              <span className="hover-underline">Sohbet</span>
            </a>
            <div className="dropdown">
              <button
                className="btn dropdown-toggle d-flex align-items-center gap-2 px-2 py-1 text-white fw-semibold border-0"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(8px)', borderRadius: '10px' }}
              >
                <img src="https://i.pravatar.cc/40" className="rounded-circle border border-light shadow-sm" alt="Avatar" width="36" height="36" />
                <span>{user?.name || 'Giriş Yapılmadı'} </span>
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end mt-2 shadow rounded-3"
                style={{
                  backgroundColor: 'rgba(30,30,40,0.95)',
                  border: 'none',
                }}
              >
                <li>
                  <a className="dropdown-item text-white" href="/profile">
                    👤 Profilim
                  </a>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button
                    className="dropdown-item text-danger"
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      padding: '0.5rem 1rem',
                      textAlign: 'left',
                      width: '100%',
                    }}
                    onClick={async () => {
                      await fetch('/api/logout', { method: 'POST' });
                      window.location.href = '/login';
                    }}
                  >
                    ↪️ Cıkıs Yap
                  </button>
                </li>
              </ul>

            </div>
          </div>
        </div>
      </nav>

      {/* Ana Kart */}
      <div className="container-xl mt-5">
        {featuredBook && (
          <div className="main-card row align-items-center g-5 p-5" style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
          }}>
            <div className="col-md-6">
              <h1 className="display-5 fw-bold">{featuredBook.title}</h1>
              <p className="mt-3 mb-2 text-white-50">
                <strong>By</strong> {featuredBook.author} &nbsp; | &nbsp;
                <strong>Category:</strong> {featuredBook.category?.name || 'Bilinmiyor'} &nbsp; | &nbsp; ⭐ 5
              </p>
              <p className="mb-1 text-white-50">Açıklama:</p>
              <p className="text-white-50">{featuredBook.description}</p>
              <BookBorrowButton bookId={featuredBook.id} />
            </div>
            <div className="col-md-6 text-center">
              <img
                src={featuredBook.imageUrl}
                className="book-cover"
                alt="Book Cover"
                style={{
                  width: '100%',
                  maxWidth: '280px',
                  borderRadius: '12px',
                  boxShadow: '0 15px 30px rgba(0, 0, 0, 0.5)',
                  transform: 'rotateY(-8deg)'
                }}
              />
            </div>
          </div>
        )}

        {/* En Son Kitaplar */}
        <div className="mt-5">
          <h3 className="text-white mb-4">📚 En Son Eklenen Kitaplar</h3>
          <div className="d-flex flex-wrap gap-4 latest-books">
            {books.slice(0, 7).map((book: any) => (
              <a key={book.id} href={`/detay/${book.id}`}>
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  style={{
                    width: '160px',
                    height: '240px',
                    objectFit: 'cover',
                    borderRadius: '12px',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.4)',
                    transition: 'transform 0.3s'
                  }}
                  onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
