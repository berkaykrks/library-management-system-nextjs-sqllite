'use client';

import { useEffect, useState } from 'react';

export default function BookAdminPanel() {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    description: '',
    imageUrl: '',
    categoryId: '',
  });

  const fetchBooks = async () => {
    const res = await fetch('/api/admin/books');
    const data = await res.json();
    setBooks(data);
  };

  const fetchCategories = async () => {
    const res = await fetch('/api/categories');
    const data = await res.json();
    setCategories(data);
    setNewBook(prev => ({ ...prev, categoryId: data[0]?.id || '' }));
  };

  const addBook = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBook),
    });

    if (res.ok) {
      setNewBook({ title: '', author: '', description: '', imageUrl: '', categoryId: categories[0]?.id || '' });
      fetchBooks();
    } else {
      alert('Kitap eklenemedi');
    }
  };

  const deleteBook = async (id: string) => {
    if (!confirm("Bu kitabı silmek istediğine emin misin?")) return;
    await fetch(`/api/admin/books/${id}`, { method: 'DELETE' });
    fetchBooks();
  };

  useEffect(() => {
    fetchCategories();
    fetchBooks();
  }, []);

  return (
    <div className="mt-5">
      <h4>Yeni Kitap Ekle</h4>
      <form onSubmit={addBook} className="row g-3 mb-4">
        <div className="col-md-3">
          <input type="text" className="form-control" placeholder="Başlık" required
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          />
        </div>
        <div className="col-md-3">
          <input type="text" className="form-control" placeholder="Yazar" required
            value={newBook.author}
            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          />
        </div>
        <div className="col-md-3">
          <input type="text" className="form-control" placeholder="Açıklama" required
            value={newBook.description}
            onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
          />
        </div>
        <div className="col-md-3">
          <input type="text" className="form-control" placeholder="Görsel URL" required
            value={newBook.imageUrl}
            onChange={(e) => setNewBook({ ...newBook, imageUrl: e.target.value })}
          />
        </div>
        <div className="col-md-3">
          <select className="form-select" required
            value={newBook.categoryId}
            onChange={(e) => setNewBook({ ...newBook, categoryId: e.target.value })}
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div className="col-md-2">
          <button type="submit" className="btn btn-primary w-100">Ekle</button>
        </div>
      </form>

      <h4>Kitap Listesi</h4>
      <table className="table table-striped align-middle">
        <thead>
          <tr>
            <th>Görsel</th>
            <th>Başlık</th>
            <th>Yazar</th>
            <th>Kategori</th>
            <th>Açıklama</th>
            <th>İşlem</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book: any) => (
            <tr key={book.id}>
              <td>
                <img
                  src={book.imageUrl}
                  alt="Kapak"
                  style={{ width: '50px', height: '70px', objectFit: 'cover' }}
                />
              </td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.category?.name}</td>
              <td>{book.description}</td>
              <td>
                <button className="btn btn-sm btn-danger" onClick={() => deleteBook(book.id)}>
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
