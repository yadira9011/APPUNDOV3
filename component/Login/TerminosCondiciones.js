import React, { useState } from 'react';
import { View, Text, CheckBox, Modal, Button } from 'react-native';

import { UpdateAceptaTerminosCondiciones } from '../Api/api';
import CustomAlert from '../Componentes/CustomAlert';

const TerminosCondiciones = ({ onClose }) => {
    const [isCheckedTerminos, setIsCheckedTerminos] = useState(false);
    const [isCheckedAviso, setIsCheckedAviso] = useState(false);

    const [isAlertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [IconMessage, setIconMessage] = useState('Icon_Blue.png');
    const [isAlertTwo, setAlertTwo] = useState(false);

    const handleAccept = async () => {

        const TYC = CheckTerminos();

        if (TYC) {

            const credential = {
                Contraseña: password,
                Usuario: email,
                IdUsuario: IdUsuario,
                Check: TYC
            };

            const Resultado = await UpdateAceptaTerminosCondiciones(credential)

            if (!Resultado.hasError) {
                if (Resultado.data == null) {
                    setAlertMessage("error al aceptar Terminos y condiciones.");
                }
                onClose();
            } else {
                setAlertMessage(Resultado.message);
                onClose();
            }
            
        } else {
            setAlertMessage("Debes de aceptar el aviso de privacidad, así como términos y condiciones para continuar.");
        }

    };

    const CheckTerminos = () => {
        if (isCheckedTerminos == true && isCheckedAviso == true) {
            return true;
        } else {
            return false;
        }
    };

    const hideAlert = () => {
        setAlertVisible(false);
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
