import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { SafeAreaView } from 'react-native-safe-area-context';

import LottieView from 'lottie-react-native';

import Toggle from "react-native-toggle-element";
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useAppBase } from '../providers/AppBaseContext';
import Scanner from '../components/Scanner.';

export default function ScanEngine({ route, navigation }) {
    const { isAuthenticated, setIsAuthenticated, currentEvent, setCurrentEvent } = useAppBase();

    const { newScan, changeScanState } = useAppBase();
    const [scanResult, setScanResult] = useState(null);
    const [showResults, setShowResults] = useState(false);
    const [foundEvent, setFoundEvent] = useState(null);
    const [noFoundEvent, setNoFoundEvent] = useState(false);
    const [isScanning, seIsScanning] = useState(true);
    const [toggleValue, setToggleValue] = useState(false);
    const [eventCode, setEventCode] = useState();

    useEffect(() => {
        if (newScan) {
            setShowResults(false);
            setEventCode("");
            setToggleValue(false);
        }
    }, [newScan]);

    const handleScanned = (result) => {
        console.log(eventCode)
        if (result != null) {
            setScanResult(result.data);
            verifyID(result.data);
        } else if (eventCode != null) {
            setScanResult(eventCode);
            verifyID(eventCode);
        }
    };

    const verifyID = (ticketCode) => {
        //const foundEvent =[ EventsData.find(event => event.code === ticketCode)];
        console.log('verifyID');
        console.log(ticketCode);
        console.log(currentEvent.eventcode);

        (currentEvent.eventcode === ticketCode) ? (
            setShowResults(true),
            setFoundEvent(currentEvent),
            seIsScanning(false),
            setNoFoundEvent(false)
        ) : (
            setShowResults(false),
            setNoFoundEvent(true)
        )
    }
    const getScanState = (_state) => {
        setShowResults(false)
        setNoFoundEvent(false)
        seIsScanning(!isScanning)
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }} >
            <View style={{ flex: 1, backgroundColor: "#fff" }}>
                <ScrollView >
                    <View style={{ ...styles.container, flexDirection: 'row' }}>
                        <View style={{
                            width: "50%",
                            marginTop: -30,
                            alignItems: "center",
                        }}>


                            <Toggle
                                value={toggleValue}
                                onPress={() => setToggleValue(!toggleValue)}
                                leftTitle="Scan Code"
                                rightTitle="Manual Checkin"
                                trackBar={{
                                    width: 300,
                                    activeBackgroundColor: "#EBEFF1",
                                    inActiveBackgroundColor: "#EBEFF1"
                                }}
                                thumbButton={{
                                    width: 150,
                                    activeBackgroundColor: "#fff",
                                    activeColor: "#fff",
                                }}
                                animationDuration={100}

                                thumbStyle={{ backgroundColor: '#0095A6' }}
                            />
                            {(!toggleValue) ?
                                <View>
                                    <View style={{ alignItems: 'center', marginTop: 2 }}>
                                        <Text style={styles.header}><Text style={{ color: '#0095A6' }}>Scan</Text> Ticket</Text>
                                        <Text style={{ fontSize: 18 }}>Place QR to frame to scan</Text>
                                    </View>
                                    <Scanner onScanned={handleScanned} scanMode={getScanState} />
                                </View>
                                :
                                <View style={{ margin: 30, width: "80%", marginHorizontal: 40 }}>
                                    <Text style={{ fontSize: 16, fontFamily: "Poppins-Medium" }}>Enter Event Code to verify</Text>

                                    <View style={styles.textFieldWrapper}>
                                        <TextInput
                                            style={styles.textField}
                                            placeholder="Enter Event Code"
                                            value={eventCode}
                                            onChangeText={setEventCode}
                                            autoCapitalize="characters"
                                        />
                                        <TouchableOpacity style={{ position: "absolute", right: 5 }} onPress={() => { handleScanned() }}>
                                            <Ionicons name="search-circle" size={56} color="#0095A6" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            }
                        </View>
                        <View style={{ width: "50%" }}>
                            <TouchableOpacity
                                style={{ marginTop: 20, flexDirection: "column", alignItems: "flex-end", justifyContent: 'flex-start', margin: 30 }}
                                onPress={() => navigation.goBack()}
                            >
                                <AntDesign name="close" size={28} color="#35536B" />
                            </TouchableOpacity>
                            {
                                (showResults) ? (
                                    <View style={{ flex: 1, alignItems: 'center', margin: 10 }} >
                                        <Text style={{ fontSize: 20 }}> Event Code: <Text style={{ color: '#0095A6', fontSize: 24, fontFamily: "Poppins-Bold", }}>{foundEvent.eventcode}</Text></Text>

                                        <Text style={{ color: '#000', fontSize: 26, fontFamily: "Poppins-Bold", }}>{foundEvent.title}</Text>


                                        <TouchableOpacity
                                            style={{
                                                backgroundColor: "#15A259",
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                height: 50,
                                                width: 100,
                                                borderRadius: 10,
                                                marginVertical: 20,
                                                opacity: 0.9,
                                            }}
                                            onPress={() => { navigation.navigate("CheckIn"), changeScanState(false) }}
                                        >
                                            <Text style={{
                                                fontFamily: "Poppins-Medium",
                                                color: "#fff",
                                                fontSize: 16,
                                                margin: 5
                                            }}>
                                                Check In
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                ) : null
                            }
                            {
                                (noFoundEvent) ? (
                                    <View style={{
                                        display: "flex",
                                        flex: 1,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        backgroundColor: "#fff"

                                    }}>
                                        <Text style={{ fontSize: 20, fontFamily: "Poppins-Bold" }}>Invalid Code</Text>
                                        <LottieView
                                            autoPlay={true}
                                            loop={true}
                                            style={{
                                                width: 200,
                                                height: 200,
                                            }}
                                            source={require('../assets/nodata.json')}
                                        />

                                    </View>
                                ) : null

                            }
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 50
    },
    header: {
        fontFamily: "Poppins-Bold",
        fontSize: 42
    },
    textFieldWrapper: {
        width: "100%",
        height: 56,
        backgroundColor: "#fff",
        borderWidth: 2,
        borderColor: '#0095A6',
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
})