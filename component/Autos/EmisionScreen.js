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
import LoadingComponent from '../Componentes/LoadingComponent';
import DateTimePicker from '@react-native-community/datetimepicker';

import {
  GetDias, GetMeses, GetAnyos, GetGeneros, GetTiposPersona,
  GetTipoSociedad, GetGiros, GetTipoRegimenFiscal, GetIdAseguradora,
  GetFlags, GetPLCodigosBancos, GetPLGetMetodosPago, GetTipoCDFI, GetConfigAgente
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
  const [DPCollapsed, setDPCollapsed] = useState(true);
  const [PlCollapsed, setPlCollapsed] = useState(true);

  //Datos contratante
  const [numerosocio, setnumerosocio] = useState('');
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
  const [TextTipoPersona, setTextTipoPersona] = useState('');

  const [IdAseguradora, setIdAseguradora] = useState('');

  const [razonSocial, setRazonSocial] = useState('');
  const [nombreComercial, setNombreComercial] = useState('');

  const [giros, setGiros] = useState([]);
  const [selectedGiro, setselectedGiro] = useState('');
  const [tiposSociedad, setTiposSociedad] = useState([]);
  const [selectedTipoSociedad, setselectedTipoSociedad] = useState('');
  const [regimenesFiscales, setregimenesFiscales] = useState([]);
  const [selectedRegimenFiscal, setselectedRegimenFiscal] = useState('');

  const [TipoCDFI, setTipoCDFI] = useState([]);
  const [selectedTipoCDFI, setselectedTipoCDFI] = useState('');

  const [showPickerPMPF, setshowPickerPMPF] = useState(false);

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

  const [IsNumSocio, setIsNumSocio] = useState(false);
  const [IsNumCredito, setIsNumCredito] = useState(false);
  const [IsBP, setIsIsBP] = useState(false);

  const [IsChangeVigencia, setIsChangeVigencia] = useState(false);
  const [selectedDate, setSelectedDate] = useState('01-01-2023');
  const [date, setDate] = useState(new Date());
  const [TextDateVP, setTextDateVP] = useState('');
  const [minDate, setMinDate] = useState(new Date());
  const [maxDate, setMaxDate] = useState(new Date());

  const [mode, setMode] = useState('date');
  const [isDatePickerEnabled, setisDatePickerEnabled] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  const [fechaMax, setFechaMax] = useState(null);
  const [fechaMin, setFechaMin] = useState(null);
  const [fechaActual, setFechaActual] = useState(null);

  const [showPickerFDesembolso, setShowPickerFDesembolso] = useState(true);
  const [dateFDesembolso, setDateFDesembolso] = useState(new Date());
  const [isRenovacion, setisRenovacion] = useState(false);
  const [ShowisRenovacion, setShowisRenovacion] = useState(true);

  const opcionesIdentificacion = [
    { label: "Selecciona", value: "" },
    { label: "Credencial IFE", value: "1" },
    { label: "Licencia de conducir", value: "2" },
    { label: "Pasaporte", value: "3" },
    { label: "Cedula Profesional", value: "4" },
    { label: "Cartilla Servicio Militar Nacional", value: "5" },
    { label: "Tarjeta unica de Identidad Militar", value: "7" },
    { label: "Afiliación el IMSS", value: "9" },
    { label: "CURP", value: "11" },
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        // dataArrayEmi.DataItemSelect.IdClaveAgente
        setTxtUrlconAse(dataArrayEmi.DataItemSelect.imageUrl);
        setColonia(dataArrayEmi.CotiData.ColoniaPersona);
        setCodigoPostal(dataArrayEmi.CotiData.CodigoPostal);
        setMunicipio(dataArrayEmi.CotiData.MunicipioPersona);
        setEstado(dataArrayEmi.CotiData.EstadoPersona);
        setCiudad(dataArrayEmi.CotiData.CiudadPersona);
        setMode('date');
        setShowPicker(false);
        await fetchAutoDias();
        await fetchAutoMeses();
        await fetchAutoAynos();
        await fetchFlags();
        await fetchConfigAgente();
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

  const fetchAutosTipoCDFI = async (idAse) => {
    try {

      const DataRquest = {
        usuario: dataArrayEmi.CotiData.usuario,
        contraseña: dataArrayEmi.CotiData.contraseña,
        idAseguradora: idAse,
        idPersona: IdTipoPersona
      }
      const response = await GetTipoCDFI(DataRquest);
      if (response.data.Data.Data) {
        const data = response.data.Data.Data;
        setTipoCDFI(data);
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
          await fetchAutosTipoCDFI(idase);
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
        setTextTipoPersona(data[0].Valor)
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

        const bf = response.data.Data.BPreferente;
        const bfBool = bf === 1;

        const ns = response.data.Data.NumeroSocio;
        const nsBool = ns === 1;

        const nc = response.data.Data.NumeroCredito;
        const ncBool = nc === 1;

        console.log("Flags...", plBool, prBool, bfBool, ncBool, nsBool)

        setIsPL(plBool)
        setIsEnabledPL(plBool);
        setIsPR(prBool)
        setIsEnabledPR(prBool);
        setIsIsBP(bfBool);
        setIsNumCredito(ncBool);
        setIsNumSocio(nsBool);

      } else {
        console.error('La respuesta de la API no contiene banderas.');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      setLoading(false);
    }
  };

  const fetchConfigAgente = async () => {
    try {
      const DataRquest = {
        idAgente: dataArrayEmi.DataItemSelect.IdClaveAgente,
        usuario: dataArrayEmi.CotiData.usuario,
        contraseña: dataArrayEmi.CotiData.contraseña,
      }
      //console.log("OBTENIENDO LOS DATOS DE AGENTE ....", dataArrayEmi.DataItemSelect.IdClaveAgente)
      const response = await GetConfigAgente(DataRquest);
      if (response.data.Data !== null) {
        //console.log("CONFIG AGENTE RESPONSE", response.data.Data)
        let vfechaMax = response.data.Data[0].FECHA_MAXIMA;
        let vfechaMin = response.data.Data[0].FECHA_MINIMA;
        let vfechaActual = response.data.Data[0].FECHA_ACTUAL;
        setFechaMax(vfechaMax);
        setFechaMin(vfechaMin);
        setFechaActual(vfechaActual);
        let fMax = vfechaMax.substr(6, 4) + "-" + vfechaMax.substr(3, 2) + "-" + vfechaMax.substr(0, 2);
        let fMin = vfechaMin.substr(6, 4) + "-" + vfechaMin.substr(3, 2) + "-" + vfechaMin.substr(0, 2);
        let fValor = vfechaActual.substr(6, 4) + "-" + vfechaActual.substr(3, 2) + "-" + vfechaActual.substr(0, 2);
        setDate(new Date(fValor));
        //console.log("ccccc",date.toLocaleDateString())
        setTextDateVP(date.toLocaleDateString());
        if (response.data.Data[0].FIEMISION_ANTICIPADA != 0) {
          setisDatePickerEnabled(true);
          setMaxDate(new Date(fMax));
          setMinDate(new Date(fMin));
        } else {
          setisDatePickerEnabled(false);
          setMaxDate(new Date(fValor));
          setMinDate(new Date(fValor));
        }
        console.log("FECHAS EMI ANTICIPADA 2222 ", fMax, fMin, fValor)
      } else {
        console.error('La respuesta de la API no contiene información de clave de agente..');
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
      const response = await GetPLCodigosBancos(DataRquest);
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
      const response = await GetPLGetMetodosPago(DataRquest);
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

  const toggleDPCollapse = () => {
    setDPCollapsed(!DPCollapsed);
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

  const toggleSwitchCV = () => {
    setIsChangeVigencia(previousState => !previousState);
    setShowPicker(!IsChangeVigencia);
  };

  const toggleSwitchRembolso = () => {
    setisRenovacion(previousState => !previousState);
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

  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  // };

  const onChange = (event, selectedDate) => {
    setShowPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
      setTextDateVP(date.toLocaleDateString());
    }
  };

  // const showDatepicker = () => {
  //   setMode('date');
  //   setShowPicker(true);
  // };

  const handleEmitir = async () => {

    const fecha_nacimiento_persona = selectedAno + "/" + selectedMes + "/" + selectedDia
    const fecha = new Date();
    const anyoActual = fecha.getFullYear();
    const EdadPersona = anyoActual - selectedAno;
    const vNameTarjetabiente = "";
    const vFormaCobro = "";
    const vnumber = "";
    const vbankcode = "";
    const vexpmonth = "";
    const vexpyear = "";
    const vcvv = "";

    const TipoIdentificacionPersona = opcionesIdentificacion.find((opcion) => opcion.value === tipoIdentificacion);
    
    if (isPL) {
      const LabelFP = MetodosPagos.find(be => be.Id === selectedMetodosPagos)?.Valor;
      const LabelBE = BancosEmisores.find(be => be.Id === selectedBancoEmisor)?.Valor;
      vNameTarjetabiente = nombreTarjetahabiente;
      vFormaCobro = LabelFP;
      vnumber = cuentaClabeNoTarjeta;
      vbankcode = LabelBE;
      vexpmonth = fechaExpiracion.substring(0, 2);
      vexpyear = fechaExpiracion.substring(fechaExpiracion.length - 2);
      vcvv = cvv;
    }

    const dataemi = {
      "IdCotizacion": dataArrayEmi.DataItemSelect.id,
      "NombrePersona": nombre,
      "ApaternoPersona": apellidoPaterno,
      "AmaternoPersona": apellidoMaterno,
      "GeneroPersona": selectedGenero,
      "EdadPersona": EdadPersona,
      "NacimientoPersona": fecha_nacimiento_persona,
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
      "CiudadPersona": ciudad,
      "NumeroVin": numSerie,
      "NumeroMotor": numMotor,
      "PlacasVehiculo": placas,
      //"FInicioVigencia": "2023-10-05T16:56:51.159Z",
      "FInicioVigencia": TextDateVP,
      "BeneficiarioPreferente": IsBP,
      "NumeroSocio": numerosocio,
      "NumeroCredito": numCredito,
      "TipoIdentificacionPersona": TipoIdentificacionPersona.label,
      "NumIdentificacionPersona": numIdentificacion,
      "usuario": dataArrayEmi.CotiData.usuario,
      "Contraseña": dataArrayEmi.CotiData.contraseña,
      "IDSubcananal": dataArrayEmi.CotiData.IDSubcananal,
      // "NameTarjetabiente": vNameTarjetabiente,
      // "FormaCobro": vFormaCobro,
      // "number": vnumber,
      // "bankcode": vbankcode,
      // "expmonth": vexpmonth,
      // "expyear": vexpyear,
      // "cvvcsc": vcvv,
      // "PagoEnLinea": false,
      // "TipoPersona": selectedTipoPersona,
      // "RazonSocial": razonSocial,
      // "NombreComercial": nombreComercial,
      // "Giro": selectedGiro,
      // "TipoSociedad": selectedTipoSociedad,
      // "RegimenSimplificado": false,
      // "TipoRegimenFiscal": selectedRegimenFiscal,
      // "TipoCFDI": TipoCDFI,
      // "strPoliza": ""
    };

    console.log(dataemi);

  };

  // const getLabelForTipoPersona = (value) => {
  //   console.log("xx",value)
  //   selectedTipoPersona();
  //   const selectedData = TiposPersona.find((item) => item.Id === value);
  //   console.log("tupo persona..",selectedData)
  //   return selectedData ? selectedData.Valor : '';
  // };

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

      {/* dATOS emisión */}
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

      {/* dATOS CONTRATANTE */}

      <View>
        <TouchableOpacity onPress={toggleCollapse} style={styles.button}>
          <Text style={styles.buttonText}>Datos Contratante</Text>
        </TouchableOpacity>
        <Collapsible collapsed={isCollapsed}>

          <Text style={{ marginTop: 15, marginBottom: 15 }}>Tipo Persona: {TextTipoPersona}</Text>

          {showPicker && (
            <Picker
              selectedValue={selectedTipoPersona}
              onValueChange={(itemValue) => setselectedTipoPersona(itemValue)}
              style={styles.input}
              enabled={false} >
              {TiposPersona.map((tp) => (
                <Picker.Item key={tp.Id} label={tp.Valor} value={tp.Id} />
              ))}
            </Picker>)}

          <Text>Número de socio</Text>
          <TextInput
            style={[styles.input, !IsNumSocio && styles.hiddenInput]}
            value={numerosocio}
            onChangeText={setnumerosocio}
          />

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
                onValueChange={(itemValue, itemIndex) => setTipoIdentificacion(itemValue)}
                style={{ width: 200 }}
              >
                {opcionesIdentificacion.map((opcion) => (
                  <Picker.Item key={opcion.value} label={opcion.label} value={opcion.value} />
                ))}
              </Picker>

              {/* <Picker
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
              </Picker> */}

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
      </View>

      {/* dATOS Dirección */}
      <View>
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
            style={[styles.input, { backgroundColor: '#EEEDED' }]}
            value={colonia}
            editable={false}
            onChangeText={setColonia}
          />

          <Text>Código Postal</Text>
          <TextInput
            style={[styles.input, { backgroundColor: '#EEEDED' }]}
            value={codigoPostal}
            editable={false}
            onChangeText={setCodigoPostal}
            keyboardType="numeric"
          />

          <Text>Municipio</Text>
          <TextInput
            style={[styles.input, { backgroundColor: '#EEEDED' }]}
            value={municipio}
            editable={false}
            onChangeText={setMunicipio}
          />

          <Text>Estado</Text>
          <TextInput
            style={[styles.input, { backgroundColor: '#EEEDED' }]}
            editable={false}
            value={estado}
            onChangeText={setEstado}
          />

          <Text>Ciudad</Text>
          <TextInput
            style={[styles.input, { backgroundColor: '#EEEDED' }]}
            value={ciudad}
            editable={false}
            onChangeText={setCiudad}
          />
        </Collapsible>
      </View>

      {/* dATOS vehiculo */}
      <View>
        <TouchableOpacity onPress={toggleVehiculoCollapse} style={styles.button}>
          <Text style={styles.buttonText}>Datos de Vehículo</Text>
        </TouchableOpacity>

        <Collapsible collapsed={vehiculoCollapsed}>

          <Text>Número de Crédito</Text>
          <TextInput
            value={numCredito}
            onChangeText={setNumCredito}
            // disabled={!IsNumCredito}
            style={[styles.input, !IsNumCredito && styles.hiddenInput]}
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

      {/* dATOS POLIZA */}
      <View>
        <TouchableOpacity onPress={toggleDPCollapse} style={styles.button}>
          <Text style={styles.buttonText}>Datos de Póliza</Text>
        </TouchableOpacity>
        <Collapsible collapsed={DPCollapsed}>

          <View style={{ marginBottom: 10 }}>

            <Text>Vigencia Desde:</Text>

            <Text>Fecha: {TextDateVP}</Text>

            {showPicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
                minimumDate={minDate}
                maximumDate={maxDate}
                style={{ alignSelf: 'center', marginBottom: 10, marginTop: 10 }}
              />
            )}

            <Text style={{ marginRight: 10, marginTop: 15 }}>Cambiar Fecha</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={IsChangeVigencia ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitchCV}
              value={IsChangeVigencia}
              disabled={isDatePickerEnabled}
            />
          </View>

          <View style={{ marginBottom: 10 }}>
            <Text style={{ marginRight: 10 }}>Beneficiario Preferente</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={IsBP ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              value={IsBP}
              disabled={true}
            />
          </View>

          <View style={{ marginBottom: 10 }}>

            {ShowisRenovacion && (
              <View>
                <Text style={{ marginRight: 10 }}>Renovación:</Text>
                <Switch
                  trackColor={{ false: '#767577', true: '#81b0ff' }}
                  thumbColor={isRenovacion ? '#f5dd4b' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitchRembolso}
                  value={isRenovacion}
                />
              </View>
            )}

            {showPickerFDesembolso && (
              <View>
                <Text style={{ marginRight: 10 }}>Fecha de desembolso:</Text>
                <DateTimePicker
                  testID="dateTimePicker"
                  value={dateFDesembolso}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                  style={{ alignSelf: 'center', marginBottom: 10, marginTop: 10 }}
                />
              </View>
            )}

          </View>

        </Collapsible>
      </View >

      {/* Forma pago */}
      < View style={{ alignSelf: 'center', marginBottom: 10, marginTop: 10, display: 'none' }}>
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
                disabled={!isPR}
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
                disabled={!isPL}
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

      </View >

      {/* Botón de emitir */}
      < TouchableOpacity
        style={styles.cotizarButton}
        onPress={handleEmitir} >
        <Text style={styles.cotizarButtonText}>Emitir</Text>
      </TouchableOpacity >

    </ScrollView >

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
    marginBottom: 60,
    alignItems: 'center',
  },
  cotizarButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  hiddenInput: {
    display: 'none', // Ocultar el TextInput cuando IsNumCredito sea falso
  },
});

export default EmisionScreen;
