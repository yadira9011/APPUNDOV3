import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Linking, TouchableOpacity, } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import LoadingComponent from './LoadingComponent';

const ViewerBase64Screen = ({ route }) => {
    const { base64arc } = route.params;
    const [loading, setLoading] = useState(false);
    const [pdfUri, setPdfUri] = useState(null);
    const [isPdfReady, setIsPdfReady] = useState(false);

    useEffect(() => {
        if (!isPdfReady) {
            downloadPDF();
        }
    }, [isPdfReady]);

    const downloadPDF = async () => {
        try {
            setLoading(true);
            const uri = FileSystem.cacheDirectory + 'archivo.pdf';
            await FileSystem.writeAsStringAsync(uri, base64arc, { encoding: FileSystem.EncodingType.Base64 });
            const fileExists = await FileSystem.getInfoAsync(uri);
            if (fileExists.exists) {
                setPdfUri(uri);
                console.log("URL ....", uri)
                setIsPdfReady(true);
            } else {
                console.error('El archivo PDF no existe en la ruta especificada.');
            }
            setLoading(false);
        } catch (error) {
            console.error('Error al guardar el PDF:', error);
            setLoading(false);
        }
    };

    const sharePDF = async () => {
        try {
            setLoading(true);
            const pdfPath = pdfUri || (FileSystem.cacheDirectory + 'archivo.pdf');
            await Sharing.shareAsync(pdfPath);
        } catch (error) {
            console.error('Error al compartir PDF:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            {isPdfReady ? (
                <View style={{ flex: 1, width: '90%' }}>
                    <WebView
                        style={{ flex: 1 }}
                        source={{ uri: pdfUri }}
                        originWhitelist={['*']}
                        useWebKit={true}
                        androidHardwareAccelerationDisabled={true}
                        allowFileAccess={true}
                        allowsInlineMediaPlayback={true}
                        scalesPageToFit={true}
                        bounces={false}
                        javaScriptEnabled={true} // Habilitar JavaScript
                        renderError={() => console.log('Merci de vérifier votre connexion Internet', 'Internet non disponible')}
                    />
                    {/* <Button title="Compartir PDF" onPress={sharePDF} /> */}
                    <TouchableOpacity style={styles.button} onPress={sharePDF}>
                        <Text style={styles.ButtonText}>Compartir PDF"</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <LoadingComponent />
            )}
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
    button: {
        width: 300,
        height: 40,
        alignSelf: 'center',
        marginTop: 5,
        marginBottom: 50,
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#AAB3DB',
        borderRadius: 5,
    },
    ButtonText: {
        color: 'white',
        textAlign: 'center',
    },
});

export default ViewerBase64Screen;
