import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import {
  CotEstatusVehiculos, CotTiposDeVehiculos, CotModelos, CotMarcas, CotTipos, CotDescripciones,
  CotIndenmizaciones, CotTiposDeUso, CotDeducibles, CotPaquetes, CotTipoPoliza, CotVigencias
} from '../api';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';


const CotizacionAutosScreen = ({ route }) => {

  const navigation = useNavigation();
  const { DataParameter } = route.params;
  const [loading, setLoading] = useState(true);

  const [AutoEstatusVehiculos, setAutoEstatusVehiculos] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

  const [AutoTipoVehiculos, setAutoTipoVehiculos] = useState([]);
  const [selectedOptionTipoVehiculo, setSelectedOptionTipoVehiculo,] = useState('');

  const [AutoModelos, setAutoModelos] = useState([]);
  const [selectedOptionModelo, setSelectedOptionModelo,] = useState('');

  const [AutoMarcas, setAutoMarcas] = useState([]);
  const [selectedOptionMarca, setSelectedOptionMarca] = useState('');

  const [AutoTipos, setAutoTipos] = useState([]);
  const [selectedOptionTipo, setSelectedOptionTipo] = useState('');

  const [AutoDescripciones, setAutoDescripciones] = useState([]);
  const [selectedOptionDescripcion, setSelectedOptionDescripcion] = useState('');

  const [AutoIndemnizaciones, setAutoIndemnizaciones] = useState([]);
  const [selectedOptionIndemnizacion, setSelectedOptionIndemnizacion] = useState('');

  const [AutoTipoUso, setAutoTipoUso] = useState([]);
  const [selectedOptionTipoUso, setSelectedOptionTipoUso] = useState('');

  const [AutoDeducibles, setAutoDeducibles] = useState([]);
  const [selectedOptionDeducible, setSelectedOptionDeducible] = useState('');

  const [AutoPaquetes, setAutoPaquetes] = useState([]);
  const [selectedOptionPaquete, setSelectedOptionPaquete] = useState('');

  const [AutoTipoPoliza, setAutoTipoPoliza] = useState([]);
  const [selectedOptionTipoPoliza, setSelectedOptionTipoPoliza] = useState('');

  const [AutoVigencias, setAutoVigencias] = useState([]);
  const [selectedOptionVigencia, setSelectedOptionVigencia] = useState('');


  const [textMonto, setTextMonto] = useState('');

  const [selectedLabel, setselectedLabel] = useState('');

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    const loadData = async () => {

      try {
        await fetchAutoEstatusVehiculos();
        await fetchAutoTipoVehiculos();
        await fetchAutoModelos(selectedOption);
        await fetchAutoIndenmizaciones(selectedOption);
        await fetchAutoCotMarcas(selectedOptionTipoVehiculo, selectedOptionModelo);
        await fetchAutoTipos(selectedOptionTipoVehiculo, selectedOptionModelo, selectedLabel);
        await fetchAutoDescripciones(selectedOptionTipoVehiculo,
          selectedOptionModelo,
          selectedOptionMarca,
          selectedOptionTipo);
        await fetchAutoTiposDeUso();
        await fetchAutoDeducibles();
        await fetchAutoPaquetes();
        await fetchAutoTiposPoliza();
        await fetchAutoVigencias(selectedOptionTipoPoliza);

        setIsLoading(false);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        setIsLoading(false);
      }
    };

    loadData();
  }, [selectedOption]);


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
        setSelectedOptionMarca(data[0].IdMarca);
        setselectedLabel(data[0].Valor);

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
        setSelectedOptionTipo(data[0].Id);
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
        setAutoDescripciones(data);
        setSelectedOptionDescripcion(data[0].Id);
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

    console.log("id estatus VEHICULO", estatusVehiculoId);

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
      } else {
        console.error('La respuesta de la API no contiene paquetes.');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      setLoading(false);
    }
  };

  const handleOptionChange = (itemValue) => {
    setSelectedOption(itemValue);
    fetchAutoTipoVehiculos();
    fetchAutoIndenmizaciones(itemValue);
  };

  const handleOptionChangeTipoVehiculo = (itemValue) => {
    setSelectedOptionTipoVehiculo(itemValue);
    fetchAutoModelos(selectedOption);
  };

  const handleOptionChangeModelo = (itemValue) => {
    setSelectedOptionModelo(itemValue);
    fetchAutoCotMarcas(selectedOptionTipoVehiculo, itemValue);
  };

  const handleOptionChangeMarca = (itemValue, itemIndex) => {
    setSelectedOptionMarca(itemValue);
    setselectedLabel(AutoMarcas[itemIndex].Valor);
    console.log("MARCAAA NUEVA", selectedLabel);
    console.log("MARCAAA NUEVA 2222", AutoMarcas[itemIndex].Valor);
    const str_marca = AutoMarcas[itemIndex].Valor
    fetchAutoTipos(selectedOptionTipoVehiculo, selectedOptionModelo, str_marca);
  };

  const handleOptionChangeTipo = (itemValue) => {
    setSelectedOptionTipo(itemValue);
    fetchAutoDescripciones(selectedOptionTipoVehiculo, selectedOptionModelo, selectedLabel, itemValue);
  };

  const handleOptionChangeDescripcion = (itemValue) => {
    setSelectedOptionDescripcion(itemValue);
  };

  const handleOptionChangeIndenmizaciones = (itemValue) => {
    setSelectedOptionIndemnizacion(itemValue);
  };

  const handleOptionChangeTiposUso = (itemValue) => {
    setSelectedOptionTipoUso(itemValue);
  };

  const handleOptionChangeDeducibles = (itemValue) => {
    setSelectedOptionDeducible(itemValue);
  };

  const handleOptionChangePaquetes = (itemValue) => {
    setSelectedOptionPaquete(itemValue);
  };

  const handleOptionChangeTipoPoliza = (itemValue) => {
    setSelectedOptionTipoPoliza(itemValue);
    fetchAutoVigencias(itemValue);
  };

  const handleOptionChangeVigencias = (itemValue) => {
    setSelectedOptionVigencia(itemValue);
  };

  const handleCotizar = () => {
  };

  return (

    <ScrollView style={styles.container}>

      {isLoading ? (
        <Text>Cargando datos...</Text>
      ) : (
        <>

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
            keyExtractor={(item) => item.Id.toString()}
          >
            {AutoMarcas.map((AutoMarca) => (
              <Picker.Item
                key={AutoMarca.IdMarca}
                label={AutoMarca.Valor}
                value={AutoMarca.IdMarca} />
            ))}
          </Picker>

          <Text style={styles.label}>Tipo:</Text>
          <Picker
            selectedValue={selectedOptionTipo}
            onValueChange={handleOptionChangeTipo}
            keyExtractor={(item) => item.Id.toString()}
          >
            {AutoTipos.map((AutoTipo) => (
              <Picker.Item
                key={AutoTipo.Id}
                label={AutoTipo.Valor}
                value={AutoTipo.Valor} />
            ))}
          </Picker>

          <Text style={styles.label}>Descripción:</Text>
          <Picker
            selectedValue={selectedOptionDescripcion}
            onValueChange={handleOptionChangeDescripcion}
            keyExtractor={(item) => item.Id.toString()}
          >
            {AutoDescripciones.map((AutoDescripcion) => (
              <Picker.Item
                key={AutoDescripcion.Id}
                label={AutoDescripcion.Valor}
                value={AutoDescripcion.Id} />
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

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Monto"
              value={textMonto}
              onChangeText={setTextMonto}
              style={styles.input}
            />
          </View>

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
            onPress={handleCotizar}
          >
            <Text style={styles.cotizarButtonText}>Cotizar</Text>
          </TouchableOpacity>

          <View style={{ height: 35 }} />

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
  // Estilos del botón "Cotizar"
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
  }
});

export default CotizacionAutosScreen;