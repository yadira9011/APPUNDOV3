import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
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

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator drawerContent={(props) => <SideMenu {...props} />}>
    <Drawer.Screen name="CotizacionAutos" component={CotizacionAutosScreen} initialParams={{ DataParameter: '' }} />
  </Drawer.Navigator>
);


export default function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: true,
      }} initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Grupos" component={GruposScreen} />
        <Stack.Screen name="Clientes" component={ClientesScreen} />
        <Stack.Screen name="Canales" component={CanalesScreen} />
        <Stack.Screen name="Subcanales" component={SubcanalesScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Modulos" component={ModulosScreen} />
        <Stack.Screen name="DrawerCotizacion" component={DrawerNavigator} />
        <Stack.Screen name="ResultadoCotizacion" component={ResultadoCotizacionScreen} />
        <Stack.Screen name="Emision" component={EmisionScreen} />
        <Stack.Screen name="PDFViewerScreen" component={PDFViewerScreen} />
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
