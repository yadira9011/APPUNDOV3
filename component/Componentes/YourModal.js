import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';

const YourModal = ({ navigation, route }) => {

    const [isModalVisible, setModalVisible] = useState(false);
    const routename = route.name;


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

    return (
        <>
            <TouchableOpacity onPress={openModal} style={styles.menuButton}>
                <Ionicons name="menu-outline" size={24} color="white" />
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
                        <Ionicons name="menu-outline" size={30} color="white" />
                    </TouchableOpacity>

                    {(!(routename === 'MiPerfilScreen' || routename === 'Grupos' || routename === 'Clientes' || routename === 'Canales' || routename === 'Subcanales')) && (
                        <TouchableOpacity
                            onPress={() => {
                                setModalVisible(false);
                                navigation.navigate('MiPerfilScreen', GetParams());
                            }}
                            style={{ marginTop: 20, marginBottom: 10 }}>
                            <Ionicons name="person-outline" size={30} color="white" />
                        </TouchableOpacity>
                    )}

                    {(!(routename === 'Modulos' || routename === 'Grupos' || routename === 'Clientes' || routename === 'Canales' || routename === 'Subcanales')) && (
                        <TouchableOpacity
                            onPress={() => {
                                setModalVisible(false);
                                navigation.navigate('Modulos', GetParams());
                            }}
                            style={{ marginTop: 10, marginBottom: 20 }}>
                            <Ionicons name="home" size={30} color="white" />
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity
                        onPress={() => {
                            setModalVisible(false);
                            navigation.navigate('Login');
                        }}
                        style={{ marginBottom: 10 }}>
                        <Ionicons name="exit" size={30} color="white" />
                    </TouchableOpacity>

                </View>
            </Modal>
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
        width: '25%',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
    },
});

export default YourModal;
