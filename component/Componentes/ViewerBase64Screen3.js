import React, { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Asset } from 'expo-asset';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import LoadingComponent from './LoadingComponent';
import { PDFView } from 'react-native-pdf';

const ViewerBase64Screen = ({ route }) => {
    
    const { base64arc } = route.params;
    const [loading, setLoading] = useState(false);

    const downloadAndSharePDF = async () => {
        try {
            setLoading(true);

            // Crear un archivo temporal
            const uri = FileSystem.cacheDirectory + 'archivo.pdf';
            await FileSystem.writeAsStringAsync(uri, base64arc, { encoding: FileSystem.EncodingType.Base64 });

            // Compartir el archivo PDF
            await Sharing.shareAsync(uri);

            setLoading(false);
        } catch (error) {
            console.error('Error al compartir PDF:', error);
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <PDFView
                source={{uri: `data:application/pdf;base64,${base64arc}`,cache:true}}
                onLoadComplete={(numberOfPages,filePath)=>{
                    console.log(`number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page,numberOfPages)=>{
                    console.log(`current page: ${page}`);
                }}
                onError={(error)=>{
                    console.log(error);
                }}
                style={{ flex: 1 }}
            />

            <Button title="Compartir PDF" onPress={downloadAndSharePDF} />
            {loading && <LoadingComponent />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ViewerBase64Screen;
