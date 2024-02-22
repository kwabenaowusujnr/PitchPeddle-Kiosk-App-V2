import { Dimensions, Image, ImageBackground, StyleSheet, Text, View, Platform, TouchableOpacity, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useAppBase } from "../providers/AppBaseContext";

export default function Index({ navigation }) {
    const { isAuthenticated, setIsAuthenticated, currentEvent, setCurrentEvent } = useAppBase();

    const Logout = () => {
        setIsAuthenticated(false);
        setCurrentEvent(null);
        navigation.goBack();
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }} >
            <View style={{ flex: 1, backgroundColor: "#fff" }}>
                <View style={{ width: '100%', flexDirection: "row" }}>
                    <Image
                        // source={require("../assets/vop.jpg")}
                        source={{ uri: currentEvent?.imageurl }}
                        style={styles.leftBanner}
                        resizeMode="stretch">
                    </Image>

                    <View style={{ width: "50%", padding: 20, height: Dimensions.get('window').height }}>
                        <Image
                            source={require('../assets/logo.png')}
                            style={{ alignSelf: "center", width: "50%", height: 80 }}
                            resizeMode="contain"
                        ></Image>
                        <View style={styles.container}>
                            <View>
                                <Text style={{ fontSize: 24, fontFamily: "Poppins-Bold", color: "#000", alignSelf: "center" }}>{currentEvent.title}</Text>
                                <Text style={{ fontSize: 24, fontFamily: "Poppins-Bold", color: "#000", alignSelf: "center" }}>({currentEvent.eventcode})</Text>
                            </View>
                            <View style={{ flexDirection: "column", justifyContent: "space-around", width: "100%", gap: 10, alignItems: "center" }}>
                                <TouchableOpacity
                                    style={{
                                        justifyContent: "center",
                                        alignItems: "center",
                                        width: "70%",
                                    }}
                                    onPress={() => navigation.navigate("CheckIn")}
                                >
                                    <LinearGradient
                                        colors={['#00B6CA', '#007A88', '#007A88']}
                                        style={styles.actionButtton}>
                                        <AntDesign name="login" size={40} color="#fff" />
                                        <Text style={{ color: "#fff", fontFamily: "Poppins-Medium", fontSize: 20 }}>Check-In</Text>
                                    </LinearGradient>
                                </TouchableOpacity>


                                <TouchableOpacity style={{
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "70%",
                                }}>
                                    <LinearGradient
                                        colors={['#eb526c', '#db3954', '#b81c36']}
                                        style={styles.actionButtton}>
                                        <Ionicons name="analytics" size={40} color="#fff" />
                                        <Text style={{ color: "#fff", fontFamily: "Poppins-Medium", fontSize: 20 }}>Analytics</Text>
                                    </LinearGradient>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={Logout}>
                                    <Text style={{
                                        fontFamily: "Poppins-Medium",
                                        color: "#969293",
                                        fontSize: 18
                                    }}>
                                        Logout
                                    </Text>
                                </TouchableOpacity>

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
        height: "100%"
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
