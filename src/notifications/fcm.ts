// import { PushNotifications } from '@capacitor/push-notifications';

// const addListeners = async () => {
//   await PushNotifications.addListener('registration', token => {
//     console.info('Registration token: ', token.value);
//   });

//   await PushNotifications.addListener('registrationError', err => {
//     console.error('Registration error: ', err.error);
//   });

//   await PushNotifications.addListener('pushNotificationReceived', notification => {
//     console.log('Push notification received: ', notification);
//   });

//   await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
//     console.log('Push notification action performed', notification.actionId, notification.inputValue);
//   });
// }

// const registerNotifications = async () => {
//   let permStatus = await PushNotifications.checkPermissions();

//   if (permStatus.receive === 'prompt') {
//     permStatus = await PushNotifications.requestPermissions();
//   }

//   if (permStatus.receive !== 'granted') {
//     throw new Error('User denied permissions!');
//   }

//   await PushNotifications.register();
// }

// const getDeliveredNotifications = async () => {
//   const notificationList = await PushNotifications.getDeliveredNotifications();
//   console.log('delivered notifications', notificationList);
// }

// src/services/fcm.ts

import { PushNotifications } from '@capacitor/push-notifications';

export const registerNotifications = async () => {
  let permStatus = await PushNotifications.checkPermissions();

  if (permStatus.receive === 'prompt') {
    permStatus = await PushNotifications.requestPermissions();
  }

  if (permStatus.receive !== 'granted') {
    console.warn('Push Notification permission not granted');
    return;
  }

  await PushNotifications.register();
};

export const addFCMListeners = async () => {
  // PushNotifications.addListener('registration', token => {
  //   console.log('FCM registration token:', token.value);
  // });
  PushNotifications.addListener('registration', async token => {
    console.log('FCM registration token:', token.value);

    try {
      const response = await fetch('https://chatbotbe.popoutbox.in/api/whatsapp/app/save-token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${yourAccessToken}`, // Replace with actual token if protected
        },
        body: JSON.stringify({
          token: token.value
        })
      });

      const data = await response.json();
      console.log('Token saved response:', data);
    } catch (error) {
      console.error('Error saving FCM token:', error);
    }
  });


  PushNotifications.addListener('registrationError', err => {
    console.error('Registration error:', err.error);
  });

  PushNotifications.addListener('pushNotificationReceived', notification => {
    console.log('Push notification received:', notification);
  });

  PushNotifications.addListener('pushNotificationActionPerformed', notification => {
    console.log(
      'Notification action performed:',
      notification.actionId,
      notification.inputValue
    );
  });
};

export const getDeliveredNotifications = async () => {
  const notificationList = await PushNotifications.getDeliveredNotifications();
  console.log('Delivered notifications:', notificationList);
};
