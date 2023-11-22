
import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text, SectionList,
    ActivityIndicator, StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView,
    FlatList
} from 'react-native';
import {
    GetPolizasGpoTitular,
    GetCertificadosDepTitular,
    GetPolizasIdividualesTitular,
    GetPolizasXContratanteTitular,
    GetBotonesServPoliza
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

    const [IsCollapsedPolizasGpoTitular, setIsCollapsedPolizasGpoTitular] = useState(true);
    const [PolizasGpo, setPolizasGpo] = useState([]);

    const [IsCollapsedCertificadosDepTitular, setIsCollapsedCertificadosDepTitular] = useState(true);
    const [CertificadosDepTitular, setCertificadosDepTitular] = useState([]);

    const [IsCollapsedPolizasIdividualesTitular, setIsCollapsedPolizasIdividualesTitular] = useState(true);
    const [PolizasIdividualesTitular, setPolizasIdividualesTitular] = useState([]);

    const [IsCollapsedPolizasXContratanteTitular, setIsCollapsedPolizasXContratanteTitular] = useState(true);
    const [PolizasXContratanteTitular, setPolizasXContratanteTitular] = useState([]);

    
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                await fetchPolizasGpo();
                // await fetchCertificadosDepTitular();
                // await fetchPolizasIdividualesTitular();
                // await fetchPolizasXContratanteTitular();
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error('Error al obtener los datos:', error);
            }
        };
        loadData();
    }, []);


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
                console.log(data)
                setPolizasGpo(data);
            } else {
                console.error('no se encontraron grupos');
            }
            setLoading(false);
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
                console.log(data)
                setCertificadosDepTitular(data);
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
                console.log(data)
                setPolizasIdividualesTitular(data);
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
                console.log(data)
                setPolizasXContratanteTitular(data);
            } else {
                console.error('no se encontraron grupos');
            }
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener los datos:', error);
            setLoading(false);
        }
    };

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
                console.log(data)
                setPolizasGpo(data);
            } else {
                console.error('no se encontraron grupos');
            }
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener los datos:', error);
            setLoading(false);
        }
    };

  
    const toggleCollapsePolizasGpo = () => {
        setIsCollapsedPolizasGpoTitular(!IsCollapsedPolizasGpoTitular);
    };

    const toggleCollapseCertificadosDepTitular = () => {
        setIsCollapsedCertificadosDepTitular(!IsCollapsedCertificadosDepTitular);
    };

    const toggleCollapsePolizasIdividualesTitular = () => {
        setIsCollapsedPolizasIdividualesTitular(!IsCollapsedPolizasIdividualesTitular);
    };

    const toggleCollapsePolizasXContratanteTitular = () => {
        setIsCollapsedPolizasXContratanteTitular(!IsCollapsedPolizasXContratanteTitular);
    };

    // const renderItemPolizasGpo = ({ item, onPress }) => (
    //     <View style={styles.itemContainer} >
    //         <View style={styles.itemDetailsUnO}>
    //             <Text style={styles.description}>{item.FSCERTIFICADO}</Text>
    //             <Text style={styles.description}>{item.FSALIAS}</Text>
    //             <Text style={styles.description}>Inicio: {item.FDINICIO_VIGENCIA}</Text>
    //             <Text style={styles.description}>Fin: {item.FDFIN_VIGENCIA}</Text>
    //             <Text style={styles.description}>Producto: {item.FSPRODUCTO}</Text>
    //             <Text style={styles.description}>Estatus: {item.FSESTATUS}</Text>
    //         </View>
    //     </View >
    // );

    const renderItemPolizasGpo = ({ item, onPress }) => {

        useEffect(() => {
            const fetchData = async () => {
                try {
                    await fetchBotonesServPoliza(item.FIIDPOLIZA);
                } catch (error) {
                    console.error('Error al obtener los datos:', error);
                }
            };
            fetchData();
        }, [item.FIIDPOLIZA]);

        return (
            <View style={styles.itemContainer}>
                <View style={styles.itemDetailsUnO}>
                    <Text style={styles.description}>{item.FSCERTIFICADO}</Text>
                    <Text style={styles.description}>{item.FSALIAS}</Text>
                    <Text style={styles.description}>Inicio: {item.FDINICIO_VIGENCIA}</Text>
                    <Text style={styles.description}>Fin: {item.FDFIN_VIGENCIA}</Text>
                    <Text style={styles.description}>Producto: {item.FSPRODUCTO}</Text>
                    <Text style={styles.description}>Estatus: {item.FSESTATUS}</Text>
                </View>
            </View>
        );
    };

    return (

        <View style={styles.container}>

            {/* POLIZAS GRUPO */}

            {PolizasGpo.length > 0 ? (
                <View>
                    <TouchableOpacity onPress={toggleCollapsePolizasGpo} style={styles.button}>
                        <Text style={styles.buttonText}>POLIZAS GRUPO</Text>
                    </TouchableOpacity>
                    <Collapsible collapsed={IsCollapsedPolizasGpoTitular}>
                        <FlatList
                            data={PolizasGpo}
                            keyExtractor={item => item.FIIDPOLIZA}
                            renderItem={({ item }) => renderItemPolizasGpo({ item })}
                        />
                    </Collapsible>
                </View>) : (
                <View>
                    <Text>No hay registros disponibles</Text>
                </View>
            )}

            {loading && (
                <LoadingComponent />
            )}
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingHorizontal: 20,
        marginBottom: 50
    },
    item: {
        padding: 10,
        marginVertical: 8,
        backgroundColor: '#f9c2ff',
    },
    selectedItem: {
        backgroundColor: '#9f8cbb',
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
    itemContainer: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    itemDetailsUnO: {
        marginRight: 15,
        backgroundColor: '#3498db',
    },
});

export default ConsultaPolizasScreen;
