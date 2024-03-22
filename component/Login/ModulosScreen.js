import React from 'react';
import {
    SafeAreaView,
    View,
    VirtualizedList,
    StyleSheet,
    Text,
    StatusBar,
    Image,
    Alert,
    TouchableOpacity
} from 'react-native';
import { colors as predefinedColors } from '../Utilities';
import { useNavigation } from '@react-navigation/native';


const ModulosScreen = ({ route }) => {

    const navigation = useNavigation();
    const { DataParameter } = route.params;

    console.log("desdeee", DataParameter)

    const onPressItem = (item) => {
        switch (item.title) {
            case 'Autos':
                console.log("paso directo de grupo", DataParameter)
                // navigation.navigate('CotizacionAutos', { DataParameter: DataParameter });
                // navigation.navigate('DrawerCotizacion', {
                //     screen: 'CotizacionAutos',
                //     params: { DataParameter: DataParameter },
                // });
                navigation.navigate('CotizacionAutos', { DataParameter });
                break;
            case 'Polizas':
                console.log(DataParameter)
                //navigation.navigate('ConsultaPolizas', { DataParameter });
                navigation.navigate('NewPolizas', { DataParameter });
                break;
            case 'Agropecuario':
                //navigation.navigate('NewPolizas', { DataParameter });
                //console.log(DataParameter)
                //navigation.navigate('InicioAPScreen', { DataParameter });
                //navigation.navigate('PushNotification', { DataParameter });
                break;
            default:
                Alert.alert('Item presionado:', item.title);
                break;
        }
    };

    const imagePaths = [
        require('../../assets/Modulos/ICON_AUTOS.png'),
        require('../../assets/Modulos/ICON_POLIZA.png'),
        require('../../assets/Modulos/ICON_Agropecuario.png'),
    ];

    const imagenTitles = [
        'Autos',
        'Polizas',
        'Agropecuario',
    ];

    const getRandomColor = () => {
        // Obtén un índice aleatorio de la lista de colores existente
        const randomIndex = Math.floor(Math.random() * predefinedColors.length);
        // Devuelve el color correspondiente al índice aleatorio
        return predefinedColors[randomIndex];
    };


    const getItem = (_data, index) => ({
        id: Math.random().toString(12).substring(0),
        title: imagenTitles[index % imagenTitles.length],
        image: imagePaths[index % imagePaths.length],
        backgroundColor: getRandomColor(),
    });

    const getItemCount = _data => 3;

    const Item = ({ title, image, backgroundColor, onPress }) => (
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.item, { backgroundColor }]}>
                <Image source={image} style={styles.image} />
                <Text style={styles.title}>{title}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <VirtualizedList
                initialNumToRender={3}
                // renderItem={({ item }) => <Item title={item.title} image={item.image} />}
                renderItem={({ item }) => <Item title={item.title} image={item.image} backgroundColor={item.backgroundColor} onPress={() => onPressItem(item)} />}
                keyExtractor={item => item.id}
                getItemCount={getItemCount}
                getItem={getItem}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
    },
    item: {
        backgroundColor: '#ccc',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 15,
        borderColor: 'blue',
        borderWidth: 2,
        flexDirection: 'row',
    },
    image: {
        width: 120,
        height: 120,
        marginBottom: 10,
        // borderRadius: 75,
        marginRight:15,
        resizeMode: 'cover',
    },
    title: {
        fontSize: 20,
    },
    menustyle: {
        backgroundColor: '#92c5fc',
    },

});

export default ModulosScreen;

