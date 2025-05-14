// app/chat/ChatClient.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image'; //Buraya YENİDEN BAKIP düzenleyeceğim UNUTMA 
import './chat.css';


export default function ChatClient({ currentUser, users, messages }: any) {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [message, setMessage] = useState('');

  const handleSend = async () => {
    if (!selectedUser || !message.trim()) return;
    await fetch('/api/chat/send', {
      method: 'POST',
      body: JSON.stringify({ receiverId: selectedUser.id, content: message }),
    });
    window.location.reload(); 
  };
  
  return (
    <div className="container">
      <div className="content container-fluid bootstrap snippets bootdey">
        <div className="row row-broken">
          <div className="col-sm-3 col-xs-12">
            <div className="col-inside-lg decor-default chat">
              <div className="chat-users">
                <h6>Kullanıcılar</h6>
                {users.map((user: any) => (
                  <div key={user.id} className="user" onClick={() => setSelectedUser(user)}>
                    <div className="avatar">
                      <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar" />
                      <div className="status online"></div>
                    </div>
                    <div className="name">{user.name}</div>
                    <div className="mood">{user.email}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-sm-9 col-xs-12 chat">
            <div className="col-inside-lg decor-default">
              <div className="chat-body">
                <h6>Mesajlaşma</h6>
                {messages
                  .filter((msg: any) =>
                    (msg.senderId === currentUser.id && msg.receiverId === selectedUser?.id) ||
                    (msg.receiverId === currentUser.id && msg.senderId === selectedUser?.id)
                  )
                  .map((msg: any) => (
                    <div
                      key={msg.id}
                      className={`answer ${msg.senderId === currentUser.id ? 'right' : 'left'}`}
                    >
                      <div className="avatar">
                        <img
                          src="https://bootdey.com/img/Content/avatar/avatar1.png"
                          alt="avatar"
                        />
                        <div className="status offline"></div>
                      </div>
                      <div className="name">{msg.sender.name}</div>
                      <div className="text">{msg.content}</div>
                      <div className="time">
                        {new Date(msg.sentAt).toLocaleTimeString('tr-TR', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </div>
                  ))}

                {selectedUser && (
                  <div className="answer-add">
                    <input
                      placeholder="Mesaj yaz..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <span className="answer-btn answer-btn-1"></span>
                    <span className="answer-btn answer-btn-2" onClick={handleSend}></span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
