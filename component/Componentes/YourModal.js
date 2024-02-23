// YourModal.js

import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const YourModal = ({ navigation }) => {

    const [isModalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        setModalVisible(!isModalVisible);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <>
            <TouchableOpacity onPress={openModal} style={styles.menuButton}>
                <Ionicons name="menu-outline" size={24} color="white" />
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={closeModal}
                style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <TouchableOpacity
                        onPress={() => {
                            setModalVisible(false);
                        }}
                        style={{ marginLeft: 0, marginRight: 10 }} >
                        <Ionicons name="menu-outline" size={30} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setModalVisible(false);
                            navigation.navigate('Login');
                        }}
                        style={{ marginLeft: 10, marginTop: 20, marginBottom: 10 }} >
                        <Ionicons name="person-outline" size={30} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setModalVisible(false);
                            navigation.navigate('Login');
                        }}
                        style={{ marginLeft: 10, marginBottom: 10 }} >
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
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#001F3F',
        padding: 16,
        height: '100%',
        width: '50%',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        position: 'absolute',
        right: 0,
    },
});

export default YourModal;
