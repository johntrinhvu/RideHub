import React, { useCallback, useMemo, useRef, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, TextInput, Button } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";


const TopRowPlanRide = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.topRowPlanRide}>
            <View style={styles.backButtonContainer}>
                <Button
                    title="Back"
                    onPress={() => navigation.goBack()}
                />
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Plan Your Ride</Text>
            </View>
            <View style={styles.backButtonContainer} />
        </View>
    );
};

const styles = StyleSheet.create({
    topRowPlanRide: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
        marginTop: -8, // Negative margin to move it up
    },
    backButtonContainer: {
        width: 60,
        marginLeft: -10,
        marginTop: 0,
        marginBottom: 0,
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
});

export default TopRowPlanRide;
