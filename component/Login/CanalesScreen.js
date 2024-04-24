import React, { useState, useEffect, useRef } from 'react';
import { View, Text, SectionList, ActivityIndicator, StyleSheet, TouchableOpacity, Alert, FlatList } from 'react-native';
import { UserCanales, UserClientes, UserGrupos } from '../Api/api';
import { useNavigation } from '@react-navigation/native';
import { CountClientes, CountCanales, CountSubCanales, colors } from '../Utilities';

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
        GetFlujoLogin(item.IdCanal);
    };

    const renderItem = ({ item, index }) => {
        const dynamicBackgroundColor = { backgroundColor: colors[index % colors.length] };
        return (
            <TouchableOpacity
                style={[styles.item, selectedItem?.IdCanal === item.IdCanal && styles.selectedItem, dynamicBackgroundColor]}
                onPress={() => handleItemPress(item)}>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={styles.LabelTxt}>{item.NomCanal}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    const GetFlujoLogin = async (IdCanal) => {
        try {

            const CSubCanales = await CountSubCanales(DataParameterCanales.email,
                DataParameterCanales.password,
                DataParameterCanales.IdUsr,
                IdCanal);
            if (CSubCanales.count > 1) {
                const DataParameterSubcanales = {
                    IdUsr: DataParameterCanales.IdUsr,
                    password: DataParameterCanales.password,
                    email: DataParameterCanales.email,
                    IdCanal: IdCanal,
                    IdPersona: DataParameterCanales.IdPersona,
                    IdRol: DataParameterCanales.IdRol,
                };
                navigation.navigate('Subcanales', { DataParameterSubcanales });
            } else {
                const IDSubCanal = CSubCanales.FirstElement.IDSubCanal;
                const SubCanal = CSubCanales.FirstElement.SubCanal;
                const _DataParameter = {
                    IdUsr: DataParameterCanales.IdUsr,
                    password: DataParameterCanales.password,
                    email: DataParameterCanales.email,
                    IdSubCanal: IDSubCanal,
                    NomSubCanal: SubCanal,
                    IdPersona: DataParameterCanales.IdPersona,
                    IdRol: DataParameterCanales.IdRol,
                };
                navigation.navigate('Modulos', { DataParameter: _DataParameter });
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
            }}>Selecciona un canal:</Text>
            <FlatList
                data={data}
                numColumns={2}
                renderItem={renderItem}
                keyExtractor={(item) => item.IdCanal.toString()}
            />
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    item: {
        padding: 10,
        marginVertical: 8,
        flexDirection: 'row',
        marginLeft: 25,
        marginRight: 3,
        width: '40%',
        height: 100
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
        fontSize: 15,
        fontWeight: 'bold',
        color: '#002F89',
        textTransform: 'uppercase',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
});

export default CanalesScreen;
