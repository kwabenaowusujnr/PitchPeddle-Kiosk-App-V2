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

    return (
        <AppBaseContext.Provider value={{ isAuthenticated, setIsAuthenticated, currentEvent, setCurrentEvent, newScan, changeScanState, eventCode, changeCurrentEvent }}>
            {children}
        </AppBaseContext.Provider>
    );
};


const storeData = async (value, storageNme = "currentEvent") => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(storageNme, jsonValue);
    } catch (e) {
        // saving error
    }
};

const getData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('currentEvent');
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
    }
};


export const useAppBase = () => {
    return useContext(AppBaseContext);
};