import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
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
            preparePDF();
        }
    }, [isPdfReady]);

    const preparePDF = async () => {
        try {
            setLoading(true);
            const uri = FileSystem.cacheDirectory + 'archivo.pdf';
            await FileSystem.writeAsStringAsync(uri, base64arc, { encoding: FileSystem.EncodingType.Base64 });
            const fileExists = await FileSystem.getInfoAsync(uri);
            if (fileExists.exists) {
                setPdfUri(uri);
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

    const renderPDFViewer = () => {
        if (isPdfReady) {
            const htmlContent = `
                <html>
                    <body>
                        <embed src="${pdfUri}" type="application/pdf" width="100%" height="100%" />
                    </body>
                </html>
            `;
            return (
                <WebView
                    style={{ flex: 1 }}
                    source={{ html: htmlContent }}
                    originWhitelist={['*']}
                    scalesPageToFit={true}
                    bounces={false}
                    mixedContentMode={Platform.OS === "android" ? "always" : undefined}
                    sharedCookiesEnabled={false}
                    scrollEnabled={true}
                />
            );
        } else {
            return <LoadingComponent />;
        }
    };

    return (
        <View style={styles.container}>
            {renderPDFViewer()}
            <TouchableOpacity style={styles.button} onPress={sharePDF}>
                <Text style={styles.ButtonText}>Compartir PDF</Text>
            </TouchableOpacity>
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
