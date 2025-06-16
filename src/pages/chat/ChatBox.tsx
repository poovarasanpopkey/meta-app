// import React from 'react';

// const ChatBox = ({ user }) => {
//   if (!user) {
//     return (
//       <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#e5ddd5' }}>
//         <p style={{ fontSize: '18px', color: '#555' }}>Select a user to start chat</p>
//       </div>
//     );
//   }

//   return (
//     <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#e5ddd5' }}>
//       {/* Header */}
//       <div style={{ padding: '12px 16px', backgroundColor: '#f0f2f5', display: 'flex', alignItems: 'center', borderBottom: '1px solid #ccc' }}>
//         <div
//           style={{
//             width: 40,
//             height: 40,
//             backgroundColor: '#25D366',
//             borderRadius: '50%',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             fontWeight: 'bold',
//             color: '#fff',
//             marginRight: '12px'
//           }}
//         >
//           {user.name ? user.name.charAt(0).toUpperCase() : '👤'}
//         </div>
//         <div style={{ display: 'flex', flexDirection: 'column' }}>
//           <strong>{user.name}</strong>
//           <small style={{ color: '#555' }}>{user.phone_number}</small>
//         </div>
//       </div>

//       {/* Chat Messages */}
//       <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
//         {/* Incoming Message */}
//         <div style={{ alignSelf: 'flex-start', maxWidth: '60%', backgroundColor: '#fff', padding: '8px 12px', borderRadius: '7.5px', boxShadow: '0 1px 1px rgba(0,0,0,0.1)' }}>
//           <span style={{ fontSize: '14px' }}>{user.name}: Hello!</span>
//         </div>
//         {/* Outgoing Message */}
//         <div style={{ alignSelf: 'flex-end', maxWidth: '60%', backgroundColor: '#dcf8c6', padding: '8px 12px', borderRadius: '7.5px', boxShadow: '0 1px 1px rgba(0,0,0,0.1)' }}>
//           <span style={{ fontSize: '14px' }}>You: Hi, how are you?</span>
//         </div>
//       </div>

//       {/* Message Input */}
//       <div style={{ display: 'flex', padding: '8px 12px', backgroundColor: '#f0f2f5', borderTop: '1px solid #ccc' }}>
//         <input
//           type="text"
//           placeholder="Type a message"
//           style={{ flex: 1, padding: '10px 12px', borderRadius: '20px', border: 'none', outline: 'none' }}
//         />
//         <button
//           style={{ marginLeft: '8px', backgroundColor: '#25D366', border: 'none', color: '#fff', borderRadius: '20px', padding: '10px 16px', cursor: 'pointer' }}
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatBox;


import React from 'react';
import { FaArrowLeft, FaEllipsisV } from 'react-icons/fa';

const ChatBox = ({ user, onBack }) => {
  if (!user) {
    return (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#e5ddd5' }}>
        <p style={{ fontSize: '18px', color: '#555' }}>Select a user to start chat</p>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#e5ddd5' }}>
      {/* Header */}
      <div style={{ padding: '12px 16px', backgroundColor: '#f0f2f5', display: 'flex', alignItems: 'center', borderBottom: '1px solid #ccc', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FaArrowLeft style={{ marginRight: '12px', cursor: 'pointer', fontSize: '18px' }} onClick={onBack} />
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
              marginRight: '12px'
            }}
          >
            {user.name ? user.name.charAt(0).toUpperCase() : '👤'}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <strong>{user.name}</strong>
            <small style={{ color: '#555' }}>{user.phone_number}</small>
          </div>
        </div>
        <FaEllipsisV style={{ cursor: 'pointer', fontSize: '18px' }} onClick={() => alert('More options')} />
      </div>

      {/* Chat Messages */}
      <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {/* Incoming Message */}
        <div style={{ alignSelf: 'flex-start', maxWidth: '60%', backgroundColor: '#fff', padding: '8px 12px', borderRadius: '7.5px', boxShadow: '0 1px 1px rgba(0,0,0,0.1)' }}>
          <span style={{ fontSize: '14px' }}>{user.name}: Hello!</span>
        </div>
        {/* Outgoing Message */}
        <div style={{ alignSelf: 'flex-end', maxWidth: '60%', backgroundColor: '#dcf8c6', padding: '8px 12px', borderRadius: '7.5px', boxShadow: '0 1px 1px rgba(0,0,0,0.1)' }}>
          <span style={{ fontSize: '14px' }}>You: Hi, how are you?</span>
        </div>
      </div>

      {/* Message Input */}
      <div style={{ display: 'flex', padding: '8px 12px', backgroundColor: '#f0f2f5', borderTop: '1px solid #ccc' }}>
        <input
          type="text"
          placeholder="Type a message"
          style={{ flex: 1, padding: '10px 12px', borderRadius: '20px', border: 'none', outline: 'none' }}
        />
        <button
          style={{ marginLeft: '8px', backgroundColor: '#25D366', border: 'none', color: '#fff', borderRadius: '20px', padding: '10px 16px', cursor: 'pointer' }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;

