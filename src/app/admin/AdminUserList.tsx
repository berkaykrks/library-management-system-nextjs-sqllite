'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminUserList() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'USER' });
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');


  const fetchUsers = async () => {
    const res = await fetch('/api/admin/users');
    const data = await res.json();
    setUsers(data);
  };

  const createUser = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    });

    if (res.ok) {
      setNewUser({ name: '', email: '', password: '', role: 'USER' });
      fetchUsers();
    } else {
      alert('Kullanıcı eklenemedi!');
    }
  };

  const deleteUser = async (id: string) => {
    if (!confirm("Bu kullanıcıyı silmek istediğine emin misin?")) return;
    await fetch(`/api/admin/users/${id}`, { method: 'DELETE' });
    fetchUsers();
  };

  const toggleRole = async (id: string, currentRole: string) => {
    setErrorMessage(''); // eski hata varsa temizle

    const newRole = currentRole === 'ADMIN' ? 'USER' : 'ADMIN';

    const res = await fetch(`/api/admin/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: newRole }),
    });

    if (res.status === 403) {
      const data = await res.json();
      setErrorMessage(data.error || 'Bu işlemi yapamazsınız.');
      return;
    }

    fetchUsers();
  };


  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    router.push('/login');
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="mt-4">

      {/* Sayfa üstünde çıkış butonu */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>Admin Paneli</h4>
        <button className="btn btn-danger" onClick={handleLogout}>
          Çıkış Yap
        </button>
      </div>

      <h4>Yeni Kullanıcı Ekle</h4>
      <form onSubmit={createUser} className="row g-3 mb-5">
        <div className="col-md-3">
          <input type="text" className="form-control" placeholder="İsim" required
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
        </div>
        <div className="col-md-3">
          <input type="email" className="form-control" placeholder="Email" required
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
        </div>
        <div className="col-md-3">
          <input type="password" className="form-control" placeholder="Şifre" required
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          />
        </div>
        <div className="col-md-2">
          <select className="form-select" value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          >
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>
        <div className="col-md-1">
          <button type="submit" className="btn btn-primary w-100">Ekle</button>
        </div>
      </form>

      
      {errorMessage && (
        <div className="alert alert-danger mt-3">
          ⚠️ {errorMessage}
        </div>
      )}


      <h4>Kullanıcı Listesi</h4>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>İsim</th>
            <th>Email</th>
            <th>Rol</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button className="btn btn-sm btn-danger me-2" onClick={() => deleteUser(user.id)}>
                  Sil
                </button>
                <button className="btn btn-sm btn-warning" onClick={() => toggleRole(user.id, user.role)}>
                  Rolü Değiştir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
