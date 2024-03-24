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
  GetCoberturasPoliza
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

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        await fetchPolizasGpo();
        await fetchCertificadosDepTitular();
        await fetchPolizasIdividualesTitular();
        await fetchPolizasXContratanteTitular();
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
      if (response.data.Data) {
        const data = response.data.Data;
        const archivo = data[0].FSARCHIVO;
        const tipo_archivo = data[0].FSTIPO_ARCHIVO;
        const base64arc = archivo
        navigation.navigate('ViewerBase64Screen', { base64arc });
      } else {
        console.error('no se encontraron certificados');
      }
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
              {tipo_poliza === 1 ? item.FSNOMBRE_COMPLETO : item.FSALIAS}
            </Text>

          )}

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

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
        <LoadingComponent />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
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
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    paddingHorizontal: 20,
    flex: 1,
  },

  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'center',
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
    marginTop: 10,
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 5,
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

export default NewPolizas;
