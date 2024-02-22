import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { CameraView, useCameraPermissions } from "expo-camera/next";
import LottieView from 'lottie-react-native';

const Scanner = ({ onScanned, scanMode }) => {
    const [permission, requestPermission] = useCameraPermissions();
    const [startCamera, setStartCamera] = useState(false)

    if (!permission) {
        // Camera permissions are still loading
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: "center" }}>
                    We need your permission to show the camera
                </Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }
    const handleBarCodeScanned = ({ type, data }) => {
        onScanned({ type, data, startCamera });
        setStartCamera(false)
    };

    return (
        <View style={styles.container}>

            <View style={styles.cameraContainer}>
                {startCamera ?
                    <CameraView
                        style={styles.camera}
                        // facing={type}
                        onBarcodeScanned={handleBarCodeScanned}
                        barcodeScannerSettings={{
                            barCodeTypes: [
                                "qr",
                                // "pdf417",
                                // "ean13",
                                // "code128",
                                // "code39",
                                // "upc_a",
                                // "upc_e",
                                // "ean8",
                                // "itf14",
                                // "interleaved2of5",
                                // "codabar",
                                // "aztec",
                                // "datamatrix",
                                // "code93",
                                // "itf14",
                            ],
                        }}
                    >
                        <View>

                        </View>
                    </CameraView>
                    :
                    <View >
                        <LottieView
                            autoPlay={true}
                            loop={true}
                            style={{
                                width: '100%',
                                height: '100%',
                            }}
                            source={require('../assets/scan.json')}
                        />
                        <View style={{ ...styles.buttonContainer, position: 'absolute', bottom: 20 }}>
                            <TouchableOpacity style={styles.button} onPress={() => { setStartCamera(true), scanMode(true) }}>
                                <Text style={styles.text}>Scan</Text>
                            </TouchableOpacity>
                        </View>


                    </View>
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "stretch",
        height: "100%",
    },
    camera: {
        flex: 1,
        alignItems: "stretch",
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: "#0095A6",
        height: 50,
        width: 100,
        alignSelf: 'center'
    },
    button: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center'
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
    },
    container: {
        alignItems: 'center',
        flexDirection: "column",
    },
    cameraContainer: {
        width: '70%',
        aspectRatio: 1,
        overflow: 'hidden',
        borderRadius: 10,
        marginBottom: 40,
        marginTop: 20
    },
});

export default Scanner;
