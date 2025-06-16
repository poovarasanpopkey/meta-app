// ChatApp.tsx
import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import ChatBox from './ChatBox';
// import './common.css';

const ChatApp: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleBack = () => setSelectedUser(null);

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
      {(!isMobile || !selectedUser) && (
        <div style={{ width: isMobile ? '100%' : '40%' }}>
          <Sidebar onSelectUser={setSelectedUser} />
        </div>
      )}
      {selectedUser && (
        <div style={{ flex: 1 }}>
          <ChatBox user={selectedUser} onBack={handleBack} isMobile={isMobile} />
        </div>
      )}
    </div>
  );
};

export default ChatApp;