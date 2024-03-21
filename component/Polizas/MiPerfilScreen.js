
import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    SectionList,
    ActivityIndicator,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
    ScrollView,
    FlatList,
    Button,
    Modal
} from 'react-native';

import {
    GetDetallePersona,
    UpdateMantenimientoPersona,
    ActualizaUsuarioPerfil
} from '../Api/api_polizas';

import { GetDias, GetMeses, GetAnyos, GetGeneros, } from '../Api/api';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import Collapsible from 'react-native-collapsible';
import { Ionicons } from '@expo/vector-icons';
import LoadingComponent from '../Componentes/LoadingComponent';
import RNPickerSelect from 'react-native-picker-select';
import pickerSelectStyles from '../Styles/PickerSelectStyles';

const MiPerfilScreen = ({ route }) => {

    const navigation = useNavigation();
    const { DataParameter } = route.params;
    const [loading, setLoading] = useState(false);

    const [nombreCompleto, setNombreCompleto] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellidoPaterno, setApellidoPaterno] = useState('');
    const [apellidoMaterno, setApellidoMaterno] = useState('');
    const [rfc, setRFC] = useState('');
    const [genero, setGenero] = useState('');
    const [correoElectronico, setCorreoElectronico] = useState('');
    const [movil, setMovil] = useState('');
    const [fijo, setFijo] = useState('');
    const [numeroEmpleado, setNumeroEmpleado] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [edad, setEdad] = useState('');
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');

    const [dias, setDias] = useState([]);
    const [meses, setMeses] = useState([]);
    const [anos, setAnos] = useState([]);
    const [generos, setGeneros] = useState([]);

    const [selectedDia, setSelectedDia] = useState(0);
    const [selectedMes, setSelectedMes] = useState(0);
    const [selectedAno, setSelectedAno] = useState(0);
    const [selectedGenero, setSelectedGenero] = useState('');

    useEffect(() => {

        const loadData = async () => {
            try {
                console.log("PARAMETROS", DataParameter)
                setLoading(true);
                await fetchAutoGeneros();
                await fetchAutoDias();
                await fetchAutoMeses();
                await fetchAutoAynos();
                await fetchDetallePersona();

                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error('Error al obtener los datos:', error);
            }
        };
        loadData();

    }, []);

    const fetchAutoGeneros = async () => {
        try {
            const DataRquest = {
                usuario: DataParameter.email,
                contraseña: DataParameter.password
            }
            const response = await GetGeneros(DataRquest);
            if (response.data.Data.Data) {
                const data = response.data.Data.Data;
                setGeneros(data);
            } else {
                console.error('La respuesta de la API no contiene paquetes.');
            }
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener los datos:', error);
            setLoading(false);
        }
    };

    const fetchAutoDias = async () => {
        try {

            const DataRquest = {
                usuario: DataParameter.email,
                contraseña: DataParameter.password
            }
            const response = await GetDias(DataRquest);
            if (response.data.Data.Data) {
                const data = response.data.Data.Data;
                setDias(data);
            } else {
                console.error('La respuesta de la API no contiene paquetes.');
            }
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener los datos:', error);
            setLoading(false);
        }
    };

    const fetchAutoMeses = async () => {
        try {
            const DataRquest = {
                usuario: DataParameter.email,
                contraseña: DataParameter.password
            }
            const response = await GetMeses(DataRquest);
            if (response.data.Data.Data) {
                const data = response.data.Data.Data;
                setMeses(data);
            } else {
                console.error('La respuesta de la API no contiene paquetes.');
            }
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener los datos:', error);
            setLoading(false);
        }

    };

    const fetchAutoAynos = async () => {
        try {

            const DataRquest = {
                usuario: DataParameter.email,
                contraseña: DataParameter.password
            }

            const response = await GetAnyos(DataRquest);

            if (response.data.Data.Data) {
                const data = response.data.Data.Data;
                setAnos(data);
            } else {
                console.error('La respuesta de la API no contiene paquetes.');
            }
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener los datos:', error);
            setLoading(false);
        }
    };

    const fetchDetallePersona = async () => {
        try {

            const DataRquest = {
                idPersona: DataParameter.IdPersona,
                usuario: DataParameter.email,
                contraseña: DataParameter.password
            }

            const response = await GetDetallePersona(DataRquest);

            console.log(response.data.Data);

            if (response.data.Data) {

                const data = response.data.Data;
                console.log("Detalle persona", data);
                setNombreCompleto(response.data.Data.FSNOMBRE_COMPLETO);
                setNombre(response.data.Data.FSNOMBRE);
                setApellidoPaterno(response.data.Data.FSAPELLIDO_PATERNO);
                setApellidoMaterno(response.data.Data.FSAPELLIDO_MATERNO);
                setRFC(response.data.Data.FSRFC);
                setCorreoElectronico(response.data.Data.FSCORREO);
                setMovil(response.data.Data.FSMOVIL);
                setFijo(response.data.Data.FSTELEFONO);
                setNumeroEmpleado(response.data.Data.FSNUMERO_EMPLEADO);

                var edadPersona = response.data.Data.FIEDAD;
                setEdad(edadPersona.toString());

                setUsuario(DataParameter.email);
                setContrasena(DataParameter.password);
                setSelectedGenero(response.data.Data.FIIDGENERO);

                //const fechaNacimientoString = "24/06/1981";
                const fechaNacimientoString = response.data.Data.FDNACIMIENTO;
                console.log(fechaNacimientoString)
                const [diaN, mesN, anoN] = fechaNacimientoString.split('/');
                setSelectedDia(parseInt(diaN, 10));
                setSelectedMes(parseInt(mesN, 10));
                setSelectedAno(parseInt(anoN, 10));

            } else {
                console.error('La respuesta de la API no contiene personas.');
            }
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener los datos:', error);
            setLoading(false);
        }
    };

    const handleFormSubmit = async () => {

        const IdPersona = DataParameter.IdPersona;
        const Nombre = nombre;
        const Paterno = apellidoPaterno;
        const Materno = apellidoMaterno;
        const Rfc = rfc;
        const Correo = correoElectronico;
        const NumeroEmpleado = numeroEmpleado;
        const Edad = edad;
        const IdGenero = selectedGenero;
        const anyoNacimiento = selectedAno;
        const Nacimiento = selectedAno + "-" + selectedMes + "-" + selectedDia;
        const Movil = movil;
        const Telefono = fijo;
        const IdTipoAsegurado = 1;
        const IdSubcanal = DataParameter.IdSubCanal;
        const TipoPersona = 1

        const PersonaModel = {
            IdPersona,
            Nombre,
            Paterno,
            Materno,
            Rfc,
            NumeroEmpleado,
            Edad,
            Correo,
            Nacimiento,
            Movil,
            Telefono,
            IdGenero,
            IdTipoAsegurado,
            IdSubcanal,
            TipoPersona
        }

        const DataRquest = {
            idPersona: DataParameter.IdPersona,
            usuario: DataParameter.email,
            contraseña: DataParameter.password,
            PersonaModel: PersonaModel
        }

        const response = await UpdateMantenimientoPersona(DataRquest);
        if (response.data != 0) {
            let msg = "Se actualizo el perfil exitosamente.";
            const DataRquestPerfil = {
                usuario: DataParameter.email,
                contraseña: DataParameter.password,
                usuarioNew: usuario,
                ContraseñaNew: contrasena,
                IDUsuario: DataParameter.IdUsr,
            }
            console.log(DataRquestPerfil)
            const responseperfil = await ActualizaUsuarioPerfil(DataRquestPerfil);
            if (result.hasError) {
                msg = "Se actualizaron los datos personales, Sin embargo la cuenta no se actualizó derivado a:  " + result.message;
            }
            Alert.alert(msg)
        } else {
            Alert.alert("Los datos no se actualizaron, intente mas tarde.");
        }

    };

    return (
        <View>
            <ScrollView >
                <View style={styles.container}>

                    <Text style={styles.LabelTextHeader}>{nombreCompleto} </Text>

                    {/* Campos de información personal */}
                    <Text style={styles.LabelText}>Nombre:</Text>
                    <TextInput
                        style={styles.inputText}
                        value={nombre}
                        onChangeText={setNombre}
                    />

                    <Text style={styles.LabelText}>Apellido Paterno:</Text>
                    <TextInput
                        style={styles.inputText}
                        value={apellidoPaterno}
                        onChangeText={setApellidoPaterno}
                    />

                    <Text style={styles.LabelText}>RFC:</Text>
                    <TextInput
                        style={styles.inputText}
                        value={rfc}
                        onChangeText={setRFC}
                    />

                    <Text style={styles.LabelText}>Género</Text>

                    <RNPickerSelect
                        onValueChange={(itemValue) => setSelectedGenero(itemValue)}
                        items={generos.map((genero) => ({
                            label: genero.Valor,
                            value: genero.Id,
                        }))}
                        value={selectedGenero}
                        style={pickerSelectStyles}
                    />

                    <Text style={styles.LabelText}>Correo Electrónico:</Text>
                    <TextInput
                        style={styles.inputText}
                        value={correoElectronico}
                        onChangeText={setCorreoElectronico}
                    />

                    <Text style={styles.LabelText}>Móvil:</Text>
                    <TextInput
                        style={styles.inputText}
                        value={movil}
                        onChangeText={setMovil}
                    />

                    <Text style={styles.LabelText}>Fijo:</Text>
                    <TextInput
                        style={styles.inputText}
                        value={fijo}
                        onChangeText={setFijo}
                    />

                    <Text style={styles.LabelText}>Número de Empleado:</Text>
                    <TextInput
                        style={styles.inputText}
                        value={numeroEmpleado}
                        onChangeText={setNumeroEmpleado}
                    />

                    <Text style={styles.LabelText}>Fecha de Nacimiento:</Text>
                    <View style={{
                        flexDirection: 'row',
                        marginTop: 25,
                        marginBottom: 15,
                    }}>
                        <RNPickerSelect
                            onValueChange={(itemValue) => setSelectedDia(itemValue)}
                            items={dias.map((dia) => ({
                                label: dia.Valor,
                                value: dia.Id,
                            }))}
                            value={selectedDia}
                            style={{
                                inputAndroid: {
                                    fontSize: 7,
                                    color: 'blue',
                                    width: 130,
                                    backgroundColor: 'white',
                                },
                                inputIOS: {
                                    fontSize: 12,
                                    color: 'blue',
                                    width: 80,
                                    backgroundColor: 'white',
                                    textAlign: 'center',
                                },
                                viewContainer: {
                                    padding: 0,
                                },
                            }}
                            placeholder={{
                                label: 'Mes',
                                value: null,
                                color: 'blue',
                                fontSize: 5,
                            }}
                        />

                        <RNPickerSelect
                            onValueChange={(itemValue) => setSelectedMes(itemValue)}
                            items={meses.map((mes) => ({
                                label: mes.Valor,
                                value: mes.Id,
                            }))}
                            value={selectedMes}
                            style={{
                                inputAndroid: {
                                    fontSize: 7,
                                    color: 'blue',
                                    width: 130,
                                    backgroundColor: 'white',
                                },
                                inputIOS: {
                                    fontSize: 12,
                                    color: 'blue',
                                    width: 80,
                                    backgroundColor: 'white',
                                    textAlign: 'center',
                                },
                                viewContainer: {
                                    padding: 0,
                                },
                            }}
                            placeholder={{
                                label: 'Día',
                                value: null,
                                color: 'blue',
                                fontSize: 5,
                            }} />


                        <RNPickerSelect
                            onValueChange={(itemValue) => setSelectedAno(itemValue)}
                            items={anos.map((ano) => ({
                                label: ano.Valor,
                                value: ano.Id,
                            }))}
                            value={selectedAno}
                            style={{
                                inputAndroid: {
                                    fontSize: 7,
                                    color: 'blue',
                                    width: 130,
                                    backgroundColor: 'white',
                                },
                                inputIOS: {
                                    fontSize: 12,
                                    color: 'blue',
                                    width: 80,
                                    backgroundColor: 'white',
                                    textAlign: 'center',
                                },
                                viewContainer: {
                                    padding: 0,
                                },
                            }}
                            placeholder={{
                                label: 'Año',
                                value: null,
                                color: 'blue',
                                fontSize: 5,
                            }} />
                    </View>

                    <Text style={styles.LabelText}>Edad:</Text>

                    <TextInput
                        style={styles.inputText}
                        value={edad}
                        onChangeText={setEdad}
                    />

                    {/* Campos de cuenta de acceso */}
                    <Text style={styles.LabelText}>Usuario:</Text>
                    <TextInput
                        style={styles.inputText}
                        value={usuario}
                        onChangeText={setUsuario}
                    />

                    <Text style={styles.LabelText}>Contraseña:</Text>
                    <TextInput
                        style={styles.inputText}
                        secureTextEntry
                        value={contrasena}
                        onChangeText={setContrasena}
                    />

                    {/* <Button title="Actualizar"
                        onPress={handleFormSubmit}
                        style={styles.submitButton} /> */}

                    <TouchableOpacity style={styles.submitButton} onPress={handleFormSubmit}>
                        <Text style={styles.ButtonText}>Actualizar</Text>
                    </TouchableOpacity>

                    <View style={styles.spaceAfterButton} />

                </View>
            </ScrollView>
            {loading && (
                <LoadingComponent />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 5,
        backgroundColor: '#fff',
        marginBottom: 10,
    },

    inputText: {
        height: 40,
        width: '90%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 8,
        borderRadius: 12,
        alignSelf: 'center'
    },

    LabelTextHeader: {
        marginTop: 10,
        marginBottom:10,
        marginLeft: 15,
        marginRight: 15,
        alignItems: 'center',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        alignSelf: 'center',
    },

    LabelText: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 15,
        fontWeight: 'bold',
    },
    
    submitButton: {
        backgroundColor: '#007bff',
        width: '80%',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 40,
        marginLeft: 15,
        marginRight: 15,
        alignSelf: 'center',
        alignItems: 'center',
    },
    ButtonText: {
        color: 'white',
        textAlign: 'center',
      },
    spaceAfterButton: {
        marginBottom: 30,

    },
});

export default MiPerfilScreen;
