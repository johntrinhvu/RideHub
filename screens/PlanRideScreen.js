import React, { useCallback, useMemo, useRef, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import TopRowPlanRide from "../components/TopRowPlanRide";
import Icon from 'react-native-vector-icons/MaterialIcons'; // Make sure to install this package
import LocationList from "../components/LocationList";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from "../slices/navSlice";

const PlanRideScreen = () => {
    const dispatch = useDispatch();
    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ['25%', '50%', '75%'], []);

    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Text>Map will be displayed here</Text>
            <BottomSheet
                ref={bottomSheetRef}
                index={1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                backgroundStyle={styles.bottomSheetBackground}
            >
                <View style={styles.contentContainer}>
                    <TopRowPlanRide/>
                    <View style={styles.inputContainer}>
                        <View style={styles.combinedInputBox}>
                            <View style={styles.inputRow}>
                                <Icon name="location-on" size={24} color="#97BAE4" />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter your starting point"
                                    placeholderTextColor="#97BAE4"
                                    fontWeight="bold"
                                />
                            </View>
                            <View style={styles.separator} />
                            <View style={styles.inputRow}>
                                <Icon name="flag" size={24} color="#97BAE4" />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Destination"
                                    placeholderTextColor="#627892"
                                    fontWeight="bold"
                                />
                            </View>
                        </View>
                        <View style={styles.locationList}>
                            <LocationList/>
                        </View>
                        {/* <TextInput
                            style={styles.input}
                            placeholder="Enter your location"
                            value={location}
                            onChangeText={setLocation}
                        /> */}
                        <GooglePlacesAutocomplete
                            placeholder="Enter your location"
                            styles={{
                                container: {
                                    flex: 0,
                                },
                                textInput: {
                                    fontSize: 18,
                                },
                            }}
                            onPress={(data, details = null) => {
                                dispatch(setOrigin({
                                    location: details.geometry.location,
                                    desription: data.description
                                }))

                                dispatch(setDestination(null));
                            }}
                            fetchDetails={true}
                            returnKeyType={"search"}
                            enablePoweredByContainer={false}
                            minLength={2}
                            query={{
                                key: GOOGLE_MAPS_APIKEY,
                                langauge: 'en',
                            }}
                            nearbyPlacesAPI="GooglePlacesSearch"
                            debounce={400}
                        />
                        {/* <TextInput
                            style={styles.input}
                            placeholder="Enter your destination"
                            value={destination}
                            onChangeText={setDestination}
                        /> */}
                    </View>
                </View>
            </BottomSheet>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
    },
    contentContainer: {
        flex: 1,
        padding: 16,
        paddingTop: 5, // Reduced top padding
    },
    inputContainer: {
        width: '90%', // Adjust this value as needed
        marginTop: 20,
        alignSelf: 'center', // This centers the container
    },
    combinedInputBox: {
        borderWidth: 1,
        borderColor: '#97BAE4',
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: 'rgba(151, 186, 228, 0.1)', // Light blue with opacity
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    input: {
        flex: 1,
        padding: 16, // Increase padding
        color: '#fff', // Assuming you want white text
        fontSize: 16,
    },
    separator: {
        height: 1,
        backgroundColor: '#97BAE4',
    },
    bottomSheetBackground: {
        backgroundColor: '#161B21',
    },
    placeholder: {
        fontWeight: 'bold',
    }
});

export default PlanRideScreen;