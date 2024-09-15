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
import MapComponent from "../components/MapComponent";

const PlanRideScreen = () => {
    const dispatch = useDispatch();
    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => [ '30%', '93%'], []);

    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
    }, []);

    return (
        <View style={styles.container}>
            <MapComponent />
            <SafeAreaView style={styles.safeArea}>
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
                                    <GooglePlacesAutocomplete
                                        placeholder="Enter your starting location"
                                        styles={{
                                            container: {
                                                flex: 1,
                                                marginLeft: 10,
                                                marginRight: 10,
                                            },
                                            textInput: {
                                                backgroundColor: 'transparent',
                                                color: 'white',
                                                fontWeight: 'bold',
                                                fontSize: 16,
                                            },
                                            textInputContainer: {
                                                backgroundColor: 'transparent',
                                                borderTopWidth: 0,
                                                borderBottomWidth: 0,
                                            },
                                            listView: {
                                                backgroundColor: 'rgba(22, 27, 33, 0.9)', // Dark background with slight transparency
                                                borderRadius: 5,
                                                marginTop: -5,
                                            },
                                            row: {
                                                backgroundColor: 'transparent',
                                                paddingVertical: 10,
                                                marginHorizontal: 10,
                                            },
                                            separator: {
                                                height: 1,
                                                backgroundColor: 'rgba(151, 186, 228, 0.3)', // Light separator line
                                            },
                                            description: {
                                                color: '#C3DCFB',
                                                fontSize: 14,
                                                fontWeight: 'bold',
                                                marginLeft: -10,
                                            },
                                        }}
                                        textInputProps={{
                                            placeholderTextColor: '#627892',
                                        }}
                                        onPress={(data, details = null) => {
                                            dispatch(setDestination({
                                                location: details.geometry.location,
                                                description: data.description
                                            }))
                                        }}
                                        fetchDetails={true}
                                        returnKeyType={"search"}
                                        enablePoweredByContainer={false}
                                        minLength={2}
                                        query={{
                                            key: GOOGLE_MAPS_APIKEY,
                                            language: 'en',
                                        }}
                                        nearbyPlacesAPI="GooglePlacesSearch"
                                        debounce={400}
                                    />
                                </View>
                                <View style={styles.separator} />
                                <View style={styles.inputRow}>
                                    <Icon name="flag" size={24} color="#97BAE4" />
                                    <GooglePlacesAutocomplete
                                        placeholder="Destination"
                                        styles={{
                                            container: {
                                                flex: 1,
                                                marginLeft: 10,
                                                marginRight: 10,
                                            },
                                            textInput: {
                                                backgroundColor: 'transparent',
                                                color: 'white',
                                                fontWeight: 'bold',
                                                fontSize: 16,
                                            },
                                            textInputContainer: {
                                                backgroundColor: 'transparent',
                                                borderTopWidth: 0,
                                                borderBottomWidth: 0,
                                            },
                                            listView: {
                                                backgroundColor: 'rgba(22, 27, 33, 0.9)', // Dark background with slight transparency
                                                borderRadius: 5,
                                                marginTop: -5,
                                            },
                                            row: {
                                                backgroundColor: 'transparent',
                                                paddingVertical: 10,
                                                marginHorizontal: 10,
                                            },
                                            separator: {
                                                height: 1,
                                                backgroundColor: 'rgba(151, 186, 228, 0.3)', // Light separator line
                                            },
                                            description: {
                                                color: '#C3DCFB',
                                                fontSize: 14,
                                                fontWeight: 'bold',
                                                marginLeft: -10,
                                            },
                                        }}
                                        textInputProps={{
                                            placeholderTextColor: '#627892',
                                        }}
                                        onPress={(data, details = null) => {
                                            dispatch(setDestination({
                                                location: details.geometry.location,
                                                description: data.description
                                            }))
                                        }}
                                        fetchDetails={true}
                                        returnKeyType={"search"}
                                        enablePoweredByContainer={false}
                                        minLength={2}
                                        query={{
                                            key: GOOGLE_MAPS_APIKEY,
                                            language: 'en',
                                        }}
                                        nearbyPlacesAPI="GooglePlacesSearch"
                                        debounce={400}
                                    />
                                </View>
                            </View>
                            <View style={styles.locationList}>
                                <LocationList/>
                            </View>
                        </View>
                    </View>
                </BottomSheet>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
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