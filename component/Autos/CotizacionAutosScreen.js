import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Modal, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import {
  CotEstatusVehiculos, CotTiposDeVehiculos, CotModelos, CotMarcas, CotTipos, CotDescripciones,
  CotIndenmizaciones, CotTiposDeUso, CotDeducibles, CotPaquetes, CotTipoPoliza,
  CotVigencias, CotInfoPostal, GetCotizacion
} from '../Api/api';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import LoadingComponent from '../Componentes/LoadingComponent';
import MenuComponentNew from '../Componentes/MenuComponentNew';

import { Picker } from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';



const CotizacionAutosScreen = () => {

  const route = useRoute();
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

  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {

    const loadData = async () => {

      try {

        console.log("ENTRE COTIZACION kk...")

        console.log(DataParameter.email,
          DataParameter.password,
          DataParameter.IdSubCanal)

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
        const autoDes = data.map(item => ({
          label: item.Valor,
          value: item.Id,
        }));
        setAutoDescripciones(autoDes);
      } else {
        console.error('La respuesta de la API no contiene descripciones.');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener los datos: heueueue', error);
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
    if (itemValue !== null) {
      const selectedOption = AutoEstatusVehiculos.find(item => item.Id === itemValue);
      setSelectedOption(itemValue);
      setselectedTextEstatusVehiculo(selectedOption.Valor);
      fetchAutoModelos(itemValue);
      fetchAutoIndenmizaciones(itemValue);
      fetchAutoTipoVehiculos();
    }
  };

  const handleOptionChangeTipoVehiculo = (itemValue, itemIndex) => {
    if (itemValue !== null) {
      const selectedOption = AutoTipoVehiculos.find(item => item.Id === itemValue);
      setSelectedOptionTipoVehiculo(itemValue);
      setselectedTextTipoVehiculo(selectedOption.Valor);
      fetchAutoModelos(selectedOption);
    }

  };

  const handleOptionChangeModelo = (itemValue) => {
    if (itemValue !== null) {
      setSelectedOptionModelo(itemValue);
      setselectedTextModelo(itemValue);
      fetchAutoCotMarcas(selectedOptionTipoVehiculo, itemValue);
    }
  };

  const handleOptionChangeMarca = (itemValue, itemIndex) => {
    if (itemValue !== null) {
      setSelectedOptionMarca(itemValue);
      const selectedOption = AutoMarcas.find(item => item.Id === itemValue);
      setselectedLabel(selectedOption.Valor);
      setselectedTextMarca(selectedOption.Valor);
      const str_marca = AutoMarcas[itemIndex].Valor
      fetchAutoTipos(selectedOptionTipoVehiculo, selectedOptionModelo, str_marca);
    }
  };

  const handleOptionChangeTipo = (itemValue, itemIndex) => {
    if (itemValue !== null) {
      setSelectedOptionTipo(itemValue);
      const selectedOption = AutoTipos.find(item => item.Id === itemValue);
      setselectedTextTipos(selectedOption.Valor);
      fetchAutoDescripciones(selectedOptionTipoVehiculo, selectedOptionModelo, selectedLabel, itemValue);
    }
  };

  const handleOptionChangeDescripcion = (itemValue, itemIndex) => {
    if (itemValue !== null) {
      const selectedOption = AutoDescripciones.find(item => item.value === itemValue);
      const selectedLabel = selectedOption.label;
      setSelectedOptionDescripcion(itemValue);
      setselectedTextDescripcion(selectedLabel);
      setClaveUnica(itemValue);
    }
  };

  const handleOptionChangeIndenmizaciones = (itemValue) => {
    if (itemValue !== null) {
      setSelectedOptionIndemnizacion(itemValue);
    }
  };

  const handleOptionChangeTiposUso = (itemValue, itemIndex) => {
    if (itemValue !== null) {
      const selectedOption = AutoTipoUso.find(item => item.Id === itemValue);
      setSelectedOptionTipoUso(itemValue);
      setselectedTextTipoUso(selectedOption.Valor);
    }
  };

  const handleOptionChangeDeducibles = (itemValue) => {
    if (itemValue !== null) {
      setSelectedOptionDeducible(itemValue);
    }
  };

  const handleOptionChangePaquetes = (itemValue, itemIndex) => {
    if (itemValue !== null) {
      setSelectedOptionPaquete(itemValue);
      const selectedOption = AutoPaquetes.find(item => item.Id === itemValue);
      setselectedTextPaquetes(selectedOption.Valor);
    }
  };

  const handleOptionChangeTipoPoliza = (itemValue, itemIndex) => {
    if (itemValue !== null) {
      setSelectedOptionTipoPoliza(itemValue);
      const selectedOption = AutoTipoPoliza.find(item => item.Id === itemValue);
      setselectedTextTipoPoliza(selectedOption.Valor);
      fetchAutoVigencias(itemValue);
    }
  };

  const handleOptionChangeVigencias = (itemValue, itemIndex) => {
    if (itemValue !== null) {
      setSelectedOptionVigencia(itemValue);
      const selectedOption = AutoVigencias.find(item => item.Id === itemValue);
      setselectedTextVigencia(selectedOption.Valor);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

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
          DataTitulos: DataSolicitudTitulos,
          DataParameter: DataParameter
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

  const RefresData = () => {
    //window.location.reload();  setIsRefreshing(true);
    setTimeout(async () => {

      console.log("ENTRE COTIZACION lololo...")

      console.log(DataParameter.email,
        DataParameter.password,
        DataParameter.IdSubCanal)

      await fetchAutoEstatusVehiculos();
      // await fetchAutoTipoVehiculos();
      // await fetchAutoTiposDeUso();
      // await fetchAutoDeducibles();
      // await fetchAutoPaquetes();
      // await fetchAutoTiposPoliza();

      setIsRefreshing(false);
    }, 1000);

  };

  if (!loadingCombos) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
        {/* <ActivityIndicator size="large" />
        <Text>Cargando catálogos...</Text> */}
        <LoadingComponent />
      </View>
    );
  }

  return (
    <View style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={RefresData}
          colors={['#ff0000']}
        />
      }>

      <View style={styles.menustyle} >
        <MenuComponentNew DataParameter={DataParameter} />
      </View >

      <ScrollView style={styles.scrollstyle} >

        <Text style={styles.label}>Tipo Uso:</Text>
        <RNPickerSelect
          onValueChange={handleOptionChangeTiposUso}
          items={AutoTipoUso.map((AutoTU) => ({
            label: AutoTU.Valor,
            value: AutoTU.Id,
          }))}
          value={selectedOptionTipoUso}
        />

        <Text style={styles.label}>Estatus vehículo:</Text>

        <RNPickerSelect
          onValueChange={handleOptionChange}
          items={AutoEstatusVehiculos.map((AutoEstatusVehiculo) => ({
            label: AutoEstatusVehiculo.Valor,
            value: AutoEstatusVehiculo.Id,
          }))}
          value={selectedOption}
        />



        <Text style={styles.label}>Tipo vehículo:</Text>

        <RNPickerSelect
          onValueChange={handleOptionChangeTipoVehiculo}
          items={AutoTipoVehiculos.map((AutoTipoVehiculo) => ({
            label: AutoTipoVehiculo.Valor,
            value: AutoTipoVehiculo.Id,
          }))}
          value={selectedOptionTipoVehiculo}
        />


        <Text style={styles.label}>Modelo:</Text>

        <RNPickerSelect
          onValueChange={handleOptionChangeModelo}
          items={AutoModelos.map((AutoModelo) => ({
            label: AutoModelo.Valor,
            value: AutoModelo.Id,
          }))}
          value={selectedOptionModelo}
        />

        <Text style={styles.label}>Marca:</Text>

        <RNPickerSelect
          onValueChange={handleOptionChangeMarca}
          items={AutoMarcas.map((AutoMarca) => ({
            label: AutoMarca.Valor,
            value: AutoMarca.Id,
          }))}
          value={selectedOptionMarca}
        />

        {/* 
        <Picker
          selectedValue={selectedOptionMarca}
          onValueChange={handleOptionChangeMarca}
          keyExtractor={(item) => item.Valor.toString()}>
          {AutoMarcas.map((AutoMarca) => (
            <Picker.Item
              key={AutoMarca.Valor}
              label={AutoMarca.Valor}
              value={AutoMarca.Valor} />
          ))}
        </Picker> */}


        <Text style={styles.label}>Tipo:</Text>

        <RNPickerSelect
          onValueChange={handleOptionChangeTipo}
          items={AutoTipos.map((AutoTipo) => ({
            label: AutoTipo.Valor,
            value: AutoTipo.Id,
          }))}
          value={selectedOptionTipo}
        />

        {/* <Picker
          selectedValue={selectedOptionTipo}
          onValueChange={handleOptionChangeTipo}
          keyExtractor={(item) => item.Valor.toString()}>
          {AutoTipos.map((AutoTipo) => (
            <Picker.Item
              key={AutoTipo.Valor}
              label={AutoTipo.Valor}
              value={AutoTipo.Valor} />
          ))}
        </Picker> */}


        <Text style={styles.label}>Descripción:</Text>

        <RNPickerSelect
          textInputProps={{ multiline: true }}
          pickerProps={{ numberOfLines: 3 }}
          onValueChange={handleOptionChangeDescripcion}
          items={AutoDescripciones}
          value={selectedOptionDescripcion}
          style={{
            viewContainer: {
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 4,
              padding: 10,
              margin: 10,
              color: 'blue',
              backgroundColor: 'white',
            },
            inputAndroid: {
              fontSize: 16,
              color: 'black',
            },
            inputIOS: {
              fontSize: 16,
              color: 'blue',
            },
          }}
        />

        <Text style={styles.label}>Indemnización:</Text>
        <RNPickerSelect
          onValueChange={handleOptionChangeIndenmizaciones}
          items={AutoIndemnizaciones.map((AutoIndemnizacion) => ({
            label: AutoIndemnizacion.Valor,
            value: AutoIndemnizacion.Id,
          }))}
          value={selectedOptionIndemnizacion}
        />


        <View style={{
          flexDirection: 'row',
          marginBottom: 20,
          alignItems: 'center',
          borderColor: '#ccc',
          borderWidth: 1,
          borderRadius: 20,
          padding: 8
        }}>
          <TextInput
            placeholder="Monto"
            value={textMonto}
            onChangeText={setTextMonto}
            style={styles.input}
          />
        </View>

        <View style={{
          flexDirection: 'row',
          marginBottom: 20,
          alignItems: 'center',
          borderColor: '#ccc',
          borderWidth: 1,
          borderRadius: 20,
          padding: 5
        }}>
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

        <RNPickerSelect
          onValueChange={handleOptionChangeDeducibles}
          items={AutoDeducibles.map((AutoDeducible) => ({
            label: AutoDeducible.Valor,
            value: AutoDeducible.Id,
          }))}
          value={selectedOptionDeducible}
        />


        <Text style={styles.label}>Paquetes :</Text>
        <RNPickerSelect
          onValueChange={handleOptionChangePaquetes}
          items={AutoPaquetes.map((AutoPaquete) => ({
            label: AutoPaquete.Valor,
            value: AutoPaquete.Id,
          }))}
          value={selectedOptionPaquete}
        />


        <Text style={styles.label}>Tipo Poliza :</Text>
        <RNPickerSelect
          onValueChange={handleOptionChangeTipoPoliza}
          items={AutoTipoPoliza.map((AutoTP) => ({
            label: AutoTP.Valor,
            value: AutoTP.Id,
          }))}
          value={selectedOptionTipoPoliza}
        />


        <Text style={styles.label}>Vigencias:</Text>
        <RNPickerSelect
          onValueChange={handleOptionChangeVigencias}
          items={AutoVigencias.map((AutoVigencia) => ({
            label: AutoVigencia.Valor,
            value: AutoVigencia.Id,
          }))}
          value={selectedOptionVigencia}
        />


        {/* Botón de cotizar */}
        <TouchableOpacity
          style={styles.cotizarButton}
          onPress={handleCotizar} >
          <Text style={styles.cotizarButtonText}>Cotizar</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />

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

      </ScrollView>

      {
        loadingCotizacion && (
          <LoadingComponent />
        )
      }

    </View >
  );

};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  cotizarButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 40,
    alignItems: 'center',
  },

  scrollstyle: {
    marginTop: 5,
  },

  menustyle: {
    backgroundColor: '#92c5fc',
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

});

export default CotizacionAutosScreen;
