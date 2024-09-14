import React, { useRef, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

const ComparePricesScreen = () => {
    // ref for BottomSheet
    const bottomSheetRef = useRef(null);

    // define snap points
    const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Map or Background View</Text>

            <BottomSheet
                ref={bottomSheetRef}
                index={0}
                snapPoints={snapPoints}
            >
                <View style={styles.sheetContent}>
                    <Text style={styles.sheetTitle}>Compare Prices</Text>
                    {/* Add any other content here */}
                </View>
            </BottomSheet>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000', // Use a dark background for contrast
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        color: '#fff',
    },
    sheetContent: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
    },
    sheetTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default ComparePricesScreen;
