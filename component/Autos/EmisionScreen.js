import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, Image, Button, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Collapsible from 'react-native-collapsible';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { GetDias, GetMeses, GetAnyos, GetGeneros, GetTiposPersona, GetTipoSociedad } from '../api';

const EmisionScreen = () => {

  const route = useRoute();
  const navigation = useNavigation();
  const { dataArrayEmi } = route.params;
  const [loadingCombos, setloadingCombos] = useState(false);
  const [loading, setLoading] = useState(true);

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

  const [TxtUrlconAse, setTxtUrlconAse] = useState(null);

  const [isVisiblePM, setIsVisiblePM] = useState(true);
  const [isVisiblePF, setIsVisiblePF] = useState(true);

  const [TxtFecha, setTxtFecha] = useState('');

  const [TiposPersona, setTiposPersona] = useState([]);
  const [selectedTipoPersona, setselectedTipoPersona] = useState('');


  const [razonSocial, setRazonSocial] = useState('');
  const [nombreComercial, setNombreComercial] = useState('');
  const [fechaConstitucion, setFechaConstitucion] = useState('');

  const [giro, setGiro] = useState([])
  const [tipoSociedad, setTipoSociedad] = useState([])
  const [regimenFiscal, setRegimenFiscal] = useState([])


  useEffect(() => {
    const loadData = async () => {
      try {
        setTxtUrlconAse(dataArrayEmi.DataItemSelect.imageUrl);
        await fetchAutoDias();
        await fetchAutoMeses();
        await fetchAutoAynos();
        await fetchAutoGeneros();
        await fetchTipoPersona();
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

  const fetchTipoPersona = async () => {
    try {

      const DataRquest = {
        usuario: dataArrayEmi.CotiData.usuario,
        contraseña: dataArrayEmi.CotiData.contraseña,
        idSubcanal: dataArrayEmi.CotiData.IDSubcananal
      }
      const response = await GetTiposPersona(DataRquest);
      if (response.data.Data.Data) {

        const data = response.data.Data.Data;

        if (data[0].Id == 2) {
          setIsVisiblePM(true);
          setIsVisiblePF(false);
          setTxtFecha("Fecha constitución");
        } else {
          setIsVisiblePM(false);
          setIsVisiblePF(true);
          setTxtFecha("Fecha nacimiento");
        }

        setTiposPersona(data);
        
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

      <View style={styles.imageContainer}>
        <Image source={TxtUrlconAse} style={styles.imageCober} />
        <View style={styles.textContainer}>
          <Text style={styles.description}><Text style={styles.boldText}>MODELO:</Text> {dataArrayEmi.DataTitulos.Modelo}</Text>
          <Text style={styles.description}><Text style={styles.boldText}>DESCRIPCION:</Text> {dataArrayEmi.DataTitulos.DescripcionVehiculo}</Text>
          <Text style={styles.description}><Text style={styles.boldText}>TIPO USO :</Text> {dataArrayEmi.DataTitulos.TipoUso}</Text>
          <Text style={styles.description}><Text style={styles.boldText}>PAQUETE:</Text> {dataArrayEmi.DataTitulos.tipoPaquete}</Text>
          <Text style={styles.description}><Text style={styles.boldText}>VIGENCIA:</Text> {dataArrayEmi.DataTitulos.tipoVigenciaPago}</Text>
          <Text style={styles.description}><Text style={styles.boldText}>PRIMA TOTAL:</Text> {dataArrayEmi.DataItemSelect.PrimaTotal}</Text>
        </View>
      </View>

      <TouchableOpacity onPress={toggleCollapse} style={styles.button}>
        <Text style={styles.buttonText}>Datos Contratante</Text>
      </TouchableOpacity>

      <Collapsible collapsed={isCollapsed}>

        <Text>Tipo Persona</Text>
        <Picker
          selectedValue={selectedTipoPersona}
          onValueChange={(itemValue) => setselectedTipoPersona(itemValue)}
          style={styles.input}
          enabled={false} >
          {TiposPersona.map((tp) => (
            <Picker.Item key={tp.Id} label={tp.Valor} value={tp.Id} />
          ))}
        </Picker>


        {/* PERSONA FISICA */}

        {isVisiblePF && (
          <View>

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

            <Text>CURP</Text>
            <TextInput
              style={styles.input}
              value={curp}
              onChangeText={setCURP}
            />

            <Text>Género</Text>
            <Picker
              selectedValue={selectedGenero}
              onValueChange={(itemValue) => setSelectedGenero(itemValue)}
              style={styles.input}
            >
              <Picker.Item label="Selecciona género" value="" />
              {generos.map((genero) => (
                <Picker.Item key={genero.Id} label={genero.Valor} value={genero.Id} />
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

          </View>
        )}

        {/* PERSONA MORAL */}

        {isVisiblePM && (
          <View>
            <Text>Razón Social</Text>
            <TextInput
              style={styles.input}
              value={razonSocial}
              onChangeText={setRazonSocial}
            />

            <Text>Nombre Comercial</Text>
            <TextInput
              style={styles.input}
              value={nombreComercial}
              onChangeText={setNombreComercial}
            />
          </View>
        )}

        <Text>RFC</Text>
        <TextInput
          style={styles.input}
          value={rfc}
          onChangeText={setRFC}
        />

        <Text>{TxtFecha}</Text>
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

        </View>
        <Picker
          style={styles.picker2}
          selectedValue={selectedAno}
          onValueChange={(itemValue) => setSelectedAno(itemValue)}
        >
          <Picker.Item label="Selecciona año" value="" />
          {anos.map((ano) => (
            <Picker.Item key={ano.Id} label={ano.Valor} value={ano.Id} />
          ))}
        </Picker>

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
    width: 15,
    borderColor: '#ccc',
    marginBottom: 8,
    marginLeft: 5,
    marginRight: 5,
    fontSize: 10,
  },

  picker2: {
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 10,
  },

  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imageCober: {
    width: 150,
    height: 150,
  },
  textContainer: {
    marginTop: 2,
  },
  description: {
    fontSize: 14,
    marginBottom: 4,
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default EmisionScreen;
