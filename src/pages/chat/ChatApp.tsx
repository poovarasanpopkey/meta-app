import React, { useEffect, useState } from 'react';
import { App as CapacitorApp } from '@capacitor/app';
import Sidebar from './Sidebar';
import ChatBox from './ChatBox';
import { User } from '../types';
  import { Keyboard } from '@capacitor/keyboard';


const ChatApp: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);


useEffect(() => {
  Keyboard.setScroll({ isDisabled: true }); // prevent auto-scrolling
  Keyboard.setResizeMode({ mode: 'native' }); // or 'body' if 'native' doesn't work well
}, []);
  // Resize listener
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Android hardware back button
  useEffect(() => {
    const backListener = CapacitorApp.addListener('backButton', () => {
      if (selectedUser && isMobile) {
        setSelectedUser(null); // Go back to sidebar
      } else {
        CapacitorApp.exitApp(); // Exit app
      }
    });

    return () => backListener.remove(); // Clean up
  }, [selectedUser, isMobile]);

  const handleBack = () => setSelectedUser(null);

  return (
    <div
      style={{
        display: 'flex',
        height: '100dvh',
        width: '100vw',
        paddingTop: 'env(safe-area-inset-top)',
      }}
    >
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
