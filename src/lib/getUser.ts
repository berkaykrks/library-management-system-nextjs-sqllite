import { cookies } from 'next/headers';

export async function getCurrentUser() {
  const cookieStore = await cookies(); // async olduğu için await gerekiyor
  const session = cookieStore.get('session');

  if (!session) return null;

  try {
    return JSON.parse(session.value);
  } catch {
    return null;
  }
}
