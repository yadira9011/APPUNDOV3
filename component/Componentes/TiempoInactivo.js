import React, { useEffect, useRef, useState } from 'react';
import { BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TiempoInactivo = ({ tiempoMaximo }) => {
  const navigation = useNavigation();
  const inactividadTimerRef = useRef(null);
  const [tiempoRestante, setTiempoRestante] = useState(tiempoMaximo);

  const redireccionarALogin = () => {
    setTiempoRestante(tiempoMaximo)
    navigation.navigate('Login');
  };

  const resetInactividadTimer = () => {
    clearTimeout(inactividadTimerRef.current);
    inactividadTimerRef.current = setTimeout(() => {
      redireccionarALogin();
    }, tiempoRestante);
  };

  useEffect(() => {
    const handleAppStateChange = () => {
      resetInactividadTimer();
    };
    BackHandler.addEventListener('hardwareBackPress', handleAppStateChange);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleAppStateChange);
      clearTimeout(inactividadTimerRef.current);
    };
  }, []);

  useEffect(() => {
    setTiempoRestante(tiempoMaximo);
    resetInactividadTimer();
  }, [tiempoMaximo]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTiempoRestante(prev => prev - 3000);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (tiempoRestante <= 0) {
      redireccionarALogin();
    }
  }, [tiempoRestante]);

  return null;
};

export default TiempoInactivo;

