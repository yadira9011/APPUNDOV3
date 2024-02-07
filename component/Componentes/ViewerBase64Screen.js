import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import LoadingComponent from './LoadingComponent';

const ViewerBase64Screen = ({ route }) => {

    const { base64arc } = route.params;
    const [loading, setLoading] = useState(false);
    const [pdfUri, setPdfUri] = useState(null);
    const [isPdfReady, setIsPdfReady] = useState(false);
    const [adaptedUrl, setadaptedUrl] = useState("");

    const htmlContent44 = `<html><body><embed src="data:application/pdf;base64,${base64arc}"
     type="application/pdf" width="100%" height="100%"></embed></body></html>`;

    const htmlContentxxx = `
    <html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0;">
            <object data="data:application/pdf;base64,${base64arc}" type="application/pdf" width="100%" height="100%">
                <embed src="data:application/pdf;base64,${base64arc}" type="application/pdf" />
            </object>
        </body>
    </html>`;

    const htmlContentttt = `
    <html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body>
            <object data="data:application/pdf;base64,${base64arc}" type="application/pdf" width="100%" height="100%"></object>
        </body>
    </html>`;

    const htmlContent = `
    <html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0;">
            <iframe src="data:application/pdf;base64,${base64arc}" type="application/pdf" width="100%" height="100%"></iframe>
        </body>
    </html>`;

    const simpleHtml = `
  <html>
    <body>
      <h1>Hello, World!</h1>
    </body>
  </html>
`;

    useEffect(() => {
        if (!isPdfReady) {
            downloadAndShowPDF();
        }
    }, [isPdfReady]);

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

    const downloadAndShowPDF = async () => {
        try {
            // Guardar el archivo PDF localmente
            const uri = FileSystem.cacheDirectory + 'archivo.pdf';
            await FileSystem.writeAsStringAsync(uri, base64arc, { encoding: FileSystem.EncodingType.Base64 });
            // Verifica si el archivo existe antes de establecer la URI
            const fileExists = await FileSystem.getInfoAsync(uri);
            if (fileExists.exists) {
                setPdfUri(uri);
                setIsPdfReady(true); // Indica que los datos están listos
                //const xx=`http://docs.google.com/gview?embedded=true&url=${encodeURIComponent(uri)}`;
                //setadaptedUrl(xx)

                console.log("adaa",uri)

            } else {
                console.error('El archivo PDF no existe en la ruta especificada.');
            }
        } catch (error) {
            console.error('Error al guardar el PDF:', error);
        }
    };

   // const adaptedUrl = `http://docs.google.com/gview?embedded=true&url=${encodeURIComponent(pdfUri)}`;

    return (
        <View style={styles.container}>

            {isPdfReady && (
                <WebView
                    style={{ height: 200, width: 350 }}
                    javaScriptEnabled={true}
                    source={{ uri: 'https://drive.google.com/viewerng/viewer?embedded=true&url=' + pdfUri + '' }}
                    //source={{ uri: adaptedUrl }}
                    // source={{ uri: `file://${pdfUri}` }}
                    originWhitelist={['*']}
                    useWebKit={true}
                    androidHardwareAccelerationDisabled={true}
                />
            )}

            {/* 
            <WebView
                style={{ height: 200, width: 350 }}
                nestedScrollEnabled={true}
                javaScriptEnabled={true}
                source={{ html: htmlContent }}
                //source={{ uri: `data:text/html,${encodeURIComponent(htmlContent)}` }}
                //source={{ uri: `data:text/html,${htmlContent}` }}
                originWhitelist={['*']}
                useWebKit={true}
                androidHardwareAccelerationDisabled={true}
                mixedContentMode={'always'}
                allowFileAccess={true}
            /> */}


            {/* <WebView
                style={{ height: 200, width: 350 }}
                javaScriptEnabled={true}
                source={{ html: simpleHtml }}
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

export default ViewerBase64Screen;
