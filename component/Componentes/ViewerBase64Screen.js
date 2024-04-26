import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import * as FileSystem from 'expo-file-system';
import LoadingComponent from './LoadingComponent';

const ViewerBase64Screen = ({ route }) => {
    const { base64arc } = route.params;
    const [loading, setLoading] = useState(false);
    const [pdfUri, setPdfUri] = useState(null);
    const [isPdfReady, setIsPdfReady] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const downloadPDF = async () => {
            try {
                setLoading(true);
                const directory = FileSystem.cacheDirectory;
                const filename = 'archivo.pdf';
                const uri = directory + filename;
                
                // Verifica si el directorio de caché existe, y si no, créalo
                const dirInfo = await FileSystem.getInfoAsync(directory);
                if (!dirInfo.exists) {
                    await FileSystem.makeDirectoryAsync(directory, { intermediates: true });
                }

                await FileSystem.writeAsStringAsync(uri, base64arc, { encoding: FileSystem.EncodingType.Base64 });
                const fileExists = await FileSystem.getInfoAsync(uri);
                if (fileExists.exists) {
                    setPdfUri(uri);
                    setIsPdfReady(true);
                } else {
                    setError('El archivo PDF no se ha guardado correctamente.');
                }
            } catch (error) {
                setError('Error al guardar el PDF: ' + error.message);
            } finally {
                setLoading(false);
            }
        };

        downloadPDF();

        return () => {
            // Limpiar recursos si es necesario
        };
    }, [base64arc]);

    useEffect(() => {
        if (isPdfReady) {
            openPDF();
        }
    }, [isPdfReady]);

    const openPDF = () => {
        if (pdfUri) {
            Linking.openURL(pdfUri);
        }
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <LoadingComponent />
            ) : error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : (
                <Text>Abriendo PDF...</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
    },
});

export default ViewerBase64Screen;
