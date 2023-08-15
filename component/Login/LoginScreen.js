import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Image, StyleSheet } from 'react-native';
import { loginUser } from '../api';
import { CountGrupos, CountClientes, CountCanales, CountSubCanales } from '../Utilities';


const LoginScreen = ({ navigation }) => {

  const [email, setEmail] = useState('mail@mail.com');
  const [password, setPassword] = useState('Ven99234');

  const handleLogin = async () => {
    try {

      const response = await loginUser(email, password);
      const res = parseInt(response.data.FIIDUSUARIO, 10);

      if (res >= 0) {

        const userDataParameter = {
          IdUsr: res,
          password: password,
          email: email,
        };

        //navigation.navigate('Home', { userDataParameter });
        //navigation.navigate('Grupos', { userDataParameter });
        GetFlujoLogin(userDataParameter);

      } else {
        Alert.alert('Error', 'No se encontro el usuario');
      }
    } catch (error) {
      Alert.alert('Error', 'Inicio de sesión fallido');
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
            IdGrupo: IdGrupoEmpresa
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
              IdCliente: IdCliente
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
                IdCanal: IdCanal
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
                NomSubCanal: SubCanal
              };
              navigation.navigate('Modulos', { DataParameter: _DataParameter });
            }
          }
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Inicio de sesión fallido');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/UndoLogo.png')} style={styles.image} resizeMode="contain" />
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
      <Button title="Iniciar sesión" onPress={handleLogin} />
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
    borderColor: 'gray',
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  button: {
    width: 300,
    height: 40,
  },
});

export default LoginScreen;