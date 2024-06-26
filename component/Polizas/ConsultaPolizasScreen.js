
import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text, SectionList,
    ActivityIndicator, StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView,
    FlatList,
    Modal
} from 'react-native';
import {
    GetPolizasGpoTitular,
    GetCertificadosDepTitular,
    GetPolizasIdividualesTitular,
    GetPolizasXContratanteTitular,
    GetBotonesServPoliza,
    GetCertificadoPoliza,
    GetCoberturasPoliza
} from '../Api/api_polizas';

import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import Collapsible from 'react-native-collapsible';
import { Ionicons } from '@expo/vector-icons';
import LoadingComponent from '../Componentes/LoadingComponent';

const ConsultaPolizasScreen = ({ route }) => {

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
                // setLoading(false);


            } else {
                console.error('no se encontraron grupos');
                setLoading(false);
            }
        } catch (error) {
            console.error('Error al obtener los datos:', error);
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

    const toggleCollapsePolizasGpo = () => {
        setIsCollapsedPolizasGpoTitular(!IsCollapsedPolizasGpoTitular);
        setIsCollapsedCertificadosDepTitular(false);
        setIsCollapsedPolizasIdividualesTitular(false);
        setIsCollapsedPolizasXContratanteTitular(false);
    };

    const toggleCollapseCertificadosDepTitular = () => {
        setIsCollapsedCertificadosDepTitular(!IsCollapsedCertificadosDepTitular);
        setIsCollapsedPolizasGpoTitular(false);
        setIsCollapsedPolizasXContratanteTitular(false);
        setIsCollapsedPolizasIdividualesTitular(false);
    };

    const toggleCollapsePolizasIdividualesTitular = () => {
        setIsCollapsedPolizasIdividualesTitular(!IsCollapsedPolizasIdividualesTitular);
        setIsCollapsedPolizasGpoTitular(false);
        setIsCollapsedCertificadosDepTitular(false);
        setIsCollapsedPolizasXContratanteTitular(false);
    };

    const toggleCollapsePolizasXContratanteTitular = () => {
        setIsCollapsedPolizasXContratanteTitular(!IsCollapsedPolizasXContratanteTitular);
        setIsCollapsedPolizasIdividualesTitular(false);
        setIsCollapsedPolizasGpoTitular(false);
        setIsCollapsedCertificadosDepTitular(false);
    };

    const GotoMyPerfil = () => {
        navigation.navigate('MiPerfilScreen', { DataParameter });
    };

    const renderItemPolizasGpo = ({ item, onPress, tipo_poliza = 0 }) => (

        <View style={styles.itemContainer} >
            <View style={styles.itemDetailsUnO}>
                <Text style={styles.description}>{item.FSCERTIFICADO}</Text>
                <Text style={styles.description}>
                   xxx {item.FSALIAS}
                </Text>
                <Text style={styles.description}>
                    {tipo_poliza == 1 ? item.FSNOMBRE_COMPLETO : item.FSALIAS}
                </Text>
                <Text style={styles.description}>Iniciodd: {item.FDINICIO_VIGENCIA}</Text>
                <Text style={styles.description}>Fin: {item.FDFIN_VIGENCIA}</Text>
                <Text style={styles.description}>Producto: {item.FSPRODUCTO}</Text>
                <Text style={styles.description}>Estatus: {item.FSESTATUS}</Text>
                <View style={styles.buttonContainer}>
                    {botonesPorPoliza[item.FIIDPOLIZA] !== undefined &&
                        botonesPorPoliza[item.FIIDPOLIZA].map((boton, index) => (
                            <TouchableOpacity key={index} onPress={() => handleBotonPress(boton, item.FIIDPOLIZA, item.FIIDASEGURADO)}>
                                <Ionicons
                                    name={boton === 'Cer' ? 'ios-document' : 'ios-information-circle'}
                                    size={30}
                                    color="black"
                                />
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </View>
        </View >
    );

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

    return (

        <View style={styles.container}>

            <TouchableOpacity onPress={GotoMyPerfil} style={styles.purpleButton}>
                <Text style={styles.buttonText}>Mi Perfil</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={toggleCollapsePolizasGpo} style={styles.purpleButton}>
                <Text style={styles.buttonText}>POLIZAS GRUPO</Text>
            </TouchableOpacity>


            {/* POLIZAS GRUPO */}

            {IsCollapsedPolizasGpoTitular ? (
                PolizasGpo.length > 0 ? (
                    <FlatList
                        data={PolizasGpo}
                        contentContainerStyle={styles.flatListContent}
                        keyExtractor={item => item.FIIDPOLIZA}
                        renderItem={({ item }) => renderItemPolizasGpo({ item, onPress: () => { } })}
                    />
                ) : (
                    <Text style={styles.noRecordsText}>No hay registros disponibles</Text>
                )
            ) : null}


            {/* CERTIFICADOS DEPENDIENTES */}

            <TouchableOpacity onPress={toggleCollapseCertificadosDepTitular} style={styles.purpleButton}>
                <Text style={styles.buttonText}>CERTIFICADOS DEPENDIENTES</Text>
            </TouchableOpacity>

            {IsCollapsedCertificadosDepTitular ? (
                CertificadosDepTitular.length > 0 ? (
                    <FlatList
                        data={CertificadosDepTitular}
                        contentContainerStyle={styles.flatListContent}
                        keyExtractor={item => item.FSCERTIFICADO}
                        renderItem={({ item }) => renderItemPolizasGpo({ item, onPress: () => { }, tipo_poliza: 1 })}
                    />
                ) : (
                    <Text style={styles.noRecordsText}>No hay registros disponibles</Text>
                )
            ) : null}

            {/*POLIZAS INDIVIDUALES */}

            <TouchableOpacity onPress={toggleCollapsePolizasIdividualesTitular} style={styles.purpleButton}>
                <Text style={styles.buttonText}>POLIZAS INDIVIDUALES</Text>
            </TouchableOpacity>

            {IsCollapsedPolizasIdividualesTitular ? (
                PolizasIdividualesTitular.length > 0 ? (
                    <FlatList
                        data={PolizasIdividualesTitular}
                        contentContainerStyle={styles.flatListContent}
                        keyExtractor={item => item.FIIDPOLIZA}
                        renderItem={({ item }) => renderItemPolizasGpo({ item, onPress: () => { }, tipo_poliza: 1 })}
                    />
                ) : (
                    <Text style={styles.noRecordsText}>No hay registros disponibles</Text>
                )
            ) : null}

            {/* POLIZAS CONTRATANTES */}

            <TouchableOpacity onPress={toggleCollapsePolizasXContratanteTitular} style={styles.purpleButton}>
                <Text style={styles.buttonText}>POLIZAS CONTRATANTES</Text>
            </TouchableOpacity>

            {IsCollapsedPolizasXContratanteTitular ? (
                PolizasXContratanteTitular.length > 0 ? (
                    <FlatList
                        data={PolizasXContratanteTitular}
                        contentContainerStyle={styles.flatListContent}
                        keyExtractor={item => item.FIIDPOLIZA}
                        renderItem={({ item }) => renderItemPolizasGpo({ item, onPress: () => { }, tipo_poliza: 0 })}
                    />
                ) : (
                    <Text style={styles.noRecordsText}>No hay registros disponibles</Text>
                )
            ) : null}


            {loading && (
                <LoadingComponent />
            )}

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

        </View>

    );

};

const styles = StyleSheet.create({

    container: {
        paddingTop: 5,
        paddingHorizontal: 20,
        flex: 1,
    },

    buttonContainer: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10
    },

    itemContainer: {
        marginBottom: 16,
    },

    item: {
        padding: 10,
        marginVertical: 8,
        backgroundColor: '#f9c2ff',
    },

    itemDetailsUnO: {
        flexDirection: 'column',
        marginRight: 0,
        backgroundColor: '#D9D9F3'
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
        color: 'gray',
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

});

export default ConsultaPolizasScreen;
