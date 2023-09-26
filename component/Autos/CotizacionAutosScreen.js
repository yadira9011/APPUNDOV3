import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Modal, FlatList, ActivityIndicator } from 'react-native';
import {
  CotEstatusVehiculos, CotTiposDeVehiculos, CotModelos, CotMarcas, CotTipos, CotDescripciones,
  CotIndenmizaciones, CotTiposDeUso, CotDeducibles, CotPaquetes, CotTipoPoliza,
  CotVigencias, CotInfoPostal, GetCotizacion
} from '../api';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

const CotizacionAutosScreen = ({ route }) => {

  const navigation = useNavigation();
  const { DataParameter } = route.params;
  const [loading, setLoading] = useState(true);
  const [loadingCombos, setloadingCombos] = useState(false);
  const [loadingCotizacion, setLoadingCotizacion] = useState(false);

  const [AutoEstatusVehiculos, setAutoEstatusVehiculos] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedTextEstatusVehiculo, setselectedTextEstatusVehiculo] = useState('');

  const [AutoTipoVehiculos, setAutoTipoVehiculos] = useState([]);
  const [selectedOptionTipoVehiculo, setSelectedOptionTipoVehiculo,] = useState('');
  const [selectedTextTipoVehiculo, setselectedTextTipoVehiculo] = useState('');

  const [AutoModelos, setAutoModelos] = useState([]);
  const [selectedOptionModelo, setSelectedOptionModelo,] = useState('');
  const [selectedTextModelo, setselectedTextModelo] = useState('');

  const [AutoMarcas, setAutoMarcas] = useState([]);
  const [selectedOptionMarca, setSelectedOptionMarca] = useState('');
  const [selectedTextMarca, setselectedTextMarca] = useState('');

  const [AutoTipos, setAutoTipos] = useState([]);
  const [selectedOptionTipo, setSelectedOptionTipo] = useState('');
  const [selectedTextTipos, setselectedTextTipos] = useState('');

  const [AutoDescripciones, setAutoDescripciones] = useState([]);
  const [selectedOptionDescripcion, setSelectedOptionDescripcion] = useState('');
  const [selectedTextDescripcion, setselectedTextDescripcion] = useState('');

  const [AutoIndemnizaciones, setAutoIndemnizaciones] = useState([]);
  const [selectedOptionIndemnizacion, setSelectedOptionIndemnizacion] = useState('');

  const [AutoTipoUso, setAutoTipoUso] = useState([]);
  const [selectedOptionTipoUso, setSelectedOptionTipoUso] = useState('');
  const [selectedTextTipoUso, setselectedTextTipoUso] = useState('');

  const [AutoDeducibles, setAutoDeducibles] = useState([]);
  const [selectedOptionDeducible, setSelectedOptionDeducible] = useState('');

  const [AutoPaquetes, setAutoPaquetes] = useState([]);
  const [selectedOptionPaquete, setSelectedOptionPaquete] = useState('');
  const [selectedTextPaquetes, setselectedTextPaquetes] = useState('');

  const [AutoTipoPoliza, setAutoTipoPoliza] = useState([]);
  const [selectedOptionTipoPoliza, setSelectedOptionTipoPoliza] = useState('');
  const [selectedTextTipoPoliza, setselectedTextTipoPoliza] = useState('');

  const [AutoVigencias, setAutoVigencias] = useState([]);
  const [selectedOptionVigencia, setSelectedOptionVigencia] = useState('');
  const [selectedTextTipoVigencia, setselectedTextVigencia] = useState('');

  const [AutoInfoPostal, setAutoInfoPostal] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleDescription, setModalVisibleDescription] = useState(false);

  const [textMonto, setTextMonto] = useState('');

  const [selectedLabel, setselectedLabel] = useState('');

  const [isLoading, setIsLoading] = useState(true);

  const [textCP, setTextCP] = useState('');

  const [TextColonia, setTextColonia] = useState('');

  const [TextMunicipio, setTextMunicipio] = useState('');

  const [TextCiudad, setTextCiudad] = useState('');

  const [TextEstado, setTextEstado] = useState('');

  const [TextDireccionElegida, setTextDireccionElegida] = useState('Direccion...');

  const [TextClaveUnica, setClaveUnica] = useState('');

  useEffect(() => {
    
    const loadData = async () => {

      try {

        await fetchAutoEstatusVehiculos();
        await fetchAutoTipoVehiculos();
        await fetchAutoTiposDeUso();
        await fetchAutoDeducibles();
        await fetchAutoPaquetes();
        await fetchAutoTiposPoliza();

        setloadingCombos(true);

      } catch (error) {
        console.error('Error al obtener los datos:', error);

        setloadingCombos(false);

      }
    };
    loadData();
  }, []);


  const fetchAutoEstatusVehiculos = async () => {

    try {
      const response = await CotEstatusVehiculos(
        DataParameter.email,
        DataParameter.password,
        DataParameter.IdSubCanal
      );

      if (response.data.Data.Data) {

        const data = response.data.Data.Data;
        setAutoEstatusVehiculos(data);
        setSelectedOption(data[0].Id);
        setselectedTextEstatusVehiculo(data[0].Valor);
        await fetchAutoModelos(data[0].Id);
        await fetchAutoIndenmizaciones(data[0].Id);

      } else {
        console.error('La respuesta de la API no contiene Estaus vehiculos.');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      setLoading(false);
    }
  };

  const fetchAutoTipoVehiculos = async () => {
    try {
      const response = await CotTiposDeVehiculos(
        DataParameter.email,
        DataParameter.password,
        DataParameter.IdSubCanal
      );
      if (response.data.Data.Data) {
        const data = response.data.Data.Data;

        setAutoTipoVehiculos(data);
        setSelectedOptionTipoVehiculo(data[0].Id);
        setselectedTextTipoVehiculo(data[0].Valor);

      } else {
        console.error('La respuesta de la API no contiene Estaus vehiculos.');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      setLoading(false);
    }
  };

  const fetchAutoModelos = async (estatusVehiculoId) => {

    try {
      const response = await CotModelos(
        DataParameter.email,
        DataParameter.password,
        DataParameter.IdSubCanal,
        estatusVehiculoId
      );

      if (response.data.Data.Data) {
        const data = response.data.Data.Data.slice(1);
        setAutoModelos(data);
        setSelectedOptionModelo(data[0].Id);
        setselectedTextModelo(data[0].Valor);
        await fetchAutoCotMarcas(estatusVehiculoId, data[0].Id);
      } else {
        console.error('La respuesta de la API no contiene modelos.');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      setLoading(false);
    }
  };

  const fetchAutoCotMarcas = async (TipoVehiculoId, Modelo) => {

    try {
      const response = await CotMarcas(
        DataParameter.email,
        DataParameter.password,
        TipoVehiculoId,
        Modelo
      );

      if (response.data.Data.Data) {
        const data = response.data.Data.Data;
        setAutoMarcas(data);
        setSelectedOptionMarca(data[0].Valor);
        setselectedLabel(data[0].Valor);
        setselectedTextMarca(data[0].Valor);
        await fetchAutoTipos(TipoVehiculoId, Modelo, data[0].Valor);
      } else {
        console.error('La respuesta de la API no contiene marcas.');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      setLoading(false);
    }
  };

  const fetchAutoTipos = async (TipoVehiculoId, Modelo, submarca) => {

    try {

      const response = await CotTipos(
        DataParameter.email,
        DataParameter.password,
        TipoVehiculoId,
        Modelo,
        submarca
      );

      if (response.data.Data.Data) {
        const data = response.data.Data.Data;
        setAutoTipos(data);
        setSelectedOptionTipo(data[0].Valor);
        setselectedTextTipos(data[0].Valor);
        await fetchAutoDescripciones(TipoVehiculoId,
          Modelo,
          submarca,
          data[0].Valor);

      } else {
        console.error('La respuesta de la API no contiene tipos.');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      setLoading(false);
    }
  };

  const fetchAutoDescripciones = async (TipoVehiculoId, Modelo, submarca, tipo) => {
    try {
      console.log("PARA DES", TipoVehiculoId, Modelo, submarca, tipo);
      const response = await CotDescripciones(
        DataParameter.email,
        DataParameter.password,
        TipoVehiculoId,
        Modelo,
        submarca,
        tipo
      );

      if (response.data.Data.Data) {
        const data = response.data.Data.Data;
        setAutoDescripciones(data);
        setSelectedOptionDescripcion(data[0].Id);
        setselectedTextDescripcion(data[0].Valor);
      } else {
        console.error('La respuesta de la API no contiene descripciones.');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      setLoading(false);
    }
  };

  const fetchAutoIndenmizaciones = async (estatusVehiculoId) => {

    try {
      const response = await CotIndenmizaciones(
        DataParameter.email,
        DataParameter.password,
        DataParameter.IdSubCanal,
        estatusVehiculoId
      );

      if (response.data.Data.Data) {
        const data = response.data.Data.Data;
        setAutoIndemnizaciones(data);
        setSelectedOptionIndemnizacion(data[0].Id);
      } else {
        console.error('La respuesta de la API no contiene indenmizaciones.');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      setLoading(false);
    }
  };

  const fetchAutoTiposDeUso = async () => {
    try {
      const response = await CotTiposDeUso(
        DataParameter.email,
        DataParameter.password,
        DataParameter.IdSubCanal,
      );
      if (response.data.Data.Data) {
        const data = response.data.Data.Data;
        setAutoTipoUso(data);
        setSelectedOptionTipoUso(data[0].Id);
        setselectedTextTipoUso(data[0].Valor);
      } else {
        console.error('La respuesta de la API no contiene tipos de uso.');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      setLoading(false);
    }
  };

  const fetchAutoDeducibles = async () => {
    try {
      const response = await CotDeducibles(
        DataParameter.email,
        DataParameter.password,
        DataParameter.IdSubCanal,
      );
      if (response.data.Data.Data) {
        const data = response.data.Data.Data;
        setAutoDeducibles(data);
        setSelectedOptionDeducible(data[0].Id);
      } else {
        console.error('La respuesta de la API no contiene deducibles.');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      setLoading(false);
    }
  };

  const fetchAutoPaquetes = async () => {
    try {
      const response = await CotPaquetes(
        DataParameter.email,
        DataParameter.password,
        DataParameter.IdSubCanal,
      );
      if (response.data.Data.Data) {
        const data = response.data.Data.Data;
        setAutoPaquetes(data);
        setSelectedOptionPaquete(data[0].Id);
        setselectedTextPaquetes(data[0].Valor)
      } else {
        console.error('La respuesta de la API no contiene paquetes.');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      setLoading(false);
    }
  };

  const fetchAutoTiposPoliza = async () => {
    try {
      const response = await CotTipoPoliza(
        DataParameter.email,
        DataParameter.password,
        DataParameter.IdSubCanal
      );
      if (response.data.Data.Data) {
        const data = response.data.Data.Data;
        setAutoTipoPoliza(data);
        setSelectedOptionTipoPoliza(data[0].Id);
        setselectedTextTipoPoliza(data[0].Valor)
        await fetchAutoVigencias(data[0].Id);

      } else {
        console.error('La respuesta de la API no contiene paquetes.');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      setLoading(false);
    }
  };

  const fetchAutoVigencias = async (IdTipoPoliza) => {
    try {
      const response = await CotVigencias(
        DataParameter.email,
        DataParameter.password,
        DataParameter.IdSubCanal,
        IdTipoPoliza
      );
      if (response.data.Data.Data) {
        const data = response.data.Data.Data;
        setAutoVigencias(data);
        setSelectedOptionVigencia(data[0].Id);
        setselectedTextVigencia(data[0].Valor);
      } else {
        console.error('La respuesta de la API no contiene paquetes.');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      setLoading(false);
    }
  };

  const fetchAutoInfoPostal = async () => {

    try {

      setAutoInfoPostal([]);
      const codigoPos = textCP;
      const response = await CotInfoPostal(
        DataParameter.email,
        DataParameter.password,
        codigoPos
      );
      if (response.data.Data.Data) {
        const data = response.data.Data.Data;
        setAutoInfoPostal(data);
      } else {
        setAutoInfoPostal([]);
        console.error('La respuesta de la API no contiene paquetes.');
      }
      setLoading(false);
    } catch (error) {
      setAutoInfoPostal([]);
      console.error('Error al obtener los datos:', error);
      setLoading(false);
    }
  };

  const handleOptionChange = (itemValue, itemIndex) => {
    console.log(itemValue);
    setSelectedOption(itemValue);
    setselectedTextEstatusVehiculo(AutoEstatusVehiculos[itemIndex].Valor);
    fetchAutoModelos(itemValue);
    fetchAutoIndenmizaciones(itemValue);
    fetchAutoTipoVehiculos();

  };

  const handleOptionChangeTipoVehiculo = (itemValue, itemIndex) => {
    setSelectedOptionTipoVehiculo(itemValue);
    setselectedTextTipoVehiculo(AutoTipoVehiculos[itemIndex].Valor);
    fetchAutoModelos(selectedOption);
  };

  const handleOptionChangeModelo = (itemValue) => {
    setSelectedOptionModelo(itemValue);
    setselectedTextModelo(itemValue);
    fetchAutoCotMarcas(selectedOptionTipoVehiculo, itemValue);
    console.log("Actualice marcaaaaaaaa");
    console.log("TipoVehiculo", selectedOptionTipoVehiculo);
  };

  const handleOptionChangeMarca = (itemValue, itemIndex) => {
    setSelectedOptionMarca(itemValue);
    setselectedLabel(AutoMarcas[itemIndex].Valor);
    setselectedTextMarca(AutoMarcas[itemIndex].Valor);
    // console.log("MARCAAA NUEVA", selectedLabel);
    // console.log("MARCAAA NUEVA 2222", AutoMarcas[itemIndex].Valor);
    const str_marca = AutoMarcas[itemIndex].Valor
    fetchAutoTipos(selectedOptionTipoVehiculo, selectedOptionModelo, str_marca);
  };

  const handleOptionChangeTipo = (itemValue, itemIndex) => {
    setSelectedOptionTipo(itemValue);
    setselectedTextTipos(AutoTipos[itemIndex].Valor);
    fetchAutoDescripciones(selectedOptionTipoVehiculo, selectedOptionModelo, selectedLabel, itemValue);
  };

  const handleOptionChangeDescripcion = (itemValue, itemIndex) => {
    setSelectedOptionDescripcion(itemValue);
    setselectedTextDescripcion(AutoDescripciones[itemIndex].Valor);
    setClaveUnica(itemValue);
    setModalVisibleDescription(true);
    console.log("REPONSE DESCRIPCION", AutoDescripciones[itemIndex].Valor);
  };

  const handleOptionChangeIndenmizaciones = (itemValue) => {
    setSelectedOptionIndemnizacion(itemValue);
  };

  const handleOptionChangeTiposUso = (itemValue, itemIndex) => {
    setSelectedOptionTipoUso(itemValue);
    setselectedTextTipoUso(AutoTipoUso[itemIndex].Valor);
  };

  const handleOptionChangeDeducibles = (itemValue) => {
    setSelectedOptionDeducible(itemValue);
  };

  const handleOptionChangePaquetes = (itemValue, itemIndex) => {
    setSelectedOptionPaquete(itemValue);
    setselectedTextPaquetes(AutoPaquetes[itemIndex].Valor);
  };

  const handleOptionChangeTipoPoliza = (itemValue, itemIndex) => {
    setSelectedOptionTipoPoliza(itemValue);
    setselectedTextTipoPoliza(AutoTipoPoliza[itemIndex].Valor);
    fetchAutoVigencias(itemValue);
  };

  const handleOptionChangeVigencias = (itemValue, itemIndex) => {
    setSelectedOptionVigencia(itemValue);
    setselectedTextVigencia(AutoVigencias[itemIndex].Valor);
  };

  // const handleOpenModal = () => {
  //   fetchAutoInfoPostal();
  //   setModalVisible(true);
  // };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  // const renderColorItem = ({ item }) => (
  //   <Text style={styles.colorText}>{item.d_asenta}</Text>
  // );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.item]}
      onPress={() => handleItemPress(item)} >
      <Text>Colonia: {item.d_asenta}</Text>
      <Text>Municipio: {item.D_mnpio}</Text>
      <Text>Ciudad: {item.d_ciudad}</Text>
      <Text>Estado: {item.d_estado}</Text>
    </TouchableOpacity>
  );

  const handleItemPress = (item) => {

    setTextColonia(item.d_asenta);
    setTextMunicipio(item.D_mnpio);
    setTextCiudad(item.d_ciudad);
    setTextEstado(item.d_estado);
    const txDireccion = `Colonia: ${item.d_asenta},
    Municipio: ${item.D_mnpio},
    Ciudad: ${item.d_ciudad},
    Estado: ${item.d_estado}`;
    setTextDireccionElegida(txDireccion);
    setModalVisible(false);

  };

  const handleSearch = () => {
    const codigoPostal = textCP.trim();
    if (codigoPostal !== '') {
      setTextColonia('');
      setTextMunicipio('');
      setTextCiudad('');
      setTextEstado('');
      setTextDireccionElegida('');
      setTextCP(codigoPostal);
      fetchAutoInfoPostal();
      setModalVisible(true);
    } else {
      alert('Ingresa un código postal válido.');
    }
  };

  const handleCotizar = async () => {

    try {

      setLoadingCotizacion(true);

      const DataSolicitudTitulos = {
        DescripcionVehiculo: selectedTextDescripcion,
        Modelo: selectedTextModelo,
        TipoAut: selectedTextTipoVehiculo,
        Marca: selectedTextMarca,
        EstatusVehiculo: selectedTextEstatusVehiculo,
        TipoUso: selectedTextTipoUso,
        tipoPaquete: selectedTextPaquetes,
        tipoPoliza: selectedTextTipoPoliza,
        tipoVigenciaPago: selectedTextTipoVigencia,
      }

      const dataCotizacion = {
        ClaveVehiculo: selectedOptionDescripcion,
        IDTipoVehiculo: selectedOptionTipoVehiculo,
        IDEstatusVehiculo: selectedOption,
        IDIndenmizacion: selectedOptionIndemnizacion,
        SumaAsegurada: textMonto,
        CodigoPostal: textCP,
        IDTipoUso: selectedOptionTipoUso,
        IDDeducibles: selectedOptionDeducible,
        IDPagoVigencia: selectedOptionVigencia,
        IDUDI: 0,
        IDPaquete: selectedOptionPaquete,
        ColoniaPersona: TextColonia,
        MunicipioPersona: TextMunicipio,
        CiudadPersona: TextCiudad,
        EstadoPersona: TextEstado,
        usuario: DataParameter.email,
        contraseña: DataParameter.password,
        IDSubcananal: DataParameter.IdSubCanal
      }

      console.log("Datos Cotizacion", DataSolicitudTitulos);

      const response = await GetCotizacion(dataCotizacion);
      console.log(response);

      if (response.data.Data.Data) {

        const resultData = response.data.Data.Data;
        setLoadingCotizacion(false);

        const dataArray = {
          DataResul: resultData,
          CotiData: dataCotizacion,
          DataTitulos: DataSolicitudTitulos
        }
        navigation.navigate('ResultadoCotizacion', { dataArray });
      }


    } catch (error) {
      setLoadingCotizacion(false);
      console.error('Error al obtener los datos:', error);
      setLoading(false);
    } finally {
      setLoadingCotizacion(false);
    }

  };

  const closeModalDes = () => {
    setModalVisibleDescription(false);
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

      {!loadingCombos ? (
        <Text>Cargando datos...</Text>
      ) : (
        <>

          <Text style={styles.label}>Tipo Uso:</Text>
          <Picker
            selectedValue={selectedOptionTipoUso}
            onValueChange={handleOptionChangeTiposUso}
            keyExtractor={(item) => item.Id.toString()}
          >
            {AutoTipoUso.map((AutoTU) => (
              <Picker.Item
                key={AutoTU.Id}
                label={AutoTU.Valor}
                value={AutoTU.Id} />
            ))}
          </Picker>

          <Text style={styles.label}>Estatus vehículo:</Text>
          <Picker
            selectedValue={selectedOption}
            onValueChange={handleOptionChange}
            keyExtractor={(item) => item.Id.toString()} >
            {AutoEstatusVehiculos.map((AutoEstatusVehiculo) => (
              <Picker.Item
                key={AutoEstatusVehiculo.Id}
                label={AutoEstatusVehiculo.Valor}
                value={AutoEstatusVehiculo.Id} />
            ))}
          </Picker>

          <Text style={styles.label}>Tipo vehículo:</Text>
          <Picker
            selectedValue={selectedOptionTipoVehiculo}
            onValueChange={handleOptionChangeTipoVehiculo}
            keyExtractor={(item) => item.Id.toString()} >
            {AutoTipoVehiculos.map((AutoTipoVehiculo) => (
              <Picker.Item
                key={AutoTipoVehiculo.Id}
                label={AutoTipoVehiculo.Valor}
                value={AutoTipoVehiculo.Id} />
            ))}
          </Picker>

          <Text style={styles.label}>Modelo:</Text>
          <Picker
            selectedValue={selectedOptionModelo}
            onValueChange={handleOptionChangeModelo}
            keyExtractor={(item) => item.Id.toString()} >
            {AutoModelos.map((AutoModelo) => (
              <Picker.Item
                key={AutoModelo.Id}
                label={AutoModelo.Valor}
                value={AutoModelo.Valor} />
            ))}
          </Picker>

          <Text style={styles.label}>Marca:</Text>
          <Picker
            selectedValue={selectedOptionMarca}
            onValueChange={handleOptionChangeMarca}
            keyExtractor={(item) => item.Valor.toString()}
          >
            {AutoMarcas.map((AutoMarca) => (
              <Picker.Item
                key={AutoMarca.Valor}
                label={AutoMarca.Valor}
                value={AutoMarca.Valor} />
            ))}
          </Picker>

          <Text style={styles.label}>Tipo:</Text>
          <Picker
            selectedValue={selectedOptionTipo}
            onValueChange={handleOptionChangeTipo}
            keyExtractor={(item) => item.Valor.toString()}
          >
            {AutoTipos.map((AutoTipo) => (
              <Picker.Item
                key={AutoTipo.Valor}
                label={AutoTipo.Valor}
                value={AutoTipo.Valor} />
            ))}
          </Picker>

          <Text style={styles.label}>Descripción:</Text>
          <Picker
            selectedValue={selectedOptionDescripcion}
            onValueChange={handleOptionChangeDescripcion}
            keyExtractor={(item) => item.Id.toString()}
            itemStyle={{ fontSize: 12 }}
          >
            {AutoDescripciones.map((AutoDescripcion) => (
              <Picker.Item
                key={AutoDescripcion.Id}
                label={AutoDescripcion.Valor}
                value={AutoDescripcion.Id}
              />
            ))}
          </Picker>

          <Text style={styles.label}>Indemnización:</Text>
          <Picker
            selectedValue={selectedOptionIndemnizacion}
            onValueChange={handleOptionChangeIndenmizaciones}
            keyExtractor={(item) => item.Id.toString()}
          >
            {AutoIndemnizaciones.map((AutoIndemnizacion) => (
              <Picker.Item
                key={AutoIndemnizacion.Id}
                label={AutoIndemnizacion.Valor}
                value={AutoIndemnizacion.Id} />
            ))}
          </Picker>

          <View style={{ flexDirection: 'row', marginBottom:20,alignItems: 'center', borderColor: '#ccc', borderWidth: 1, borderRadius: 20, padding: 8 }}>
            <TextInput
              placeholder="Monto"
              value={textMonto}
              onChangeText={setTextMonto}
              style={styles.input}
            />
          </View>

          <View style={{ flexDirection: 'row', marginBottom:20, alignItems: 'center', borderColor: '#ccc', borderWidth: 1, borderRadius: 20, padding: 5 }}>
            <TextInput
              placeholder="Codigo Postal"
              value={textCP}
              onChangeText={setTextCP}
              style={{ fontSize: 18, flex: 1 }}
            />
            <TouchableOpacity onPress={handleSearch} style={{ padding: 8 }}>
              <Ionicons name="ios-search" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>{TextDireccionElegida}</Text>

          <Text style={styles.label}>Deducibles :</Text>
          <Picker
            selectedValue={selectedOptionDeducible}
            onValueChange={handleOptionChangeDeducibles}
            keyExtractor={(item) => item.Id.toString()}
          >
            {AutoDeducibles.map((AutoDeducible) => (
              <Picker.Item
                key={AutoDeducible.Id}
                label={AutoDeducible.Valor}
                value={AutoDeducible.Id} />
            ))}
          </Picker>

          <Text style={styles.label}>Paquetes :</Text>
          <Picker
            selectedValue={selectedOptionPaquete}
            onValueChange={handleOptionChangePaquetes}
            keyExtractor={(item) => item.Id.toString()}
          >
            {AutoPaquetes.map((AutoPaquete) => (
              <Picker.Item
                key={AutoPaquete.Id}
                label={AutoPaquete.Valor}
                value={AutoPaquete.Id} />
            ))}
          </Picker>

          <Text style={styles.label}>Tipo Poliza :</Text>
          <Picker
            selectedValue={selectedOptionTipoPoliza}
            onValueChange={handleOptionChangeTipoPoliza}
            keyExtractor={(item) => item.Id.toString()}
          >
            {AutoTipoPoliza.map((AutoTP) => (
              <Picker.Item
                key={AutoTP.Id}
                label={AutoTP.Valor}
                value={AutoTP.Id} />
            ))}
          </Picker>

          <Text style={styles.label}>Vigencias:</Text>
          <Picker
            selectedValue={selectedOptionVigencia}
            onValueChange={handleOptionChangeVigencias}
            keyExtractor={(item) => item.Id.toString()}
          >
            {AutoVigencias.map((AutoVigencia) => (
              <Picker.Item
                key={AutoVigencia.Id}
                label={AutoVigencia.Valor}
                value={AutoVigencia.Id} />
            ))}
          </Picker>

          {/* Botón de cotizar */}
          <TouchableOpacity
            style={styles.cotizarButton}
            onPress={handleCotizar} >
            <Text style={styles.cotizarButtonText}>Cotizar</Text>
          </TouchableOpacity>
          {loadingCotizacion && <ActivityIndicator style={styles.activityIndicator} />}

          <View style={{ height: 35 }} />

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={handleCloseModal}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                {AutoInfoPostal.length > 0 ? (
                  <>
                    <Text style={styles.modalText}>Dirección:</Text>
                    <FlatList
                      data={AutoInfoPostal}
                      renderItem={renderItem}
                      keyExtractor={(item) => item.id}
                      style={styles.list}
                      contentContainerStyle={styles.flatListContent}
                    />
                  </>
                ) : (
                  <>
                    <Text style={styles.emptyText}>No se encontró información para el código postal ingresado.</Text>
                    <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
                      <Text style={styles.closeButtonText}>Cerrar</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
          </Modal>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisibleDescription}
            onRequestClose={closeModalDes}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text>{selectedTextDescripcion}</Text>
                <TouchableOpacity onPress={closeModalDes} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>Cerrar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

        </>
      )}

    </ScrollView>

  );



};

const styles = StyleSheet.create({
  
  container: {
    padding: 15,
    backgroundColor: '#fff',
  },
  cotizarButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  cotizarButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 25,
  },
  input: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
    width: '90%',
    maxHeight: '90%',
  },
  modalText: {
    fontSize: 20,
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  selectedItemContainer: {
    backgroundColor: '#f0ebeb',
    padding: 10,
    marginVertical: 20,
    borderRadius: 5,
  },
  list: {
    width: '100%',
    marginBottom: 10,
  },
  flatListContent: {
    flexGrow: 1,
  },
  item: {
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#f9c2ff',
  },
  activityIndicator: {
    marginTop: 10,
  },
});

export default CotizacionAutosScreen;
