import React, { useEffect, useRef, useState, forwardRef } from 'react';
import { AppState, InteractionManager, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute  } from '@react-navigation/native';
import CustomAlert from '../Componentes/CustomAlert';
import useCurrentRoute from '../Componentes/CurrentRoute';

let resetsetIsActiveApp;
let resertTiempoMaximoApp;

const TiempoInactivo = forwardRef(({ tiempoMaximo }, ref) => {

  const navigation = useNavigation();
  // const route = useRoute();
  const routeName = useCurrentRoute(); // Obtén la ruta actual
  const ultimaInteraccionRef = useRef(Date.now());
  const inactivityTimerRef = useRef(null);
  const appStateRef = useRef(AppState.currentState);
  const [isActiveApp, setIsActiveApp] = useState(false);

  const [isAlertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [IconMessage, setIconMessage] = useState('Icon_Blue.png');
  const [isAlertTwo, setAlertTwo] = useState(true);

  resetsetIsActiveApp = () => {
    setIsActiveApp(true);
    ultimaInteraccionRef.current = Date.now();
  };

  resertTiempoMaximoApp = (IsEmision) => {
    if(IsEmision){
      tiempoMaximo=300000;
    }else{
      tiempoMaximo=120000;
    }
    setIsActiveApp(true);
  };

  const redireccionarALogin = () => {
    if (!isActiveApp) {
      ultimaInteraccionRef.current = Date.now();
      navigation.navigate('Login');
    }
  };

  const resetInactivityTimer = (isActive) => {
    clearTimeout(inactivityTimerRef.current);
    if (!isActive) {
      inactivityTimerRef.current = setTimeout(() => {
        setIsActiveApp(false);
        redireccionarALogin();
      }, tiempoMaximo);
    }
  };

  const handleAppStateChange = (nextAppState) => {
    if (appStateRef.current === 'active' && nextAppState === 'background') {
      clearTimeout(inactivityTimerRef.current);
    } else if (appStateRef.current === 'background' && nextAppState === 'active' && routeName === 'Login') {
      resetInactivityTimer(false);
    }
    appStateRef.current = nextAppState;
  };

  const handleUserInteraction = () => {
    ultimaInteraccionRef.current = Date.now();
    resetInactivityTimer(true);
  };

  const onAcepted = async () => {
    resetsetIsActiveApp();
    setAlertVisible(false);
  };

  const onClose = async () => {
    setIsActiveApp(false);
    ultimaInteraccionRef.current = Date.now();
    navigation.navigate('Login');
    setAlertVisible(false);
  };

  useEffect(() => {

    console.log('Ruta al inicio:', routeName);

    const unsubscribe = navigation.addListener('state', () => {
      setIsActiveApp(prevIsActiveApp => {
        resetInactivityTimer(prevIsActiveApp);
        ultimaInteraccionRef.current = Date.now();
        return true;
      });
    });

    const inactivityCheckInterval = setInterval(() => {
      const tiempoDesdeUltimaInteraccion = Date.now() - ultimaInteraccionRef.current;
      console.log(tiempoDesdeUltimaInteraccion, "jajaja ", routeName, ultimaInteraccionRef.current)
      console.log(tiempoMaximo,routeName);
      if (tiempoDesdeUltimaInteraccion >= tiempoMaximo && routeName !== 'Login') {
        setAlertMessage('Su sesión está a punto de expirar ¿Desea mantenerla?');
        setAlertVisible(true);
      } else {
        setAlertVisible(false);
        resetInactivityTimer(true);
      }

    }, 60000);

    AppState.addEventListener('change', handleAppStateChange);
    InteractionManager.runAfterInteractions(() => {
      resetInactivityTimer(true);
    });

    return () => {
      unsubscribe();
      console.log(routeName)
      clearInterval(inactivityCheckInterval);
      clearTimeout(inactivityTimerRef.current);
    };

  }, [tiempoMaximo, isActiveApp, routeName]);

  return (

    <View>

      <TouchableOpacity onPress={handleUserInteraction}>
        <View />
      </TouchableOpacity>

      {
        isAlertVisible && (
          <CustomAlert
            visible={isAlertVisible}
            message={alertMessage}
            iconName={IconMessage}
            onClose={onClose}
            onConfirm={onAcepted}
            AlertTwo={isAlertTwo}
          />
        )
      }

    </View>

  );
});

export { resetsetIsActiveApp };
export { resertTiempoMaximoApp };
export default TiempoInactivo;

