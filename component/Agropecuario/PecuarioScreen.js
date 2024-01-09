
import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text, SectionList,
    ActivityIndicator, 
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView,
    FlatList,
    Modal
} from 'react-native';

import {
    GetDDRPequario,
    GetEspecies,
    GetFunciones,
    GetEsquemaAseguramientoPecuario,
    GetVigencias,
    GetEntFederativaPecuario
} from '../Api/api_agropecuario';

import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import Collapsible from 'react-native-collapsible';
import { Ionicons } from '@expo/vector-icons';
import LoadingComponent from '../Componentes/LoadingComponent';

const PecuarioScreen = ({ route }) => {

    const navigation = useNavigation();
    const { DataParameter } = route.params;
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                //await fetchPolizasGpo();
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error('Error al obtener los datos:', error);
            }
        };
        loadData();
    }, []);

   
    return (

        <View style={styles.container}>

                <View>
                    <Text>No hay registros disponibles</Text>
                </View>
    
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

    itemContainer: {
        flexDirection: 'row',
        marginBottom: 16,
    },

    item: {
        padding: 10,
        marginVertical: 8,
        backgroundColor: '#f9c2ff',
    },

    itemDetailsUnO: {
        flexDirection: 'column',
        marginRight: 15,
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

});

export default PecuarioScreen;
