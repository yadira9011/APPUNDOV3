import React from 'react';
import { View, StyleSheet } from 'react-native';
//import Pdf from 'react-native-pdf';


const PDFViewerScreen = ({ route }) => {

    const { pdfUrl } = route.params;
    console.log("urllll",pdfUrl)

    return (
        <View style={styles.container}>

            {/* <Pdf
                source={{ uri: pdfUrl, cache: true }}
                onLoadComplete={(numberOfPages, filePath) => {
                    console.log(`Número de páginas: ${numberOfPages}`);
                }}
                onPageChanged={(page, numberOfPages) => {
                    console.log(`Página actual: ${page}`);
                }}
                onError={(error) => {
                    console.log(`Error al cargar el PDF: ${error}`);
                }}
                style={styles.pdfView}
            /> */}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pdfView: {
        flex: 1,
        width: 300,
        height: 400,
    },
});

export default PDFViewerScreen;
