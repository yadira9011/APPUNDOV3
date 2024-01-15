import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ActivityIndicator  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './component/Login/HomeScreen';
import LoginScreen from './component/Login/LoginScreen';
import GruposScreen from './component/Login/GrupoScreen';
import ClientesScreen from './component/Login/ClientesScreen';
import CanalesScreen from './component/Login/CanalesScreen';
import SubcanalesScreen from './component/Login/SubcanalesScreen';
import ModulosScreen from './component/Login/ModulosScreen';
import CotizacionAutosScreen from './component/Autos/CotizacionAutosScreen';
import ResultadoCotizacionScreen from './component/Autos/ResultadoCotizacionScreen';
import EmisionScreen from './component/Autos/EmisionScreen';
import SideMenu from './component/Componentes/SideMenu';
import PDFViewerScreen from './component/Componentes/PDFViewerScreen';
import ViewerBase64Screen from './component/Componentes/ViewerBase64Screen';
import ConsultaPolizasScreen from './component/Polizas/ConsultaPolizasScreen';
import InicioAPScreen from './component/Agropecuario/InicioAPScreen';
//import PushNotification from './component/Componentes/PushNotification';
//import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator drawerContent={(props) => <SideMenu {...props} />}>
    <Drawer.Screen name="CotizacionAutos" component={CotizacionAutosScreen} initialParams={{ DataParameter: '' }} />
  </Drawer.Navigator>
);

export default function App() {

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    if (Device.isDevice) {
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
      token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig.extra.eas.projectId,
      });
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }

    return token.data;
  }

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    // registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    // console.log("TOKENNNNNN",expoPushToken)

    const fetchExpoPushToken = async () => {
      try {

        const token = await registerForPushNotificationsAsync();
        setExpoPushToken(token);
        //console.log("TOKENNNNNN",token)
        //registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
        //console.log("TOKENNNNNN",expoPushToken)
       
      } catch (error) {
        console.error('Error obtaining Expo Push token:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpoPushToken();

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log("resss",response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };

  }, []);

  if (loading) {
    // Puedes mostrar un componente de carga mientras esperas que el token esté disponible
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (

    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: true,
      }} initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} 
         initialParams={{ expoPushToken: expoPushToken }}
         listeners={({ navigation }) => ({
          focus: () => {
            navigation.setParams({ expoPushToken: expoPushToken });
          },
        })}
         />
        <Stack.Screen name="Grupos" component={GruposScreen} />
        <Stack.Screen name="Clientes" component={ClientesScreen} />
        <Stack.Screen name="Canales" component={CanalesScreen} />
        <Stack.Screen name="Subcanales" component={SubcanalesScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Modulos" component={ModulosScreen} />
        <Stack.Screen name="DrawerCotizacion" component={DrawerNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="ResultadoCotizacion" component={ResultadoCotizacionScreen} />
        <Stack.Screen name="Emision" component={EmisionScreen} />
        <Stack.Screen name="PDFViewerScreen" component={PDFViewerScreen} />
        <Stack.Screen name="ViewerBase64Screen" component={ViewerBase64Screen} />
        <Stack.Screen name="ConsultaPolizas" component={ConsultaPolizasScreen} />
        <Stack.Screen name="InicioAPScreen" component={InicioAPScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
