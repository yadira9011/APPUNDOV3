import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation, useRoute } from '@react-navigation/native';
import ModalContent from '../Autos/ImpresionAutosComponent';
import ModalBusquedaCotAutosComponent from '../Autos/BusquedaCotAutosComponent';

const MySideMenu = (props) => {
    const route = useRoute();
    const { navigation } = props;
    const { DataParameter } = route.params.params;
    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalBCVisible, setModalBCVisible] = useState(false);
    const [numeroPoliza, setNumeroPoliza] = useState('');
    const [IdSubCanal, setIdSubCanal] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [FolioCotizacion, setFolioCotizacion] = useState('');

    const handleImprimirPoliza = () => {
        console.log('Imprimir Póliza');
        console.log('Parámetros recibidos:', route.params.params.DataParameter);
        navigation.closeDrawer();
        setIdSubCanal(route.params.params.DataParameter.IdSubCanal);
        setemail(route.params.params.DataParameter.email);
        setpassword(route.params.params.DataParameter.password)
        setModalVisible(true);
    };

    const handleGuardarPoliza = (numeroPoliza, idsubcanal, email, password) => {
        console.log('Imprimir Póliza con número:', numeroPoliza);
        console.log('ID del subcanal:', idsubcanal);
        setModalVisible(false);
        navigation.closeDrawer();
    };


    const handleBuscarCoti = () => {
        console.log('Buscar Cotización');
        navigation.closeDrawer();
    };

    const handleBuscarCotizacion = (FolioCotizacion, email, password) => {
        console.log('buscar cotizacion folio :', FolioCotizacion);
        setModalVisible(true);
        navigation.closeDrawer();
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={handleImprimirPoliza} style={{ padding: 10 }}>
                <Text>Imprimir Póliza</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleBuscarCoti} style={{ padding: 10 }}>
                <Text>Buscar Cotización</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                <Text>Cerrar menú</Text>
            </TouchableOpacity>

            <ModalContent
                isVisible={isModalVisible}
                onClose={() => setModalVisible(false)}
                onSave={handleGuardarPoliza}
                idsubcanal={IdSubCanal}
                email={email}
                password={password}
            />

            <ModalBusquedaCotAutosComponent
                isVisible={isModalBCVisible}
                onClose={() => setModalBCVisible(false)}
                onSave={handleBuscarCotizacion}
                email={email}
                password={password}
            />


        </View>
    );
};
export default MySideMenu;