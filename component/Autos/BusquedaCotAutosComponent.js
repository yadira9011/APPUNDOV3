import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal, StyleSheet } from 'react-native';
import { GetPolizaPdfApi } from '../api';
import { useNavigation } from '@react-navigation/native';

export default function ModalSolitarCotizacion({ isVisible, onClose, onSave, idsubcanal, email, password }) {

    const navigation = useNavigation();
    const [FolioCotizacion, setFolioCotizacion] = useState('6040035690');

    const handleBuscarCotizacion = async () => {
        
        onSave(FolioCotizacion, email, password);
        try {
            const DataRquest = {
                numeroPoliza: FolioCotizacion,
                usuario: email,
                contraseña: password,
            }

            const response = await GetPolizaPdfApi(DataRquest);
            if (response.data.Data.Data) {
                console.log(response.data.Data.Data)
            }

        } catch (error) {
        }
    };

    return (
        <Modal transparent={true} visible={isVisible}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={{ marginBottom: 10, fontSize: 18 }}>
                        Folio de Cotización:
                    </Text>
                    <TextInput
                        value={numeroPoliza}
                        onChangeText={(text) => setFolioCotizacion(text)}
                        placeholder="Folio de Cotización"
                        style={styles.input}
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={handleBuscarCotizacion} style={styles.saveButton}>
                            <Text style={styles.buttonText}>Buscar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente gris
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 8,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    saveButton: {
        flex: 1,
        backgroundColor: 'green',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
    },
    cancelButton: {
        flex: 1,
        backgroundColor: 'red',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
