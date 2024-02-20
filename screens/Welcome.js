import { Dimensions, Image, ImageBackground, StyleSheet, Text, View, Platform, TouchableOpacity, TextInput, Pressable, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";


export default function Welcome({ navigation }) {
    const [isPasaswordShow, setIsPasswordShow] = useState(false)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }} >
            <View style={{ flex: 1, backgroundColor: "#fff" }}>
                <View style={{ width: '100%', flexDirection: "row" }}>
                    {/* <Image
                        source={require("../assets/vop.jpg")}
                        style={styles.leftBanner}
                        resizeMode="stretch">

                    </Image> */}

                    <LottieView
                        autoPlay={true}
                        loop={true}
                        style={{
                            width: Dimensions.get('window').width * 0.5,
                            height: Dimensions.get('window').height,
                            backgroundColor: '#F9FEFF'
                        }}
                        source={require('../assets/intro.json')} />

                    <View style={{ width: "50%", padding: 20, height: Dimensions.get('window').height }}>
                        <ScrollView>

                            <Image
                                source={require('../assets/logo.png')}
                                style={{ alignSelf: "center", width: 150, height: 80 }}
                                resizeMode="contain"
                            ></Image>

                            <Text style={{ fontSize: 14, fontFamily: "Poppins-SemiBold", color: "#007A88", alignSelf: "center" }}>Event Kiok</Text>

                            {/* <View style={styles.container}>

                            <TimeDateScreen />

                            <View style={{ flexDirection: "row", justifyContent: "space-around", width: "100%" }}>

                                <LinearGradient
                                    colors={['#1F9CD6', '#067FC4', '#045FA6']}
                                    style={{
                                        width: 100, height: 100, justifyContent: "center", alignItems: "center", borderRadius: 10
                                    }}>
                                    <AntDesign name="login" size={30} color="#fff" />
                                    <Text style={{ color: "#fff", fontFamily: "Poppins-SemiBold" }}>Check-In</Text>
                                </LinearGradient>

                                <LinearGradient
                                    colors={['#1F9CD6', '#067FC4', '#045FA6']}
                                    style={{
                                        width: 100, height: 100, justifyContent: "center", alignItems: "center", borderRadius: 10
                                    }}>
                                    <AntDesign name="logout" size={30} color="#fff" />
                                    <Text style={{ color: "#fff", fontFamily: "Poppins-SemiBold" }}>Check-Out</Text>
                                </LinearGradient>
                            </View>

                        </View> */}

                            <View
                                style={{
                                    borderWidth: 1,
                                    padding: 20,
                                    borderRadius: 5,
                                    paddingVertical: 20,
                                    backgroundColor: "#FCFCFC",
                                    borderColor: "#F3F3F3",
                                    paddingBottom: 40,
                                    margin: 30
                                    , ...styles.shadowBox
                                }}>
                                <View style={{ alignItems: "center" }}>
                                    <Text style={{ fontFamily: "Poppins-Bold", color: "#000", fontSize: 16, alignItems: "center" }}>
                                        Sign In</Text>
                                </View>
                                {/* <View style={{ marginTop: 10, ...styles.textFieldWrapper }}>
                                    <TextInput
                                        style={styles.textField}
                                        placeholder="Event Code"
                                        keyboardType="email-address"
                                    />
                                </View> */}
                                <View style={styles.textFieldWrapper}>
                                    <TextInput
                                        style={styles.textField}
                                        placeholder="Event Code"
                                        secureTextEntry={isPasaswordShow}
                                    />
                                    <TouchableOpacity
                                        style={{ position: "absolute", right: 12 }}
                                        onPress={() => setIsPasswordShow(!isPasaswordShow)}
                                    >
                                        {
                                            isPasaswordShow ?
                                                <Ionicons name="eye-off" size={20}></Ionicons>
                                                :
                                                <Ionicons name="eye" size={20}></Ionicons>
                                        }

                                    </TouchableOpacity>
                                </View>


                                <TouchableOpacity
                                    style={{
                                        backgroundColor: "#007A88",
                                        alignItems: 'center',
                                        width: "100%",
                                        justifyContent: 'center',
                                        height: 42,
                                        borderRadius: 10,
                                        marginVertical: 20

                                    }}
                                    onPress={() => navigation.navigate("Index")}
                                >
                                    <Text style={{
                                        fontFamily: "Poppins-Medium",
                                        color: "#fff",
                                        fontSize: 18
                                    }}>
                                        Login
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>

                    </View>
                </View>


            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    leftBanner: {
        width: "50%",
        height: Dimensions.get('window').height,
    },
    textFieldWrapper: {
        width: "100%",
        height: 42,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: '#007A88',
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
        gap: 20
    }

});
