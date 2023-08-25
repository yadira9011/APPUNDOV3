import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, Button, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Collapsible from 'react-native-collapsible';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { GetDias, GetMeses, GetAnyos, GetGeneros } from '../api';

const EmisionScreen = () => {

  const route = useRoute();
  const navigation = useNavigation();
  const { dataArrayEmi } = route.params;
  const [loadingCombos, setloadingCombos] = useState(false);

  const [isCollapsed, setIsCollapsed] = useState(true);
  const [direccionCollapsed, setDireccionCollapsed] = useState(true);
  const [vehiculoCollapsed, setVehiculoCollapsed] = useState(true);

  //Datos contratante
  const [nombre, setNombre] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [rfc, setRFC] = useState('');
  const [curp, setCURP] = useState('');

  const [diaNacimiento, setDiaNacimiento] = useState('');
  const [mesNacimiento, setMesNacimiento] = useState('');
  const [anoNacimiento, setAnoNacimiento] = useState('');

  const [dias, setDias] = useState([]);
  const [meses, setMeses] = useState([]);
  const [anos, setAnos] = useState([]);
  const [generos, setGeneros] = useState([]);

  const [selectedDia, setSelectedDia] = useState('');
  const [selectedMes, setSelectedMes] = useState('');
  const [selectedAno, setSelectedAno] = useState('');
  const [selectedGenero, setSelectedGenero] = useState('');

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

  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchAutoDias();
        await fetchAutoMeses();
        await fetchAutoAynos();
        await fetchAutoGeneros();
        setloadingCombos(true);
      } catch (error) {
        setloadingCombos(false);
        console.error('Error al obtener los datos:', error);
      }
    };
    loadData();
  }, []);

  const fetchAutoDias = async () => {
    try {

      const DataRquest = {
        usuario: dataArrayEmi.CotiData.usuario,
        contraseña: dataArrayEmi.CotiData.contraseña,
      }
      const response = await GetDias(DataRquest);
      if (response.data.Data.Data) {
        const data = response.data.Data.Data;
        setDias(data);
      } else {
        console.error('La respuesta de la API no contiene paquetes.');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      setLoading(false);
    }
  };

  const fetchAutoMeses = async () => {
    try {

      const DataRquest = {
        usuario: dataArrayEmi.CotiData.usuario,
        contraseña: dataArrayEmi.CotiData.contraseña,
      }

      const response = await GetMeses(DataRquest);

      if (response.data.Data.Data) {
        const data = response.data.Data.Data;
        setMeses(data);
      } else {
        console.error('La respuesta de la API no contiene paquetes.');
      }

      setLoading(false);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      setLoading(false);
    }
  };

  const fetchAutoAynos = async () => {
    try {

      const DataRquest = {
        usuario: dataArrayEmi.CotiData.usuario,
        contraseña: dataArrayEmi.CotiData.contraseña,
      }

      const response = await GetAnyos(DataRquest);

      if (response.data.Data.Data) {
        const data = response.data.Data.Data;
        setAnos(data);
      } else {
        console.error('La respuesta de la API no contiene paquetes.');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      setLoading(false);
    }
  };

  const fetchAutoGeneros = async () => {
    try {

      const DataRquest = {
        usuario: dataArrayEmi.CotiData.usuario,
        contraseña: dataArrayEmi.CotiData.contraseña,
      }
      const response = await GetGeneros(DataRquest);
      if (response.data.Data.Data) {
        const data = response.data.Data.Data;
        setGeneros(data);
      } else {
        console.error('La respuesta de la API no contiene paquetes.');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      setLoading(false);
    }
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleDireccionCollapse = () => {
    setDireccionCollapsed(!direccionCollapsed);
  };

  const toggleVehiculoCollapse = () => {
    setVehiculoCollapsed(!vehiculoCollapsed);
  };

  if (!loadingCombos) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text>Cargando catálogos...</Text>
      </View>
    );
  }

  return (

    <ScrollView style={styles.container}>

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
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={selectedDia}
            onValueChange={(itemValue) => setSelectedDia(itemValue)}
          >
            <Picker.Item label="Selecciona día" value="" />
            {dias.map((dia) => (
              <Picker.Item key={dia.Id} label={dia.Valor} value={dia.Id} />
            ))}
          </Picker>
          <Picker
            style={styles.picker}
            selectedValue={selectedMes}
            onValueChange={(itemValue) => setSelectedMes(itemValue)}
          >
            <Picker.Item label="Selecciona mes" value="" />
            {meses.map((mes) => (
              <Picker.Item key={mes.Id} label={mes.Valor} value={mes.Id} />
            ))}
          </Picker>
          <Picker
            style={styles.picker}
            selectedValue={selectedAno}
            onValueChange={(itemValue) => setSelectedAno(itemValue)}
          >
            <Picker.Item label="Selecciona año" value="" />
            {anos.map((ano) => (
              <Picker.Item key={ano.Id} label={ano.Valor} value={ano.Id} />
            ))}
          </Picker>
        </View>

        <Text>Género</Text>
        <Picker
          selectedValue={selectedGenero}
          onValueChange={(itemValue) => setSelectedGenero(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="Selecciona género" value="" />
          {generos.map((genero) => (
            <Picker.Item key={genero.id} label={genero.Valor} value={genero.id} />
          ))}
        </Picker>

        <Text>Tipo de Identificación</Text>
        <Picker
          selectedValue={tipoIdentificacion}
          onValueChange={setTipoIdentificacion}
          style={styles.input}
        >
          <Picker.Item label="Selecciona" value="" />
          <Picker.Item label="Credencial IFE" value="1" />
          <Picker.Item label="Licencia de conducir" value="2" />
          <Picker.Item label="Pasaporte" value="3" />
          <Picker.Item label="Cedula Profesional" value="4" />
          <Picker.Item label="Cartilla Servicio Militar Nacional" value="5" />
          <Picker.Item label="Tarjeta unica de Identidad Militar" value="7" />
          <Picker.Item label="Afiliación el IMSS" value="9" />
          <Picker.Item label="CURP" value="11" />
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
    </ScrollView>

  );

};

const styles = StyleSheet.create({

  container: {
    padding: 15,
    backgroundColor: '#fff',
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
  },
  picker: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
  },
});

export default EmisionScreen;
