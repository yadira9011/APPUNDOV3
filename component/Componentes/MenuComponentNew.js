import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation, useRoute } from '@react-navigation/native';
import ModalContent from '../Autos/ImpresionAutosComponent';
import ModalBusquedaCotAutosComponent from '../Autos/BusquedaCotAutosComponent';
import { Ionicons } from '@expo/vector-icons';

const MenuComponentNew = ({ DataParameter, isShowImpresion, IsShowCotizacion }) => {

    const route = useRoute();
    const Navigation = useNavigation();
    // const { navigation } = props;
    // const { DataParameter } = route.params.params;
    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalBCVisible, setModalBCVisible] = useState(false);
    const [numeroPoliza, setNumeroPoliza] = useState('');
    const [IdSubCanal, setIdSubCanal] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [Parametros, setParametros] = useState('');
    const [FolioCotizacion, setFolioCotizacion] = useState('');
    const currentScreen = route.name;

    const handleImprimirPoliza = () => {
        console.log('Imprimir Póliza');
        console.log('Parámetros recibidos:', DataParameter);
        setIdSubCanal(DataParameter.IdSubCanal);
        setemail(DataParameter.email);
        setpassword(DataParameter.password)
        setModalVisible(true);
    };

    const handleBuscarCoti = () => {
        setemail(DataParameter.email);
        setpassword(DataParameter.password);
        setIdSubCanal(DataParameter.IdSubCanal);
        setParametros(DataParameter);
        setModalBCVisible(true);
    };

    const handleIrInicio = () => {
        Navigation.navigate('Modulos', { DataParameter: DataParameter });
    };

    const handleGuardarPoliza = (numeroPoliza, idsubcanal, email, password) => {
        setModalVisible(false);
    };

    const handleBuscarCotizacion = (FolioCotizacion, idsubcanal, email, password) => {
        setModalBCVisible(false);

    };

    const handleSalir = () => {
        Navigation.navigate('Login');
    }

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
            {currentScreen === 'CotizacionAutos' && (

                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>

                    {!isShowImpresion && (
                        <TouchableOpacity onPress={handleImprimirPoliza} style={{ padding: 10 }}>
                            <Ionicons name="print" size={40} color="white" />
                        </TouchableOpacity>
                    )}

                    {!IsShowCotizacion && (
                        <TouchableOpacity onPress={handleBuscarCoti} style={{ padding: 10 }}>
                            <Ionicons name="search" size={40} color="white" />
                        </TouchableOpacity>
                    )}

                    {/* <TouchableOpacity onPress={handleIrInicio} style={{ padding: 10 }}>
                        <Ionicons name="home" size={24} color="black" />
                    </TouchableOpacity> */}

                </View>
            )}

            {/* <TouchableOpacity onPress={handleSalir} style={{ padding: 10 }}>
                <Ionicons name="exit" size={24} color="black" />
            </TouchableOpacity> */}

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
                idsubcanal={IdSubCanal}
                password={password}
                DataParameter={Parametros}
            />

        </View>

    );

};

export default MenuComponentNew;