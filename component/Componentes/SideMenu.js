import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

const handleImprimirPoliza = () => {
    console.log('Imprimir Póliza');
    navigation.closeDrawer();
};

const handleBuscarCotizacion = () => {
    console.log('Buscar Cotización');
    navigation.closeDrawer();
};

const MySideMenu = ({ navigation }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={handleImprimirPoliza} style={{ padding: 10 }}>
                <Text>Imprimir Póliza</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleBuscarCotizacion} style={{ padding: 10 }}>
                <Text>Buscar Cotización</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                <Text>Cerrar menú</Text>
            </TouchableOpacity>
        </View>
    );
};
export default MySideMenu;