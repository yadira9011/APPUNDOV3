import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal, StyleSheet } from 'react-native';
import { GetCotizacionApi } from '../api';
import { useNavigation } from '@react-navigation/native';

export default function ModalSolitarCotizacion({ isVisible, onClose, onSave, email, password }) {

    const navigation = useNavigation();
    const [FolioCotizacion, setFolioCotizacion] = useState('AUT-1-12102023092450535');

    const handleBuscarCotizacion = async () => {

        onSave(FolioCotizacion, email, password);

        try {

            const DataRquest = {
                numeroPoliza: FolioCotizacion,
                usuario: email,
                contraseña: password,
            }

            const response = await GetCotizacionApi(DataRquest);

            if (response.data.Data.Data) {
                
                datos_cot=response.data.Data;
                // console.log(datos_cot);
                const parametros = JSON.parse(datos_cot.Parametros);
                console.log(parametros);

                // const DataSolicitudTitulos = {
                //     DescripcionVehiculo: selectedTextDescripcion,
                //     Modelo: selectedTextModelo,
                //     TipoAut: selectedTextTipoVehiculo,
                //     Marca: selectedTextMarca,
                //     EstatusVehiculo: selectedTextEstatusVehiculo,
                //     TipoUso: selectedTextTipoUso,
                //     tipoPaquete: selectedTextPaquetes,
                //     tipoPoliza: selectedTextTipoPoliza,
                //     tipoVigenciaPago: selectedTextTipoVigencia,
                // }

                // const dataCotizacion = {
                //     ClaveVehiculo: selectedOptionDescripcion,
                //     IDTipoVehiculo: selectedOptionTipoVehiculo,
                //     IDEstatusVehiculo: selectedOption,
                //     IDIndenmizacion: selectedOptionIndemnizacion,
                //     SumaAsegurada: textMonto,
                //     CodigoPostal: textCP,
                //     IDTipoUso: selectedOptionTipoUso,
                //     IDDeducibles: selectedOptionDeducible,
                //     IDPagoVigencia: selectedOptionVigencia,
                //     IDUDI: 0,
                //     IDPaquete: selectedOptionPaquete,
                //     ColoniaPersona: TextColonia,
                //     MunicipioPersona: TextMunicipio,
                //     CiudadPersona: TextCiudad,
                //     EstadoPersona: TextEstado,
                //     usuario: DataParameter.email,
                //     contraseña: DataParameter.password,
                //     IDSubcananal: DataParameter.IdSubCanal
                // }

                // const dataArray = {
                //     DataResul: resultData,
                //     CotiData: dataCotizacion,
                //     DataTitulos: DataSolicitudTitulos
                // }
                
                // navigation.navigate('ResultadoCotizacion', { dataArray });

            }
            
        } catch (error) {
            console.log(error);
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
                        value={FolioCotizacion}
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
