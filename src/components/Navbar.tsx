'use client';

import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';

export default function Navbar({ user }: { user: any }) {
  useEffect(() => {
    (function () {
      const devMark = atob("UmVuYXMgJiBCZXJrYXkgT2ZmaWNpYWwgTGlicmFyeSAyMDI1");
      console.log(devMark);
      })();
    typeof document !== undefined
      ? require('bootstrap/dist/js/bootstrap')
      : null

      
  }, []);
  return (
    <nav className="navbar navbar-expand-lg sticky-top shadow-sm bg-glass px-4 py-3">
      <div className="container-xl d-flex justify-content-between align-items-center">
        <a className="navbar-brand d-flex align-items-center text-white fw-bold fs-4" href="/">
          📘 <span className="ms-2">KitapEvi</span>
        </a>
        <div className="d-flex align-items-center gap-4">
          {user?.role === 'ADMIN' && (
            <Link href="/admin" className="nav-link text-white position-relative">
              <span className="hover-underline">Admin</span>
            </Link>
          )}
          <Link href="/library" className="nav-link text-white position-relative">
            <span className="hover-underline">Kutuphane</span>
          </Link>
          <Link href="/chat" className="nav-link text-white position-relative">
            <span className="hover-underline">Sohbet</span>
          </Link>
          <div className="dropdown">
            <button
              className="btn dropdown-toggle d-flex align-items-center gap-2 px-2 py-1 text-white fw-semibold border-0"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(8px)', borderRadius: '10px' }}
            >
              <img src="https://i.pravatar.cc/40" className="rounded-circle border border-light shadow-sm" alt="Avatar" width="36" height="36" />
              <span>{user?.name || 'Giriş Yapılmadı'}</span>
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
  );
}
