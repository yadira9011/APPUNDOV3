import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';

const ResultadoCotizacionScreen = () => {

    const route = useRoute();
    const { dataArray } = route.params;
    const [folioCotizacion, setFolioCotizacion] = useState(null);
    const [CotizacionData, setCotizacionData] = useState([]);

    const imagePaths = [
        { name: 'LogoChubb', path: require('../../assets/Aseguradoras/LogoChubb.png') },
        { name: 'LogoGnp', path: require('../../assets/Aseguradoras/LogoGnp.gif') },
        { name: 'LogoGS', path: require('../../assets/Aseguradoras/LogoGS.png') },
        { name: 'LogoHdi', path: require('../../assets/Aseguradoras/LogoHdi.png') },
        { name: 'LogoProagro', path: require('../../assets/Aseguradoras/LogoProagro.png') },
        { name: 'LogoQualitas', path: require('../../assets/Aseguradoras/LogoQualitas.jpg') },
        { name: 'LogoSura', path: require('../../assets/Aseguradoras/LogoSura.png') }
    ];


    useEffect(() => {
        if (dataArray.length > 0) {
            const primerElemento = dataArray[0];
            setFolioCotizacion(primerElemento.Folio);
            const newArray = dataArray.map(item => {
                let data = null;

                const logoase = item.LogoAseguradora;
                const logoNameWithoutExtension = logoase.split('.')[0];
                const ImagePath = imagePaths.find(image => image.name === logoNameWithoutExtension);

                data = {
                    id: item.IDCotizacion,
                    Paquete: item.Paquete,
                    TipoPoliza: item.TipoPoliza,
                    FormaPago: item.FormaPago,
                    Indenmizacion: item.Indenmizacion,
                    Deducibles: "DM" + item.DeducibleDM + " RT" + item.DeducibleRT,
                    Vigencia: item.Vigencia,
                    DerechosPoliza: item.DerechosPoliza,
                    PrimaTotal: item.PrimaTotal,
                    HasError: item.HasError,
                    Message: item.Message,
                    imageUrl: ImagePath.path,
                };
                return data;
            });
            setCotizacionData(newArray);
        }
    }, [dataArray]);




    const renderItem = ({ item, onPress }) => (
        <TouchableOpacity style={styles.itemContainer} onPress={() => onPress(item)}>
            <Image source={item.imageUrl} style={styles.image} />
            <View style={styles.itemDetails}>
                {item.HasError ? (
                    <Text style={styles.errorText}>{item.Message}</Text>
                ) : (
                    <>
                        <Text style={styles.description}>Paquete: {item.Paquete}</Text>
                        <Text style={styles.description}>Tipo de Póliza: {item.TipoPoliza}</Text>
                        <Text style={styles.description}>Forma de Pago: {item.FormaPago}</Text>
                        <Text style={styles.description}>Indemnización: {item.Indenmizacion}</Text>
                        <Text style={styles.description}>Deducibles: {item.Deducibles}</Text>
                        <Text style={styles.description}>Vigencia: {item.Vigencia}</Text>
                        <Text style={styles.description}>Derechos de Póliza: {item.DerechosPoliza}</Text>
                        <Text style={styles.description}>Prima Total: {item.PrimaTotal}</Text>
                    </>
                )}
            </View>
        </TouchableOpacity>
    );

    const handleItemClick = (item) => {
        console.log('Elemento clickeado:', item);
    };

    return (
        <View style={styles.container}>
            <Text>{folioCotizacion}</Text>
            <FlatList
                data={CotizacionData}
                keyExtractor={item => item.id}
                renderItem={({ item }) => renderItem({ item, onPress: handleItemClick })}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    itemContainer: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    image: {
        width: 100,
        height: 100,
        marginRight: 16,
        borderRadius: 8,
    },
    itemDetails: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    description: {
        marginTop: 4,
        color: 'gray',
    },
    errorText: {
        color: 'red',
    },
});




export default ResultadoCotizacionScreen;