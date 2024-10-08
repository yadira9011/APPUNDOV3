import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    TextInput,
    Image,
    Modal,
    Alert,
    Switch
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { GetCoberturasCotizacion, EnvioCotizacion, GetPrivilegios } from '../Api/api';
import { useNavigation } from '@react-navigation/native';
import modalStyles from '../Styles/ModalStyles';
import { IconsAlerts } from '../Utilities';
import LoadingComponent from '../Componentes/LoadingComponent';

const ResultadoCotizacionScreen = () => {

    const route = useRoute();
    const navigation = useNavigation();
    const { dataArray } = route.params;
    const [folioCotizacion, setFolioCotizacion] = useState(null);
    const [CotizacionData, setCotizacionData] = useState([]);
    const [CoberturasCotizacion, setCoberturasCotizacion] = useState([]);
    const [TxtPqtCobertura, setTxtPqtCobertura] = useState(null);
    const [TxtUrlconAse, setTxtUrlconAse] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalEnvioCotiVisible, setModalEnvioCotiVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [sendAll, setSendAll] = useState(false);
    const [IdCotiSeleccionada, setIdCotiSeleccionada] = useState('');
    const [DETALLETS_COT_BTN, setDETALLETS_COT_BTN] = useState(false);
    const [ENVIAR_COT_BTN, setENVIAR_COT_BTNN] = useState(false);
    const [loading, setLoading] = useState(false);

    const imagePaths = [
        { name: 'LogoChubb', path: require('../../assets/Aseguradoras/LogoChubb.png') },
        { name: 'LogoGnp', path: require('../../assets/Aseguradoras/LogoGnp.gif') },
        { name: 'LogoGS', path: require('../../assets/Aseguradoras/LogoGS.png') },
        { name: 'LogoHdi', path: require('../../assets/Aseguradoras/LogoHdi.png') },
        { name: 'LogoProagro', path: require('../../assets/Aseguradoras/LogoProagro.png') },
        { name: 'LogoQualitas', path: require('../../assets/Aseguradoras/LogoQualitas.jpg') },
        { name: 'LogoSura', path: require('../../assets/Aseguradoras/LogoSura.png') },
        { name: 'LogoAna', path: require('../../assets/Aseguradoras/LogoAna.png') },
        { name: 'LogoProagro', path: require('../../assets/Aseguradoras/LogoProagro.png') },
        { name: 'LogoHir', path: require('../../assets/Aseguradoras/LogoHir.png') },
        { name: 'LogoDentegra', path: require('../../assets/Aseguradoras/LogoDentegra.png') }
    ];

    useEffect(() => {

        const loadData = async () => {
            try {
                await fetchPrivilegios();
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };

        loadData();

        if (dataArray.DataResul.length > 0) {
            const primerElemento = dataArray.DataResul[0].Folio;
            setFolioCotizacion(primerElemento.Folio);
            const newArray = dataArray.DataResul.map(item => {
                let data = null;

                const logoase = item.LogoAseguradora;
                const logoNameWithoutExtension = logoase.split('.')[0];
                const ImagePath = imagePaths.find(image => image.name === logoNameWithoutExtension);
                console.log(logoase)
                console.log(logoNameWithoutExtension)
                console.log(ImagePath)

                data = {
                    id: item.IDCotizacion,
                    Paquete: item.Paquete,
                    TipoPoliza: item.TipoPoliza,
                    FormaPago: item.FormaPago,
                    Indenmizacion: item.Indenmizacion,
                    Deducibles: "DM" + item.DeducibleDM + " RT" + item.DeducibleRT,
                    Vigencia: item.Vigencia,
                    DerechosPoliza: item.DerechosPoliza,
                    PrimaTotal: item.PrimaTotal,
                    HasError: item.HasError,
                    Message: item.Message,
                    imageUrl: ImagePath.path,
                    IdClaveAgente: item.IdClaveAgente
                };
                return data;
            });
            setCotizacionData(newArray);
        }

    }, [dataArray]);

    const renderItem = ({ item, onPress }) => {
        const primaTotalFormateada = item.PrimaTotal.toLocaleString('es-ES', {
            style: 'currency',
            currency: 'MXN',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

        return (
            <View style={styles.itemContainer}>
                <View style={styles.itemDetailsUnO}>
                    <Image source={item.imageUrl} style={styles.image} />
                    <View style={styles.itemDetailPrima}>
                        <Text style={styles.titlePrima}>Prima Total :</Text>
                        <Text style={styles.title}>{primaTotalFormateada}</Text>
                        <View style={styles.itemDetailsDos}>

                            {!DETALLETS_COT_BTN && (
                                <TouchableOpacity style={styles.iconContainer} onPress={() => handleCoberturas(item)}>
                                    <Ionicons name="information-circle" size={30} color="black" />
                                </TouchableOpacity>
                            )}

                            {!ENVIAR_COT_BTN && (
                                <TouchableOpacity style={styles.iconContainer} onPress={() => handleShowModalEC(item)}>
                                    <Ionicons name="mail" size={30} color="black" />
                                </TouchableOpacity>
                            )}

                        </View>
                    </View>
                </View>
                {item.HasError ? (
                    <Text style={styles.errorText}>{item.Message}</Text>
                ) : (
                    <View style={styles.itemDetails}>
                        <Text style={styles.description}>Paquete: {item.Paquete}</Text>
                        <Text style={styles.description}>Tipo de Póliza: {item.TipoPoliza}</Text>
                        {/* <Text style={styles.description}>Forma de Pago: {item.FormaPago}</Text> */}
                        {/* <Text style={styles.description}>Indemnización: {item.Indenmizacion}</Text> */}
                        {/* <Text style={styles.description}>Deducibles: {item.Deducibles}</Text> */}
                        <Text style={styles.description}>Vigencia: {item.Vigencia}</Text>
                        {/* <Text style={styles.description}>Derechos de Póliza: {item.DerechosPoliza}</Text> */}
                        <TouchableOpacity style={styles.buttonContratar} onPress={() => handleEmitir(item)}>
                            <Text style={styles.buttonText}>Contratar</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        );
    };

    const handleCoberturas = async (item) => {

        try {
            const DataRquest = {
                usuario: dataArray.CotiData.usuario,
                contraseña: dataArray.CotiData.contraseña,
                IDCotizacion: item.id,
                CorreoEnvio: 0,
                COTIZACIONESAUTOS_ID: 0
            }
            console.log("Datos cotizacion coberturas", DataRquest);
            const response = await GetCoberturasCotizacion(DataRquest);
            if (response.data.Data) {
                if (response.data.Data.length > 0) {
                    setCoberturasCotizacion(response.data.Data);
                    setTxtPqtCobertura(item.Paquete);
                    setTxtUrlconAse(item.imageUrl);
                    setModalVisible(!isModalVisible);
                } else {
                    Alert.alert('Error', 'No se pudo obtener la lista de coberturas');
                }
            } else {
                Alert.alert('Error', 'No se encontraron coberturas');
            }

        } catch (error) {
            Alert.alert('Error', 'error al obtener los datos' + error);
        }

    };

    const handleCloseModal = () => {
        setCoberturasCotizacion([]);
        setTxtPqtCobertura(null);
        setEmail(null);
        setIdCotiSeleccionada(null);
        setSendAll(false);
        setModalVisible(false);
        setModalEnvioCotiVisible(false);
    };

    const handleItemClick = (item) => {
        console.log('Elemento clickeado:', item);
    };

    const renderHeader = () => (
        <View style={styles.header}>
            <View style={styles.column}>
                <Text style={styles.headerText}>Descripción</Text>
            </View>
            <View style={styles.column}>
                <Text style={styles.headerText}>Detalle</Text>
            </View>
        </View>
    );

    const handleEnviarClick = async () => {
        try {
            console.log(IdCotiSeleccionada);
            setLoading(true);
            setModalEnvioCotiVisible(false);
            const DataSolicitud = {
                IDCotizacion: IdCotiSeleccionada,
                CorreoEnvio: email,
                COTIZACIONESAUTOS_ID: 0,
                SeleccionaTodas: sendAll,
                DescripcionVehiculo: dataArray.DataTitulos.DescripcionVehiculo,
                Modelo: dataArray.DataTitulos.Modelo,
                TipoAut: dataArray.DataTitulos.TipoAut,
                Marca: dataArray.DataTitulos.Marca,
                EstatusVehiculo: dataArray.DataTitulos.EstatusVehiculo,
                TipoUso: dataArray.DataTitulos.TipoUso,
                SumaAsegurada: dataArray.CotiData.SumaAsegurada,
                tipoPaquete: dataArray.DataTitulos.tipoPaquete,
                tipoPoliza: dataArray.DataTitulos.tipoPoliza,
                tipoVigenciaPago: dataArray.DataTitulos.tipoVigenciaPago,
            }
            const DataRquest = {
                usuario: dataArray.CotiData.usuario,
                contraseña: dataArray.CotiData.contraseña,
                DataSolicitud: DataSolicitud
            }
            console.log("Datos envio correo", DataRquest);
            const response = await EnvioCotizacion(DataRquest);
            if (response.data.Data.HasError == false) {
                console.log(response.data.Data);
                setLoading(false);
                Alert.alert('INFO', 'El envío de la cotización se realizo con exito');
                setModalEnvioCotiVisible(false);
            } else {
                setLoading(false);
                setModalEnvioCotiVisible(true);
                Alert.alert('Error', 'No se envio el correo' + response.data.Data.Message);
            }

        } catch (error) {
            setLoading(false);
            Alert.alert('Error', 'error al obtener los datos' + error);
        }
    };

    const handleShowModalEC = (item) => {
        setEmail(null);
        setIdCotiSeleccionada(item.id);
        setModalEnvioCotiVisible(true);
    };

    const handleEmitir = (item) => {
        // console.log(dataArray);
        const dataArrayEmi = {
            DataItemSelect: item,
            DataResul: dataArray.DataResul,
            CotiData: dataArray.CotiData,
            DataTitulos: dataArray.DataTitulos,
            DataParameter: dataArray.DataParameter,
        }

        navigation.navigate('Emision', { dataArrayEmi });
    };

    const fetchPrivilegios = async () => {
        try {

            const DataRquest = {
                idUsuario: dataArray.DataParameter.IdUsr,
                rutaControlador: '/Autos/CotizadorAutos',
                usuario: dataArray.DataParameter.usuario,
                contraseña: dataArray.DataParameter.contraseña,
            }
            const response = await GetPrivilegios(DataRquest);
            if (response.data.HasError == false) {
                const parsedData = response.data.Data;
                setDETALLETS_COT_BTN(parsedData[3].FIOCULTAR === 1 ? true : false)
                setENVIAR_COT_BTNN(parsedData[4].FIOCULTAR === 1 ? true : false)
            } else {
                console.error('La respuesta no contiene datos.');
            }
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    };

    // if (loading) {
    //     return (
    //       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
    //         <LoadingComponent />
    //       </View>
    //     );
    // }

    return (


        <View style={styles.container}>

            <Text>{folioCotizacion}</Text>
            <FlatList
                data={CotizacionData}
                keyExtractor={item => item.id}
                renderItem={({ item }) => renderItem({ item, onPress: handleItemClick })}
            />

            {loading && (
                    <LoadingComponent />
             )}
                        
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={modalStyles.iconContainer}>
                            <Image
                                source={IconsAlerts['Icon_Blue.png']}
                                style={modalStyles.iconImage}
                            />
                        </View>
                        <Text style={styles.description}>DETALLE COBERTURAS</Text>
                        <Image source={TxtUrlconAse} style={styles.imageCober} />
                        <Text style={styles.description}>PAQUETE: {TxtPqtCobertura}</Text>
                        <FlatList
                            data={CoberturasCotizacion}
                            keyExtractor={(item, index) => index.toString()}
                            style={styles.list}
                            contentContainerStyle={styles.flatListContent}
                            ListHeaderComponent={renderHeader}
                            renderItem={({ item }) => (
                                <View style={styles.row} key={item.sumaAsegurada}>
                                    <View style={[styles.column, styles.borderRight, { alignItems: 'flex-start' }]}>
                                        <Text style={styles.dataText}>{item.descripcion}</Text>
                                    </View>
                                    <View style={[styles.column, styles.borderLeft, { alignItems: 'flex-end' }]}>
                                        {/* <Text style={styles.dataText}>{item.sumaAsegurada}</Text> */}
                                        {/* <Text style={styles.dataText}>{(item.sumaAsegurada === 0 || isNaN(item.sumaAsegurada)) ? "" : item.sumaAsegurada}</Text> */}
                                        <Text style={styles.dataText}>
                                            {(item.sumaAsegurada === 0 || isNaN(item.sumaAsegurada))
                                                ? ""
                                                : item.sumaAsegurada.toLocaleString('es-MX', {
                                                    style: 'currency',
                                                    currency: 'MXN'
                                                })
                                            }
                                        </Text>
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

            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalEnvioCotiVisible}>
                <View style={modalStyles.modalContainer}>
                    <View style={modalStyles.modalContent}>
                        <View style={modalStyles.iconContainer}>
                            <Image
                                source={IconsAlerts['Icon_Blue.png']}
                                style={modalStyles.iconImage}
                            />
                        </View>
                        <Text style={modalStyles.description}>Enviar Cotización</Text>
                        <TextInput
                            style={modalStyles.input}
                            placeholder="Correo Electrónico"
                            value={email}
                            onChangeText={setEmail}
                        />
                        <View style={styles.switchContainer}>
                            <Text>Enviar Todas</Text>
                            <Switch
                                value={sendAll}
                                onValueChange={value => setSendAll(value)}
                            />
                        </View>
                        <View style={modalStyles.buttonContainer}>
                            <TouchableOpacity onPress={handleEnviarClick} style={modalStyles.saveButton}>
                                <Text style={modalStyles.buttonText}>Enviar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleCloseModal} style={modalStyles.cancelButton}>
                                <Text style={modalStyles.buttonText}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    itemContainer: {
        marginBottom: 16,
        backgroundColor: 'white',
        borderRadius: 8,
        borderWidth: 3,
        borderColor: 'gray',
        width: '98%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 100,
        height: 100,
        marginRight: 0,
        borderRadius: 8,
    },
    imageCober: {
        width: 120,
        height: 120,
    },
    itemDetails: {
        alignItems: 'center',
        marginBottom: 15
    },
    itemDetailsUnO: {
        marginTop: 15,
        marginRight: 15,
        flexDirection: 'row',
    },
    itemDetailPrima: {
        marginRight: 5,
        flexDirection: 'column',
    },
    itemDetailsDos: {
        marginTop: 10,
        marginLeft: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 15,
    },
    titlePrima: {
        fontSize: 10,
        marginBottom: 10,
        marginLeft: 15,
        color: 'gray',
    },
    description: {
        marginTop: 4,
        color: 'gray',
        fontSize: 10,
    },
    errorText: {
        color: 'red',
        marginBottom: 15
    },
    iconContainer: {
        marginRight: 10,
    },
    modalContainerCom: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        textAlign: 'justify',
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
    flatListContent: {
        flexGrow: 1,
    },
    list: {
        width: '100%',
        marginBottom: 10,
        marginTop: 15,
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
    buttonContratar: {
        backgroundColor: 'blue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ResultadoCotizacionScreen;