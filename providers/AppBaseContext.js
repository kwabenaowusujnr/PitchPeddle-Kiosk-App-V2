import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import NetInfo from '@react-native-community/netinfo';

const AppBaseContext = createContext();
export const AppBaseProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentEvent, setCurrentEvent] = useState();
    const [newScan, setNewScan] = useState(false);
    const [eventCode, setEventCode] = useState();

    const [onlineMode, setOnlineMode] = useState(true);
    // useEffect(() => {
    //     const unsubscribe = NetInfo.addEventListener(state => {
    //         setIsConnected(state.isConnected);
    //         console.log(isConnected);
    //     });

    //     return () => {
    //         unsubscribe();
    //     };
    // }, []);

    const changeScanState = (state) => {
        setNewScan(state);
    }

    const changeCurrentEvent = (code) => {
        setEventCode(code);
    }

    const changeOnlineMode = (status) => {
        setOnlineMode(status);
    }

    const storeData = async (value, storageNme) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(storageNme, "");
            await AsyncStorage.setItem(storageNme, jsonValue);
        } catch (e) {
            // saving error
        }
    };

    const getData = async (storageNme) => {
        try {
            const jsonValue = await AsyncStorage.getItem(storageNme);

            console.log('provider: ' + JSON.parse(jsonValue).length)

            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // error reading value
        }
    };

    return (
        <AppBaseContext.Provider value={{ isAuthenticated, setIsAuthenticated, currentEvent, setCurrentEvent, newScan, changeScanState, eventCode, changeCurrentEvent, onlineMode, setOnlineMode, changeOnlineMode, storeData, getData }}>

            {children}
        </AppBaseContext.Provider>
    );
};





export const useAppBase = () => {
    return useContext(AppBaseContext);
};