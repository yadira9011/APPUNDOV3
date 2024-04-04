import React, { useState } from 'react';
import { View, Text, CheckBox, Modal, Button } from 'react-native';

const TerminosCondiciones = ({ onClose }) => {
    const [isCheckedTerminos, setIsCheckedTerminos] = useState(false);
    const [isCheckedAviso, setIsCheckedAviso] = useState(false);

    const handleAccept = () => {
        // Aquí puedes manejar la lógica cuando el usuario acepta los términos y condiciones
        onClose();
    };

    return (
        <Modal visible={true} animationType="slide" transparent={true}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.formCheck}>
                        <CheckBox
                            value={isCheckedTerminos}
                            onValueChange={() => setIsCheckedTerminos(!isCheckedTerminos)}
                        />
                        <Text>Acepto términos y condiciones.</Text>
                    </View>
                    <View style={styles.formCheck}>
                        <CheckBox
                            value={isCheckedAviso}
                            onValueChange={() => setIsCheckedAviso(!isCheckedAviso)}
                        />
                        <Text>Aviso de privacidad.</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button title="Aceptar" onPress={handleAccept} />
                        <Button title="Cancelar" onPress={onClose} />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = {
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        minWidth: 300,
    },
    formCheck: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
};

export default TerminosCondiciones;
