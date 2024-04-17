import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import LoadingComponent from './LoadingComponent';

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

    const htmlContent = `
        <html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body>
                <iframe src="data:application/pdf;base64,${base64arc}" width="100%" height="100%" style="border: none;"></iframe>
            </body>
        </html>`;

    return (
        <View style={styles.container}>
            <WebView
                style={{ flex: 1 }}
                javaScriptEnabled={true}
                source={{ html: htmlContent }}
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
