// PushNotificationHandler.js
import React, { useEffect, useRef } from 'react';
import { Notifications } from 'expo';

const PushNotificationHandler = () => {
  const notificationListener = useRef();
  const responseListener = useRef();

  const registerForPushNotificationsAsync = async () => {
    let token;

    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }

      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    return token;
  }

  useEffect(() => {
    const setupPushNotifications = async () => {
      const token = await registerForPushNotificationsAsync();

      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        notificationCommonHandler(notification);
      });

      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        notificationCommonHandler(response.notification);
        notificationNavigationHandler(response.notification.request.content);
      });
    };

    setupPushNotifications();

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  const notificationCommonHandler = (notification) => {
    console.log('A notification has been received', notification);
    // Save the notification to the Redux store if needed
  }

  const notificationNavigationHandler = ({ data }) => {
    console.log('A notification has been touched', data);
    // Navigate to the appropriate screen based on notification data
  }

  return null; // This component does not render anything visible in the interface
};

export default PushNotificationHandler;
