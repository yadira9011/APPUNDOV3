import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { FileSystem } from 'expo';
import * as Sharing from 'expo-sharing';
import * as FileViewer from 'expo-file-viewer';

const ViewerBase64Screen = ({ route }) => {
  const { base64arc } = route.params;
  const [loading, setLoading] = useState(false);
  const [pdfUri, setPdfUri] = useState(null);

  useEffect(() => {
    downloadAndShowPDF();
  }, []);

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
      } else {
        console.error('El archivo PDF no existe en la ruta especificada.');
      }
    } catch (error) {
      console.error('Error al guardar el PDF:', error);
    }
  };

  const openPdf = async () => {
    try {
      await FileViewer.openAsync(pdfUri, { showOpenWithDialog: true });
    } catch (error) {
      console.error('Error al abrir el PDF:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Compartir PDF" onPress={downloadAndSharePDF} />
      <Button title="Abrir PDF" onPress={openPdf} />
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
