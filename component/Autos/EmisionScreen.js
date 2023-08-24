import React, { useState } from 'react';
import { View, Text, TextInput, Picker, StyleSheet, Button } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';;

const EmisionScreen = () => {

  const route = useRoute();
  const navigation = useNavigation();
  const { dataArray } = route.params;
  
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [direccionCollapsed, setDireccionCollapsed] = useState(true);

  //Datos contratante
  const [nombre, setNombre] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [rfc, setRFC] = useState('');
  const [curp, setCURP] = useState('');
  const [diaNacimiento, setDiaNacimiento] = useState('');
  const [mesNacimiento, setMesNacimiento] = useState('');
  const [anoNacimiento, setAnoNacimiento] = useState('');
  const [genero, setGenero] = useState('');
  const [tipoIdentificacion, setTipoIdentificacion] = useState('');
  const [numIdentificacion, setNumIdentificacion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');

  //Datos Direccion
  const [calle, setCalle] = useState('');
  const [noExterior, setNoExterior] = useState('');
  const [noInterior, setNoInterior] = useState('');
  const [colonia, setColonia] = useState('');
  const [codigoPostal, setCodigoPostal] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [estado, setEstado] = useState('');
  const [ciudad, setCiudad] = useState('');

  //Datos DatosVehiculo
  const [numCredito, setNumCredito] = useState('');
  const [numSerie, setNumSerie] = useState('');
  const [numMotor, setNumMotor] = useState('');
  const [placas, setPlacas] = useState('');

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleDireccionCollapse = () => {
    setDireccionCollapsed(!direccionCollapsed);
  };

  const toggleVehiculoCollapse = () => {
    setVehiculoCollapsed(!vehiculoCollapsed);
  };


  return (
    
    <View style={styles.container}>

      <TouchableOpacity onPress={toggleCollapse} style={styles.button}>
        <Text style={styles.buttonText}>Datos Contratante</Text>
      </TouchableOpacity>
      <Collapsible collapsed={isCollapsed}>
        <Text>Nombre</Text>
        <TextInput
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
        />

        <Text>Apellido Paterno</Text>
        <TextInput
          style={styles.input}
          value={apellidoPaterno}
          onChangeText={setApellidoPaterno}
        />

        <Text>Apellido Materno</Text>
        <TextInput
          style={styles.input}
          value={apellidoMaterno}
          onChangeText={setApellidoMaterno}
        />

        <Text>RFC</Text>
        <TextInput
          style={styles.input}
          value={rfc}
          onChangeText={setRFC}
        />

        <Text>CURP</Text>
        <TextInput
          style={styles.input}
          value={curp}
          onChangeText={setCURP}
        />

        <Text>Fecha de Nacimiento</Text>
        <TextInput
          style={styles.input}
          value={diaNacimiento}
          onChangeText={setDiaNacimiento}
          placeholder="Día"
        />
        <TextInput
          style={styles.input}
          value={mesNacimiento}
          onChangeText={setMesNacimiento}
          placeholder="Mes"
        />
        <TextInput
          style={styles.input}
          value={anoNacimiento}
          onChangeText={setAnoNacimiento}
          placeholder="Año"
        />

        <Text>Género</Text>
        <Picker
          selectedValue={genero}
          onValueChange={setGenero}
          style={styles.input}
        >
          <Picker.Item label="Selecciona" value="" />
          <Picker.Item label="Masculino" value="masculino" />
          <Picker.Item label="Femenino" value="femenino" />
          <Picker.Item label="Otro" value="otro" />
        </Picker>

        <Text>Tipo de Identificación</Text>
        <Picker
          selectedValue={tipoIdentificacion}
          onValueChange={setTipoIdentificacion}
          style={styles.input}
        >
          <Picker.Item label="Selecciona" value="" />
          <Picker.Item label="Tipo 1" value="tipo1" />
          <Picker.Item label="Tipo 2" value="tipo2" />
          {/* Agrega más opciones si es necesario */}
        </Picker>

        <Text>Número de Identificación</Text>
        <TextInput
          style={styles.input}
          value={numIdentificacion}
          onChangeText={setNumIdentificacion}
        />

        <Text>Teléfono</Text>
        <TextInput
          style={styles.input}
          value={telefono}
          onChangeText={setTelefono}
        />

        <Text>Correo Electrónico</Text>
        <TextInput
          style={styles.input}
          value={correo}
          onChangeText={setCorreo}
          keyboardType="email-address"
        />
      </Collapsible>

      <TouchableOpacity onPress={toggleDireccionCollapse} style={styles.button}>
        <Text style={styles.buttonText}> Datos Dirección </Text>
      </TouchableOpacity>

      <Collapsible collapsed={direccionCollapsed}>
        <Text>Calle</Text>
        <TextInput
          style={styles.input}
          value={calle}
          onChangeText={setCalle}
        />

        <Text>No. Exterior</Text>
        <TextInput
          style={styles.input}
          value={noExterior}
          onChangeText={setNoExterior}
        />

        <Text>No. Interior</Text>
        <TextInput
          style={styles.input}
          value={noInterior}
          onChangeText={setNoInterior}
        />

        <Text>Colonia</Text>
        <TextInput
          style={styles.input}
          value={colonia}
          onChangeText={setColonia}
        />

        <Text>Código Postal</Text>
        <TextInput
          style={styles.input}
          value={codigoPostal}
          onChangeText={setCodigoPostal}
          keyboardType="numeric"
        />

        <Text>Municipio</Text>
        <TextInput
          style={styles.input}
          value={municipio}
          onChangeText={setMunicipio}
        />

        <Text>Estado</Text>
        <TextInput
          style={styles.input}
          value={estado}
          onChangeText={setEstado}
        />

        <Text>Ciudad</Text>
        <TextInput
          style={styles.input}
          value={ciudad}
          onChangeText={setCiudad}
        />
      </Collapsible>

      <TouchableOpacity onPress={toggleVehiculoCollapse} style={styles.button}>
        <Text style={styles.buttonText}>Datos de Vehículo</Text>
      </TouchableOpacity>

      <Collapsible collapsed={vehiculoCollapsed}>
        <Text>Número de Crédito</Text>
        <TextInput
          style={styles.input}
          value={numCredito}
          onChangeText={setNumCredito}
        />

        <Text>Número de Serie</Text>
        <TextInput
          style={styles.input}
          value={numSerie}
          onChangeText={setNumSerie}
        />

        <Text>Número de Motor</Text>
        <TextInput
          style={styles.input}
          value={numMotor}
          onChangeText={setNumMotor}
        />

        <Text>Placas</Text>
        <TextInput
          style={styles.input}
          value={placas}
          onChangeText={setPlacas}
        />
      </Collapsible>

    </View>

  );

};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  }
});

export default EmisionScreen;
