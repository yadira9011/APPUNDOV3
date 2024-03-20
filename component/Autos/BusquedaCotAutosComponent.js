import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal, StyleSheet, Image } from 'react-native';
import { GetCotizacionApi } from '../Api/api';
import { useNavigation } from '@react-navigation/native';
import modalStyles from '../Styles/ModalStyles';
import { IconsAlerts } from '../Utilities';

export default function ModalSolitarCotizacion({ isVisible, onClose, onSave, idsubcanal, email, password, DataParameter }) {

    const navigation = useNavigation();
    const [FolioCotizacion, setFolioCotizacion] = useState('AUT-3164-23022024133225346');

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
            const response = await GetCotizacionApi(DataRquest);
            if (!response.data.Data.HasError) {
                const datos_cot = response.data.Data.Data;
                const parametros_cot = datos_cot.parametros;
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
                    ColoniaPersona: parametros_cot.ColoniaPersona,
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
                    DataTitulos: DataSolicitudTitulos,
                    DataParameter: DataParameter
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
            <View style={modalStyles.modalContainer}>
                <View style={modalStyles.modalContent}>
                    <View style={modalStyles.iconContainer}>
                        <Image
                            source={IconsAlerts['Icon_Blue.png']}
                            style={modalStyles.iconImage}
                        />
                    </View>
                    <Text style={modalStyles.LabelTxt}>
                        Folio de Cotización:
                    </Text>
                    <TextInput
                        value={FolioCotizacion}
                        onChangeText={(text) => setFolioCotizacion(text)}
                        placeholder="Folio de Cotización"
                        style={modalStyles.input}
                    />
                    <View style={modalStyles.buttonContainer}>
                        <TouchableOpacity onPress={handleBuscarCotizacion} style={modalStyles.saveButton}>
                            <Text style={modalStyles.buttonText}>Buscar</Text>
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
