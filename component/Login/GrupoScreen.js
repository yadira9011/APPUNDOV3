import React, { useState, useEffect, useRef } from 'react';
import { View, Text, SectionList, ActivityIndicator, StyleSheet, TouchableOpacity, Alert, FlatList } from 'react-native';
import { UserGrupos } from '../Api/api';
import { useNavigation } from '@react-navigation/native';
import { CountClientes, CountCanales, CountSubCanales, colors } from '../Utilities';
import { Ionicons } from '@expo/vector-icons';

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

    // const renderItem = ({ item }) => (
    //     <TouchableOpacity
    //         style={[styles.item, selectedItem?.IdGrupoEmpresa === item.IdGrupoEmpresa && styles.selectedItem]}
    //         onPress={() => handleItemPress(item)} >
    //         <Text>{item.Grupo}</Text>
    //     </TouchableOpacity>
    // );

    const renderItem = ({ item, index }) => {
        const dynamicBackgroundColor = { backgroundColor: colors[index % colors.length] };
        return (
            <TouchableOpacity
                style={[
                    styles.item,
                    selectedItem?.IdGrupoEmpresa === item.IdGrupoEmpresa && styles.selectedItem,
                    dynamicBackgroundColor,
                ]}
                onPress={() => handleItemPress(item)}>

                <View style={{ marginRight: 5, width: '60%', alignItems: 'center' }}>
                    <Text style={styles.LabelTxt}>{item.Grupo}</Text>
                </View>
                <View style={{ marginRight: 5, width: '40%', alignItems: 'center' }}>
                    <Ionicons
                        name="arrow-forward-circle-outline"
                        size={40}
                        color="black" />
                </View>

            </TouchableOpacity>
        );
    };

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

            <Text style={{
                textAlign: 'center',
                fontSize: 14,
                color: 'gray',
                marginBottom: 15
            }}>Selecciona un grupo:</Text>

            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.IdGrupoEmpresa.toString()}
            />

            {/* {selectedItem && (
                <View style={styles.selectedItemContainer}>
                    <Text>Selected Item:</Text>
                    <Text>{selectedItem.Grupo}</Text>
                </View>
            )} */}

        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        // paddingHorizontal: 20,
    },
    item: {
        padding: 10,
        marginVertical: 8,
        alignItems: 'center',
        flexDirection: 'row',
        // borderRadius: 15,
        // borderColor: 'blue',
        // borderWidth: 2,
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
    LabelTxt: {
        fontSize:20,
        fontWeight: 'bold',
        color: '#002F89',
        textTransform: 'uppercase',
    },
});

export default GrupoScreen;
