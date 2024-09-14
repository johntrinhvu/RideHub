import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import HomeTopBar from "../components/HomeTopBar";
import MapComponent from "../components/MapComponent";
import HomeBottomBar from "../components/HomeBottomBar";

const HomeScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topBar}>
                <HomeTopBar />
            </View>
            <View style={styles.mapContainer}>
                <MapComponent />
            </View>
            <View style={styles.bottomBar}>
                <HomeBottomBar />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgb(22, 27, 33)",
    },
    topBar: {
        // Add padding or height as needed
    },
    mapContainer: {
        flex: 1, // This will make the map take up all available space
    },
    bottomBar: {
        // Add padding or height as needed
        height: 60,
        // paddingBottom: 10,
        paddingTop: 10,
    },
});

export default HomeScreen;
