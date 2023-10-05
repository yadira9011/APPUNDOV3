import React, { useState, useEffect } from 'react';
import {
  View, ScrollView, Text, TextInput, StyleSheet, Image,
  Button, TouchableOpacity, ActivityIndicator, Switch
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Collapsible from 'react-native-collapsible';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import {
  GetDias, GetMeses, GetAnyos, GetGeneros, GetTiposPersona,
  GetTipoSociedad, GetGiros, GetTipoRegimenFiscal, GetIdAseguradora,
  GetFlags, GetPLCodigosBancos, GetPLGetMetodosPago
} from '../api';

const EmisionScreen = () => {

  const route = useRoute();
  const navigation = useNavigation();
  const { dataArrayEmi } = route.params;
  const [loadingCombos, setloadingCombos] = useState(false);
  const [loading, setLoading] = useState(true);

  const [isCollapsed, setIsCollapsed] = useState(true);
  const [direccionCollapsed, setDireccionCollapsed] = useState(true);
  const [vehiculoCollapsed, setVehiculoCollapsed] = useState(true);
  const [PlCollapsed, setPlCollapsed] = useState(true);

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
  const [IdTipoPersona, setIdTipoPersona] = useState('');

  const [IdAseguradora, setIdAseguradora] = useState('');

  const [razonSocial, setRazonSocial] = useState('');
  const [nombreComercial, setNombreComercial] = useState('');

  const [giros, setGiros] = useState([]);
  const [selectedGiro, setselectedGiro] = useState('');
  const [tiposSociedad, setTiposSociedad] = useState([]);
  const [selectedTipoSociedad, setselectedTipoSociedad] = useState('');
  const [regimenesFiscales, setregimenesFiscales] = useState([]);
  const [selectedRegimenFiscal, setselectedRegimenFiscal] = useState('');

  const [isEnabledPL, setIsEnabledPL] = useState(false);
  const [isEnabledPR, setIsEnabledPR] = useState(false);

  const [isPL, setIsPL] = useState(false);
  const [isPR, setIsPR] = useState(false);

  const [nombreTarjetahabiente, setNombreTarjetahabiente] = useState('');
  const [cuentaClabeNoTarjeta, setCuentaClabeNoTarjeta] = useState('');
  const [fechaExpiracion, setFechaExpiracion] = useState('');
  const [cvv, setCVV] = useState('');

  const [BancosEmisores, setBancosEmisores] = useState([]);
  const [selectedBancoEmisor, setselectedBancoEmisor] = useState('');

  const [MetodosPagos, setMetodosPagos] = useState([]);
  const [selectedMetodosPagos, setselectedMetodosPagos] = useState('');


  useEffect(() => {
    const loadData = async () => {
      try {
        setTxtUrlconAse(dataArrayEmi.DataItemSelect.imageUrl);
        await fetchAutoDias();
        await fetchAutoMeses();
        await fetchAutoAynos();
        await fetchFlags();
        await fetchAutoGeneros();
        await fetchTipoPersona();
        await fetchAutosGetIdAseguradora();
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
        contraseña: dataArrayEmi.CotiData.contraseña
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

  const fetchAutosGetTipoSociedad = async (idAse) => {
    try {

      const DataRquest = {
        usuario: dataArrayEmi.CotiData.usuario,
        contraseña: dataArrayEmi.CotiData.contraseña,
        idAseguradora: idAse
      }
      const response = await GetTipoSociedad(DataRquest);
      if (response.data.Data.Data) {
        const data = response.data.Data.Data;
        setTiposSociedad(data);
      } else {
        console.error('La respuesta de la API no contiene tipos sociedad.');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      setLoading(false);
    }
  };

  const fetchAutosGetGiro = async (idAse) => {
    try {

      const DataRquest = {
        usuario: dataArrayEmi.CotiData.usuario,
        contraseña: dataArrayEmi.CotiData.contraseña,
        idAseguradora: idAse
      }
      const response = await GetGiros(DataRquest);
      if (response.data.Data.Data) {
        const data = response.data.Data.Data;
        setGiros(data);
      } else {
        console.error('La respuesta de la API no contiene giros.');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      setLoading(false);
    }
  };

  const fetchAutosRegimenesFiscales = async (idAse) => {
    try {

      const DataRquest = {
        usuario: dataArrayEmi.CotiData.usuario,
        contraseña: dataArrayEmi.CotiData.contraseña,
        idAseguradora: idAse,
        idPersona: IdTipoPersona
      }

      const response = await GetTipoRegimenFiscal(DataRquest);

      if (response.data.Data.Data) {
        const data = response.data.Data.Data;
        setregimenesFiscales(data);
      } else {
        console.error('La respuesta de la API no contiene regimenes fiscales.');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      setLoading(false);
    }
  };

  const fetchAutosGetIdAseguradora = async () => {
    try {

      const DataRquest = {
        usuario: dataArrayEmi.CotiData.usuario,
        contraseña: dataArrayEmi.CotiData.contraseña,
        idCotizacion: dataArrayEmi.DataItemSelect.id,
      }
      const response = await GetIdAseguradora(DataRquest);

      if (response.data.Data) {
        const data = response.data.Data;
        console.log("IDASEGURADORAAA...", data);
        const idase = data
        setIdAseguradora(idase);
        await fetchPLCodigosBancos(idase);
        await fetchPLGetMetodosPago(idase);
        if (selectedTipoPersona == 2) {
          await fetchAutosGetTipoSociedad(idase);
          await fetchAutosGetGiro(idase);
          await fetchAutosRegimenesFiscales(idase);
        }
      } else {
        console.error('La respuesta de la API no contiene aseguradora.');
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

        setIdTipoPersona(data[0].Id)
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

  const fetchFlags = async () => {
    try {

      const DataRquest = {
        usuario: dataArrayEmi.CotiData.usuario,
        contraseña: dataArrayEmi.CotiData.contraseña,
        idSubcanal: dataArrayEmi.CotiData.IDSubcananal
      }
      console.log("OBTENIENDO GETS FLAGS ....")
      const response = await GetFlags(DataRquest);

      if (response.data.Data) {

        const pl = response.data.Data.PagoEnLinea;
        const plBool = pl === 1;
        const pr = response.data.Data.PagoEnLineaReferenciado;
        const prBool = pr === 1;
        console.log("Flags...", plBool, prBool)

        setIsPL(plBool)
        setIsPL(prBool)

      } else {
        console.error('La respuesta de la API no contiene banderas.');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      setLoading(false);
    }
  };

  const fetchPLCodigosBancos = async (idAse) => {
    try {

      const DataRquest = {
        usuario: dataArrayEmi.CotiData.usuario,
        contraseña: dataArrayEmi.CotiData.contraseña,
        idAseguradora: idAse
      }
      const response = await GetTiposPersona(DataRquest);
      if (response.data.Data.Data) {
        const data = response.data.Data.Data;
        setBancosEmisores(data);
      } else {
        console.error('La respuesta de la API no contiene bancos emisores.');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      setLoading(false);
    }
  };

  const fetchPLGetMetodosPago = async (idAse) => {
    try {

      const DataRquest = {
        usuario: dataArrayEmi.CotiData.usuario,
        contraseña: dataArrayEmi.CotiData.contraseña,
        idAseguradora: idAse
      }
      const response = await GetTiposPersona(DataRquest);
      if (response.data.Data.Data) {

        const data = response.data.Data.Data;
        setMetodosPagos(data);

      } else {
        console.error('La respuesta de la API no contiene metodos de pago.');
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

  const togglePLCollapse = () => {
    setPlCollapsed(!PlCollapsed);
  };

  const toggleSwitchPL = () => {
    setIsEnabledPL(previousState => !previousState);
    setIsEnabledPR(!isEnabledPL);
  };

  const toggleSwitchPR = () => {
    setIsEnabledPR(previousState => !previousState);
    setIsEnabledPL(!isEnabledPR);
  };

  // const toggleSwitchPL = () => {
  //   if (plBool) {
  //     setIsEnabledPL(True);
  //   } else {
  //     setIsEnabledPL(False);
  //   }
  // };

  // const toggleSwitchPR = () => {
  //   if (prBool) {
  //     setIsEnabledPR(True);
  //   } else {
  //     setIsEnabledPR(False);
  //   }
  // };

  // const toggleSwitchPL = () => setIsEnabledPL(previousState => !previousState); setIsEnabledPR(false);
  // const toggleSwitchPR = () => setIsEnabledPR(previousState => !previousState); setIsEnabledPL(false);

  const formatFechaExpiracion = (input) => {
    const cleanedInput = input.replace(/[^0-9]/g, '');
    if (cleanedInput.length > 2) {
      const formattedInput = cleanedInput.slice(0, 2) + '/' + cleanedInput.slice(2);
      setFechaExpiracion(formattedInput);
    } else {
      setFechaExpiracion(cleanedInput);
    }
  };

  const handleEmitir = async () => {
   

    const edadpersona=30

    const LabelFP = MetodosPagos.find(be => be.Id === selectedMetodosPagos)?.Valor;
    const LabelBE = BancosEmisores.find(be => be.Id === selectedBancoEmisor)?.Valor;

    const dataemi = {
      "IdCotizacion": dataArrayEmi.DataItemSelect.id,
      "NombrePersona": nombre,
      "ApaternoPersona": apellidoPaterno,
      "AmaternoPersona": apellidoMaterno,
      "GeneroPersona": selectedGenero,
      "EdadPersona": edadpersona,
      "NacimientoPersona": "string",
      "RFCPersona": rfc,
      "CURPPersona": curp,
      "Mail": correo,
      "Telefono": telefono,
      "CallePersona": calle,
      "NumeroExteriorPersona": noExterior,
      "NumeroInteriorPersona": noInterior,
      "ColoniaPersona": colonia,
      "CodigoPostalPersona": codigoPostal,
      "MunicipioPersona": municipio,
      "EstadoPersona": estado,
      "CiudadPersona":ciudad,
      "NumeroVin": numSerie,
      "NumeroMotor": numMotor,
      "PlacasVehiculo":placas,
      "FInicioVigencia": "2023-10-05T16:56:51.159Z",
      "BeneficiarioPreferente": false,
      "NumeroSocio": "",
      "NumeroCredito": "",
      "usuario":  dataArrayEmi.CotiData.usuario,
      "Contraseña":  dataArrayEmi.CotiData.contraseña,
      "IDSubcananal":  dataArrayEmi.CotiData.IDSubcananal,
      "NameTarjetabiente": nombreTarjetahabiente,
      "FormaCobro": LabelFP,
      "number": cuentaClabeNoTarjeta,
      "bankcode":LabelBE,
      "expmonth": "string",
      "expyear": "string",
      "cvvcsc": "string",
      "PagoEnLinea": isPL,
      "TipoPersona": selectedTipoPersona,
      "RazonSocial": "string",
      "NombreComercial": "string",
      "Giro": "string",
      "TipoSociedad": "string",
      "RegimenSimplificado": true,
      "TipoRegimenFiscal": "string",
      "TipoCFDI": "string",
      "strPoliza": ""
    };
    
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

            <Text>Giro</Text>
            <Picker
              selectedValue={selectedGiro}
              onValueChange={(itemValue) => setselectedGiro(itemValue)}
              style={styles.input}
              enabled={false} >
              {giros.map((g) => (
                <Picker.Item key={g.Id} label={g.Valor} value={g.Id} />
              ))}
            </Picker>

            <Text>Tipo sociedad</Text>
            <Picker
              selectedValue={selectedTipoSociedad}
              onValueChange={(itemValue) => setselectedTipoSociedad(itemValue)}
              style={styles.input}
              enabled={false} >
              {tiposSociedad.map((ts) => (
                <Picker.Item key={ts.Id} label={ts.Valor} value={ts.Id} />
              ))}
            </Picker>

            <Text>Reminen Fiscal</Text>
            <Picker
              selectedValue={selectedRegimenFiscal}
              onValueChange={(itemValue) => setselectedRegimenFiscal(itemValue)}
              style={styles.input}
              enabled={false} >
              {regimenesFiscales.map((rf) => (
                <Picker.Item key={rf.Id} label={rf.Valor} value={rf.Id} />
              ))}
            </Picker>

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

      <View>

        <TouchableOpacity onPress={togglePLCollapse} style={styles.button}>
          <Text style={styles.buttonText}>Forma de Pago</Text>
        </TouchableOpacity>

        <Collapsible collapsed={PlCollapsed}>

          {!isPL && !isPR && (
            <Text style={{ marginRight: 10 }}>No se cuenta con método de pago configurado</Text>
          )}

          {isPL && (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ marginRight: 10 }}>Pago en Línea</Text>
              <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isEnabledPL ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitchPL}
                value={isEnabledPL}
              />
            </View>
          )}

          {isPR && (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ marginRight: 10 }}>Pago Referenciado</Text>
              <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isEnabledPR ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitchPR}
                value={isEnabledPR}
              />
            </View>
          )}

          {isEnabledPL && (
            <View>
              <Text>Nombre Tarjetahabiente</Text>
              <TextInput
                placeholder="Nombre del Tarjetahabiente"
                value={nombreTarjetahabiente}
                onChangeText={text => setNombreTarjetahabiente(text)}
              />

              <Text>Banco Emisor</Text>

              <Picker
                selectedValue={selectedBancoEmisor}
                onValueChange={(itemValue) => setselectedBancoEmisor(itemValue)}
                style={styles.input}
                enabled={false} >
                {BancosEmisores.map((be) => (
                  <Picker.Item key={be.Id} label={be.Valor} value={be.Id} />
                ))}
              </Picker>


              <Text>Método de Pago</Text>

              <Picker
                selectedValue={selectedMetodosPagos}
                onValueChange={(itemValue) => setselectedMetodosPagos(itemValue)}
                style={styles.input}
                enabled={false} >
                {MetodosPagos.map((mp) => (
                  <Picker.Item key={mp.Id} label={mp.Valor} value={mp.Id} />
                ))}
              </Picker>

              <Text>Cuenta Clabe/No. Tarjeta</Text>
              <TextInput
                placeholder="Cuenta Clabe/No. Tarjeta"
                value={cuentaClabeNoTarjeta}
                onChangeText={text => setCuentaClabeNoTarjeta(text)}
              />

              <Text>Fecha de Expiración (MM/YY)</Text>
              <TextInput
                placeholder="MM/YY"
                value={fechaExpiracion}
                onChangeText={text => formatFechaExpiracion(text)}
                keyboardType="numeric"
                maxLength={5}
              />

              <Text>CVV Protegido de 3 Dígitos</Text>
              <TextInput
                placeholder="CVV"
                value={cvv}
                onChangeText={text => setCVV(text)}
                secureTextEntry={true}
                maxLength={3}
              />
            </View>
          )}

        </Collapsible>

      </View>


      {/* Botón de emitir */}
      <TouchableOpacity
        style={styles.cotizarButton}
        onPress={handleEmitir} >
        <Text style={styles.cotizarButtonText}>Emitir</Text>
      </TouchableOpacity>


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
});

export default EmisionScreen;
