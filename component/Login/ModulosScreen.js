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
import { colors as predefinedColors, getTextColor } from '../Utilities';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
// import { ColorScheme } from 'react-native-color';


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
                <View style={{ flex: 1 }}>
                    <Image source={image} style={styles.image} />
                </View>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    {/* <Text style={styles.title}>{title}</Text> */}
                    <Text style={[styles.title, { color: getTextColor(backgroundColor) }]}>{title}</Text>
                    <Ionicons
                        name="arrow-forward-circle-outline"
                        size={40}
                        color="black" />
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            
            <Text style={{
                textAlign: 'center',
                fontSize: 14,
                color: 'gray',
                marginBottom: 15,
                marginTop:15
            }}>Selecciona un módulo:</Text>


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
        height: 200,
        justifyContent: 'center',
        marginBottom:15,
        // alignItems: 'center',
        // marginVertical: 8,
        // marginHorizontal: 16,
        // borderRadius: 15,
        // borderColor: 'blue',
        // borderWidth: 2,
        flexDirection: 'row',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    title: {
        fontSize: 20,
        marginLeft: 15,
        marginRight: 5,
        marginTop: 1,
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    menustyle: {
        backgroundColor: '#92c5fc',
    },

});

export default ModulosScreen;

