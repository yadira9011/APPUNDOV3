import React, { useState, useEffect, useRef } from 'react';
import { View, Text, SectionList, ActivityIndicator, StyleSheet, TouchableOpacity, Alert, FlatList } from 'react-native';
import { UserCanales, UserClientes, UserGrupos } from '../api';
import { useNavigation } from '@react-navigation/native';
import { CountClientes, CountCanales, CountSubCanales } from '../Utilities';

const CanalesScreen = ({ route }) => {
    const navigation = useNavigation();
    const { DataParameterCanales } = route.params;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await UserCanales(
                DataParameterCanales.email,
                DataParameterCanales.password,
                DataParameterCanales.IdUsr,
                DataParameterCanales.IdCliente
            );

            if (response.data.Canal) {

                console.log(response.data.Canal);

                setData(response.data.Canal);

            } else {
                console.error('La respuesta de la API no contiene Canales.');
            }
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener los datos:', error);
            setLoading(false);
        }
    };

    const handleItemPress = (item) => {
        setSelectedItem(item);
        console.log("item press", item.IdCanal);
        // GetFlujoLogin(item.IdGrupoEmpresa);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={[styles.item, selectedItem?.IdCanal === item.IdCanal && styles.selectedItem]}
            onPress={() => handleItemPress(item)}
        >
            <Text>{item.NomCanal}</Text>
        </TouchableOpacity>
    );

    // const GetFlujoLogin = async (IdGrupo) => {
    //     try {
    //         const CClientes = await CountClientes(userDataParameter.email,
    //             userDataParameter.password,
    //             userDataParameter.IdUsr,
    //             IdGrupo);
    //         if (CClientes.count > 0) {
    //             navigation.navigate('Clientes', { userDataParameter });
    //         } else {
    //             const IdCliente = CClientes.FirstElement.IdCliente;
    //             const CCanales = await CountCanales(userDataParameter.email,
    //                 userDataParameter.password,
    //                 userDataParameter.IdUsr,
    //                 IdCliente);
    //             if (CCanales.count > 0) {
    //                 navigation.navigate('Canales', { userDataParameter });
    //             } else {
    //                 const IdCanal = CCanales.FirstElement.IdCanal;
    //                 const CSubCanales = await CountSubCanales(userDataParameter.email,
    //                     userDataParameter.password,
    //                     userDataParameter.IdUsr,
    //                     IdCanal);
    //                 if (CSubCanales.count > 0) {
    //                     navigation.navigate('Subcanales', { userDataParameter });
    //                 }
    //             }
    //         }


    //     } catch (error) {
    //         Alert.alert('Error', 'Inicio de sesión fallido');
    //     }
    // };

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.IdCanal.toString()}
            />
            {selectedItem && (
                <View style={styles.selectedItemContainer}>
                    <Text>Selected Item:</Text>
                    <Text>{selectedItem.NomCanal}</Text>
                </View>
            )}
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 20,
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
});

export default CanalesScreen;
