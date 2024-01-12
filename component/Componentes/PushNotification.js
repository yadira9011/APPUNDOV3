import React, { useEffect } from 'react';
import { View, Button, Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';


const PushNotification = () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // Manejar la notificación push cuando la aplicación está en primer plano
      console.log('Notificación push recibida en primer plano:', remoteMessage);
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        // Manejar la notificación push cuando se abre la aplicación desde la notificación
        if (remoteMessage) {
          console.log('Notificación push recibida al abrir la aplicación:', remoteMessage);
        }
      });

    return unsubscribe;
  }, []);

  const sendPushNotification = async () => {
    try {
      await messaging().sendMessage({
        data: {
          title: 'Notificación de prueba',
          body: '¡Hola! Esta es una notificación push de prueba.',
        },
      });
      Alert.alert('Notificación enviada con éxito');
    } catch (error) {
      console.error('Error al enviar la notificación:', error);
      Alert.alert('Error al enviar la notificación');
    }
  };

  return (
    <View>
      <Button title="Enviar Notificación" onPress={sendPushNotification} />
    </View>
  );
};

export default PushNotification;