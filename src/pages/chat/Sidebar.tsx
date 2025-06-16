import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  phone_number: string;
}

const Sidebar: React.FC<{ onSelectUser: (user: User) => void }> = ({ onSelectUser }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
      .get('https://chatbotbe.popoutbox.in/api/whatsapp/clients')
      .then((res) => {
        setUsers(res.data.data);
      })
      .catch((err) => {
        console.error('Error fetching users:', err);
      });
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.phone_number.includes(search)
  );

  return (
    <div
      style={{
        width: '100%',
        // maxWidth: '100%',
        borderRight: '1px solid #ccc',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff'
      }}
    >
      {/* Top Header */}
      <div
        style={{
          padding: '12px 16px',
          backgroundColor: '#25D366',
          borderBottom: '1px solid #ddd',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: '#fff'
        }}
      >
        <h2 style={{ margin: 0, fontSize: '18px' }}>Chat Meta</h2>
        <div
          onClick={() => alert('hi')}
          style={{
            fontSize: '24px',
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          &#8942;
        </div>
      </div>

      {/* Search Box */}
      <div style={{ padding: '10px', backgroundColor: '#f0f2f5' }}>
        <input
          type="text"
          placeholder="Search by number or name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%',
            padding: '10px 12px',
            borderRadius: '20px',
            border: 'none',
            backgroundColor: '#fff',
            boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
          }}
        />
      </div>

      {/* User List */}
      <div style={{ overflowY: 'auto', flex: 1, backgroundColor: '#fff' }}>
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            style={{
              padding: '12px 16px',
              borderBottom: '1px solid #f1f1f1',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            onClick={() => onSelectUser(user)}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#f0f2f5')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'white')}
          >
            <div
              style={{
                width: 40,
                height: 40,
                backgroundColor: '#25D366',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                color: '#fff',
                marginRight: '10px'
              }}
            >
              {user.name ? user.name.charAt(0).toUpperCase() : '👤'}
            </div>
            <div>
              <div style={{ fontWeight: 'bold', color: '#111' }}>{user.name}</div>
              <div style={{ fontSize: '12px', color: '#555' }}>{user.phone_number}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
