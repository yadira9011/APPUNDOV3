import React, { useEffect, useRef } from 'react';
import { AppState, InteractionManager, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TiempoInactivo = ({ tiempoMaximo }) => {

  const navigation = useNavigation();
  const ultimaInteraccionRef = useRef(Date.now());
  const inactivityTimerRef = useRef(null);
  const appStateRef = useRef(AppState.currentState);

  const redireccionarALogin = () => {
    handleUserInteraction();
    console.log('Usuario inactivo. Redireccionando a la pantalla de inicio de sesión.');
    navigation.navigate('Login');
  };

  const resetInactivityTimer = () => {
    clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      redireccionarALogin();
    }, tiempoMaximo);
  };

  const handleAppStateChange = (nextAppState) => {

    console.log('La aplicación está en segundo plano.');
    console.log('handleAppStateChange:', nextAppState);
    if (appStateRef.current === 'active' && nextAppState === 'background') {
      console.log('La aplicación está en segundo plano.');
      clearTimeout(inactivityTimerRef.current);
    } else if (appStateRef.current === 'background' && nextAppState === 'active') {
      console.log('La aplicación está activa. Reiniciando temporizador de inactividad.');
      resetInactivityTimer();
    }
    appStateRef.current = nextAppState;
  };

  const handleUserInteraction = () => {
    ultimaInteraccionRef.current = Date.now();
    resetInactivityTimer();
  };

  const handleUser = () => {
    console.log('okokisishshs');
  };

  useEffect(() => {

    const unsubscribe = navigation.addListener('state', () => {
      console.log('Evento onPress detectado en cualquier pantalla.');
      // Aquí puedes realizar cualquier acción que desees al detectar el evento onPress
    });

    const inactivityCheckInterval = setInterval(() => {
      const tiempoDesdeUltimaInteraccion = Date.now() - ultimaInteraccionRef.current;
      //console.log(appStateRef);
      if (tiempoDesdeUltimaInteraccion >= tiempoMaximo) {
        redireccionarALogin();
      } else {
        resetInactivityTimer();
      }
    }, 1000);

    AppState.addEventListener('change', handleAppStateChange);
    InteractionManager.runAfterInteractions(() => {
      resetInactivityTimer();
    });

    const userInteractionSubscription = InteractionManager.createInteractionHandle();

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
      clearInterval(inactivityCheckInterval);
      InteractionManager.clearInteractionHandle(userInteractionSubscription);
      clearTimeout(inactivityTimerRef.current);
    };

  }, [tiempoMaximo]);

  return (
    <TouchableOpacity onPress={handleUser}>
      <View>
      </View>
    </TouchableOpacity>
  );
};
export default TiempoInactivo;

// import React, { useEffect, useRef } from 'react';
// import { AppState, InteractionManager, TouchableWithoutFeedback, View } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// const TiempoInactivo = ({ tiempoMaximo }) => {
//   const navigation = useNavigation();
//   const ultimaInteraccionRef = useRef(Date.now());
//   const inactivityTimerRef = useRef(null);
//   const appStateRef = useRef(AppState.currentState);

//   const redireccionarALogin = () => {
//     handleUserInteraction();
//     console.log('Usuario inactivo. Redireccionando a la pantalla de inicio de sesión.');
//     navigation.navigate('Login');
//   };

//   const resetInactivityTimer = () => {
//     clearTimeout(inactivityTimerRef.current);
//     inactivityTimerRef.current = setTimeout(() => {
//       redireccionarALogin();
//     }, tiempoMaximo);
//   };

//   const handleAppStateChange = (nextAppState) => {
//     if (appStateRef.current === 'active' && nextAppState === 'background') {
//       clearTimeout(inactivityTimerRef.current);
//     } else if (appStateRef.current === 'background' && nextAppState === 'active') {
//       resetInactivityTimer();
//     }
//     appStateRef.current = nextAppState;
//   };

//   const handleUserInteraction = () => {
//     console.log("okikijiji");
//     ultimaInteraccionRef.current = Date.now();
//     resetInactivityTimer();
//   };

//   useEffect(() => {
//     const inactivityCheckInterval = setInterval(() => {
//       const tiempoDesdeUltimaInteraccion = Date.now() - ultimaInteraccionRef.current;
//       if (tiempoDesdeUltimaInteraccion >= tiempoMaximo) {
//         redireccionarALogin();
//       } else {
//         resetInactivityTimer();
//       }
//     }, 1000);

//     AppState.addEventListener('change', handleAppStateChange);

//     return () => {
//       AppState.removeEventListener('change', handleAppStateChange);
//       clearInterval(inactivityCheckInterval);
//       clearTimeout(inactivityTimerRef.current);
//     };
//   }, [tiempoMaximo]);

//   return (
//     <TouchableWithoutFeedback onPress={handleUserInteraction}>
//       <View />
//     </TouchableWithoutFeedback>
//   );
// };

// export default TiempoInactivo;

