import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal, Image } from 'react-native';
import { GetPolizaPdfApi } from '../Api/api';
import { useNavigation } from '@react-navigation/native';
import modalStyles from '../Styles/ModalStyles';
import { IconsAlerts } from '../Utilities';

export default function ModalContent({ isVisible, onClose, onSave, idsubcanal, email, password }) {

    const navigation = useNavigation();
    const [numeroPoliza, setNumeroPoliza] = useState('6040035690');

    const handleGuardarPoliza = async () => {
        onSave(numeroPoliza, idsubcanal, email, password);
        try {
            const DataRquest = {
                numeroPoliza: numeroPoliza,
                IDSubcananal: idsubcanal,
                usuario: email,
                contraseña: password,
            }
            const response = await GetPolizaPdfApi(DataRquest);

            if (response.data.Data.Data) {
                const data = response.data.Data.Data;
                const pdfUrl = data;
                navigation.navigate('PDFViewerScreen', { pdfUrl });
            } else {
                console.error('La respuesta de la API no contiene pdf de poliza.');
            }

        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    };

    return (
        <Modal transparent={true} visible={isVisible}>
            <View style={modalStyles.modalContainer}>
                <View style={modalStyles.modalContent}>
                    <View style={modalStyles.iconContainer}>
                        <Image
                            source={IconsAlerts['Icon_Blue.png']}
                            style={modalStyles.iconImage}
                        />
                    </View>
                    <Text style={modalStyles.LabelTxt}>
                        Ingrese el número de póliza:
                    </Text>
                    <TextInput
                        value={numeroPoliza}
                        onChangeText={(text) => setNumeroPoliza(text)}
                        placeholder="Número de Póliza"
                        style={modalStyles.input}
                    />
                    <View style={modalStyles.buttonContainer}>
                        <TouchableOpacity onPress={handleGuardarPoliza} style={modalStyles.saveButton}>
                            <Text style={modalStyles.buttonText}>Guardar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onClose} style={modalStyles.cancelButton}>
                            <Text style={modalStyles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

