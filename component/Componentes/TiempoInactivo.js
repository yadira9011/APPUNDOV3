import React, { useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TiempoInactivo = ({ tiempoMaximo, tiempoInactividad }) => {
  const navigation = useNavigation();
  const [tiempoRestante, setTiempoRestante] = useState(tiempoMaximo);
  const [ultimaInteraccion, setUltimaInteraccion] = useState(Date.now());

  const redireccionarALogin = () => {
    setTiempoRestante(tiempoMaximo);
    setUltimaInteraccion(Date.now());
    navigation.navigate('Login');
  };

  const resetInactividadTimer = () => {

    clearTimeout(inactividadTimerRef.current);
    inactividadTimerRef.current = setTimeout(() => {
      redireccionarALogin();
    }, tiempoMaximo);

  };

  const inactividadTimerRef = useRef(null);

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === 'active') {
        resetInactividadTimer();
      }
    };

    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
      clearTimeout(inactividadTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTiempoRestante(prev => prev - 1000);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleInteraction = () => {
      console.log("Interacción detectada");
      setUltimaInteraccion(Date.now());
    };

    const interactionSubscription = navigation.addListener('focus', handleInteraction);

    return () => {
      interactionSubscription();
    };
  }, [navigation]);

  useEffect(() => {
    const inactividadCheckInterval = setInterval(() => {
      const tiempoDesdeUltimaInteraccion = Date.now() - ultimaInteraccion;
      if (tiempoDesdeUltimaInteraccion >= tiempoInactividad) {
        redireccionarALogin();
      }
    }, 1000);

    return () => clearInterval(inactividadCheckInterval);
  }, [ultimaInteraccion, tiempoInactividad]);

  return null;
};

export default TiempoInactivo;
