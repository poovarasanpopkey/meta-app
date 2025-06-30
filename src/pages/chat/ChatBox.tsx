// import React, { useEffect, useRef, useState } from 'react';
// import { FaArrowLeft, FaEllipsisV } from 'react-icons/fa';
// import axios from 'axios';
// import { Keyboard } from '@capacitor/keyboard';

// const ChatBox = ({ user, onBack }) => {
//   const [messages, setMessages] = useState([]);
//   const [page, setPage] = useState(1);
//   const [hasNext, setHasNext] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const [loadingMore, setLoadingMore] = useState(false);
//   const [inputText, setInputText] = useState('');
//   const [keyboardHeight, setKeyboardHeight] = useState(0);

//   const chatContainerRef = useRef<HTMLDivElement>(null);
//   const inputRef = useRef<HTMLInputElement>(null);

//   console.log('user',user)

//   // Capacitor keyboard handling
//   useEffect(() => {
//     Keyboard.setResizeMode({ mode: 'native' });
//     const show = Keyboard.addListener('keyboardWillShow', e => {
//       setKeyboardHeight(e.keyboardHeight || 300);
//     });
//     const hide = Keyboard.addListener('keyboardWillHide', () => {
//       setKeyboardHeight(0);
//     });
//     return () => {
//       show.remove();
//       hide.remove();
//     };
//   }, []);

//   // Initial and append message fetching
//   const fetchMessages = async (pg = 1, append = false) => {
//     if (!hasNext && pg !== 1) return;

//     const container = chatContainerRef.current;
//     const prevHeight = container?.scrollHeight || 0;
//     const prevTop = container?.scrollTop || 0;

//     pg === 1 ? setLoading(true) : setLoadingMore(true);
//     try {
//       // const resp = await axios.get(
//       //   `https://chatbotbe.popoutbox.in/api/whatsapp/chat/${user.phone_number}/messages/?page=${pg}&page_size=10&bot_number=917400500200`
//       // );
//        const resp = await axios.get(
//         `https://chatbotbe.popoutbox.in/api/whatsapp/chat/${user.phone_number}/messages/?page=${pg}&page_size=10`
//       );
//       const newMsgs = resp.data?.data || [];
//       setHasNext(resp.data?.has_next ?? false);

//       if (append) {
//         setMessages(prev => [...newMsgs, ...prev]);
//         setTimeout(() => {
//           const newHeight = container?.scrollHeight || 0;
//           if (container) {
//             container.scrollTop = newHeight - prevHeight + prevTop;
//           }
//         }, 50);
//       } else {
//         setMessages(newMsgs);
//         setTimeout(() => {
//           container?.scrollTo({ top: container.scrollHeight, behavior: 'auto' });
//         }, 50);
//       }
//       setPage(pg);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       pg === 1 ? setLoading(false) : setLoadingMore(false);
//     }
//   };

//   // Scroll handler
//   const handleScroll = () => {
//     const c = chatContainerRef.current;
//     if (c && c.scrollTop <= 10 && hasNext && !loadingMore) {
//       fetchMessages(page + 1, true);
//     }
//   };

//   // Sending message
//   const handleSend = () => {
//     if (!inputText.trim()) return;
//     const newMsg = {
//       sender: 'user',
//       message: inputText,
//       timestamp: new Date().toISOString()
//     };
//     setMessages(prev => [...prev, newMsg]);
//     setInputText('');
//     setTimeout(() => chatContainerRef.current?.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: 'smooth' }), 50);
//     // also send to backend
//   };

//   useEffect(() => {
//     if (user) fetchMessages(1, false);
//   }, [user]);

//   if (!user) return <div>Select a user to chat</div>;

//   return (
//     <div style={{ position: 'relative', height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#e5ddd5' }}>
//       {/* Header */}
//       <div style={{ padding: 12, background: '#f0f2f5', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #ccc' }}>
//         <div style={{ display: 'flex', alignItems: 'center' }}>
//           <FaArrowLeft onClick={onBack} style={{ marginRight: 12, cursor: 'pointer' }} />
//           <div style={{ display: 'flex', flexDirection: 'column' }}>
//             <strong>{user.name}</strong>
//             <small>{user.phone_number}</small>
//           </div>
//         </div>
//         <FaEllipsisV />
//       </div>

//       {/* Messages container */}
//       <div
//         ref={chatContainerRef}
//         onScroll={handleScroll}
//         style={{ flex: 1, overflowY: 'auto', gap: 8, display: 'flex', flexDirection: 'column' , padding: '10px 10px 80px', }}
//       >
//         {loadingMore && <div style={{ textAlign: 'center' }}>Loading more…</div>}
//         {loading ? (
//           <div style={{ textAlign: 'center' }}>Loading messages…</div>
//         ) : (
//           messages.map((msg, i) => (
//             <div key={i} style={{ alignSelf: msg.sender === 'user' ? 'flex-start' : 'flex-end', background: msg.sender === 'user' ? '#dcf8c6' : '#fff', padding: '8px 12px', borderRadius: 8, maxWidth: '70%' }}>
//               <div style={{ fontSize: 12, marginBottom: 4, textAlign: 'right', color: '#666' }}>{new Date(msg.timestamp).toLocaleTimeString()}</div>
//               <div style={{ whiteSpace: 'pre-wrap' }}>{typeof msg.message === 'string' ? msg.message : msg.message.body || msg.message.text}</div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Input */}
//       {/* <div style={{
//         position: 'absolute',
//         left: 0, right: 0,
//         bottom: keyboardHeight ? keyboardHeight : 0,
//         padding: '8px 12px 20px',
//         paddingBottom: `calc(env(safe-area-inset-bottom, 0px) + 8px)`,
//         background: '#f0f2f5', borderTop: '1px solid #ccc',
//         display: 'flex', alignItems: 'center'
//       }}>
//         <input
//           ref={inputRef}
//           value={inputText}
//           onChange={e => setInputText(e.target.value)}
//           style={{ flex: 1, padding: '10px 14px', borderRadius: 20, border: 'none', marginRight: 8 }}
//           placeholder="Type a message"
//           onFocus={() => setTimeout(() => chatContainerRef.current?.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: 'smooth' }), 100)}
//         />
//         <button onClick={handleSend} style={{ width:40, height:40, borderRadius: '50%', background:'#25d366', color:'#fff', border:'none' }}>📤</button>
//       </div> */}
//       {/* Fixed input box at bottom */}
// <div
//  style={{
//           position: 'absolute',
//           bottom: keyboardHeight > 0 ? `${keyboardHeight}px` : '0px',
//           left: 0,
//           right: 0,
//           padding: '8px 12px',
//           paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 8px)',
//           backgroundColor: '#f0f2f5',
//           borderTop: '1px solid #ccc',
//           display: 'flex',
//           alignItems: 'center',
//           zIndex: 10,
//           transition: 'bottom 0.25s ease',
//           marginBottom:'40px'
//         }}
// >
//   <input
//     type="text"
//     placeholder="Type a message"
//     value={inputText}
//     ref={inputRef}
//           onFocus={() => {
//             inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
//           }}
//     onChange={(e) => setInputText(e.target.value)}
//     style={{
//       flex: 1,
//       border: 'none',
//       borderRadius: '20px',
//       padding: '10px 15px',
//       marginRight: '10px',
//       outline: 'none',
//     }}
//   />
//   <button
//     onClick={handleSend}
//     style={{
//       backgroundColor: '#075E54',
//       color: '#fff',
//       border: 'none',
//       borderRadius: '50%',
//       width: '40px',
//       height: '40px',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       cursor: 'pointer',
//     }}
//   >
//     {/* <SendOutlined /> */}{'>'}
//   </button>
// </div>

// {/* <div
//         style={{
//           position: 'absolute',
//           bottom: keyboardHeight > 0 ? `${keyboardHeight}px` : '0px',
//           left: 0,
//           right: 0,
//           padding: '8px 12px',
//           paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 8px)',
//           backgroundColor: '#f0f2f5',
//           borderTop: '1px solid #ccc',
//           display: 'flex',
//           alignItems: 'center',
//           zIndex: 10,
//           transition: 'bottom 0.25s ease',
//           marginBottom:'40px'
//         }}
//       >
//         <input
//           ref={inputRef}
//           type="text"
//           placeholder="Type a message"
//           onFocus={() => {
//             inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
//           }}
//           style={{
//             flex: 1,
//             padding: '10px 14px',
//             borderRadius: '20px',
//             border: 'none',
//             outline: 'none',
//             fontSize: '15px',
//             marginRight: '8px',
//             backgroundColor: '#fff',
//             boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
//           }}
//         />

//         <button
//           style={{
//             backgroundColor: '#25D366',
//             border: 'none',
//             color: '#fff',
//             borderRadius: '50%',
//             width: '40px',
//             height: '40px',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             cursor: 'pointer',
//           }}
//         >
//           📤
//         </button>
//       </div> */}

//     </div>
//   );
// };

// export default ChatBox;





import React, { useEffect, useRef, useState } from 'react';
import { FaArrowLeft, FaEllipsisV } from 'react-icons/fa';
import axios from 'axios';
import { Keyboard } from '@capacitor/keyboard';

const ChatBox = ({ user, onBack }) => {
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [inputText, setInputText] = useState('');
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    Keyboard.setResizeMode({ mode: 'native' });
    const show = Keyboard.addListener('keyboardWillShow', e => {
      setKeyboardHeight(e.keyboardHeight || 300);
    });
    const hide = Keyboard.addListener('keyboardWillHide', () => {
      setKeyboardHeight(0);
    });
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  const fetchMessages = async (pg = 1, append = false) => {
    if (!hasNext && pg !== 1) return;

    const container = chatContainerRef.current;
    const prevHeight = container?.scrollHeight || 0;
    const prevTop = container?.scrollTop || 0;

    pg === 1 ? setLoading(true) : setLoadingMore(true);
    try {
      const resp = await axios.get(
        `https://chatbotbe.popoutbox.in/api/whatsapp/chat/${user.phone_number}/messages/?page=${pg}&page_size=10`
      );
      const newMsgs = resp.data?.data || [];
      setHasNext(resp.data?.has_next ?? false);

      if (append) {
        setMessages(prev => [...newMsgs, ...prev]);
        setTimeout(() => {
          const newHeight = container?.scrollHeight || 0;
          if (container) {
            container.scrollTop = newHeight - prevHeight + prevTop;
          }
        }, 50);
      } else {
        setMessages(newMsgs);
        setTimeout(() => {
          container?.scrollTo({ top: container.scrollHeight, behavior: 'auto' });
        }, 50);
      }
      setPage(pg);
    } catch (err) {
      console.error(err);
    } finally {
      pg === 1 ? setLoading(false) : setLoadingMore(false);
    }
  };

  const handleScroll = () => {
    const c = chatContainerRef.current;
    if (c && c.scrollTop <= 10 && hasNext && !loadingMore) {
      fetchMessages(page + 1, true);
    }
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const newMsg = {
      sender: 'user',
      message: inputText,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, newMsg]);
    setInputText('');
    setTimeout(() => chatContainerRef.current?.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: 'smooth' }), 50);

    try {
      await axios.post(`https://chatbotbe.popoutbox.in/api/whatsapp/chat/${user.phone_number}/send/`, {
        message: inputText,
        bot_number: user.bot_number || '917400500200',
        channel: user.channel || 'whatsapp',
      });
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  useEffect(() => {
    if (user) fetchMessages(1, false);
  }, [user]);

  if (!user) return <div>Select a user to chat</div>;

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#e5ddd5' }}>
      <div style={{ padding: 12, background: '#075E54', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #ccc' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FaArrowLeft onClick={onBack} style={{ marginRight: 12, cursor: 'pointer' }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <strong>{user.name}</strong>
            <small>{user.phone_number}</small>
          </div>
        </div>
        <FaEllipsisV />
      </div>

      <div
        ref={chatContainerRef}
        onScroll={handleScroll}
        style={{ flex: 1, overflowY: 'auto', padding: '10px 10px 90px', display: 'flex', flexDirection: 'column', gap: 8 }}
      >
        {loadingMore && <div style={{ textAlign: 'center' }}>Loading more…</div>}
        {loading ? (
          <div style={{ textAlign: 'center' }}>Loading messages…</div>
        ) : (
          messages.map((msg, i) => (
            <div key={i} style={{ alignSelf: msg.sender === 'user' ? 'flex-start' : 'flex-end', background: msg.sender === 'user' ? '#dcf8c6' : '#fff', padding: '8px 12px', borderRadius: 8, maxWidth: '70%' }}>
              <div style={{ fontSize: 12, marginBottom: 4, textAlign: 'right', color: '#666' }}>{new Date(msg.timestamp).toLocaleTimeString()}</div>
              <div style={{ whiteSpace: 'pre-wrap' }}>{typeof msg.message === 'string' ? msg.message : msg.message.body || msg.message.text}</div>
            </div>
          ))
        )}
      </div>

      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '8px 12px',
          paddingBottom: keyboardHeight > 0 ? `${keyboardHeight + 8}px` : 'env(safe-area-inset-bottom, 8px)',
          backgroundColor: '#f0f2f5',
          borderTop: '1px solid #ccc',
          display: 'flex',
          alignItems: 'center',
          zIndex: 10,
          transition: 'padding-bottom 0.3s ease',
        }}
      >
        <input
          type="text"
          placeholder="Type a message"
          value={inputText}
          ref={inputRef}
          onFocus={() => {
            setTimeout(() => {
              chatContainerRef.current?.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: 'smooth' });
            }, 100);
          }}
          onChange={(e) => setInputText(e.target.value)}
          style={{
            flex: 1,
            border: 'none',
            borderRadius: '20px',
            padding: '10px 15px',
            marginRight: '10px',
            outline: 'none',
            backgroundColor: '#fff',
          }}
        />
        <button
          onClick={handleSend}
          style={{
            backgroundColor: '#075E54',
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          &#10148;
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
