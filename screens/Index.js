import { Dimensions, Image, ImageBackground, StyleSheet, Text, View, Platform, TouchableOpacity, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

export default function Index({ navigation }) {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }} >
            <View style={{ flex: 1, backgroundColor: "#fff" }}>
                <View style={{ width: '100%', flexDirection: "row" }}>
                    <Image
                        source={require("../assets/vop.jpg")}
                        style={styles.leftBanner}
                        resizeMode="stretch">
                    </Image>

                    <View style={{ width: "50%", padding: 20, height: Dimensions.get('window').height }}>

                        <View style={styles.container}>
                            <Text style={{ fontSize: 24, fontFamily: "Poppins-Bold", color: "#000", alignSelf: "center" }}>VOP Unleashed Concert</Text>

                            <View style={{ flexDirection: "column", justifyContent: "space-around", width: "100%", gap: 10, alignItems: "center" }}>

                                <LinearGradient
                                    colors={['#00B6CA', '#007A88', '#007A88']}
                                    style={styles.actionButtton}>
                                    <AntDesign name="login" size={40} color="#fff" />
                                    <Text style={{ color: "#fff", fontFamily: "Poppins-Medium", fontSize: 20 }}>Check-In</Text>
                                </LinearGradient>

                                <LinearGradient
                                    colors={['#00B6CA', '#007A88', '#007A88']}
                                    style={styles.actionButtton}>
                                    <Ionicons name="analytics" size={40} color="#fff" />
                                    <Text style={{ color: "#fff", fontFamily: "Poppins-Medium", fontSize: 20 }}>Analytics</Text>
                                </LinearGradient>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <StatusBar style="dark" />
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    leftBanner: {
        width: "50%",
        height: Dimensions.get('window').height
    },
    textFieldWrapper: {
        width: "100%",
        height: 42,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: '#045FA6',
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 22,
        marginVertical: 10
    },
    textField: {
        width: "100%",
        fontFamily: "Poppins-Regular",
        fontSize: 16
    },
    shadowBox: {
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
            },
            android: {
                elevation: 1,
            },
        }),
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 40
    },
    actionButtton: {
        width: "70%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        flexDirection: "row",
        padding: 20,
        gap: 10

    }
});
