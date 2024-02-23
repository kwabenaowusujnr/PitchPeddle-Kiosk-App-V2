import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

import { SafeAreaView } from 'react-native-safe-area-context';

import LottieView from 'lottie-react-native';

import Toggle from "react-native-toggle-element";
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useAppBase } from '../providers/AppBaseContext';
import Scanner from '../components/Scanner.';
import PhoneNumberValidator from '../components/PhoneNumberValidator';
import axios from 'axios';

export default function ScanEngine({ route, navigation }) {
    const { isAuthenticated, setIsAuthenticated, currentEvent, setCurrentEvent } = useAppBase();

    const { newScan, changeScanState } = useAppBase();
    const [scanResult, setScanResult] = useState(null);
    const [showResults, setShowResults] = useState(false);
    const [foundEvent, setFoundEvent] = useState(null);
    const [noFoundEvent, setNoFoundEvent] = useState(false);
    const [isScanning, seIsScanning] = useState(true);
    const [toggleValue, setToggleValue] = useState(false);
    const [eventCode, setEventCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [attendantName, setAttendantName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [scanResults, setScanResults] = useState('');
    const [scanCodeesults, setScanCodeResults] = useState(0);

    const statusLottie = useRef(null);

    const _sourceLoad = () => {
        switch (scanCodeesults) {
            case 0:
                return require('../assets/confirmation.json');
            case 1:
                return require('../assets/warning.json');
            case 2:
                return require('../assets/error.json');
            case 4:
                return require('../assets/serverError.json');
        }
    }

    useEffect(() => {
        if (newScan) {
            setShowResults(false);
            setEventCode("");
            setToggleValue(false);
        }
    }, [newScan]);

    const handleScanned = (result) => {
        console.log(result.data);
        setEventCode(result.data);
        CheckIn();



        // if (result != null) {
        //     setScanResult(result.data);
        //     verifyID(result.data);
        // } else if (eventCode != null) {
        //     setScanResult(eventCode);
        //     verifyID(eventCode);
        // }
    };

    const CheckIn = async () => {
        console.log(eventCode);
        setIsLoading(true);
        try {
            const response = await axios.post('https://ppevent.azurewebsites.net/api/checkin', {
                eventid: currentEvent.id,
                code: eventCode,
                name: attendantName,
                phonenumber: phoneNumber
            });

            setScanResults(response.data.message);
            setScanCodeResults(response.data.code)
            setShowResults(true);

            setEventCode('');
            setPhoneNumber('');
            setAttendantName('');

        } catch (error) {
            console.log('Error:', error);
        } finally {
            setIsLoading(false);
        }
    }

    const verifyID = (ticketCode) => {
        //const foundEvent =[ EventsData.find(event => event.code === ticketCode)];

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
                                    <Text style={{ fontSize: 16, fontFamily: "Poppins-Medium" }}>Enter Event Code to Check-In</Text>

                                    <View style={styles.textFieldWrapper}>
                                        <TextInput
                                            style={styles.textField}
                                            placeholder="Enter Code"
                                            value={eventCode}
                                            onChangeText={setEventCode}
                                            autoCapitalize="characters"
                                        />
                                        {/* <TouchableOpacity style={{ position: "absolute", right: 5 }} onPress={() => { handleScanned() }}>
                                            <Ionicons name="search-circle" size={56} color="#0095A6" />
                                        </TouchableOpacity> */}
                                    </View>

                                    <Text style={{ fontSize: 22, fontFamily: "Poppins-Bold", alignSelf: 'center' }}>OR</Text>

                                    <View style={styles.textFieldWrapper}>
                                        <TextInput
                                            style={styles.textField}
                                            placeholder="Name"
                                            value={attendantName}
                                            onChangeText={setAttendantName}
                                            autoCapitalize="characters"
                                        />
                                    </View>

                                    <View style={styles.textFieldWrapper}>
                                        <TextInput
                                            style={styles.textField}
                                            placeholder="Phone Number"
                                            value={phoneNumber}
                                            keyboardType='phone-pad'
                                            onChangeText={setPhoneNumber}
                                            autoCapitalize="characters"
                                        />
                                    </View>

                                    <TouchableOpacity
                                        style={{
                                            backgroundColor: "#0095A6",
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            height: 50,
                                            width: '100%',
                                            borderRadius: 10,
                                            marginVertical: 20,
                                            opacity: 0.9,
                                        }}
                                        onPress={() => { CheckIn(), changeScanState(false) }}
                                    >
                                        <Text style={{
                                            fontFamily: "Poppins-Bold",
                                            color: "#fff",
                                            fontSize: 18,
                                            margin: 5
                                        }}>
                                            Check In
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            }
                        </View>
                        <View style={{ width: "50%", marginTop: -30, }}>
                            <TouchableOpacity
                                style={{ marginTop: 20, flexDirection: "column", alignItems: "flex-end", justifyContent: 'flex-start', margin: 30, position: 'absolute', right: 0, top: 0 }}
                                onPress={() => navigation.goBack()}
                            >
                                <AntDesign name="close" size={28} color="#35536B" />
                            </TouchableOpacity>
                            {
                                (showResults) ? (
                                    <View style={{ flex: 1, alignItems: 'center', margin: 10 }} >
                                        <Text style={{ fontSize: 20 }}> Event Code: <Text style={{ color: '#0095A6', fontSize: 24, fontFamily: "Poppins-Bold", }}>{currentEvent.eventcode}</Text></Text>

                                        <Text style={{ color: '#000', fontSize: 26, fontFamily: "Poppins-Bold", }}>{currentEvent.title}</Text>

                                        <LottieView
                                            ref={statusLottie}
                                            autoPlay={true}
                                            loop={true}
                                            style={{
                                                width: 200,
                                                height: 200,
                                            }}
                                            source={_sourceLoad(scanCodeesults)}
                                        />

                                        <Text style={{ color: '#000', fontSize: 28, fontFamily: "Poppins-Bold", }}>{scanResults}</Text>



                                    </View>
                                ) : null
                            }
                            {/* {
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

                            } */}
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
    input: {
        height: 40,
        borderColor: 'green',  // Green border color
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    phoneInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
})