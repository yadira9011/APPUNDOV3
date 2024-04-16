import React, { useEffect, useRef, useState } from 'react';
import { AppState, InteractionManager, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TiempoInactivo = ({ tiempoMaximo }) => {

  const navigation = useNavigation();
  const ultimaInteraccionRef = useRef(Date.now());
  const inactivityTimerRef = useRef(null);
  const appStateRef = useRef(AppState.currentState);
  const [isActiveApp, setIsActiveApp] = useState(false);

  const redireccionarALogin = () => {
    console.log('Usuario inactivo. Redireccionando a la pantalla de inicio de sesión.', isActiveApp);
    if (isActiveApp == false) {
      ultimaInteraccionRef.current = Date.now();
      navigation.navigate('Login');
    }
  };

  const resetInactivityTimer = (isActive) => {
    clearTimeout(inactivityTimerRef.current);
    if (!isActive) {
      inactivityTimerRef.current = setTimeout(() => {
        console.log("desde aqui")
        redireccionarALogin();
      }, tiempoMaximo);
    }
  };

  const handleAppStateChange = (nextAppState) => {
    if (appStateRef.current === 'active' && nextAppState === 'background') {
      clearTimeout(inactivityTimerRef.current);
    } else if (appStateRef.current === 'background' && nextAppState === 'active') {
      resetInactivityTimer(true);
    }
    appStateRef.current = nextAppState;
  };

  const handleUserInteraction = () => {
    ultimaInteraccionRef.current = Date.now();
    resetInactivityTimer(true);
  };


  useEffect(() => {

    const unsubscribe = navigation.addListener('state', () => {
      console.log("EVENTO CLIKC")
      setIsActiveApp(prevIsActiveApp => {
        console.log(prevIsActiveApp, "cccccc")
        resetInactivityTimer(prevIsActiveApp);
        ultimaInteraccionRef.current = Date.now();
        return true;
      });
    });

    const inactivityCheckInterval = setInterval(() => {
      const tiempoDesdeUltimaInteraccion = Date.now() - ultimaInteraccionRef.current;
      console.log(tiempoDesdeUltimaInteraccion, "jajaja ", ultimaInteraccionRef.current)
      console.log(tiempoMaximo)
      if (tiempoDesdeUltimaInteraccion >= tiempoMaximo) {

        setIsActiveApp(prevIsActiveApp => {
          return false;
        });

        redireccionarALogin();
      } else {
        resetInactivityTimer(true);
      }
    }, 5000);

    AppState.addEventListener('change', handleAppStateChange);
    InteractionManager.runAfterInteractions(() => {
      resetInactivityTimer(true);
    });

    return () => {
      unsubscribe();
      clearInterval(inactivityCheckInterval);
      clearTimeout(inactivityTimerRef.current);
    };

  }, [tiempoMaximo, isActiveApp]);

  return (
    <TouchableOpacity onPress={handleUserInteraction}>
      <View />
    </TouchableOpacity>
  );
};

export default TiempoInactivo;

