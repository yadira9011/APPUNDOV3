import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  Switch,
  Alert,
  ImageBackground
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Collapsible from 'react-native-collapsible';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import LoadingComponent from '../Componentes/LoadingComponent';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import pickerSelectStyles from '../Styles/PickerSelectStyles';

import {
  GetDias, GetMeses, GetAnyos, GetGeneros, GetTiposPersona,
  GetTipoSociedad, GetGiros, GetTipoRegimenFiscal, GetIdAseguradora,
  GetFlags, GetPLCodigosBancos, GetPLGetMetodosPago, GetTipoCDFI,
  GetConfigAgente, GetCEmision, ImpresionPoliza, GetPagoEnLinea, GetPrivilegios
} from '../Api/api';

const EmisionScreen = () => {

  const route = useRoute();
  const navigation = useNavigation();
  const { dataArrayEmi } = route.params;
  const [loadingCombos, setloadingCombos] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingEmision, setloadingEmision] = useState(false);

  const [isCollapsed, setIsCollapsed] = useState(true);
  const [direccionCollapsed, setDireccionCollapsed] = useState(true);
  const [vehiculoCollapsed, setVehiculoCollapsed] = useState(true);
  const [DPCollapsed, setDPCollapsed] = useState(true);
  const [PlCollapsed, setPlCollapsed] = useState(true);

  //Datos contratante
  // const [numerosocio, setnumerosocio] = useState('XXX');
  // const [nombre, setNombre] = useState('YADIRA');
  // const [apellidoPaterno, setApellidoPaterno] = useState('PEREZ');
  // const [apellidoMaterno, setApellidoMaterno] = useState('CASTILLO');
  // const [rfc, setRFC] = useState('PECY901120');
  // const [curp, setCURP] = useState('PECY901109MVZRSD06');

  const [numerosocio, setnumerosocio] = useState();
  const [nombre, setNombre] = useState();
  const [apellidoPaterno, setApellidoPaterno] = useState();
  const [apellidoMaterno, setApellidoMaterno] = useState();
  const [rfc, setRFC] = useState();
  const [curp, setCURP] = useState();

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
  // const [numIdentificacion, setNumIdentificacion] = useState('123567892');
  // const [telefono, setTelefono] = useState('2781152721');
  // const [correo, setCorreo] = useState('pruebas@gmail.com');

  const [numIdentificacion, setNumIdentificacion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');


  //Datos Direccion
  // const [calle, setCalle] = useState('SALVATIERRA');
  // const [noExterior, setNoExterior] = useState('75');
  // const [noInterior, setNoInterior] = useState('0');
  const [calle, setCalle] = useState('');
  const [noExterior, setNoExterior] = useState('');
  const [noInterior, setNoInterior] = useState('');

  const [colonia, setColonia] = useState('');
  const [codigoPostal, setCodigoPostal] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [estado, setEstado] = useState('');
  const [ciudad, setCiudad] = useState('');

  //Datos DatosVehiculo
  // const [numCredito, setNumCredito] = useState('00000');
  // const [numSerie, setNumSerie] = useState('JH4DC4470YS801968');
  // const [numMotor, setNumMotor] = useState('HECHOMX');
  // const [placas, setPlacas] = useState('YJPC');

  const [numCredito, setNumCredito] = useState();
  const [numSerie, setNumSerie] = useState();
  const [numMotor, setNumMotor] = useState();
  const [placas, setPlacas] = useState();


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

  // const [nombreTarjetahabiente, setNombreTarjetahabiente] = useState('PRUEBA RODAC');
  // const [cuentaClabeNoTarjeta, setCuentaClabeNoTarjeta] = useState('5454545454545454');
  // const [fechaExpiracion, setFechaExpiracion] = useState('11/26');
  // const [cvv, setCVV] = useState('123');

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
  const [TextDateFD, setTextDateFD] = useState('');
  const [isRenovacion, setisRenovacion] = useState(false);
  const [ShowisRenovacion, setShowisRenovacion] = useState(true);

  const [showChangeFD, setShowChangeFD] = useState(false);

  const [showChangeFDpIKER, setshowChangeFDpIKER] = useState(false);

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

  const [CountPL, setCountPL] = useState(0);
  const [EmisionOK, setEmisionOK] = useState(false);

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
        await fetchPrivilegios();
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
        let plBool = pl === 1;

        const pr = response.data.Data.PagoEnLineaReferenciado;
        let prBool = pr === 1;

        let plpanel = true;
        let prpanel = true;

        if (plBool && prBool) {
          //prBool = false;
          prpanel = false;
        }



        // if (prBool) {
        //   plpanel = true;
        //   plBool = false;
        // }

        const bf = response.data.Data.BPreferente;
        const bfBool = bf === 1;

        const ns = response.data.Data.NumeroSocio;
        const nsBool = ns === 1;

        const nc = response.data.Data.NumeroCredito;
        const ncBool = nc === 1;

        console.log("Flags...", plBool, prBool, bfBool, ncBool, nsBool)

        setIsPL(plBool)
        setIsEnabledPL(plpanel);

        setIsPR(prBool)
        setIsEnabledPR(prpanel);


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
        setTextDateFD(dateFDesembolso.toLocaleDateString());
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

  const fetchPrivilegios = async () => {
    try {

      const DataRquest = {
        IdUsuario: dataArrayEmi.DataParameter.IdUsr,
        RutaControlador: '/Autos/CotizadorAutos',
        Usuario: dataArrayEmi.CotiData.usuario,
        Contraseña: dataArrayEmi.CotiData.contraseña,
      }

      console.log("OBTENIENDO PRIVILEGIOS ....")
      const response = await GetPrivilegios(DataRquest);
      console.log(response);
      if (!response.data.Data.hasError) {
        console.log(response.data.Data);
      } else {
        console.error('La respuesta de la API no contiene metodo privilegios.');
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
    setIsEnabledPR(false);
  };

  const toggleSwitchPR = () => {
    setIsEnabledPR(previousState => !previousState);
    setIsEnabledPL(false);
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

  const onChangeV = (event, selectedDate) => {
    console.log(selectedDate)
    if (selectedDate) {
      setTextDateVP(selectedDate.toLocaleDateString());
      showPicker(previousState => !previousState);
    }
  };


  const onChangeXXX = (event, selectedDate) => {

    if (showChangeFD) {
      setshowChangeFDpIKER(true);
    } else {
      setshowChangeFDpIKER(false);
    }
    //setShowChangeFD(previousState => !previousState);
    // console.log(showChangeFD)
    // //setShowPicker(Platform.OS === 'ios');
    // if (selectedDate) {
    //   setDate(selectedDate);
    //   setTextDateVP(date.toLocaleDateString());
    //   //etShowChangeFD(previousState => !previousState);
    //   //setShowPicker(false);
    // }
  };

  const onChangeFD = (event, selectedDate) => {
    console.log(selectedDate)
    if (selectedDate) {
      setTextDateFD(selectedDate.toLocaleDateString());
      setshowChangeFDpIKER(previousState => !previousState);
    }
  };

  const onChangeFDS = () => {
    setShowChangeFD(previousState => !previousState);
    if (!showChangeFD) {
      console.log(showChangeFD)
      setshowChangeFDpIKER(true);
    } else {
      setshowChangeFDpIKER(false);
    }
  };

  // const showDatepicker = () => {
  //   setMode('date');
  //   setShowPicker(true);
  // };

  const handleEmitir = async () => {

    setloadingEmision(true);

    var monthfn = ('0' + selectedMes).slice(-2);
    var dayfn = ('0' + selectedDia).slice(-2);
    const fecha_nacimiento_persona = selectedAno + "/" + monthfn + "/" + dayfn

    console.log(fecha_nacimiento_persona)

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

    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    console.log(date.toLocaleDateString())
    var yearfv = date.getFullYear();
    var monthfv = ('0' + (date.getMonth() + 1)).slice(-2);
    var dayfv = ('0' + (date.getDate() + 1)).slice(-2);
    var formattedDatefv = yearfv + '-' + monthfv + '-' + dayfv;

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
      "FInicioVigencia": formattedDatefv,
      "BeneficiarioPreferente": IsBP,
      "NumeroSocio": numerosocio,
      "NumeroCredito": numCredito,
      "TipoIdentificacionPersona": TipoIdentificacionPersona.label,
      "NumIdentificacionPersona": numIdentificacion,
      "usuario": dataArrayEmi.CotiData.usuario,
      "Contraseña": dataArrayEmi.CotiData.contraseña,
      "IDSubcananal": parseInt(dataArrayEmi.CotiData.IDSubcananal, 10),
      "TipoPersona": 1,
      "NameTarjetabiente": vNameTarjetabiente,
      "FormaCobro": vFormaCobro,
      "number": vnumber,
      "bankcode": vbankcode,
      "expmonth": vexpmonth,
      "expyear": vexpyear,
      "cvvcsc": vcvv,
      "PagoEnLinea": false,
      //para persona moral
      // "RazonSocial": razonSocial,
      // "NombreComercial": nombreComercial,
      // "Giro": selectedGiro,
      // "TipoSociedad": selectedTipoSociedad,
      // "RegimenSimplificado": false,
      // "TipoRegimenFiscal": selectedRegimenFiscal,
      // "TipoCFDI": TipoCDFI,
      "strPoliza": ""
    }

    console.log('DATAAAA EMIIII', dataemi);

    if (EmisionOK == false) {
      const response = await GetCEmision(dataemi);
      console.log(response.data.Data)
      if (!response.data.Data.HasError) {
        const data = response.data.Data.Data;
        const NumeroPoliza = data.Poliza;
        dataemi.strPoliza = NumeroPoliza;
        //const PagoLinea = data.pl;
        console.log(data)
        setEmisionOK(true);
        Alert.alert('Información', 'Emisión de poliza exitosa. Número de poliza: ' + NumeroPoliza);
        setloadingEmision(false);
        // Alert.alert(
        //   'Información',
        //   'Emisión de poliza exitosa. Número de poliza: ' + NumeroPoliza,
        //   [
        //     {
        //       text: 'OK',
        //       onPress: () => handleOkGoImpresionPress(NumeroPoliza),
        //       style: 'default',
        //     },
        //   ],
        //   { cancelable: false }
        // );
      } else {
        Alert.alert('Error', response.data.Data.Message);
        setEmisionOK(false);
        console.error('Ocurrio un error al procesar la emisión.', response.data.Data.Message);
        setloadingEmision(false);
      }
    }

    if (EmisionOK) {
      setloadingEmision(true);
      await PagoLineaProcess(dataemi, dataemi.strPoliza);
      setloadingEmision(false);
    }

  };

  const PagoLineaProcess = async (emi, NumeroPoliza) => {
    const ProcessPL = false;
    if (isEnabledPL) {
      const res_pl = await CallPL(emi);
      if (res_pl.pls == false) {
        setCountPL(CountPL + 1);
        Alert.alert("Error", "Error en pago linea: " + res_pl.MessajeErrorPl);
        if (CountPL >= 3) {
          // //Deshabilita boton de emision
          // document.getElementById("ENVIAR_BTN").disabled = true;
          ProcessPL = false;
          alert("Número de intentos de pago superados,favor de contactar a un ejecutivo")
        } else {
          return
        }
      } else {
        // //Deshabilita boton de emision
        // document.getElementById("ENVIAR_BTN").disabled = true;
        ProcessPL = true;
        alert("El pago en linea fue exitoso, referencia de pago " + res_pl.ReferencfiaPago + ", presione aceptar para continuar")
      }
    } else {
      ProcessPL = true;
    }

    if (ProcessPL) {
      await GetImpresionPoliza(NumeroPoliza)
    }

  };

  const CallPL = async (emi) => {
    const pls = false;
    const MessajeErrorPl = "";
    const ReferencfiaPago = "";
    const response = await GetPagoEnLinea(emi);
    console.log(response.data.Data)
    if (!response.data.Data.hasError) {
      pls = false;
      MessajeErrorPl = result_pl.data.Data.Data.MessajeError;
    } else {
      const data = result_pl.data.Data.Data.Plok
      if (data) {
        ReferencfiaPago = result_pl.data.Data.Data.Folio_pago
        pls = true;
      } else {
        pls = false;
        MessajeErrorPl = result_pl.data.Data.Data.MessajeError;
      }
    }
    const DataResponse = {
      pls: pls,
      ReferencfiaPago: ReferencfiaPago,
      MessajeErrorPl: MessajeErrorPl
    }
    return DataResponse;
  };

  const GetImpresionPoliza = async (NumeroPoliza) => {
    console.log('Impresión poliza...', NumeroPoliza);
    const DataRquest = {
      IDCotizacion: dataArrayEmi.DataItemSelect.id,
      IDSubcananal: dataArrayEmi.CotiData.IDSubcananal,
      usuario: dataArrayEmi.CotiData.usuario,
      Contraseña: dataArrayEmi.CotiData.contraseña
    }
    const response = await ImpresionPoliza(DataRquest);
    console.log(response.data.Data)
    if (!response.data.Data.HasError) {
      const pdfUrl = response.data.Data.Data;
      navigation.navigate('PDFViewerScreen', { pdfUrl });
    } else {
      Alert.alert('Error', response.data.Data.Message);
      console.error('Ocurrio un error al procesar la impresión.', response.data.Data.Message);
    }
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
    <View>

      <ScrollView style={styles.container}>

        {/* dATOS emisión */}

        <View style={styles.imageContainer}>
          <View style={styles.imageContain}>
            <Image source={TxtUrlconAse} style={styles.imageCober} />
          </View>
          <ImageBackground
            source={require('../../assets/Polizas/background.png')}
            imageStyle={styles.backgroundImage} >
            <View style={styles.textContainer}>
              <Text style={styles.description}><Text style={styles.boldText}>MODELO:</Text> {dataArrayEmi.DataTitulos.Modelo}</Text>
              <Text style={styles.description}><Text style={styles.boldText}>DESCRIPCION:</Text> {dataArrayEmi.DataTitulos.DescripcionVehiculo}</Text>
              <Text style={styles.description}><Text style={styles.boldText}>TIPO USO :</Text> {dataArrayEmi.DataTitulos.TipoUso}</Text>
              <Text style={styles.description}><Text style={styles.boldText}>PAQUETE:</Text> {dataArrayEmi.DataTitulos.tipoPaquete}</Text>
              <Text style={styles.description}><Text style={styles.boldText}>VIGENCIA:</Text> {dataArrayEmi.DataTitulos.tipoVigenciaPago}</Text>
              <Text style={styles.description}><Text style={styles.boldText}>PRIMA TOTAL:</Text> {dataArrayEmi.DataItemSelect.PrimaTotal}</Text>
            </View>
          </ImageBackground >
        </View>

        {/* dATOS CONTRATANTE ../../assets/EmiIcons/DatosContra.png */}

        <TouchableOpacity onPress={toggleCollapse} style={styles.button}>
          <View style={{ flexDirection: 'row', alignItems: 'center', }}>
            <Image source={require('../../assets/EmiIcons/DatosContra.png')} style={styles.imageIcons} />
            <Text style={styles.buttonText}>Datos Contratante</Text>
            <View style={styles.iconContainer}>
              {/* <Ionicons name="chevron-expand" size={26} color="white" />
              <Ionicons name="chevron-expand-sharp" size={24} color="black" /> */}
              <Ionicons name="chevron-down-sharp" size={26} color="white" />
            </View>
          </View>
        </TouchableOpacity>

        <Collapsible collapsed={isCollapsed} align="center">

          <Text style={styles.LabelText}>Tipo Persona: {TextTipoPersona}</Text>

          {showPicker && (
            <RNPickerSelect
              onValueChange={(itemValue) => setselectedTipoPersona(itemValue)}
              items={TiposPersona.map((tp) => ({
                label: tp.Valor,
                value: tp.Id,
              }))}
              style={pickerSelectStyles}
              value={selectedTipoPersona}
            />
          )}

          <Text style={styles.LabelText}>Número de socio</Text>
          <TextInput
            style={[styles.input, !IsNumSocio && styles.hiddenInput]}
            value={numerosocio}
            onChangeText={setnumerosocio}
          />

          {/* PERSONA FISICA */}

          {isVisiblePF && (
            <View>

              <Text style={styles.LabelText}>Nombre</Text>
              <TextInput
                style={styles.input}
                value={nombre}
                onChangeText={setNombre}
              />

              <Text style={styles.LabelText}>Apellido Paterno</Text>
              <TextInput
                style={styles.input}
                value={apellidoPaterno}
                onChangeText={setApellidoPaterno}
              />

              <Text style={styles.LabelText}>Apellido Materno</Text>
              <TextInput
                style={styles.input}
                value={apellidoMaterno}
                onChangeText={setApellidoMaterno}
              />

              <Text style={styles.LabelText}>CURP</Text>
              <TextInput
                style={styles.input}
                value={curp}
                onChangeText={setCURP}
              />

              <Text style={styles.LabelText}>Género</Text>

              <RNPickerSelect
                onValueChange={(itemValue) => setSelectedGenero(itemValue)}
                items={generos.map((genero) => ({
                  label: genero.Valor,
                  value: genero.Id,
                }))}
                placeholder={{}}
                style={pickerSelectStyles}
                value={selectedGenero}
              />


              <Text style={styles.LabelText} >Tipo de Identificación</Text>
              <RNPickerSelect
                onValueChange={(itemValue, itemIndex) => setTipoIdentificacion(itemValue)}
                items={opcionesIdentificacion.map((opcion) => ({
                  label: opcion.label,
                  value: opcion.value,
                }))}
                style={pickerSelectStyles}
                value={tipoIdentificacion}
              />

              <Text style={styles.LabelText}>Número de Identificación</Text>
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

              <Text style={styles.LabelText}>Razón Social</Text>
              <TextInput
                style={styles.input}
                value={razonSocial}
                onChangeText={setRazonSocial}
              />

              <Text style={styles.LabelText}>Nombre Comercial</Text>
              <TextInput
                style={styles.input}
                value={nombreComercial}
                onChangeText={setNombreComercial}
              />

              <Text style={styles.LabelText}>Giro</Text>
              <RNPickerSelect
                onValueChange={(itemValue) => setselectedGiro(itemValue)}
                items={giros.map((g) => ({
                  label: g.Valor,
                  value: g.Id,
                }))}
                style={pickerSelectStyles}
                value={selectedGiro}
              />

              <Text style={styles.LabelText}>Tipo sociedad</Text>
              <RNPickerSelect
                onValueChange={(itemValue) => setselectedTipoSociedad(itemValue)}
                items={tiposSociedad.map((ts) => ({
                  label: ts.Valor,
                  value: ts.Id,
                }))}
                style={pickerSelectStyles}
                value={selectedTipoSociedad}
              />

              <Text style={styles.LabelText}>Reminen Fiscal</Text>
              <RNPickerSelect
                onValueChange={(itemValue) => setselectedRegimenFiscal(itemValue)}
                items={regimenesFiscales.map((rf) => ({
                  label: rf.Valor,
                  value: rf.Id,
                }))}
                style={pickerSelectStyles}
                value={selectedRegimenFiscal}
              />

            </View>

          )}

          <Text style={styles.LabelText}>RFC</Text>
          <TextInput
            style={styles.input}
            value={rfc}
            onChangeText={setRFC}
          />

          <Text style={styles.LabelText}>{TxtFecha}</Text>


          <View style={styles.pickerContainerNew}>

            <View style={{
              flexDirection: 'column',
              width: '30%',
            }}>
              <Text>Dia:</Text>
              <RNPickerSelect
                onValueChange={(itemValue) => setSelectedDia(itemValue)}
                style={{
                  inputAndroid: {
                    fontSize: 5,
                    color: 'blue',
                    borderWidth: 0,
                    borderColor: 'gray',
                    borderRadius: 3,
                    width: 110,
                    marginRight: 5,
                    marginBottom: 10,
                    marginLeft: 0,
                    backgroundColor: 'white',
                  },
                  inputIOS: {
                    fontSize: 14,
                    color: 'blue',
                    borderWidth: 1,
                    borderRadius: 4,
                    borderColor: 'gray',
                    width: 60,
                    marginRight: 5,
                    marginBottom: 15,
                    backgroundColor: 'white',
                    textAlign: 'center',
                  },
                  viewContainer: {
                    padding: 0,
                  },
                }}
                items={dias.map((dia) => ({
                  label: dia.Valor,
                  value: dia.Id,
                }))}
                value={selectedDia}
                placeholder={{
                  label: 'Dia',
                  value: null,
                  color: 'blue',
                  fontSize: 5,
                }}
              />
            </View>

            <View style={{
              flexDirection: 'column',
              width: '30%',
            }}>
              <Text>Mes:</Text>
              <RNPickerSelect
                onValueChange={(itemValue) => setSelectedMes(itemValue)}
                style={{
                  inputAndroid: {
                    fontSize: 7,
                    color: 'blue',
                    borderWidth: 1,
                    borderColor: 'gray',
                    borderRadius: 4,
                    width: 118,
                    marginRight: 5,
                    backgroundColor: 'white',
                  },
                  inputIOS: {
                    fontSize: 14,
                    color: 'blue',
                    borderWidth: 1,
                    borderRadius: 4,
                    borderColor: 'gray',
                    width: 70,
                    marginRight: 5,
                    marginBottom: 15,
                    backgroundColor: 'white',
                    textAlign: 'center',
                  },
                  viewContainer: {
                    padding: 0,
                  },
                }}
                items={meses.map((mes) => ({
                  label: mes.Valor,
                  value: mes.Id,
                }))}
                value={selectedMes}
                placeholder={{
                  label: 'Mes',
                  value: null,
                  color: 'blue',
                  fontSize: 5,
                }}
              />
            </View>


            <View style={{
              flexDirection: 'column',
              width: '30%',
            }}>
              <Text>Año:</Text>
              <RNPickerSelect
                onValueChange={(itemValue) => setSelectedAno(itemValue)}
                style={{
                  inputAndroid: {
                    fontSize: 7,
                    color: 'blue',
                    borderWidth: 1,
                    borderColor: 'gray',
                    borderRadius: 4,
                    width: 125,
                    backgroundColor: 'white',
                  },
                  inputIOS: {
                    fontSize: 14,
                    color: 'blue',
                    borderWidth: 1,
                    borderRadius: 4,
                    borderColor: 'gray',
                    width: 80,
                    marginRight: 5,
                    marginBottom: 15,
                    backgroundColor: 'white',
                    textAlign: 'center',
                  },
                  viewContainer: {
                    padding: 0,
                  },
                }}
                items={anos.map((ano) => ({
                  label: ano.Valor,
                  value: ano.Id,
                }))}
                value={selectedAno}
                placeholder={{
                  label: 'Año',
                  value: null,
                  color: 'blue',
                  fontSize: 5,
                }}
              />
            </View>
          </View>

          <Text style={styles.LabelText}>Teléfono</Text>
          <TextInput
            style={styles.input}
            value={telefono}
            onChangeText={setTelefono}
          />

          <Text style={styles.LabelText}>Correo Electrónico</Text>
          <TextInput
            style={styles.input}
            value={correo}
            onChangeText={setCorreo}
            keyboardType="email-address"
          />
        </Collapsible>

        {/* dATOS Dirección */}
        <View>
          <TouchableOpacity onPress={toggleDireccionCollapse} style={styles.button}>
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
              <Image source={require('../../assets/EmiIcons/DatosDireccion.png')} style={styles.imageIcons} />
              <Text style={styles.buttonText}> Datos Dirección </Text>
              <View style={styles.iconContainer}>
                {/* <Ionicons name="chevron-expand" size={26} color="white" /> */}
                <Ionicons name="chevron-down-sharp" size={26} color="white" />
              </View>
            </View>
          </TouchableOpacity>
          <Collapsible collapsed={direccionCollapsed}>
            <Text style={styles.LabelText}>Calle</Text>
            <TextInput
              style={styles.input}
              value={calle}
              onChangeText={setCalle}
            />

            <Text style={styles.LabelText}>No. Exterior</Text>
            <TextInput
              style={styles.input}
              value={noExterior}
              onChangeText={setNoExterior}
            />

            <Text style={styles.LabelText}>No. Interior</Text>
            <TextInput
              style={styles.input}
              value={noInterior}
              onChangeText={setNoInterior}
            />

            <Text style={styles.LabelText}>Colonia</Text>
            <TextInput
              style={[styles.input, { backgroundColor: '#EEEDED' }]}
              value={colonia}
              editable={false}
              onChangeText={setColonia}
            />

            <Text style={styles.LabelText}>Código Postal</Text>
            <TextInput
              style={[styles.input, { backgroundColor: '#EEEDED' }]}
              value={codigoPostal}
              editable={false}
              onChangeText={setCodigoPostal}
              keyboardType="numeric"
            />

            <Text style={styles.LabelText}>Municipio</Text>
            <TextInput
              style={[styles.input, { backgroundColor: '#EEEDED' }]}
              value={municipio}
              editable={false}
              onChangeText={setMunicipio}
            />

            <Text style={styles.LabelText}>Estado</Text>
            <TextInput
              style={[styles.input, { backgroundColor: '#EEEDED' }]}
              editable={false}
              value={estado}
              onChangeText={setEstado}
            />

            <Text style={styles.LabelText}>Ciudad</Text>
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
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
              <Image source={require('../../assets/EmiIcons/DatosVehiculo.png')} style={styles.imageIcons} />
              <Text style={styles.buttonText}>Datos de Vehículo</Text>
              <View style={styles.iconContainer}>
                {/* <Ionicons name="chevron-expand" size={26} color="white" /> */}
                <Ionicons name="chevron-down-sharp" size={26} color="white" />
              </View>
            </View>
          </TouchableOpacity>

          <Collapsible collapsed={vehiculoCollapsed}>

            <Text style={styles.LabelText}>Número de Crédito</Text>
            <TextInput
              value={numCredito}
              onChangeText={setNumCredito}
              // disabled={!IsNumCredito}
              style={[styles.input, !IsNumCredito && styles.hiddenInput]}
            />

            <Text style={styles.LabelText}>Número de Serie</Text>
            <TextInput
              style={styles.input}
              value={numSerie}
              onChangeText={setNumSerie}
            />

            <Text style={styles.LabelText}>Número de Motor</Text>
            <TextInput
              style={styles.input}
              value={numMotor}
              onChangeText={setNumMotor}
            />

            <Text style={styles.LabelText}>Placas</Text>
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
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
              <Image source={require('../../assets/EmiIcons/DatosPoliza.png')} style={styles.imageIcons} />
              <Text style={styles.buttonText}>Datos de Póliza</Text>
              <View style={styles.iconContainer}>
                {/* <Ionicons name="chevron-expand" size={26} color="white" /> */}
                <Ionicons name="chevron-down-sharp" size={26} color="white" />
              </View>
            </View>
          </TouchableOpacity>
          <Collapsible collapsed={DPCollapsed}>

            <View style={{ marginBottom: 10 }}>

              <View style={{ flexDirection: 'row', }}>
                <View style={{ marginBottom: 10, marginTop: 10, width: '55%', }}>
                  <Text style={styles.LabelText}>Vigencia Desde:</Text>
                </View>
                <View style={{
                  marginTop: 20,
                  width: '45%',
                  alignItems: 'right',
                }}>
                  <Text >Fecha: {TextDateVP}</Text>
                </View>
              </View>

              <View style={{
                flexDirection: 'row',
                marginRight: '12',
              }}>

                <View style={{ marginBottom: 10, marginTop: 10, width: '75%' }}>
                  <Text style={styles.LabelText} >Cambiar Fecha: </Text>
                </View>
                <View style={{ marginBottom: 10, marginTop: 10, width: '20%', marginLeft: 0 }}>
                  <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={IsChangeVigencia ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitchCV}
                    value={IsChangeVigencia}
                    disabled={isDatePickerEnabled}
                  />
                </View>
              </View>

              {showPicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={onChangeV}
                  minimumDate={minDate}
                  maximumDate={maxDate}
                  style={{ alignSelf: 'center', marginBottom: 10, marginTop: 10 }}
                />
              )}

            </View>

            <View style={{ marginBottom: 10, flexDirection: 'row' }}>
              <View style={{ marginBottom: 10, marginTop: 10, width: '75%', }}>
                <Text style={styles.LabelText}>Beneficiario Preferente</Text>
              </View>
              <View style={{ marginBottom: 10, marginTop: 10, width: '20%', marginLeft: 0 }}>
                <Switch
                  style={{ marginTop: 5, }}
                  trackColor={{ false: '#767577', true: '#81b0ff' }}
                  thumbColor={IsBP ? '#f5dd4b' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  value={IsBP}
                  disabled={true}
                />
              </View>
            </View>

            <View style={{ marginBottom: 10 }}>

              {ShowisRenovacion && (

                <View style={{ marginBottom: 10, flexDirection: 'row' }}>
                  <View style={{ marginBottom: 10, marginTop: 10, width: '75%', }}>
                    <Text style={styles.LabelText}>Renovación</Text>
                  </View>
                  <View style={{ marginBottom: 10, marginTop: 10, width: '20%', marginLeft: 0 }}>
                    <Switch
                      trackColor={{ false: '#767577', true: '#81b0ff' }}
                      thumbColor={isRenovacion ? '#f5dd4b' : '#f4f3f4'}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitchRembolso}
                      value={isRenovacion}
                    />
                  </View>

                </View>

              )}

              {showPickerFDesembolso && (
                <View>

                  <View style={{ marginBottom: 10, flexDirection: 'row' }}>
                    <View style={{ marginBottom: 10, width: '75%', }}>
                      <Text style={styles.LabelText}>Fecha de desembolso: {TextDateFD} </Text>
                    </View>
                    <View style={{ marginBottom: 8, width: '20%', marginLeft: 0 }}>
                      <Switch
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={showChangeFD ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={onChangeFDS}
                        value={showChangeFD}
                      />
                    </View>
                  </View>
                  {showChangeFDpIKER && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={dateFDesembolso}
                      mode="date"
                      is24Hour={true}
                      display="default"
                      onChange={onChangeFD}
                      style={{ alignSelf: 'center', marginBottom: 10, marginTop: 10 }}
                      pickerStyle={{ backgroundColor: 'white' }}
                    />
                  )}

                </View>
              )}

            </View>

          </Collapsible>
        </View >

        {/* Forma pago */}
        {/* display: 'none'  */}
        < View style={{ marginBottom: 10, marginTop: 5 }}>
          <TouchableOpacity onPress={togglePLCollapse} style={styles.button}>
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
              <Image source={require('../../assets/EmiIcons/FormasPago.png')} style={styles.imageIcons} />
              <Text style={styles.buttonText}>Forma de Pago</Text>
              <View style={styles.iconContainer}>
                {/* <Ionicons name="chevron-expand" size={26} color="white" /> */}
                <Ionicons name="chevron-down-sharp" size={26} color="white" />
              </View>
            </View>
          </TouchableOpacity>
          <Collapsible collapsed={PlCollapsed}>
            {!isPL && !isPR && (
              <Text style={{ marginRight: 10 }}>No se cuenta con método de pago configurado</Text>
            )}
            {isPL && (

              <View style={{ flexDirection: 'row', width: '85%', alignSelf: 'center' }}>

                <View style={{ marginBottom: 10, marginTop: 10, width: '55%', }}>
                  <Text style={styles.LabelText}>Pago en Línea</Text>
                </View>

                <View style={{ marginBottom: 10, marginTop: 10, width: '25%', marginLeft: 20 }}>
                  <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={isEnabledPL ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitchPL}
                    value={isEnabledPL}
                    disabled={!isPL}
                  />
                </View>

              </View>
            )}

            {isPR && (
              <View style={{ flexDirection: 'row', width: '85%', alignSelf: 'center' }}>

                <View style={{ marginBottom: 10, marginTop: 10, width: '75%', }}>
                  <Text style={styles.LabelText}>Pago Referenciado</Text>
                </View>

                <View style={{ marginBottom: 10, marginTop: 10, width: '25%', marginLeft: 10 }}>
                  <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={isEnabledPR ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitchPR}
                    value={isEnabledPR}
                    disabled={!isPR}
                  />
                </View>
              </View>
            )}

            {isEnabledPL && (

              <View>
                <Text style={styles.LabelText}>Nombre Tarjetahabiente</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Nombre del Tarjetahabiente"
                  value={nombreTarjetahabiente}
                  onChangeText={text => setNombreTarjetahabiente(text)}
                />

                <Text style={styles.LabelText}>Banco Emisor</Text>

                <RNPickerSelect
                  onValueChange={(itemValue) => setselectedBancoEmisor(itemValue)}
                  items={BancosEmisores.map((be) => ({
                    label: be.Valor,
                    value: be.Id,
                  }))}
                  style={pickerSelectStyles}
                  value={selectedBancoEmisor}
                  placeholder={{}}
                />

                <Text style={styles.LabelText}>Método de Pago</Text>

                <RNPickerSelect
                  onValueChange={(itemValue) => setselectedMetodosPagos(itemValue)}
                  items={MetodosPagos.map((mp) => ({
                    label: mp.Valor,
                    value: mp.Id,
                  }))}
                  style={pickerSelectStyles}
                  placeholder={{}}
                  value={selectedMetodosPagos}
                />

                <Text style={styles.LabelText}>Cuenta Clabe/No. Tarjeta</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Cuenta Clabe/No. Tarjeta"
                  value={cuentaClabeNoTarjeta}
                  onChangeText={text => setCuentaClabeNoTarjeta(text)}
                />
                <Text style={styles.LabelText}>Fecha de Expiración (MM/YY)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="MM/YY"
                  value={fechaExpiracion}
                  onChangeText={text => formatFechaExpiracion(text)}
                  keyboardType="numeric"
                  maxLength={5}
                />
                <Text style={styles.LabelText}>CVV Protegido de 3 Dígitos</Text>
                <TextInput
                  style={styles.input}
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
      {loadingEmision && (
        <LoadingComponent />
      )}
    </View >
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
    textAlign: 'center',
  },
  input: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    borderRadius: 12,
    alignSelf: 'center'
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
  pickerContainerNew: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    alignSelf: 'center',
    width: '85%',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  imageContain: {
    alignItems: 'center',
  },
  imageCober: {
    width: 100,
    height: 100,
  },
  textContainer: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10
  },
  description: {
    fontSize: 12,
    marginBottom: 4,
    color: '#002F89'
  },
  boldText: {
    fontWeight: 'bold',
    color: '#002F89'
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
    display: 'none',
  },
  icon: {
    marginLeft: 30,
  },
  iconContainer: {
    marginLeft: 'auto',
  },
  imageIcons: {
    width: 30,
    height: 30,
    marginRight: 15,
  },
  LabelText: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 15,
    fontWeight: 'bold',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 8,
  },
});

export default EmisionScreen;
