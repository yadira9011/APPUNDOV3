import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  useWindowDimensions,
  Text,
  SectionList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  FlatList,
  Modal,
  Image,
  TextInput,
  Animated,
  ImageBackground,
} from 'react-native';
import { Linking } from 'expo';

import {
  GetPolizasGpoTitular,
  GetCertificadosDepTitular,
  GetPolizasIdividualesTitular,
  GetPolizasXContratanteTitular,
  GetBotonesServPoliza,
  GetCertificadoPoliza,
  GetCoberturasPoliza,
  BusquedaPolizasEnRamos,
  GenerarCodigoMail,
  GuardarPolizaAll
} from '../Api/api_polizas';

import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import LoadingComponent from '../Componentes/LoadingComponent';
// Importaciones de imágenes estáticas
import UndoAutosImage from '../../assets/Polizas/UndoAutos.png';
import UndoProteccionImage from '../../assets/Polizas/UndoProteccion.png';
import UndoVidaImage from '../../assets/Polizas/UndoVida.png';
import { imagenesAseguradoras } from '../Utilities';
import RNPickerSelect from 'react-native-picker-select';
import CustomAlert from '../Componentes/CustomAlert';

const NewPolizas = ({ route }) => {

  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
    { key: 'tercero', title: 'tercero' },
    { key: 'cuarto', title: 'cuarto' },
  ]);

  const navigation = useNavigation();
  const { DataParameter } = route.params;
  const [loading, setLoading] = useState(false);

  const [IsCollapsedPolizasGpoTitular, setIsCollapsedPolizasGpoTitular] = useState(false);
  const [PolizasGpo, setPolizasGpo] = useState([]);

  const [IsCollapsedCertificadosDepTitular, setIsCollapsedCertificadosDepTitular] = useState(false);
  const [CertificadosDepTitular, setCertificadosDepTitular] = useState([]);

  const [IsCollapsedPolizasIdividualesTitular, setIsCollapsedPolizasIdividualesTitular] = useState(false);
  const [PolizasIdividualesTitular, setPolizasIdividualesTitular] = useState([]);

  const [IsCollapsedPolizasXContratanteTitular, setIsCollapsedPolizasXContratanteTitular] = useState(false);
  const [PolizasXContratanteTitular, setPolizasXContratanteTitular] = useState([]);

  const [botonesPorPoliza, setBotonesPorPoliza] = useState([]);

  const [isModalCoberturasVisible, setModalCoberturasVisible] = useState(false);
  const [CoberturasPolizas, setCoberturasPolizas] = useState([]);

  const [IdPoliza, setIdPoliza] = useState('');
  const [rol, setRol] = useState("1"); // Valor inicial "1"
  const [numeroPoliza, setNumeroPoliza] = useState('5910029493');
  const [verificacion, setVerificacion] = useState("1")
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [isVisibleModalAP, setisVisibleModalAP] = useState(false);

  const [codigoVerificacion, setCodigoVerificacion] = useState('');
 const [isVisibleModalVERI, setisVisibleModalVERI] = useState(false);

 const [ValidationTime, setValidationTime] = useState('');

 const [selectedOptionTipoRol, setselectedOptionTipoRol] = useState(null);
 const [nombreCompleto, setNombreCompleto] = useState('');

  const [isAlertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [IconMessage, setIconMessage] = useState('Icon_Blue.png');
  const [isAlertTwo, setAlertTwo] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        await fetchPolizasGpo();
        await fetchCertificadosDepTitular();
        await fetchPolizasIdividualesTitular();
        await fetchPolizasXContratanteTitular();
        await fetchDetallePersona();
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error al obtener los datos:', error);
      }
    };
    loadData();
  }, []);

  const FirstRoute = () => (
    <View style={{ flex: 1, backgroundColor: 'white' }} >
      <Text style={styles.HeaderTxt}> INDIVIDUALES </Text>
      <AgregarPolizaButton />
      {PolizasIdividualesTitular.length > 0 ? (
        <FlatList
          data={PolizasIdividualesTitular}
          contentContainerStyle={styles.flatListContent}
          keyExtractor={item => item.FIIDPOLIZA}
          renderItem={({ item }) => renderItemPolizasGpo({ item, onPress: () => { }, tipo_poliza: 0 })}
        />
      ) : (
        <Text style={styles.noRecordsText}>No hay registros disponibles</Text>
      )}
    </View>
  );

  const SecondRoute = () => (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Text style={styles.HeaderTxt}>Polizas de grupo</Text>
      <AgregarPolizaButton />
      {PolizasGpo.length > 0 ? (
        <FlatList
          data={PolizasGpo}
          contentContainerStyle={styles.flatListContent}
          keyExtractor={(item) => item.FIIDPOLIZA}
          renderItem={({ item }) => renderItemPolizasGpo({ item, onPress: () => { } })}
        />
      ) : (
        <Text style={styles.noRecordsText}>No hay registros disponibles</Text>
      )}
    </View>
  );

  const TercerRoute = () => (
    <View style={{ flex: 1, backgroundColor: 'white' }} >
      <Text style={styles.HeaderTxt}>Dependientes</Text>
      <AgregarPolizaButton />
      {CertificadosDepTitular.length > 0 ? (
        <FlatList
          data={CertificadosDepTitular}
          contentContainerStyle={styles.flatListContent}
          keyExtractor={item => item.FSCERTIFICADO}
          renderItem={({ item }) => renderItemPolizasGpo({ item, onPress: () => { }, tipo_poliza: 1 })}
        />
      ) : (
        <Text style={styles.noRecordsText}>No hay registros disponibles</Text>
      )}
    </View>
  );

  const CuartaRoute = () => (
    <View style={{ flex: 1, backgroundColor: 'white' }} >
      <Text style={styles.HeaderTxt}>Contratantes</Text>
      <AgregarPolizaButton />
      {PolizasXContratanteTitular.length > 0 ? (
        <FlatList
          data={PolizasXContratanteTitular}
          contentContainerStyle={styles.flatListContent}
          keyExtractor={item => item.FIIDPOLIZA}
          renderItem={({ item }) => renderItemPolizasGpo({ item, onPress: () => { }, tipo_poliza: 0 })}
        />
      ) : (
        <Text style={styles.noRecordsText}>No hay registros disponibles</Text>
      )}
    </View>
  );

  const AgregarPolizaButton = () => {
    const [isVisible, setIsVisible] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current; // Animación de opacidad
    const slideAnim = useRef(new Animated.Value(-30)).current; // Animación de desplazamiento
  
    const toggleButton = () => {
      setIsVisible(!isVisible);
    };
  
    useEffect(() => {
      // Inicia la animación al cambiar la visibilidad
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: isVisible ? 1 : 0, // Controla la opacidad
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: isVisible ? 0 : -30, // Controla la posición vertical
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }, [isVisible, fadeAnim, slideAnim]);
  
    return (
      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity onPress={toggleButton} style={styles.iconButton}>
          <Ionicons name="add-circle-outline" size={50} color="#0051C4" />
        </TouchableOpacity>
        {isVisible && (
          <Animated.View // Vista animada para el botón
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
              marginTop: 10,
            }}
          >
            <TouchableOpacity onPress={handleAgregarPoliza} style={styles.buttonAP}>
              <Text style={styles.closeButtonText}>Agregar póliza</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>
    );
  };


  const renderTabBar = (props) => (
    <TabBar
      {...props}
      style={{ backgroundColor: '#0051C4' }}
      renderIcon={({ route, focused, color }) => {
        let iconName;

        switch (route.key) {
          case 'first':
            iconName = 'person';
            break;
          case 'second':
            iconName = 'business';
            //iconName = 'people';
            break;
          case 'tercero':
            iconName = 'people';
            //iconName = 'business';
            break;
          case 'cuarto':
            iconName = 'briefcase';
            break;
          default:
            iconName = 'ellipse';
        }

        return <Ionicons name={iconName} size={20} color={color} />;
      }}
      renderLabel={() => null}
    />
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    tercero: TercerRoute,
    cuarto: CuartaRoute,
  });

  const fetchBotonesServPoliza = async (idPoliza) => {
    try {
      const DataRquest = {
        idPoliza: idPoliza,
        usuario: DataParameter.email,
        contraseña: DataParameter.password,
      }
      const response = await GetBotonesServPoliza(DataRquest);
      if (response.data.Data) {
        const data = response.data.Data;
        const tiposBoton = data.map(item => item.FSTIPOBOTON);
        // console.log(data);
        return tiposBoton;
      } else {
        return [];
      }
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      return [];
    }
  };

  const fetchDetallePersona = async () => {
    try {
        const DataRquest = {
            idPersona: DataParameter.IdPersona,
            usuario: DataParameter.email,
            contraseña: DataParameter.password
        }
        const response = await GetDetallePersona(DataRquest);
        if (response.data.Data) {
            const data = response.data.Data;
            setNombreCompleto(response.data.Data.FSNOMBRE_COMPLETO);
        } else {
            console.error('La respuesta de la API no contiene personas.');
        }
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
};

  const handleFetchBotonesServPoliza = async (idPoliza) => {
    try {
      const tiposBoton = await fetchBotonesServPoliza(idPoliza);
      return tiposBoton;
    } catch (error) {
      return [];
      console.error('Error al obtener datos:', error);
    }
  };

  const fetchPolizasGpo = async () => {
    try {

      const DataRquest = {
        idPersona: DataParameter.IdPersona,
        usuario: DataParameter.email,
        contraseña: DataParameter.password,
      }

      const response = await GetPolizasGpoTitular(DataRquest);
      if (response.data.Data) {
        const data = response.data.Data;
        setPolizasGpo(data);
        console.log("ppolizassss grupooo .....", data);
        const botonesPorIdPoliza = { ...botonesPorPoliza };
        for (const poliza of data) {
          const botones = await fetchBotonesServPoliza(poliza.FIIDPOLIZA);
          botonesPorIdPoliza[poliza.FIIDPOLIZA] = botones;
        }
        setBotonesPorPoliza(prevBotones => ({ ...prevBotones, ...botonesPorIdPoliza }));
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const fetchCertificadosDepTitular = async () => {
    try {

      const DataRquest = {
        idPersona: DataParameter.IdPersona,
        usuario: DataParameter.email,
        contraseña: DataParameter.password,
      }
      const response = await GetCertificadosDepTitular(DataRquest);
      if (response.data.Data) {
        const data = response.data.Data;
        //console.log("CERTIFICADOS DEPENDIENTES ... ", data)
        setCertificadosDepTitular(data);

        const botonesPorIdPoliza = { ...botonesPorPoliza };
        for (const poliza of data) {
          const botones = await fetchBotonesServPoliza(poliza.FIIDPOLIZA);
          botonesPorIdPoliza[poliza.FIIDPOLIZA] = botones;
        }
        setBotonesPorPoliza(prevBotones => ({ ...prevBotones, ...botonesPorIdPoliza }));


        // const botonesPorIdPoliza = {};
        // for (const poliza of data) {
        //     const botones = await fetchBotonesServPoliza(poliza.FIIDPOLIZA);
        //     botonesPorIdPoliza[poliza.FIIDPOLIZA] = botones;
        // }
        // setBotonesPorPoliza(botonesPorIdPoliza);
      } else {
        console.error('no se encontraron grupos');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      setLoading(false);
    }
  };

  const fetchPolizasIdividualesTitular = async () => {
    try {

      const DataRquest = {
        idPersona: DataParameter.IdPersona,
        usuario: DataParameter.email,
        contraseña: DataParameter.password,
      }
      const response = await GetPolizasIdividualesTitular(DataRquest);
      if (response.data.Data) {
        const data = response.data.Data;
        console.log("INDIVIDUALES ....", data)
        setPolizasIdividualesTitular(data);

        const botonesPorIdPoliza = { ...botonesPorPoliza };
        for (const poliza of data) {
          const botones = await fetchBotonesServPoliza(poliza.FIIDPOLIZA);
          botonesPorIdPoliza[poliza.FIIDPOLIZA] = botones;
        }
        setBotonesPorPoliza(prevBotones => ({ ...prevBotones, ...botonesPorIdPoliza }));


        // const botonesPorIdPoliza = {};
        // for (const poliza of data) {
        //     const botones = await fetchBotonesServPoliza(poliza.FIIDPOLIZA);
        //     botonesPorIdPoliza[poliza.FIIDPOLIZA] = botones;
        // }
        // setBotonesPorPoliza(botonesPorIdPoliza);
      } else {
        console.error('no se encontraron grupos');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      setLoading(false);
    }
  };

  const fetchPolizasXContratanteTitular = async () => {
    try {
      const DataRquest = {
        idPersona: DataParameter.IdPersona,
        usuario: DataParameter.email,
        contraseña: DataParameter.password,
      }
      const response = await GetPolizasXContratanteTitular(DataRquest);
      if (response.data.Data) {
        const data = response.data.Data;
        console.log("CONTRATANTES ....", data)
        setPolizasXContratanteTitular(data);

        const botonesPorIdPoliza = { ...botonesPorPoliza };
        for (const poliza of data) {
          const botones = await fetchBotonesServPoliza(poliza.FIIDPOLIZA);
          botonesPorIdPoliza[poliza.FIIDPOLIZA] = botones;
        }
        setBotonesPorPoliza(prevBotones => ({ ...prevBotones, ...botonesPorIdPoliza }));

        // const botonesPorIdPoliza = {};
        // for (const poliza of data) {
        //     const botones = await fetchBotonesServPoliza(poliza.FIIDPOLIZA);
        //     botonesPorIdPoliza[poliza.FIIDPOLIZA] = botones;
        // }
        // setBotonesPorPoliza(botonesPorIdPoliza);

      } else {
        console.error('no se encontraron grupos');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      setLoading(false);
    }
  };

  const fetchPolizasCertificado = async (idpoliza, idasegurado) => {
    try {
      const DataRquest = {
        IdPoliza: idpoliza,
        IdAsegurado: idasegurado,
        usuario: DataParameter.email,
        Contraseña: DataParameter.password,
      }
      
      const response = await GetCertificadoPoliza(DataRquest);
      if (response.data) {
        const pdfUrl = response.data.RutaArchivo;
        if (pdfUrl.trim() !== '') {
          navigation.navigate('PDFViewerScreen', { pdfUrl });
        } else {
          console.error('La URL está vacía');
        }

      } else {
        console.error('no se encontraron certificados');
      }

      // if (response.data.Data) {
      //   const data = response.data.Data;
      //   const archivo = data[0].FSARCHIVO;
      //   const tipo_archivo = data[0].FSTIPO_ARCHIVO;
      //   const base64arc = archivo
      //   navigation.navigate('ViewerBase64Screen', { base64arc });
      // } else {
      //   console.error('no se encontraron certificados');
      // }

    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  const fetchPolizasCoberturas = async (IdPoliza) => {
    try {
      const DataRquest = {
        IdPoliza: IdPoliza,
        usuario: DataParameter.email,
        contraseña: DataParameter.password,
      }
      const response = await GetCoberturasPoliza(DataRquest);
      if (response.data.Data) {
        const data = response.data.Data;
        // FSCOBERTURA
        setCoberturasPolizas(data);
        setModalCoberturasVisible(true);
        console.log(data)
      } else {
        console.error('no se encontraron grupos');
      }
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  const renderItemPolizasGpo = ({ item, onPress, tipo_poliza = 0 }) => {

    // console.log('Item actual:', item.FSIMAGEN);
    // const imagePath = '../../assets/Polizas/' + item.FSIMAGEN;
    // console.log('RUTAAAA :', imagePath);

    console.log('RUTAAAA :', item.LogoAseguradora);

    return (
      <ImageBackground
        style={styles.itemContainer}
        source={require('../../assets/Polizas/background.png')}
        imageStyle={styles.backgroundImage} >
        <View style={styles.itemDetailsUnO}>
          {/* FSIMAGEN
      LogoAseguradora FSNUM_ATENCION */}

          {item.FSIMAGEN === 'UndoProteccion.png' ? (
            <Image source={UndoProteccionImage} style={styles.ImgHeader} />
          ) : item.FSIMAGEN === 'UndoVida.png' ? (
            <Image source={UndoVidaImage} style={styles.ImgHeader} />
          ) : (
            <Image source={UndoAutosImage} style={styles.ImgHeader} />
          )}

          <Text style={styles.descriptionTitle}>{item.FSCERTIFICADO}</Text>

          {item.LogoAseguradora ? (
            <Image
              source={imagenesAseguradoras[item.LogoAseguradora]}
              style={{
                width: 80,
                height: 80,
                marginTop: 10,
                marginBottom: 10,
                alignSelf: 'center'
              }}
            />
          ) : (

            <Text style={styles.boldBlackTextAse}>
              {item.FSALIAS}
            </Text>

          )}

          <Text style={styles.boldBlackTextAse}>
            {tipo_poliza == 1 ? item.FSNOMBRE_COMPLETO : item.FSALIAS}
          </Text>

          <Text style={styles.description}><Text style={styles.boldBlackText}>Inicio vigencia: </Text>{item.FDINICIO_VIGENCIA}</Text>
          <Text style={styles.description}><Text style={styles.boldBlackText}>Fin vigencia: </Text>{item.FDFIN_VIGENCIA}</Text>
          <Text style={styles.description}><Text style={styles.boldBlackText}>Producto: </Text> {item.FSPRODUCTO}</Text>
          <Text style={styles.description}><Text style={styles.boldBlackText}>Estatus: </Text>{item.FSESTATUS}</Text>
          <View style={styles.buttonContainer}>
            {botonesPorPoliza[item.FIIDPOLIZA] !== undefined &&
              botonesPorPoliza[item.FIIDPOLIZA].map((boton, index) => (
                <TouchableOpacity key={index} onPress={() => handleBotonPress(boton, item.FIIDPOLIZA, item.FIIDASEGURADO)}>
                  {/* <Ionicons
                  name={boton === 'Cer' ? 'ios-document' : 'ios-information-circle'}
                  size={30}
                  color="black"
                /> */}
                  <Image
                    source={boton === 'Cer' ? require('../../assets/Polizas/IconPoliza.png') : require('../../assets/Polizas/IconInfo.png')}
                    style={{ width: 35, height: 35 }}
                  />
                </TouchableOpacity>
              ))
            }
          </View>

          <TouchableOpacity onPress={() => handleCall(item.FSNUM_ATENCION)}>
            <View style={styles.ConteinerAtencion}>
              <Image
                source={require('../../assets/Polizas/call_button.png')}
                style={{
                  width: 35,
                  height: 35,
                  marginTop: -8,
                  resizeMode: 'contain'
                }}
              />
              <Text style={styles.descriptionwhite}>
                <Text style={styles.boldWhiteText}>Atención: </Text>{item.FSNUM_ATENCION}
              </Text>
            </View>
          </TouchableOpacity>

          {/* 
          <View style={styles.ConteinerAtencion}>
            <Image
              source={require('../../assets/Polizas/call_button.png')}
              style={{
                width: 35,
                height: 35,
                marginTop: -8,
                resizeMode: 'contain'
              }}
            />
            <Text style={styles.descriptionwhite}><Text style={styles.boldWhiteText}>Atención: </Text>{item.FSNUM_ATENCION}</Text>
          </View> */}

        </View>
      </ImageBackground >
    );
  }

  const handleBotonPress = async (tipoBoton, idpoliza, idasegurado) => {
    if (tipoBoton === 'Cer') {
      await fetchPolizasCertificado(idpoliza, idasegurado)
    } else {
      await fetchPolizasCoberturas(idpoliza)
    }
  };

  const handleCloseModal = () => {
    setCoberturasPolizas([]);
    setModalCoberturasVisible(false);
  };

  const handleCall = async (phoneNumber) => {
    const fon = '2781152721'
    // const url = `tel:${fon}`;
    const url = `tel:${fon}`;
    //await Linking.openURL(url);
    // Linking.canOpenURL(url).then((supported) => {
    //   if (supported) {
    //     Linking.openURL(url);
    //   } else {
    //     console.log(`No se puede realizar una llamada al número ${phoneNumber}`);
    //   }
    // });
  };

  const handleAgregarPoliza = async () => {
    setisVisibleModalAP(true);
  };

  const onClose = async () => {
    setisVisibleModalAP(false);
  };

  const hideAlert = () => {
    setAlertVisible(false);
  };

  const handleEnviarPoliza = async () => {
    try {
      const valorSeleccionado = parseInt(rol, 10);
      const verificacion = parseInt(verificacion, 10);
  
      const DataRquest = {
        idRamo: valorSeleccionado,
        idPersona: DataParameter.IdPersona,
        numeropoliza: numeroPoliza,
        usuario: DataParameter.email,
        contraseña: DataParameter.password,
      };
  
      console.log("Datos de solicitud:", DataRquest);
  
      const response = await BusquedaPolizasEnRamos(DataRquest);
      console.log("Respuesta:", response.data.Data);
  
      if (response.data.Data) {
        setIdPoliza(response.data.Data.FIIDPOLIZA);
        console.log("El ID de la póliza es: " + response.data.Data.FIIDPOLIZA);
        setisVisibleModalAP(false);
        setisVisibleModalVERI(true);
        verificarOpcion();
      } else {
        setAlertMessage('No se localizó la póliza ingresada en el ramo seleccionado');
        setAlertVisible(true);
      }
    } catch (error) {
      console.error("Error al enviar la póliza:", error);
      setAlertMessage('Ocurrió un error al procesar la solicitud. Inténtalo de nuevo más tarde.');
      setAlertVisible(true);
    }
  };
  
  const verificarOpcion = () => {

    const vverificacion= parseInt(verificacion, 10);
    if (vverificacion === 1) {
      verificarMail();
    } else if (vverificacion === 2) {
    }
  };

  const verificarMail = async () => {
   
    const objVerificacion = {
        email: DataParameter.email,
        telefono:telefono,
        idPersona:DataParameter.IdPersona,
        codeMail:0,
        expirationMail:new Date(),
        codeCel:0,
        expirationCel:new Date(),
        nombreUsuario:nombreCompleto,
        usuario: DataParameter.email,
        contraseña: DataParameter.password,
     };

    console.log("PARA ENVIO CODIFO VERIFI..",objVerificacion)
    const result = await GenerarCodigoMail(objVerificacion);
    console.log(result)
    if (!result.data.HasError) {
        const miliseconds = result.data.Data.expirationMail != null ? parseInt(result.data.Data.expirationMail.replace(/\/Date\((.*?)\)\//, '$1'), 10) : '';
        const fecha = miliseconds == '' ? '' : new Date(miliseconds);
        ValidationTime = fecha;
        codigoVerificacion= objVerificacion.codeMail = result.data.Data.codeMail;
        setAlertMessage("Se envió a su correo el código de verificación.");
        setAlertVisible(true);
    }

  };
  
  const handleGuardarPoliza = async () => {

    const valorSeleccionado = parseInt(rol, 10);
    const IdPoliza = IdPoliza;

    const DataRquest = {
      idRamo: valorSeleccionado,
      IdPoliza: IdPoliza,
      usuario: DataParameter.email,
      contraseña: DataParameter.password,
    }

    const result = await GuardarPolizaAll(DataRquest);
    console.log(result);
    if (!result.hasError) {
        msj = result.data
        setAlertMessage(msj);
        setAlertVisible(true);
        setisVisibleModalAP(false);
        setisVisibleModalVERI(false);
    }

  };


const validateCode = async () => {
  const now = new Date();
  const expiration = new Date(ValidationTime);
  
  if (code !== codigoVerificacion) {
    setAlertMessage('Código incorrecto.');
    setAlertVisible(true);
    return;
  }
  
  if (now.getTime() > expiration.getTime()) {
    setAlertMessage('Código expirado');
    setAlertVisible(true);
    return;
  } else {
    // Agregar póliza
    await handleGuardarPoliza();
    //alert('Se ha verificado correctamente');
  }
  
};


  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
        <LoadingComponent />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>

      {/* MODAL COBERTURAS */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalCoberturasVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.description}>DESCRIPCIÓN COBERTURAS</Text>
            {/* <Image source={TxtUrlconAse} style={styles.imageCober} /> */}
            <FlatList
              data={CoberturasPolizas}
              keyExtractor={(item, index) => index.toString()}
              style={styles.list}
              contentContainerStyle={styles.flatListContent}
              renderItem={({ item }) => (
                <View style={styles.row} key={item.FIIDCOBERTURA}>
                  <View style={[styles.column, styles.borderRight]}>
                    <Text style={styles.dataText}>{item.FSCOBERTURA}</Text>
                  </View>
                </View>
              )}
            />
            <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    {/* MODAL AGREGAR POLIZA */}
    <Modal visible={isVisibleModalAP} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          
          <Text style={styles.descriptiontwo}>Agregar Póliza</Text>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Producto</Text>
            <RNPickerSelect
              onValueChange={(itemValue) => setRol(itemValue)} 
              items={[
                { label: "Autos", value: "1" },
                { label: "Casa Habitación", value: "2" },
                { label: "Empaquetados", value: "3" },
                { label: "Agropecuario", value: "4" },
              ]}
              value={rol} 
              placeholder={{}}
              style={pickerSelectStyles}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.labelY}>Número póliza</Text>
            <View style={{
              flexDirection: 'row',
              marginBottom: 15,
              alignItems: 'center',
              borderColor: 'gray',
              borderWidth: 1,
              marginLeft: 20,
              width: '90%',
              marginRight: 8,
              marginTop: 10,
              borderRadius: 10,
              padding: 8
            }}>
            <TextInput
              style={styles.inputxx}
              placeholder="Ingrese el número de póliza"
              value={numeroPoliza}
              onChangeText={setNumeroPoliza} 
            />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Verificación</Text>
            <RNPickerSelect
              onValueChange={(itemValue) => setVerificacion(itemValue)}
              items={[
                { label: "Correo", value: "1" },
                { label: "Teléfono", value: "2" },
              ]}
              value={verificacion} 
              style={pickerSelectStyles}
              placeholder={{ label: "Selecciona un método de verificación", value: null }}
            />
          </View>

          {/* {verificacion === '2' ? (
            <View style={styles.formGroup}>
              <Text style={styles.label}>Número de teléfono</Text>
           
            <View style={{
              flexDirection: 'row',
              marginBottom: 15,
              alignItems: 'center',
              borderColor: 'gray',
              borderWidth: 1,
              marginLeft: 20,
              width: '100%',
              marginRight: 8,
              marginTop: 10,
              borderRadius: 10,
              padding: 8
            }}>
            <TextInput
              style={styles.inputxx}
              placeholder="Ingrese el teléfono"
              value={telefono}
              onChangeText={setTelefono} 
            />
            </View>

            </View>
          ) : (
            <View style={styles.formGroup}>
              <Text style={styles.label}>Correo</Text>
           

             <View style={{
              flexDirection: 'row',
              marginBottom: 15,
              alignItems: 'center',
              borderColor: 'gray',
              borderWidth: 1,
              marginLeft: 20,
              width: '90%',
              marginRight: 8,
              marginTop: 10,
              borderRadius: 10,
              padding: 8
            }}>
            <TextInput
              style={styles.inputxx}
              placeholder="Ingrese el correo"
              value={correo}
              onChangeText={setCorreo} 
            />
            </View>
        
            </View>
          )} */}

          {/* Contenedor de botones alineados */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleEnviarPoliza} >
              <Text style={styles.buttonText}>Agregar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.buttonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </Modal>


    {/* MODAL VERIFICA POLIZA */}
      <Modal visible={isVisibleModalVERI} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>

            <Text style={styles.modalText}>Verificación</Text>
            <Text style={styles.label}>La póliza ha sido validada.</Text>
            <Text style={styles.label}>Ingresa el código recibido por correo/mensaje de texto.</Text>

            <TextInput
              style={styles.input}
              placeholder="Ingresa el código"
              value={codigoVerificacion}
              onChangeText={setCodigoVerificacion}
            />

            
              {/* Contenedor de botones alineados */}
            <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={validateCode} >
              <Text style={styles.buttonText}>VERIFICAR</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.closeButton} onPress={() => setisVisibleModalVERI(false)}>
              <Text style={styles.buttonText}>CERRAR</Text>
            </TouchableOpacity>
          </View>

          </View>
        </View>
      </Modal>

      {/* <TouchableOpacity onPress={handleAgregarPoliza} style={styles.buttonAP}>
              <Text style={styles.closeButtonText}>Agregar poliza</Text>
      </TouchableOpacity> */}

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}/>

      {isAlertVisible && (
        <CustomAlert
          visible={isAlertVisible}
          message={alertMessage}
          iconName={IconMessage}
          onClose={hideAlert}
          AlertTwo={isAlertTwo}
        />
      )}   

    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    paddingHorizontal: 20,
    flex: 1,
  },
  formGroup: {
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row', // Distribuye los botones en fila
    justifyContent: 'space-between', // Espacio entre los botones
    alignItems: 'center', // Alinea los botones en el centro verticalmente
    marginTop: 20, // Separación superior
  },

  button: {
    backgroundColor: '#007BFF', // Color de fondo del botón
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10, // Margen entre los botones
    alignItems: 'center',
  },

  buttonAP: {
    backgroundColor: '#007BFF', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '60%',
    marginHorizontal: 10,
    alignItems: 'center',
    alignSelf:'center',
    marginTop:10,
    marginBottom:10
  },

  label: {
    marginTop: 10,
    marginLeft: 0,
    marginRight: 15,
    alignItems: 'right',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 10,

  },


  labelY: {
    marginTop: 10,
    marginLeft: 35,
    marginRight: 15,
    alignItems: 'right',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 10,

  },

  inputxx: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 14,
    color: 'blue',
  },

  itemContainer: {
    marginBottom: 16,
    borderRadius: 8,
    width: '85%',
    marginLeft: 30,
    borderWidth: 4,
    borderColor: '#1c7dff',
    justifyContent: 'center',
  },

  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 8,
  },
  item: {
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#f9c2ff',
  },
  itemDetailsUnO: {
    flexDirection: 'column',
    marginRight: 0,

  },
  flatListContent: {
    flexGrow: 1,
  },

  selectedItemContainer: {
    backgroundColor: '#f0ebeb',
    padding: 10,
    marginVertical: 20,
    borderRadius: 5,
  },
 
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  purpleButton: {
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  imageCober: {
    width: 120,
    height: 120,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  descriptiontwo: {
    fontSize: 20, // Tamaño de fuente más grande
    fontWeight: 'bold', // Negrita para resaltar
    color: '#007BFF', // Color destacado (azul)
    textAlign: 'center', // Centra el texto
    marginBottom: 20, // Espaciado inferior
    textTransform: 'uppercase', // Convierte el texto a mayúsculas
    letterSpacing: 1.5, // Espaciado entre letras para un toque más moderno
    shadowColor: '#000', // Sombra suave para destacar el texto
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5, // Sombra en Android
  },

  description: {
    marginTop: 4,
    color: '#091496',
    textAlign: 'center',
  },

  descriptionwhite: {
    marginTop: 4,
    color: 'white',
    textAlign: 'center',
    marginLeft: 10,
    fontSize: 10
  },

  boldBlackText: {
    fontWeight: 'bold',
    color: '#091496',
  },
  boldWhiteText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 10
  },
  boldBlackTextAse: {
    fontWeight: 'bold',
    color: 'gray',
    fontSize: 14,
    textAlign: 'center',
  },
  descriptionTitle: {
    marginTop: 4,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  errorText: {
    color: 'red',
  },
  row: {
    flexDirection: 'row',
    fontSize: 12,
    marginVertical: 0,
  },
  column: {
    flex: 1,
    alignItems: 'center',
  },
  dataText: {
    fontSize: 12,
    textAlign: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  closeButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1, // Toma espacio disponible
    marginHorizontal: 10, // Margen entre los botones
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    maxHeight: '100%',
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
  list: {
    width: '100%',
    marginBottom: 10,
    marginTop: 15,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f2f2f2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'left',
  },

  borderRight: {
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderRightColor: '#ccc',
  },

  borderLeft: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 5,
  },

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  noRecordsText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 10,
  },

  HeaderTxt: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },

  ImgHeader: {
    marginTop: 10,
    width: 100,
    height: 100,
    alignSelf: 'center'
  },

  ConteinerAtencion: {
    flexDirection: 'row',
    backgroundColor: '#091496',
    color: 'white',
    borderRadius: 10,
    width: '95%',
    height: 30,
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 10
  },

});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 20,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#D1D1D1',
    borderRadius: 10,
    color: '#333', // Texto oscuro
    backgroundColor: '#F9F9F9', // Fondo claro
    paddingRight: 30, // Para el ícono de dropdown
    shadowColor: '#000', // Sombra suave
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2, // Sombra en Android
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#D1D1D1',
    borderRadius: 10,
    color: '#333',
    backgroundColor: '#F9F9F9',
    paddingRight: 200,
    width: '100%',
  },
  iconContainer: {
    top: 15,
    right: 12, 
    width: '100%',// Posiciona el ícono a la derecha
  },
  placeholder: {
    color: '#888', // Color del placeholder
  },
};

export default NewPolizas;
