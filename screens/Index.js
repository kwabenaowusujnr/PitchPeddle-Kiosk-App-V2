import { Dimensions, Image, ImageBackground, StyleSheet, Text, View, Platform, TouchableOpacity, TextInput, Pressable, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useAppBase } from "../providers/AppBaseContext";
import LottieView from "lottie-react-native";

export default function Index({ navigation }) {
    const { onlineMode, isAuthenticated, setIsAuthenticated, currentEvent, setCurrentEvent } = useAppBase();

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

                    <View style={{ width: "50%", padding: 20, height: Dimensions.get('window').height, }}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Image
                                source={require('../assets/logo.png')}
                                style={{ alignSelf: "center", width: "40%", height: 80 }}
                                resizeMode="contain"
                            ></Image>
                            <View style={styles.container}>
                                <Text style={{ fontSize: 28, fontFamily: "Poppins-Bold", color: "#000", alignSelf: "center" }}>{currentEvent.title}</Text>
                                {/* <Text style={{ fontSize: 24, fontFamily: "Poppins-Bold", color: "#000", alignSelf: "center" }}>({currentEvent.eventcode})</Text> */}
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
                            <TouchableOpacity
                                style={{ position: "absolute", right: 0, bottom: 0, top: 0 }}
                                onPress={() => { navigation.navigate("AdminScreen") }}
                            >
                                <LottieView
                                    autoPlay={true}
                                    loop={true}
                                    style={{
                                        width: 100,
                                        height: 100,
                                    }}
                                    source={require('../assets/settings.json')}
                                />
                            </TouchableOpacity>

                        </ScrollView>
                    </View>
                </View>
            </View>
            <StatusBar style="dark" />
            {
                (onlineMode) ?
                    <View style={{ backgroundColor: "green", position: "absolute", zIndex: 1000, width: "100%", height: 20, bottom: 0, alignItems: "center" }}>
                        <Text style={{ color: "#fff" }}>Online</Text>
                    </View>
                    :
                    <View style={{ backgroundColor: "red", position: "absolute", zIndex: 1000, width: "100%", height: 20, bottom: 0, alignItems: "center" }}>
                        <Text style={{ color: "#fff" }}>Offline</Text>
                    </View>
            }
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
        backgroundColor: '#fff',
        gap: 40,
        marginTop: 30,
    },
    actionButtton: {
        width: "70%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        flexDirection: "row",
        padding: 20,
        gap: 10,


    }
});
