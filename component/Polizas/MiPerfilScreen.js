
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
        const IdSubcanal= DataParameter.IdSubCanal;
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

        console.log(DataRquest)
        const response = await UpdateMantenimientoPersona(DataRquest);
        console.log(response)

        // if (response.data.Data.Data) {
        //     const data = response.data.Data.Data;
        //     setMeses(data);
        // } else {
        //     console.error('La respuesta de la API no contiene paquetes.');
        // }

        // const DataRquestPerfil = {
        //     usuario: DataParameter.email,
        //     contraseña: DataParameter.password,
        //     usuarioNew: usuario,
        //     ContraseñaNew: contrasena,
        //     IDUsuario: DataParameter.IdUsr,
        // }
        // console.log(DataRquestPerfil)
        //  const responseperfil = await ActualizaUsuarioPerfil(DataRquestPerfil);

    };

    return (
        <View>
            <ScrollView >
                <View style={styles.container}>

                    <Text>{nombreCompleto} </Text>

                    {/* Campos de información personal */}
                    <Text>Nombre:</Text>
                    <TextInput
                        style={styles.input}
                        value={nombre}
                        onChangeText={setNombre}
                    />

                    <Text>Apellido Paterno:</Text>
                    <TextInput
                        style={styles.input}
                        value={apellidoPaterno}
                        onChangeText={setApellidoPaterno}
                    />

                    <Text>RFC:</Text>
                    <TextInput
                        style={styles.input}
                        value={rfc}
                        onChangeText={setRFC}
                    />

                    <Text>Género</Text>
                    <Picker
                        selectedValue={selectedGenero}
                        onValueChange={(itemValue) => setSelectedGenero(itemValue)}
                        style={styles.input}
                    >
                        <Picker.Item label="Selecciona género" value="" />
                        {generos.map((genero) => (
                            <Picker.Item key={genero.Id} label={genero.Valor} value={genero.Id} />
                        ))}
                    </Picker>

                    <Text>Correo Electrónico:</Text>
                    <TextInput
                        style={styles.input}
                        value={correoElectronico}
                        onChangeText={setCorreoElectronico}
                    />

                    <Text>Móvil:</Text>
                    <TextInput
                        style={styles.input}
                        value={movil}
                        onChangeText={setMovil}
                    />

                    <Text>Fijo:</Text>
                    <TextInput
                        style={styles.input}
                        value={fijo}
                        onChangeText={setFijo}
                    />

                    <Text>Número de Empleado:</Text>
                    <TextInput
                        style={styles.input}
                        value={numeroEmpleado}
                        onChangeText={setNumeroEmpleado}
                    />

                    <Text>Fecha de Nacimiento:</Text>


                    <Picker
                        style={styles.picker}
                        selectedValue={selectedDia}
                        onValueChange={(itemValue) => setSelectedDia(itemValue)}
                    >
                        <Picker.Item label="Selecciona día" value="" />
                        {dias.map((dia) => (
                            <Picker.Item key={dia.Id} label={dia.Valor} value={dia.Id} />
                        ))}
                    </Picker>

                    <Picker
                        style={styles.picker}
                        selectedValue={selectedMes}
                        onValueChange={(itemValue) => setSelectedMes(itemValue)}
                    >
                        <Picker.Item label="Selecciona mes" value="" />
                        {meses.map((mes) => (
                            <Picker.Item key={mes.Id} label={mes.Valor} value={mes.Id} />
                        ))}
                    </Picker>

                    <Picker
                        style={styles.picker2}
                        selectedValue={selectedAno}
                        onValueChange={(itemValue) => setSelectedAno(itemValue)}
                    >
                        <Picker.Item label="Selecciona año" value="" />
                        {anos.map((ano) => (
                            <Picker.Item key={ano.Id} label={ano.Valor} value={ano.Id} />
                        ))}
                    </Picker>


                    <Text>Edad:</Text>

                    <TextInput
                        style={styles.input}
                        value={edad}
                        onChangeText={setEdad}
                    />

                    {/* Campos de cuenta de acceso */}
                    <Text>Usuario:</Text>
                    <TextInput
                        style={styles.input}
                        value={usuario}
                        onChangeText={setUsuario}
                    />

                    <Text>Contraseña:</Text>
                    <TextInput
                        style={styles.input}
                        secureTextEntry
                        value={contrasena}
                        onChangeText={setContrasena}
                    />

                    {/* Botón de envío del formulario */}
                    <Button title="Actualizar" onPress={handleFormSubmit} style={styles.submitButton} />
                    {/* Espacio después del botón */}
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
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 8,
    },
    submitButton: {
        marginBottom: 30,
    },
    spaceAfterButton: {
        marginBottom: 30,
    },
});

export default MiPerfilScreen;
