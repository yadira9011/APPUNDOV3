import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal, StyleSheet } from 'react-native';
import { GetCotizacionApi } from '../Api/api';
import { useNavigation } from '@react-navigation/native';

export default function ModalSolitarCotizacion({ isVisible, onClose, onSave, idsubcanal, email, password }) {

    const navigation = useNavigation();
    const [FolioCotizacion, setFolioCotizacion] = useState('AUT-1-11112023124847111');
    // AUT-1-12102023082739534
    //AUT-1-11112023124847111

    const handleBuscarCotizacion = async () => {

        onSave(FolioCotizacion, email, password, idsubcanal);
        try {

            const DataRquest = {
                Cotizacion: FolioCotizacion,
                IdSubcanal: idsubcanal,
                IdUsuario: 1,
                usuario: email,
                contraseña: password,
            }
            console.log("aqqqqqq",DataRquest);
            const response = await GetCotizacionApi(DataRquest);
            if (!response.data.Data.HasError) {
                const datos_cot = response.data.Data.Data;
                const parametros_cot = datos_cot.parametros;
                // console.log(parametros_cot);
                // const parametros = JSON.parse(datos_cot.Parametros);
                // console.log(parametros);
                const DataSolicitudTitulos = {
                    DescripcionVehiculo: parametros_cot.vehiculo.Descripcion.text,
                    Modelo: parametros_cot.vehiculo.Modelo,
                    TipoAut: parametros_cot.vehiculo.Tipo.text,
                    Marca: parametros_cot.vehiculo.Marca.text,
                    EstatusVehiculo: parametros_cot.EstatusVehiculo.text,
                    TipoUso: parametros_cot.TipoUso.text,
                    tipoPaquete: parametros_cot.Paquetes.text,
                    tipoPoliza: parametros_cot.TipoPoliza.text,
                    tipoVigenciaPago: parametros_cot.PagoVigencia.text,
                }
                //console.log(DataSolicitudTitulos);
                //console.log( parametros_cot.vehiculo);
                const dataCotizacion = {
                    ClaveVehiculo: parametros_cot.vehiculo.Descripcion.cu,
                    IDTipoVehiculo: parametros_cot.TipoVehiculo.value,
                    IDEstatusVehiculo: parametros_cot.EstatusVehiculo.value,
                    IDIndenmizacion: parametros_cot.Indemnizacion.value,
                    SumaAsegurada: parametros_cot.SumaAsegurada,
                    CodigoPostal: parametros_cot.CodigoPostal,
                    IDTipoUso: parametros_cot.TipoUso.value,
                    IDDeducibles: parametros_cot.Deducibles.value,
                    IDPagoVigencia: parametros_cot.PagoVigencia.value,
                    IDUDI: 0,
                    IDPaquete: parametros_cot.Paquetes.value,
                    ColoniaPersona:parametros_cot.ColoniaPersona,
                    MunicipioPersona: parametros_cot.MunicipioPersona,
                    CiudadPersona: parametros_cot.CiudadPersona,
                    EstadoPersona: parametros_cot.EstadoPersona,
                    usuario: email,
                    contraseña: password,
                    IDSubcananal: idsubcanal
                }
                //console.log("cottttt",dataCotizacion)
                const resultData = datos_cot.responses
                const dataArray = {
                    DataResul: resultData,
                    CotiData: dataCotizacion,
                    DataTitulos: DataSolicitudTitulos
                }
                
                navigation.navigate('ResultadoCotizacion', { dataArray });

            } else {
                alert(response.data.Data.Message);
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
