import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal, Image } from 'react-native';
import { GetPolizaPdfApi } from '../Api/api';
import { useNavigation } from '@react-navigation/native';
import modalStyles from '../Styles/ModalStyles';
import { IconsAlerts } from '../Utilities';
import CustomAlert from '../Componentes/CustomAlert';
import LoadingComponent from '../Componentes/LoadingComponent';

export default function ModalContent({ isVisible, onClose, onSave, idsubcanal, email, password }) {

    const navigation = useNavigation();
    const [numeroPoliza, setNumeroPoliza] = useState('6040035690');
    const [isAlertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [IconMessage, setIconMessage] = useState('Icon_Blue.png');
    const [isAlertTwo, setAlertTwo] = useState(false);
    const [Isloading, setIsloading] = useState(false);

    const handleGuardarPoliza = async () => {
        // onSave(numeroPoliza, idsubcanal, email, password);
        try {
            setIsloading(true);
            const DataRquest = {
                numeroPoliza: numeroPoliza,
                IDSubcananal: idsubcanal,
                usuario: email,
                contraseña: password,
            }
            // console.log('data polizaaaa', DataRquest)
            const response = await GetPolizaPdfApi(DataRquest);
            if (response.data.Data.Data) {
                const data = response.data.Data.Data;
                const pdfUrl = data;
                setIsloading(false);
                navigation.navigate('PDFViewerScreen', { pdfUrl });
            } else {
                setIsloading(false);
                setAlertMessage(response.data.Data.Message);
                setAlertVisible(true);
                //console.error('La respuesta de la API no contiene pdf de poliza.');
            }
        } catch (error) {
            setIsloading(false);
            setAlertMessage('Error al obtener los datos:', error);
            setAlertVisible(true);
            //console.error('Error al obtener los datos:', error);
        }
    };

    const hideAlert = () => {
        setAlertVisible(false);
    };

    const handleOnclose = () => {
        setFolioCotizacion("");
        onClose();
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

            {Isloading && (
                <LoadingComponent />
            )}

            {isAlertVisible && (
                <CustomAlert
                    visible={isAlertVisible}
                    message={alertMessage}
                    iconName={IconMessage}
                    onClose={hideAlert}
                    AlertTwo={isAlertTwo}
                />
            )}
        </Modal>
    );
}

