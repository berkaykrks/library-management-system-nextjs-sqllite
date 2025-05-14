// app/chat/page.tsx
import { getCurrentUser } from '@/lib/getUser';
import { redirect } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import ChatClient from './ChatClient';
import Navbar from '@/components/Navbar'; 

const prisma = new PrismaClient();

export default async function ChatPage() {
    const user = await getCurrentUser();
    if (!user) redirect('/login');

    
    const users = await prisma.user.findMany({
        where: { id: { not: user.id } },
        select: { id: true, name: true, email: true }
    });

    const messages = await prisma.message.findMany({
        where: {
            OR: [
                { senderId: user.id },
                { receiverId: user.id },
            ]
        },
        include: {
            sender: true,
            receiver: true,
        },
        orderBy: { sentAt: 'asc' },
    });
    
    return (
        <div style={{ backgroundColor: '#0a0f20', minHeight: '100vh' }}>
          <Navbar user={user} /> 
          <ChatClient currentUser={user} users={users} messages={messages} />
        </div>
      );
}
