import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';

const LoadingComponent = () => {

    return (
        <View style={styles.activityIndicatorContainer}>
            <Image
                source={require('../../assets/UndoLoading.gif')}
                style={styles.gifImage}
            />
            {/* <ActivityIndicator
                style={styles.activityIndicator}
                size="large"
                color="#0000FF"
            /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    activityIndicatorContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        width: '100%',
        height: '100%',
    },
    activityIndicator: {
        marginTop: 10,
        transform: [{ scale: 2 }],
    },
    gifImage: {
        width: 150,
        height: 175,
    },
});

export default LoadingComponent;