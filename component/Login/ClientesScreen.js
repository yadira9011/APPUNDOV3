import React, { useState, useEffect, useRef } from 'react';
import { View, Text, SectionList, ActivityIndicator, StyleSheet, TouchableOpacity, Alert, FlatList } from 'react-native';
import { UserClientes, UserGrupos } from '../Api/api';
import { useNavigation } from '@react-navigation/native';
import { CountClientes, CountCanales, CountSubCanales, colors } from '../Utilities';

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
        GetFlujoLogin(item.IdCliente);
    };

    // const renderIteme = ({ item }) => (
    //     <TouchableOpacity
    //         style={[styles.item, selectedItem?.IdCliente === item.IdCliente && styles.selectedItem]}
    //         onPress={() => handleItemPress(item)}
    //     >
    //         <Text>{item.NomCliente}</Text>
    //     </TouchableOpacity>
    // );

    const renderItem = ({ item, index }) => {
        const dynamicBackgroundColor = { backgroundColor: colors[index % colors.length] };
        return (
            <TouchableOpacity
                style={[styles.item, selectedItem?.IdCliente === item.IdCliente && styles.selectedItem, dynamicBackgroundColor]}
                onPress={() => handleItemPress(item)} >
                <Text>{item.NomCliente}</Text>
            </TouchableOpacity>
        );
    };

    const GetFlujoLogin = async (IdCliente) => {
        try {

            const CCanales = await CountCanales(DataParameterClientes.email,
                DataParameterClientes.password,
                DataParameterClientes.IdUsr,
                IdCliente);
            if (CCanales.count > 1) {
                const DataParameterCanales = {
                    IdUsr: DataParameterClientes.IdUsr,
                    password: DataParameterClientes.password,
                    email: DataParameterClientes.email,
                    IdCliente: IdCliente,
                    IdPersona: DataParameterClientes.IdPersona,
                    IdRol: DataParameterClientes.IdRol
                };
                navigation.navigate('Canales', { DataParameterCanales });
            } else {
                const IdCanal = CCanales.FirstElement.IdCanal;
                const CSubCanales = await CountSubCanales(DataParameterClientes.email,
                    DataParameterClientes.password,
                    DataParameterClientes.IdUsr,
                    IdCanal);
                if (CSubCanales.count > 1) {
                    const DataParameterSubcanales = {
                        IdUsr: DataParameterClientes.IdUsr,
                        password: DataParameterClientes.password,
                        email: DataParameterClientes.email,
                        IdCanal: IdCanal,
                        IdPersona: DataParameterClientes.IdPersona,
                        IdRol: DataParameterClientes.IdRol
                    };
                    navigation.navigate('Subcanales', { DataParameterSubcanales });
                } else {
                    const IDSubCanal = CSubCanales.FirstElement.IDSubCanal;
                    const SubCanal = CSubCanales.FirstElement.SubCanal;
                    const _DataParameter = {
                        IdUsr: DataParameterClientes.IdUsr,
                        password: DataParameterClientes.password,
                        email: DataParameterClientes.email,
                        IdSubCanal: IDSubCanal,
                        NomSubCanal: SubCanal,
                        IdPersona: DataParameterClientes.IdPersona,
                        IdRol: DataParameterClientes.IdRol
                    };
                    navigation.navigate('Modulos', { DataParameter: _DataParameter });
                }
            }
        } catch (error) {
            Alert.alert('Error', 'Inicio de sesión fallido');
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.IdCliente.toString()}
            />
            {/* {selectedItem && (
                <View style={styles.selectedItemContainer}>
                    <Text>Selected Item:</Text>
                    <Text>{selectedItem.NomCliente}</Text>
                </View>
            )} */}
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
        borderRadius: 15,
        borderColor: 'blue',
        borderWidth: 2,
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
