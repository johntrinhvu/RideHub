import React, { useCallback, useMemo, useRef, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, TextInput } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";

const PlanRideScreen = () => {
    const [location, setLocation] = useState('');
    const [destination, setDestination] = useState('');
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
            >
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>Plan Your Ride</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your location"
                            value={location}
                            onChangeText={setLocation}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your destination"
                            value={destination}
                            onChangeText={setDestination}
                        />
                    </View>
                    {/* Add additional ride planning options here */}
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
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
    },
});

export default PlanRideScreen;