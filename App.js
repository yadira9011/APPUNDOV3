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

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MainStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Grupos" component={GruposScreen} />
      <Stack.Screen name="Clientes" component={ClientesScreen} />
      <Stack.Screen name="Canales" component={CanalesScreen} />
      <Stack.Screen name="Subcanales" component={SubcanalesScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Modulos" component={ModulosScreen} />
      {/* <Stack.Screen name="CotizacionAutos" component={CotizacionAutosScreen} /> */}
      <Stack.Screen name="ResultadoCotizacion" component={ResultadoCotizacionScreen} />
      <Stack.Screen name="Emision" component={EmisionScreen} />
    </Stack.Navigator>
  );
}

const DrawerNavigator = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="CotizacionAutos" component={CotizacionAutosScreen} />
  </Drawer.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>

      {/*<Drawer.Navigator initialRouteName="Main" drawerContent={(props) => <SideMenu {...props} />}>
        <Drawer.Screen name="CotizacionAutos" component={CotizacionAutosScreen} />
      </Drawer.Navigator> */}

      {/* <Drawer.Navigator
        drawerContent={props => <SideMenu {...props} />}
        initialRouteName="Login">
        <Drawer.Screen name="CotizacionAutos" component={CotizacionAutosScreen} />
      </Drawer.Navigator> */}

      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Grupos" component={GruposScreen} />
        <Stack.Screen name="Clientes" component={ClientesScreen} />
        <Stack.Screen name="Canales" component={CanalesScreen} />
        <Stack.Screen name="Subcanales" component={SubcanalesScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Modulos" component={ModulosScreen} />
        <Stack.Screen name="CotizacionAutos" component={DrawerNavigator} />
        <Stack.Screen name="ResultadoCotizacion" component={ResultadoCotizacionScreen} />
        <Stack.Screen name="Emision" component={EmisionScreen} />
      </Stack.Navigator>

      {/* <Drawer.Navigator initialRouteName="Login" drawerContent={(props) => <SideMenu {...props} />}>
        <Drawer.Screen name="CotizacionAutos" component={CotizacionAutosScreen} />
      </Drawer.Navigator> */}

    </NavigationContainer>
    // <NavigationContainer>
    //   <Drawer.Navigator initialRouteName="Login" drawerContent={(props) => <SideMenu {...props} />}>
    //     <Drawer.Screen name="Login" component={LoginScreen} />
    //     <Drawer.Screen name="Grupos" component={GruposScreen} />
    //     <Drawer.Screen name="Clientes" component={ClientesScreen} />
    //     <Drawer.Screen name="Canales" component={CanalesScreen} />
    //     <Drawer.Screen name="Subcanales" component={SubcanalesScreen} />
    //     <Drawer.Screen name="Home" component={HomeScreen} />
    //     <Drawer.Screen name="Modulos" component={ModulosScreen} />
    //     <Drawer.Screen name="CotizacionAutos" component={CotizacionAutosScreen} />
    //     <Drawer.Screen name="ResultadoCotizacion" component={ResultadoCotizacionScreen} />
    //     <Drawer.Screen name="Emision" component={EmisionScreen} />
    //   </Drawer.Navigator>
    //</NavigationContainer>
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
