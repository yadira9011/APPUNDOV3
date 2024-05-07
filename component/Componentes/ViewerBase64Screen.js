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

    // Construir el HTML para incrustar el PDF base64 en un iframe
    const htmlContent = `<html><body style="margin:0;padding:0;"><iframe src="data:application/pdf;base64,${base64arc}" width="100%" height="100%" frameborder="0" allowfullscreen></iframe></body></html>`;

    return (
        <View style={styles.container}>
            {isPdfReady ? (
                <View style={{ flex: 1, width: '90%' }}>
                    {Platform.OS === 'ios' ? (
                        <WebView
                            style={{ flex: 1 }}
                            // source={require(pdfUri)}
                            source={{ uri: pdfUri }}
                            // originWhitelist={['*']}
                            originWhitelist={["http://*", "https://*", "file://*", "data:*", "content:*"]}
                            // useWebKit={true}
                            androidHardwareAccelerationDisabled={true}
                            allowFileAccessFromFileURLs={true}
                            allowUniversalAccessFromFileURLs={true}
                            allowFileAccess={true}
                            scalesPageToFit={true}
                            bounces={false}
                            mixedContentMode={Platform.OS === "android" ? "always" : undefined}
                            sharedCookiesEnabled={false}
                            scrollEnabled={true}
                        />

                    ) : (

                        <Text style={styles.MessajeText}> Para una visualización del pdf de la poliza, por favor comparta el PDF ...</Text>

                        // <WebView
                        //     style={{ flex: 1 }}
                        //     source={{ html: htmlContent }}
                        // />
                    )}

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
    MessajeText: {
        color: 'blue',
        marginTop: 52,
        marginBottom: 20,
        textAlign: 'center',
    },
});

export default ViewerBase64Screen;