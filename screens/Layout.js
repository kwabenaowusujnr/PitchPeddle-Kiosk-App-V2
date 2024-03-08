import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Index from "./Index";
import Welcome from "./Welcome";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { AppBaseProvider } from "../providers/AppBaseContext";
import CheckIn from "./CheckIn";
import ScanEngine from "./ScanEngine";
import AdminScreen from "./AdminScreen";

const Stack = createNativeStackNavigator();

export default function Layout() {
    return (
        <AppBaseProvider>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={
                        {
                            headerShown: false
                        }
                    }>
                    <Stack.Screen name="Welcome" component={Welcome} />
                    <Stack.Screen name="HomeScreen" component={Index} />
                    <Stack.Screen name="CheckIn" component={ScanEngine} />
                    <Stack.Screen name="AdminScreen" component={AdminScreen} />
                </Stack.Navigator>
                <StatusBar style="dark" />
            </NavigationContainer>
        </AppBaseProvider>
    );
}

const styles = StyleSheet.create({});
