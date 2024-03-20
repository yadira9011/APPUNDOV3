import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { loginUser } from '../Api/api';
import { CountGrupos, CountClientes, CountCanales, CountSubCanales } from '../Utilities';
//import * as Notifications from 'expo-notifications';
import CustomAlert from '../Componentes/CustomAlert';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LoginScreen = ({ navigation, route }) => {

  // const [email, setEmail] = useState('mail@mail.com');
  // const [password, setPassword] = useState('Ven99234');
  const [email, setEmail] = useState('marcos.sanchez@rodac.com.mx');
  const [password, setPassword] = useState('marcosSL');
  const [expoPushToken, setExpoPushToken] = useState('');
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {ps
    const tokenFromProps = route.params?.expoPushToken || '';
    setExpoPushToken(tokenFromProps);
    console.log("token fromm login .... ", tokenFromProps)
  }, [route.params]);
  const handleLogin = async () => {
    try {
      const response = await loginUser(email, password, expoPushToken);
      const res = parseInt(response.data.FIIDUSUARIO, 10);
      const IdPersona = parseInt(response.data.FIIDPERSONA, 10);
      const IdRol = parseInt(response.data.FSIDROL, 10);
      if (res >= 0) {
        const userDataParameter = {
          IdUsr: res,
          password: password,
          email: email,
          IdPersona: IdPersona,
          IdRol: IdRol
        };
        GetFlujoLogin(userDataParameter);

      } else {
        setAlertMessage('No se encontro el usuario');
        setAlertVisible(true);
      }
    } catch (error) {
      setAlertMessage('Inicio de sesión fallido');
      setAlertVisible(true);
    }
  };

  const GetFlujoLogin = async (userDataParameter) => {
    try {
      const CGrupos = await CountGrupos(userDataParameter.email,
        userDataParameter.password,
        userDataParameter.IdUsr);
      if (CGrupos.count > 1) {
        navigation.navigate('Grupos', { userDataParameter });
      } else {
        const IdGrupoEmpresa = CGrupos.FirstElement.IdGrupoEmpresa;
        const CClientes = await CountClientes(userDataParameter.email,
          userDataParameter.password,
          userDataParameter.IdUsr,
          IdGrupoEmpresa);
        if (CClientes.count > 1) {
          const DataParameterClientes = {
            IdUsr: userDataParameter.IdUsr,
            password: userDataParameter.password,
            email: userDataParameter.email,
            IdGrupo: IdGrupoEmpresa,
            IdPersona: userDataParameter.IdPersona,
            IdRol: userDataParameter.IdRol,
          };
          navigation.navigate('Clientes', { DataParameterClientes });
        } else {
          const IdCliente = CClientes.FirstElement.IdCliente;
          const CCanales = await CountCanales(userDataParameter.email,
            userDataParameter.password,
            userDataParameter.IdUsr,
            IdCliente);
          if (CCanales.count > 1) {
            const DataParameterCanales = {
              IdUsr: userDataParameter.IdUsr,
              password: userDataParameter.password,
              email: userDataParameter.email,
              IdCliente: IdCliente,
              IdPersona: userDataParameter.IdPersona,
              IdRol: userDataParameter.IdRol,
            };
            navigation.navigate('Canales', { DataParameterCanales });
          } else {
            const IdCanal = CCanales.FirstElement.IdCanal;
            const CSubCanales = await CountSubCanales(userDataParameter.email,
              userDataParameter.password,
              userDataParameter.IdUsr,
              IdCanal);
            if (CSubCanales.count > 1) {
              const DataParameterSubcanales = {
                IdUsr: userDataParameter.IdUsr,
                password: userDataParameter.password,
                email: userDataParameter.email,
                IdCanal: IdCanal,
                IdPersona: userDataParameter.IdPersona,
                IdRol: userDataParameter.IdRol,
              };
              navigation.navigate('Subcanales', { DataParameterSubcanales });
            } else {
              const IDSubCanal = CCanales.FirstElement.IDSubCanal;
              const SubCanal = CCanales.FirstElement.SubCanal;
              const _DataParameter = {
                IdUsr: userDataParameter.IdUsr,
                password: userDataParameter.password,
                email: userDataParameter.email,
                IdSubCanal: IDSubCanal,
                NomSubCanal: SubCanal,
                IdPersona: userDataParameter.IdPersona,
                IdRol: userDataParameter.IdRol,
              };
              navigation.navigate('Modulos', { DataParameter: _DataParameter });
            }
          }
        }
      }
    } catch (error) {
      setAlertMessage('Inicio de sesión fallido');
      setAlertVisible(true);
    }
  };

  const hideAlert = () => {
    setAlertVisible(false);
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/LoginApp.png')} style={styles.image} resizeMode="contain" />
      <TextInput
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        style={styles.textInput}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.textInput}
      />

      {/* <Text>TOKEN: {expoPushToken} </Text> */}

      {/* <Button title="Iniciar sesión" onPress={handleLogin}  style={styles.button} /> */}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.ButtonText}>Iniciar sesión</Text>
      </TouchableOpacity>

      <Image source={require('../../assets/IconoU.png')} style={styles.imageU} resizeMode="contain" />
      <Text style={styles.Copyright}> ©UNDO 2017 - 2024</Text>

      {isAlertVisible && (
        <CustomAlert
          visible={isAlertVisible}
          message={alertMessage}
          onClose={hideAlert}
        />
      )}

    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  textInput: {
    width: '80%',
    height: 40,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#0051C4',
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  button: {
    width: 300,
    height: 40,
    alignSelf: 'center',
    marginTop: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#AAB3DB',
    borderRadius: 5,
  },
  ButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  image: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.3,
    marginBottom: 25
  },
  imageU: {
    width: windowWidth * 0.2,
    height: windowHeight * 0.2,
    marginTop: 5
  },
  Copyright: {
    color: 'white',
    textAlign: 'center',
    color:'#0051C4',
    fontSize:10
  },
});

export default LoginScreen;