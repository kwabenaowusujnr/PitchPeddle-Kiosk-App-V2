import { Dimensions, Image, ImageBackground, StyleSheet, Text, View, Platform, TouchableOpacity, TextInput, Pressable, ScrollView, ActivityIndicator, KeyboardAvoidingView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import axios from "axios";
import { useAppBase } from "../providers/AppBaseContext";
import Toast from "react-native-root-toast";


export default function Welcome({ navigation }) {
    const { isAuthenticated, setIsAuthenticated, currentEvent, setCurrentEvent } = useAppBase();
    const [isPasaswordShow, setIsPasswordShow] = useState(false)
    const [eventCode, setEventCode] = useState('');
    const [isLoading, setIsLoading] = useState(false); // State for loading indicator
    const [showToast, setShowToast] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const AuthCode = async () => {
        setIsLoading(true);

        try {
            const response = await axios.post('https://ppevent.azurewebsites.net/api/geteventbycode', {
                eventcode: eventCode.toUpperCase()
            });

            if (response.data.event != null) {
                setIsAuthenticated(true);
                setCurrentEvent(response.data.event);
                setShowToast(false)
                navigation.navigate('HomeScreen');
            } else {
                setShowToast(true)
                setErrorMessage(response.data.message);
            }

            console.log('Response:', response.data);
        } catch (error) {
            console.log('Error:', error);
        } finally {
            setIsLoading(false); // Set loading to false regardless of success or failure
        }
    }

    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }} >
            {isLoading &&
                <ActivityIndicator
                    style={{
                        flex: 1,
                        marginTop: 10,
                        position: "absolute",
                        elevation: 0,
                        backgroundColor: "#fff",
                        opacity: 0.4,
                        width: "100%",
                        height: "100%",
                        zIndex: 100
                    }}
                    size="large"
                    color="#007A88" />}

            <View style={{ flex: 1, backgroundColor: "#fff" }}>
                <View style={{ width: '100%', flexDirection: "row" }}>
                    {/* <Image
                        source={require("../assets/vop.jpg")}
                        style={styles.leftBanner}
                        resizeMode="stretch">

                    </Image> */}
                    <View
                        style={{
                            width: "50%",
                            height: "100%",
                            backgroundColor: '#F9FEFF',
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <LottieView
                            autoPlay={true}
                            loop={true}
                            style={{
                                width: "80%",
                                height: "80%",
                                backgroundColor: '#F9FEFF'
                            }}
                            source={require('../assets/intro.json')} />
                    </View>


                    <View style={{ width: "50%", padding: 20, height: Dimensions.get('window').height }}>
                        <ScrollView>

                            <Image
                                source={require('../assets/logo.png')}
                                style={{ alignSelf: "center", width: 150, height: 80 }}
                                resizeMode="contain"
                            ></Image>

                            <Text style={{ fontSize: 14, fontFamily: "Poppins-SemiBold", color: "#007A88", alignSelf: "center" }}>Event Kiok</Text>

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
                                        autoCapitalize="characters"
                                        onChangeText={text => setEventCode(text)}
                                        value={eventCode}
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
                                    onPress={AuthCode}
                                >
                                    <Text style={{
                                        fontFamily: "Poppins-Medium",
                                        color: "#fff",
                                        fontSize: 18
                                    }}>
                                        Login
                                    </Text>
                                </TouchableOpacity>

                                <Toast
                                    visible={showToast}
                                    position={50}
                                    shadow={false}
                                    animation={false}
                                    hideOnPress={false}
                                >{errorMessage}</Toast>

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
        height: "100%"
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
