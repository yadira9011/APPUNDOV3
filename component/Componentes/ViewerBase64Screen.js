import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import LoadingComponent from './LoadingComponent';

const ViewerBase64Screen = ({ route }) => {

    const { base64arc } = route.params;
    const [loading, setLoading] = useState(false);
    const htmlContent = `<html><body><embed src="data:application/pdf;base64,${base64arc}"
     type="application/pdf" width="100%" height="100%"></embed></body></html>`;

    const downloadAndSharePDF = async () => {
        try {
            setLoading(true);

            // Descargar el archivo PDF
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
            <WebView
                style={{ height: 200, width: 350 }}
                nestedScrollEnabled={true}
                javaScriptEnabled={true}
                source={{ html: htmlContent }}
            />

            <Button title="Compartir PDF" onPress={downloadAndSharePDF} />
            {loading && (
                <LoadingComponent />
            )}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default ViewerBase64Screen;
