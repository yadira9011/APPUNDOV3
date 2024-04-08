import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomAlert from './CustomAlert';

const YourModal = ({ navigation, route }) => {

    const [isModalVisible, setModalVisible] = useState(false);
    const routename = route.name;
    const [isAlertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [IconMessage, setIconMessage] = useState('Icon_Blue.png');


    const openModal = () => {
        setModalVisible(!isModalVisible);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const GetParams = () => {
        let params = { DataParameter: route.params?.DataParameter };
        if (routename === 'ResultadoCotizacion') {
            params = { DataParameter: route.params?.dataArray?.DataParameter };
            console.log("Parametros RC ", route.params);
        } else if (routename === 'Emision') {
            params = { DataParameter: route.params?.dataArrayEmi?.DataParameter };
        }
        return params
    };

    const hideAlert = () => {
        setAlertVisible(false);
    };

    const handleConfirm = () => {
        setAlertVisible(false);
        setModalVisible(false);
        navigation.navigate('Login');
    };

    return (
        <>
            <TouchableOpacity onPress={openModal} style={styles.menuButton}>
                <View style={styles.iconContainer}>
                    <Image source={require('../../assets/IconoUW.png')}
                        style={styles.imageIcon} />
                </View>
                <Ionicons name="menu-outline"
                    size={24}
                    color="white" />
            </TouchableOpacity>

            <Modal
                isVisible={isModalVisible}
                animationIn="slideInRight"
                animationOut="slideOutRight"
                onBackdropPress={closeModal}
                style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <TouchableOpacity
                        onPress={closeModal}
                        style={{ marginRight: 10 }}>
                        <Ionicons name="menu-outline" size={40} color="white" />
                    </TouchableOpacity>
                    {(!(routename === 'MiPerfilScreen' || routename === 'Grupos' || routename === 'Clientes' || routename === 'Canales' || routename === 'Subcanales')) && (
                        <TouchableOpacity
                            onPress={() => {
                                setModalVisible(false);
                                navigation.navigate('MiPerfilScreen', GetParams());
                            }}
                            style={{ marginTop: 20, marginBottom: 10, flexDirection: 'row', }}>
                            <Ionicons name="person-outline" size={30} color="white" />
                            <Text style={{ color: 'white', fontSize: 16, marginTop: 5, marginLeft: 5 }}>Perfil</Text>
                        </TouchableOpacity>
                    )}
                    {(!(routename === 'Modulos' || routename === 'Grupos' || routename === 'Clientes' || routename === 'Canales' || routename === 'Subcanales')) && (
                        <TouchableOpacity
                            onPress={() => {
                                setModalVisible(false);
                                navigation.navigate('Modulos', GetParams());
                            }}
                            style={{ marginTop: 10, marginBottom: 20, flexDirection: 'row', }}>
                            <Ionicons name="home" size={30} color="white" />
                            <Text style={{ color: 'white', fontSize: 16, marginTop: 5, marginLeft: 5 }}>Inicio</Text>
                        </TouchableOpacity>
                    )}
                    <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-start' }}>
                        <TouchableOpacity
                            onPress={() => {
                                setAlertMessage('¿Esta seguro que desea cerrar sesión?');
                                setAlertVisible(true);
                            }}
                            style={{ marginBottom: 10, flexDirection: 'row', }}>
                            <Ionicons name="exit" size={35} color="white" />
                            <Text style={{ color: 'white', fontSize: 16, marginTop: 5, marginLeft: 5 }}>Salir</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {isAlertVisible && (
                <CustomAlert
                    visible={isAlertVisible}
                    message={alertMessage}
                    iconName={IconMessage}
                    onClose={hideAlert}
                    onConfirm={handleConfirm}
                    AlertTwo={true}
                />
            )}
        </>
    );
};



const styles = StyleSheet.create({
    menuButton: {
        marginRight: 10,
    },
    modalContainer: {
        margin: 0,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#0051C4',
        padding: 16,
        height: '100%',
        width: '35%',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
    },
    iconContainer: {
        marginRight: 10,
    },
    imageIcon: {
        width: 24,
        height: 24,
    },
});

export default YourModal;
