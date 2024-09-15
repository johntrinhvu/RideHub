import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const TopRowPlanRide = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.topRowPlanRide}>
            <TouchableOpacity
                style={styles.backButtonContainer}
                onPress={() => navigation.goBack()}
            >
                <Ionicons name="arrow-back" size={24} color="#97BAE4" />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Planning Your Ride</Text>
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
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'flex-start',
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
