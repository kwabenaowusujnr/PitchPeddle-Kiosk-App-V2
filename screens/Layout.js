import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Index from "./Index";
import Welcome from "./Welcome";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

const Stack = createNativeStackNavigator();

export default function Layout() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={
                    {
                        headerShown: false
                    }
                }>
                <Stack.Screen name="Welcome" component={Welcome} />

                <Stack.Screen name="HomeScreen" component={Index} />

            </Stack.Navigator>
            <StatusBar style="dark" />
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({});
