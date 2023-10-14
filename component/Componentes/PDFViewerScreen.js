// import React from 'react';
// import { View, StyleSheet } from 'react-native';
//import Pdf from 'react-native-pdf';
//import Pdf from 'react-native-pdf';

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const PDFViewerScreen = ({ route }) => {

    const { pdfUrl } = route.params;
    console.log("urllll", pdfUrl)

    return (
        <View style={styles.container}>

            <WebView
                source={{ pdfUrl }}
                scalesPageToFit={true}
                originWhitelist={['*']}
                allowsFullscreenVideo={true}
                javaScriptEnabled={true}
                injectedJavaScript={'(function() { })()'}
            />

            {/* <PDFReader
                source={{
                    uri: 'http://gahp.net/wp-content/uploads/2017/09/sample.pdf',
                }}
            /> */}
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

            {/* <Pdf
                source={{ uri: 'http://www.pdf995.com/samples/pdf.pdf', cache: true }}
                onLoadComplete={(numberOfPages, filePath) => {
                    console.log(`number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page, numberOfPages) => {
                    console.log(`current page: ${page}`);
                }}
                onError={(error) => {
                    console.log(error);
                }}
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
