// import React from 'react';
// import { View, StyleSheet } from 'react-native';
//import Pdf from 'react-native-pdf';
//import Pdf from 'react-native-pdf';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import LoadingComponent from './LoadingComponent';
// import RNFS from 'react-native-fs';
// import Pdf from 'react-native-pdf';
// import PDFReader from '@bildau/rn-pdf-reader'

const PDFViewerScreen = ({ route }) => {

    const { pdfUrl } = route.params;
    const [loading, setLoading] = useState(false);
    console.log("urllll", pdfUrl)

    // const sharePDF = async () => {
    //     try {
    //         const options = {
    //             url: pdfUrl,
    //         };
    //         await Share.open(options);
    //     } catch (error) {
    //         console.error('Error al compartir el archivo PDF:', error);
    //     }
    // };

    // const sharePDF = async () => {
    //     try {
    //         await Sharing.shareAsync(pdfUrl);
    //     } catch (error) {
    //         console.error('Error al compartir el enlace del PDF:', error);
    //     }
    // };

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
                //  source={{ uri: 'https://drive.google.com/viewerng/viewer?embedded=true&url=http://www.africau.edu/images/default/sample.pdf' }}
                source={{ uri: 'https://drive.google.com/viewerng/viewer?embedded=true&url=' + pdfUrl + '' }} />

            <Button title="Compartir PDF" onPress={downloadAndSharePDF} />
            {loading && (
                <LoadingComponent />
            )}


            {/* 
            <PDFReader
                source={{
                    uri: 'http://gahp.net/wp-content/uploads/2017/09/sample.pdf',
                }}
            /> */}

            {/* <Text style={styles.title}>Bug Ninza</Text>
            <Pdf
                trustAllCerts={false}
                source={PdfResource}
                style={styles.pdf}
                onLoadComplete={(numberOfPages, filePath) => {
                    console.log(`number of pages: ${numberOfPages}`);
                }}
            /> */}

            {/* <WebView
                source={{ uri: 'https://playground.undo.mx/Out/Polizas/4/6040035690.pdf' }}
                scalesPageToFit={true}
                onError={(error) => console.log('Error en WebView:', error)}
                originWhitelist={['*']}
                allowsFullscreenVideo={true}
                javaScriptEnabled={true}
                injectedJavaScript={'(function() { })()'}
            /> */}

            {/* <WebView
                bounces={false}
                scrollEnabled={false}
                source={{ uri: 'https://drive.google.com/viewerng/viewer?embedded=true&url=http://www.africau.edu/images/default/sample.pdf' }} />
         */}

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
