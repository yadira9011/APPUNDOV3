import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import LoadingComponent from './LoadingComponent';

const PDFViewerScreen = ({ route }) => {

    const { pdfUrl } = route.params;
    const [loading, setLoading] = useState(false);

    // const htmlContent = `<html><body><embed src="data:application/pdf;base64,${pdfUrl}"
    //  type="application/pdf" width="100%" height="100%"></embed></body></html>`;

    const sharePDF = () => {
        Linking.openURL(pdfUrl)
            .then((supported) => {
                if (!supported) {
                    console.log(`No se puede abrir el enlace: ${pdfUrl}`);
                } else {
                    console.log(`El enlace se ha abierto correctamente: ${pdfUrl}`);
                }
            })
            .catch((error) => {
                console.error(`Error al abrir el enlace: ${pdfUrl}`, error);
            });
    };

    const downloadAndSharePDF = async () => {

        try {
            setLoading(true);
            const pdfUri = `${FileSystem.documentDirectory}sample.pdf`;
            const response = await FileSystem.downloadAsync(pdfUrl, pdfUri);
            if (response.status === 200) {
                setLoading(false);
                console.log(`Archivo PDF descargado y guardado en: ${pdfUri}`);

                Sharing.shareAsync(pdfUri)
                    .then((result) => {
                        if (result.action === Sharing.sharedAction) {
                            console.log('Archivo compartido exitosamente');
                            FileSystem.deleteAsync(pdfUri, { idempotent: true })
                                .then(() => {
                                    console.log('Archivo eliminado exitosamente');
                                })
                                .catch((deleteError) => {
                                    console.error('Error al eliminar el archivo:', deleteError);
                                });
                        } else {
                            console.log('Compartir cancelado');
                        }
                    })
                    .catch((error) => {
                        console.error('Error al compartir el archivo PDF:', error);
                    });
            } else {
                console.error('Error al descargar el archivo PDF');
            }
        } catch (error) {
            console.error('Error al descargar y compartir el archivo PDF:', error);
        }
    };

    return (
        <View style={styles.container}>

            <WebView
                style={{ height: 200, width: 350 }}
                nestedScrollEnabled={true}
                javaScriptEnabled={true}
                source={{ uri: 'https://drive.google.com/viewerng/viewer?embedded=true&url=' + pdfUrl + '' }} />


            {/* <WebView
                style={{ height: 200, width: 350 }}
                nestedScrollEnabled={true}
                javaScriptEnabled={true}
                source={{ html: htmlContent }}
            /> */}

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

export default PDFViewerScreen;
