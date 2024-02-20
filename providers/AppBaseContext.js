import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import NetInfo from '@react-native-community/netinfo';

const AppBaseContext = createContext();
export const AppBaseProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
            console.log(isConnected);
        });

        return () => {
            unsubscribe();
        };
    }, []);


    return (
        <AppBaseContext.Provider value={{ isConnected }}>
            {children}
        </AppBaseContext.Provider>
    );
};



export const useAppBase = () => {
    return useContext(AppBaseContext);
};