import React from 'react';
import { SafeAreaView, View, VirtualizedList, StyleSheet, Text, StatusBar, Image, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const InicioAPScreen = ({ route }) => {

    const navigation = useNavigation();
    const { DataParameter } = route.params;

    const onPressItem = (item) => {
        switch (item.title) {
            case 'Agricola':
                Alert.alert('Item presionado:', item.title);
                // // navigation.navigate('CotizacionAutos', { DataParameter: DataParameter });
                // navigation.navigate('DrawerCotizacion', {
                //     screen: 'CotizacionAutos',
                //     params:{ DataParameter: DataParameter },
                // });
                break;
            case 'Pecuario':
                Alert.alert('Item presionado:', item.title);
                // console.log(DataParameter)
                // navigation.navigate('ConsultaPolizas', { DataParameter });
                break;
            default:
                Alert.alert('Item presionado:', item.title);
                break;
        }
    };

    const imagePaths = [
        require('../../assets/Icon1.png'),
        require('../../assets/Icon3.png'),
    ];

    const imagenTitles = [
        'Agricola',
        'Pecuario',
    ];

    const getItem = (_data, index) => ({
        id: Math.random().toString(12).substring(0),
        title: imagenTitles[index % imagenTitles.length],
        image: imagePaths[index % imagePaths.length],
    });

    const getItemCount = _data => 50;

    const Item = ({ title, image, onPress }) => (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.item}>
                <Image source={image} style={styles.image} />
                <Text style={styles.title}>{title}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <VirtualizedList
                initialNumToRender={2}
                // renderItem={({ item }) => <Item title={item.title} image={item.image} />}
                renderItem={({ item }) => <Item title={item.title} image={item.image} onPress={() => onPressItem(item)} />}
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
    },
    image: {
        width: 150,
        height: 150,
        marginBottom: 10,
        borderRadius: 75,
    },
    title: {
        fontSize: 24,
    },
});

export default InicioAPScreen;

