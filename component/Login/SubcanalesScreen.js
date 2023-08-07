import React, { useState, useEffect, useRef } from 'react';
import { View, Text, SectionList, ActivityIndicator, StyleSheet, TouchableOpacity, Alert, FlatList } from 'react-native';
import { UserClientes, UserGrupos, UserSubcanales } from '../api';
import { useNavigation } from '@react-navigation/native';
import { CountClientes, CountCanales, CountSubCanales } from '../Utilities';

const SubcanalesScreen = ({ route }) => {
    const navigation = useNavigation();
    const { DataParameterSubcanales } = route.params;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await UserSubcanales(
                DataParameterSubcanales.email,
                DataParameterSubcanales.password,
                DataParameterSubcanales.IdUsr,
                DataParameterSubcanales.IdCanal
            );
            
            if (response.data.Subcanales) {

                console.log(response.data.Subcanales);

                setData(response.data.Subcanales);

            } else {
                console.error('La respuesta de la API no contiene subcanales.');
            }
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener los datos:', error);
            setLoading(false);
        }
    };

    const handleItemPress = (item) => {
        
        setSelectedItem(item);
        console.log("item press", item.IDSubCanal);

        const _DataParameter = {
            IdUsr: DataParameterSubcanales.IdUsr,
            password: DataParameterSubcanales.password,
            email: DataParameterSubcanales.email,
            IdSubCanal: item.IDSubCanal,
            NomSubCanal: item.SubCanal
          };

          navigation.navigate('Modulos', { DataParameter: _DataParameter });
        
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={[styles.item, selectedItem?.IDSubCanal === item.IdSubcanal && styles.selectedItem]}
            onPress={() => handleItemPress(item)}
        >
            <Text>{item.SubCanal}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.IDSubCanal.toString()}
            />
            {selectedItem && (
                <View style={styles.selectedItemContainer}>
                    <Text>Selected Item:</Text>
                    <Text>{selectedItem.SubCanal}</Text>
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

export default SubcanalesScreen;
