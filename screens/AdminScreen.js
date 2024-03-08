import { ActivityIndicator, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import ReactNativeToggleElement from "react-native-toggle-element";
import { useAppBase } from "../providers/AppBaseContext";
import LottieView from "lottie-react-native";
import axios from "axios";
import { fetchEventReservations } from "../providers/api";

export default function AdminScreen({ navigation }) {
    const { currentEvent, onlineMode, changeOnlineMode, storeData, getData } = useAppBase();
    const [networkLabel, setNetworkLabel] = useState();
    const [showDownloadPanel, setShowDownloadPanel] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [downloadedData, setDownloadedData] = useState([]);
    const [uploadedData, setUploadedData] = useState([]);

    const handleModeChange = (state) => {
        changeOnlineMode(state);
        setShowDownloadPanel(!state);
    }

    useEffect(() => {
        if (onlineMode) {
            setNetworkLabel("Online Mode");
            setShowDownloadPanel(false);
        }
        else {
            setNetworkLabel("Offline Mode");
            setShowDownloadPanel(true);
            getLocalData();
        }

    }, [onlineMode]);

    const getLocalData = async () => {
        var localData = await getData("downloadData");
        setDownloadedData(localData);
    }

    const uploadData = async () => {
        setIsLoading(true);
        try {
            var localData = await getData("downloadData");

            if (localData != undefined) {
                //const response = await uploadEventReservations(currentEvent.id);
                const response = await axios.post('https://ppevent.azurewebsites.net/api/updatereservations', localData);
                storeData([], "downloadData");
                setUploadedData(localData);
            }

        } catch (error) {
            console.log('Error:', error);
        } finally {
            setIsLoading(false);
        }
    }

    const downloadData = async () => {
        setIsLoading(true);
        try {
            const response = await fetchEventReservations(currentEvent.id);
            storeData(response, "downloadData");
            setDownloadedData(response);

        } catch (error) {
            console.log('Error:', error);
        } finally {
            setIsLoading(false);
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
            <View>
                <View style={styles.wrapper}>
                    <ImageBackground source={require("../assets/background.png")} resizeMode='cover' style={{ width: "100%", height: "100%", borderBottomLeftRadius: 10, borderBottomRightRadius: 20, overflow: 'hidden' }}>

                        <View style={{
                            flex: 1,
                            flexDirection: "row",
                            marginHorizontal: 20,
                            alignItems: "center",
                            justifyContent: "flex-start",
                            width: "100%"
                        }}>
                            <TouchableOpacity
                                style={{ flexDirection: "row", alignItems: "center", justifyContent: 'center' }}
                                onPress={() => navigation.goBack()}
                            >
                                <AntDesign name="left" size={24} color="#fff" />
                            </TouchableOpacity>

                            <Text style={{ fontFamily: "Poppins-Bold", color: "#FFF", fontSize: 20 }}>Control Center</Text>

                        </View>

                    </ImageBackground>
                </View>

                <View style={{ padding: 20 }}>
                    <View style={{ ...styles.horizontalAlign }}>
                        <MaterialIcons name="network-check" size={30} color="#707A81" />
                        <Text style={styles.ProfileLabel}>
                            {networkLabel}
                        </Text>

                        <ReactNativeToggleElement
                            onPress={handleModeChange}
                            value={onlineMode}
                            trackBar={{
                                width: 46,
                                height: 24,
                                backgroundColor: "#FEE4D6",
                                activeBackgroundColor: "#FEE4D6",
                                inActiveBackgroundColor: "#efefef",
                                borderActiveColor: "#E95436",
                                borderInActiveColor: "#efefef",
                                borderWidth: 1
                            }}
                            thumbButton={{
                                width: 20,
                                height: 20,
                                activeBackgroundColor: "#E95436",
                                inActiveBackgroundColor: "#969696"
                            }}
                            animationDuration={70}
                        >

                        </ReactNativeToggleElement>

                    </View>
                    {

                        (showDownloadPanel) ?
                            <View style={{ width: "100%", flexDirection: "row", marginTop: 20 }}>
                                <View style={{ width: "50%", alignItems: "center" }}>
                                    <TouchableOpacity
                                        style={{ alignItems: "center" }}
                                        onPress={downloadData}
                                    >
                                        <Image
                                            style={{
                                                width: 100,
                                                height: 100,
                                            }}
                                            source={require('../assets/download.png')}
                                        />
                                        <Text style={{
                                            fontFamily: "Poppins-Medium",
                                            color: "#969293",
                                            fontSize: 18
                                        }}>
                                            Download Data
                                        </Text>
                                        {
                                            (downloadedData !== undefined) ? (
                                                <Text style={{
                                                    fontFamily: "Poppins-Bold",
                                                    color: "#000",
                                                    fontSize: 18
                                                }}>
                                                    ( {downloadedData.length} Records Downloaded)
                                                </Text>
                                            ) : null
                                        }

                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: "50%", alignItems: "center" }}>
                                    <TouchableOpacity
                                        style={{ alignItems: "center" }}
                                        onPress={uploadData}
                                    >
                                        <Image
                                            style={{
                                                width: 100,
                                                height: 100,
                                            }}
                                            source={require('../assets/upload.png')}
                                        />
                                        <Text style={{
                                            fontFamily: "Poppins-Medium",
                                            color: "#969293",
                                            fontSize: 18
                                        }}>
                                            Upload Data
                                        </Text>
                                        {
                                            (uploadedData !== undefined) ? (
                                                <Text style={{
                                                    fontFamily: "Poppins-Bold",
                                                    color: "#000",
                                                    fontSize: 18
                                                }}>
                                                    ( {uploadedData.length} Records Uploaded)
                                                </Text>
                                            ) : null
                                        }
                                    </TouchableOpacity>
                                </View>
                            </View>
                            : null
                    }
                </View>
            </View>
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
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({

    wrapper: {
        alignItems: 'center',
        borderRadius: 60,
        height: "30%",

    },
    horizontalAlign: {
        flexDirection: "row",
        gap: 10

    },
    ProfileLabel: {
        color: "#353537",
        fontFamily: "Poppins-SemiBold",
        marginLeft: 10,
        fontSize: 20
    }
});
