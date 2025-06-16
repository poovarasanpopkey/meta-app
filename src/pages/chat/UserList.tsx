import React, { useEffect, useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonContent, IonList, IonItem, IonLabel, IonAvatar, IonSpinner
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    axios.get('https://chatbotbe.popoutbox.in/api/whatsapp/clients')
      .then(res => {
        console.log(res,"#############")
        if (res.data.status === 200) {
          setUsers(res.data.data);
        }
      }).catch(() => {
        console.error("Failed to fetch users");
      }).finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>WhatsApp Users</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {loading ? (
          <div className="ion-padding ion-text-center">
            <IonSpinner name="crescent" />
          </div>
        ) : (
          <IonList>
            {users.map(user => (
              <IonItem button key={user.id} onClick={() => history.push(`/chat/${user.phone_number}`, { user })}>
                <IonAvatar slot="start">
                  <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`} />
                </IonAvatar>
                <IonLabel>
                  <h2>{user.name}</h2>
                  <p>{user.phone_number}</p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default UserList;
