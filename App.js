import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './component/Login/HomeScreen';
import LoginScreen from './component/Login/LoginScreen';
import GruposScreen from './component/Login/GrupoScreen';
import ClientesScreen from './component/Login/ClientesScreen';
import CanalesScreen from './component/Login/CanalesScreen';
import SubcanalesScreen from './component/Login/SubcanalesScreen';
import ModulosScreen from './component/Login/ModulosScreen';
import CotizacionAutosScreen from './component/Autos/CotizacionAutosScreen';
import ResultadoCotizacionScreen from './component/Autos/ResultadoCotizacionScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Grupos" component={GruposScreen} />
      <Stack.Screen name="Clientes" component={ClientesScreen} />
      <Stack.Screen name="Canales" component={CanalesScreen} />
      <Stack.Screen name="Subcanales" component={SubcanalesScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Modulos" component={ModulosScreen} />
      <Stack.Screen name="CotizacionAutos" component={CotizacionAutosScreen} />
      <Stack.Screen name="ResultadoCotizacion" component={ResultadoCotizacionScreen} />
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
