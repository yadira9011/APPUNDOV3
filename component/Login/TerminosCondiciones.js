import React, { useState } from 'react';
import { View, Text, Modal, Button, Switch, TouchableOpacity, Image } from 'react-native';
import { UpdateAceptaTerminosCondiciones } from '../Api/api';
import CustomAlert from '../Componentes/CustomAlert';
import modalStyles from '../Styles/ModalStyles';
import { IconsAlerts } from '../Utilities';

const TerminosCondiciones = ({ onClose, password, email, IdUsuario }) => {
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
            console.log("for TyC", credential)
            const Resultado = await UpdateAceptaTerminosCondiciones(credential)
            console.log("for TyC rrrr", Resultado)
            if (!Resultado.data.Data.hasError) {
                if (Resultado.data.Data.Data == null) {
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
                    <View style={modalStyles.iconContainer}>
                        {/* <Image
              source={require('../../assets/IconoU.png')}
              style={styles.iconImage}
            /> */}
                        <Image
                            source={IconsAlerts['Icon_Blue.png']}
                            style={modalStyles.iconImage}
                        />
                    </View>
                    <View style={styles.formCheck}>

                        <Switch
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={isCheckedTerminos ? '#f5dd4b' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => setIsCheckedTerminos(!isCheckedTerminos)}
                            value={isCheckedTerminos}
                        />

                        {/* <CheckBox
                            disabled={false}
                            value={isCheckedTerminos}
                            onValueChange={() => setIsCheckedTerminos(!isCheckedTerminos)}
                        /> */}
                        {/* <CheckBox
                            disabled={false}
                            value={toggleCheckBox}
                            onValueChange={(newValue) => setToggleCheckBox(newValue)}
                        /> */}
                        <Text style={{ marginLeft: 10 }}  >Acepto términos y condiciones.</Text>
                    </View>
                    <View style={styles.formCheck}>

                        <Switch
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={isCheckedAviso ? '#f5dd4b' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => setIsCheckedAviso(!isCheckedAviso)}
                            value={isCheckedAviso}
                        />

                        {/* <CheckBox
                            disabled={false}
                            value={isCheckedAviso}
                            onValueChange={() => setIsCheckedAviso(!isCheckedAviso)}
                        /> */}

                        <Text style={{ marginLeft: 10 }} >Aviso de privacidad.</Text>

                    </View>
                    <View style={styles.buttonContainer}>
                        {/* <Button title="Aceptar" onPress={handleAccept} /> */}
                        <TouchableOpacity
                            style={styles.confirmButton}
                            onPress={handleAccept}>
                            <Text style={styles.closeButtonText}>Aceptar</Text>
                        </TouchableOpacity>
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
        width: '100%',
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
        width: '80%',
    },
    formCheck: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },

    buttonContainer: {
        alignItems: 'center',
        marginTop: 10,
    },

    confirmButton: {
        alignSelf: 'center',
        marginTop: 5,
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: 'green',
        borderRadius: 5,
    },

    closeButtonText: {
        color: 'white',
        textAlign: 'center',
    },
};

export default TerminosCondiciones;
