import { getCurrentUser } from '@/lib/getUser';
import { redirect } from 'next/navigation';
import Navbar from '@/components/Navbar';
import ProfileClient from './ProfileClient';

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  return (
    <div style={{ background: 'radial-gradient(circle at top left, #0a0f20, #141e30)', color: 'white', fontFamily: 'Montserrat, sans-serif', minHeight: '100vh' }}>
      <Navbar user={user} />
      <div className="container mt-5">
        <h2 className="mb-4">📘 Ödünç Aldığınız Kitaplar</h2>
        <ProfileClient userId={user.id} />
      </div>
    </div>
  );
}
