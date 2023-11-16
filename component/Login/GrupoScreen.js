import React, { useState, useEffect, useRef } from 'react';
import { View, Text, SectionList, ActivityIndicator, StyleSheet, TouchableOpacity, Alert, FlatList } from 'react-native';
import { UserGrupos } from '../Api/api';
import { useNavigation } from '@react-navigation/native';
import { CountClientes, CountCanales, CountSubCanales } from '../Utilities';

const GrupoScreen = ({ route }) => {
    const navigation = useNavigation();
    const { userDataParameter } = route.params;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await UserGrupos(
                userDataParameter.email,
                userDataParameter.password,
                userDataParameter.IdUsr
            );

            if (response.data.GrupoEmpresas) {

                // const grupos_new = [{ title: 'Grupo Empresa', data: response.data.GrupoEmpresas, expanded: false }];
                // console.log("GUPIISS", response.data.GrupoEmpresas);
                // console.log("title", grupos_new);

                setData(response.data.GrupoEmpresas);

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
        console.log("item press", item.IdGrupoEmpresa);
        GetFlujoLogin(item.IdGrupoEmpresa);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={[styles.item, selectedItem?.IdGrupoEmpresa === item.IdGrupoEmpresa && styles.selectedItem]}
            onPress={() => handleItemPress(item)}
        >
            <Text>{item.Grupo}</Text>
        </TouchableOpacity>
    );

    const GetFlujoLogin = async (IdGrupo) => {
        try {
            const CClientes = await CountClientes(userDataParameter.email,
                userDataParameter.password,
                userDataParameter.IdUsr,
                IdGrupo);
            if (CClientes.count > 1) {
                const DataParameterClientes = {
                    IdUsr: userDataParameter.IdUsr,
                    password: userDataParameter.password,
                    email: userDataParameter.email,
                    IdGrupo: IdGrupo,
                    IdPersona: userDataParameter.IdPersona,
                    IdRol: userDataParameter.IdRol,
                };
                navigation.navigate('Clientes', { DataParameterClientes });
            } else {
                const IdCliente = CClientes.FirstElement.IdCliente;
                const CCanales = await CountCanales(userDataParameter.email,
                    userDataParameter.password,
                    userDataParameter.IdUsr,
                    IdCliente);
                if (CCanales.count > 1) {
                    const DataParameterCanales = {
                        IdUsr: userDataParameter.IdUsr,
                        password: userDataParameter.password,
                        email: userDataParameter.email,
                        IdCliente: IdCliente,
                        IdPersona: userDataParameter.IdPersona,
                        IdRol: userDataParameter.IdRol,
                    };
                    navigation.navigate('Canales', { DataParameterCanales });
                } else {
                    const IdCanal = CCanales.FirstElement.IdCanal;
                    const CSubCanales = await CountSubCanales(userDataParameter.email,
                        userDataParameter.password,
                        userDataParameter.IdUsr,
                        IdCanal);
                    if (CSubCanales.count > 1) {
                        const DataParameterSubcanales = {
                            IdUsr: userDataParameter.IdUsr,
                            password: userDataParameter.password,
                            email: userDataParameter.email,
                            IdCanal: IdCanal,
                            IdPersona: userDataParameter.IdPersona,
                            IdRol: userDataParameter.IdRol
                        };
                        navigation.navigate('Subcanales', { DataParameterSubcanales });
                    } else {

                        const IDSubCanal = CSubCanales.FirstElement.IDSubCanal;
                        const SubCanal = CSubCanales.FirstElement.SubCanal;
                        console.log("entro directo subcanal desde grupos...", IDSubCanal)

                        const _DataParameter = {
                            IdUsr: userDataParameter.IdUsr,
                            password: userDataParameter.password,
                            email: userDataParameter.email,
                            IdSubCanal: IDSubCanal,
                            NomSubCanal: SubCanal,
                            IdPersona: userDataParameter.IdPersona,
                            IdRol: userDataParameter.IdRol,
                        };
                        navigation.navigate('Modulos', { DataParameter: _DataParameter });
                    }
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
                keyExtractor={(item) => item.IdGrupoEmpresa.toString()}
            />
            {selectedItem && (
                <View style={styles.selectedItemContainer}>
                    <Text>Selected Item:</Text>
                    <Text>{selectedItem.Grupo}</Text>
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

export default GrupoScreen;
