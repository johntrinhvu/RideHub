import React, { useCallback, useMemo, useRef, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import TopRowPlanRide from "../components/TopRowPlanRide";
import Icon from 'react-native-vector-icons/MaterialIcons';

const LocationList = () => {
    return (
        <View style={styles.container}>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
    },
});

export default LocationList;
