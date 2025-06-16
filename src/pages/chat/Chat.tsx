import React from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonContent, IonFooter, IonInput, IonButton,
  IonIcon, IonBackButton, IonButtons
} from '@ionic/react';
import { useLocation } from 'react-router-dom';
import { send } from 'ionicons/icons';
import './Chat.css';

const Chat: React.FC = () => {
  const location = useLocation<{ user: any }>();
  const user = location.state?.user;

  const [message, setMessage] = React.useState('');
  const [messages, setMessages] = React.useState([
    { from: 'other', text: 'Hello 👋' },
    { from: 'me', text: 'Hi ' + user?.name },
  ]);

  const sendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { from: 'me', text: message }]);
      setMessage('');
    }
  };

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>{user.name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="chat-content">
        <div className="chat-container">
          {messages.map((msg, i) => (
            <div key={i} className={`chat-bubble ${msg.from}`}>
              {msg.text}
            </div>
          ))}
        </div>
      </IonContent>

      <IonFooter>
        <div className="chat-input-bar">
          <IonInput
            placeholder="Type a message"
            value={message}
            onIonChange={e => setMessage(e.detail.value!)}
          />
          <IonButton onClick={sendMessage}>
            <IonIcon icon={send} />
          </IonButton>
        </div>
      </IonFooter>
    </IonPage>
  );
};

export default Chat;
