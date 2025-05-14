'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (res.ok) {
            if (data.role === 'ADMIN') {
                router.push('/admin');
            } else {
                router.push('/');
            }
        } else {
            alert(data.error || 'Giriş başarısız');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">Giriş Yap</h2>
            <form onSubmit={handleSubmit} className="w-50 mx-auto">
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Şifre</label>
                    <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-success w-100">Giriş Yap</button>
            </form>
            <div className="text-center mt-3">
                <p>Hesabın yok mu?</p>
                <button className="btn btn-outline-secondary" onClick={() => router.push('/register')}>
                    Kayıt Ol
                </button>
            </div>
        </div>
    );
}
