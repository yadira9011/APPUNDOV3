import React, { useState, useEffect, useRef } from 'react';
import { View, Text, SectionList, ActivityIndicator, StyleSheet, TouchableOpacity, Alert, FlatList } from 'react-native';
import { UserClientes, UserGrupos } from '../api';
import { useNavigation } from '@react-navigation/native';
import { CountClientes, CountCanales, CountSubCanales } from '../Utilities';

const ClientesScreen = ({ route }) => {
    const navigation = useNavigation();
    const { DataParameterClientes } = route.params;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await UserClientes(
                DataParameterClientes.email,
                DataParameterClientes.password,
                DataParameterClientes.IdUsr,
                DataParameterClientes.IdGrupo
            );

            if (response.data.Clientes) {

                console.log(response.data.Clientes);

                setData(response.data.Clientes);

            } else {
                console.error('La respuesta de la API no contiene GrupoEmpresas.');
            }
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener los datos:', error);
            setLoading(false);
        }
    };

    const handleItemPress = (item) => {
        setSelectedItem(item);
        console.log("item press", item.IdCliente);
        // GetFlujoLogin(item.IdGrupoEmpresa);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={[styles.item, selectedItem?.IdCliente === item.IdCliente && styles.selectedItem]}
            onPress={() => handleItemPress(item)}
        >
            <Text>{item.NomCliente}</Text>
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
                keyExtractor={(item) => item.IdCliente.toString()}
            />
            {selectedItem && (
                <View style={styles.selectedItemContainer}>
                    <Text>Selected Item:</Text>
                    <Text>{selectedItem.NomCliente}</Text>
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

export default ClientesScreen;
