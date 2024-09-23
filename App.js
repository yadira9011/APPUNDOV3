import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useRef } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  BackHandler
} from 'react-native';
import { NavigationContainer, useNavigationState } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Clipboard from 'expo-clipboard';
import LoginScreen from './component/Login/LoginScreen';
import GruposScreen from './component/Login/GrupoScreen';
import ClientesScreen from './component/Login/ClientesScreen';
import CanalesScreen from './component/Login/CanalesScreen';
import SubcanalesScreen from './component/Login/SubcanalesScreen';
import ModulosScreen from './component/Login/ModulosScreen';
import CotizacionAutosScreen from './component/Autos/CotizacionAutosScreen';
import ResultadoCotizacionScreen from './component/Autos/ResultadoCotizacionScreen';
import EmisionScreen from './component/Autos/EmisionScreen';
import PDFViewerScreen from './component/Componentes/PDFViewerScreen';
import ViewerBase64Screen from './component/Componentes/ViewerBase64Screen';
import InicioAPScreen from './component/Agropecuario/InicioAPScreen';
import MiPerfilScreen from './component/Polizas/MiPerfilScreen';
import NewPolizas from './component/Polizas/NewPolizas';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import MenuButtonAndModal from './component/Componentes/YourModal';
import TiempoInactivo from './component/Componentes/TiempoInactivo';
const Stack = createStackNavigator();


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
        console.log('Permission not granted:', finalStatus);
        alert('Failed to get push token for push notification!', finalStatus);
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

  
  const [notification, setNotification] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState('');
  const notificationListener = useRef();
  const responseListener = useRef();
  const [loading, setLoading] = useState(true);

  //const routeName = useNavigationState(state => state?.routes[state.index]?.name);

  useEffect(() => {

    const fetchExpoPushToken = async () => {
      try {
        const token = await registerForPushNotificationsAsync();
        setExpoPushToken(token);
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
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };

  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const screenOptions = {
    headerShown: false,
  };

  const defaultHeaderOptions = {
    headerShown: true,
    headerBackTitleVisible: false,
    headerStyle: {
      backgroundColor: '#0051C4',
    },
    headerTitleStyle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
    },
  };

  const headerBackImageFuntion = () => (
    <View style={{ marginLeft: 15 }}><Ionicons name="arrow-back" size={24} color="white" /></View>
  );

  return (
    <>

      <NavigationContainer>
        {/* <TiempoInactivo tiempoMaximo={10000} tiempoInactividad={10000} /> */}
        <TiempoInactivo tiempoMaximo={120000} tiempoInactividad={120000} />
        <Stack.Navigator screenOptions={screenOptions} initialRouteName="Login">

          <Stack.Screen
            name="Login"
            component={LoginScreen}
            initialParams={{ expoPushToken: expoPushToken }}
            listeners={({ navigation }) => ({
              focus: () => {
                navigation.setParams({ expoPushToken: expoPushToken });
              },
            })}
          />

          <Stack.Screen
            name="Grupos"
            component={GruposScreen}
            options={({ route, navigation }) => ({
              ...defaultHeaderOptions,
              headerLeft: null,
              headerRight: () => <MenuButtonAndModal navigation={navigation} route={route} />,
            })}
          />

          <Stack.Screen
            name="Clientes"
            component={ClientesScreen}
            options={({ route, navigation }) => ({
              ...defaultHeaderOptions,
              title: 'Clientes',
              headerBackImage: () => headerBackImageFuntion(),
              headerRight: () => <MenuButtonAndModal navigation={navigation} route={route} />,
            })}
          />

          <Stack.Screen
            name="Canales"
            component={CanalesScreen}
            options={({ route, navigation }) => ({
              ...defaultHeaderOptions,
              title: 'Canales',
              headerBackImage: () => headerBackImageFuntion(),
              headerRight: () => <MenuButtonAndModal navigation={navigation} route={route} />,
            })}
          />

          <Stack.Screen
            name="Subcanales"
            component={SubcanalesScreen}
            options={({ route, navigation }) => ({
              ...defaultHeaderOptions,
              title: 'Subcanales',
              headerBackImage: () => headerBackImageFuntion(),
              headerRight: () => <MenuButtonAndModal navigation={navigation} route={route} />,
            })}
          />

          <Stack.Screen
            name="Modulos"
            component={ModulosScreen}
            options={({ route, navigation }) => ({
              ...defaultHeaderOptions,
              title: 'Modulos',
              headerBackImage: () => headerBackImageFuntion(),
              headerRight: () => <MenuButtonAndModal navigation={navigation} route={route} />,
            })}
          />

          <Stack.Screen
            name="CotizacionAutos"
            component={CotizacionAutosScreen}
            options={({ route, navigation }) => ({
              ...defaultHeaderOptions,
              title: 'Cotizar Autos',
              headerBackImage: () => headerBackImageFuntion(),
              headerRight: () => <MenuButtonAndModal navigation={navigation} route={route} />,
            })}
          />

          <Stack.Screen
            name="ResultadoCotizacion"
            component={ResultadoCotizacionScreen}
            options={({ route, navigation }) => {
              //console.log('route.params:', route.params.dataArray.DataResul[0].Folio);
              const FolioCot = route.params.dataArray.DataResul[0].Folio;
              const copyToClipboard = async () => {
                await Clipboard.setStringAsync(FolioCot);
              };
              return {
                ...defaultHeaderOptions,
                // title: FolioCot,
                title: (
                  <Text selectable={true} style={{ fontSize: 10, color: 'white' }}>{FolioCot}</Text>
                  // <TouchableOpacity onPress={copyToClipboard}>
                  //   <Text style={{ fontSize: 10, color: 'white' }}>{FolioCot}</Text>
                  // </TouchableOpacity>
                ),
                headerTitleStyle: {
                  fontSize: 12,
                  color: 'white'
                },
                headerBackImage: () => headerBackImageFuntion(),
                headerRight: () => <MenuButtonAndModal navigation={navigation} route={route} />,
              };
            }}
          />

          <Stack.Screen
            name="Emision"
            component={EmisionScreen}
            options={({ route, navigation }) => ({
              ...defaultHeaderOptions,
              title: 'Emisión',
              headerRight: () => <MenuButtonAndModal navigation={navigation} route={route} />,
              headerLeft: () => null, 
            })}
          />

          <Stack.Screen
            name="PDFViewerScreen"
            component={PDFViewerScreen}
            options={({ route, navigation }) => ({
              ...defaultHeaderOptions,
              title: 'Documento',
              headerRight: () => <MenuButtonAndModal navigation={navigation} route={route} />,
            })}
          />

          <Stack.Screen
            name="ViewerBase64Screen"
            component={ViewerBase64Screen}
            options={({ route, navigation }) => ({
              ...defaultHeaderOptions,
              title: 'View PDF',
              headerBackImage: () => headerBackImageFuntion(),
            })}
          />

          <Stack.Screen
            name="NewPolizas"
            component={NewPolizas}
            options={({ route, navigation }) => ({
              ...defaultHeaderOptions,
              title: 'Mis Pólizas',
              headerBackImage: () => headerBackImageFuntion(),
              headerRight: () => <MenuButtonAndModal navigation={navigation} route={route} />,
            })}
          />

          <Stack.Screen
            name="InicioAPScreen"
            component={InicioAPScreen}
          />

          <Stack.Screen
            name="MiPerfilScreen"
            component={MiPerfilScreen}
            options={({ route, navigation }) => ({
              ...defaultHeaderOptions,
              title: 'Mi Perfil',
              headerBackImage: () => headerBackImageFuntion(),
              headerRight: () => <MenuButtonAndModal navigation={navigation} route={route} />,
            })}
          />

        </Stack.Navigator>
      </NavigationContainer>

    </>
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
