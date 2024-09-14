import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import HomeTopBar from "../components/HomeTopBar";
import MapComponent from "../components/MapComponent";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env";

const HomeScreen = () => {
    return (
        <View>
            <HomeTopBar />
            <MapComponent />
        </View>

    );
}

export default HomeScreen;