import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { UserSubcanales } from '../Api/api';
import { useNavigation } from '@react-navigation/native';
import { colorsSubcanales, imagesSubcanales } from '../Utilities';
import { Ionicons } from '@expo/vector-icons';

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
                DataParameterSubcanales.IdCanal,
            );
            if (response.data.Subcanales) {
                console.log("SUBANALAAAASSS", response.data.Subcanales);
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
            NomSubCanal: item.SubCanal,
            IdPersona: DataParameterSubcanales.IdPersona,
            IdRol: DataParameterSubcanales.IdRol
        };
        navigation.navigate('Modulos', { DataParameter: _DataParameter });
    };

    const renderItem = ({ item, index }) => {

        const dynamicBackgroundColor = { backgroundColor: colorsSubcanales[index % colorsSubcanales.length] };
        const imagePath = item.Icono;
        let resultImg;
        if (imagePath && typeof imagePath === 'string') {
            const parts = imagePath.split('/');
            const lastPart = parts[parts.length - 1];
            resultImg = lastPart.match(/^[a-zA-Z]+\.png$/) ? lastPart : 'SinIcono.png';
        } else {
            resultImg = 'SinIcono.png';
        }

        return (
            <TouchableOpacity
                style={[styles.item,
                selectedItem?.IDSubCanal === item.IdSubcanal &&
                styles.selectedItem,
                    dynamicBackgroundColor]}
                onPress={() => handleItemPress(item)}>

                <View style={styles.ItemConteiner}>

                    <View style={{ marginRight: 10, width: '50%', flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{
                            textAlign: 'left',
                            fontSize: 14,
                            marginLeft: 15,
                            marginRight: 10,
                            color: '#002F89',
                            fontWeight: 'bold',
                        }}>{item.SubCanal}</Text>
                    </View>

                    <View style={{ flex: 1, width: '20%', alignItems: 'flex-start' }}>
                        <Image source={imagesSubcanales[resultImg]}
                            style={{
                                width: 100,
                                height: 100,
                                resizeMode: 'cover',
                            }}
                        />
                    </View>

                    <View style={{ marginRight: 5, width: '20%', flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons
                            name="chevron-forward-sharp"
                            size={40}
                            color='#002F89' />
                    </View>

                </View>

            </TouchableOpacity>
        );
        
    };

    return (
        <View style={styles.container}>

            <Text style={{
                textAlign: 'center',
                fontSize: 14,
                color: 'gray',
            }}>Selecciona un subcanal:</Text>

            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.IDSubCanal.toString()}
            />

        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20
    },
    ItemConteiner: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    item: {
        marginTop: 15
    },
    selectedItem: {
        backgroundColor: '#9f8cbb',
    },
    selectedItemContainer: {
        backgroundColor: '#f0ebeb',
        borderRadius: 5,
    },
});

export default SubcanalesScreen;
