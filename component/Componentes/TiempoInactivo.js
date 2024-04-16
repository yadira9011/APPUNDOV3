import React, { useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TiempoInactivo = ({ tiempoMaximo, tiempoInactividad, children }) => {
  const navigation = useNavigation();
  const [ultimaInteraccion, setUltimaInteraccion] = useState(Date.now());

  const redireccionarALogin = () => {
    setUltimaInteraccion(Date.now());
    navigation.navigate('Login');
  };

  const resetInactividadTimer = () => {
    clearTimeout(inactividadTimerRef.current);
    inactividadTimerRef.current = setTimeout(() => {
      const tiempoDesdeUltimaInteraccion = Date.now() - ultimaInteraccion;
      if (tiempoDesdeUltimaInteraccion >= tiempoInactividad) {
        console.log('El usuario está inactivo');
        redireccionarALogin();
      }
    }, tiempoMaximo);
  };

  const inactividadTimerRef = useRef(null);

  const handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'active') {
      resetInactividadTimer();
    }
  };

  const handleInteraccionUsuario = () => {
    console.log('El usuario ACTIVO');
    setUltimaInteraccion(Date.now());
  };

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
      clearTimeout(inactividadTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const inactividadCheckInterval = setInterval(() => {
      const tiempoDesdeUltimaInteraccion = Date.now() - ultimaInteraccion;
      if (tiempoDesdeUltimaInteraccion >= tiempoInactividad) {
        console.log('El usuario está inactivo');
        redireccionarALogin();
      }
    }, 1000);
    
    return () => clearInterval(inactividadCheckInterval);
  }, [ultimaInteraccion, tiempoInactividad]);

  useEffect(() => {
    resetInactividadTimer();
  }, [ultimaInteraccion, tiempoMaximo, tiempoInactividad]);

  return React.Children.map(children, (child) =>
    React.cloneElement(child, {
      onTouchStart: handleInteraccionUsuario,
      onScroll: handleInteraccionUsuario,
      onPress: handleInteraccionUsuario,
      // Agrega otros eventos de interacción según sea necesario
    })
  );
};

export default TiempoInactivo;
