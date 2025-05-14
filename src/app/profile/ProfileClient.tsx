'use client';

import { useEffect, useState } from 'react';

export default function ProfileClient({ userId }: { userId: string }) {
  const [borrows, setBorrows] = useState([]);

  useEffect(() => {
    fetch(`/api/user/${userId}/borrows`)
      .then(res => res.json())
      .then(data => setBorrows(data));
  }, [userId]);

  if (!borrows.length) {
    return <p className="text-white-50">Henüz hiç kitap ödünç almadınız.</p>;
  }

  return (
    <div className="row g-4">
      {borrows.map((b: any) => {
        const teslimTarihi = new Date(Date.now() + 7 * 86400000).toLocaleDateString("tr-TR");
        return (
          <div className="col-md-4" key={b.id}>
            <div className="borrowed-card d-flex gap-3 align-items-center p-3" style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '16px',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease'
            }}>
              <img
                src={b.book.imageUrl}
                className="book-img"
                alt="kitap"
                style={{ height: '120px', objectFit: 'cover', borderRadius: '8px' }}
              />
              <div>
                <h5 className="mb-1">{b.book.title}</h5>
                <small className="text-white-50">{b.book.author}</small><br />
                <small className="text-success">Teslim: {teslimTarihi}</small>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
