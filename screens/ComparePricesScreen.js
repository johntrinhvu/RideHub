import React, { useMemo } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Linking } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ComparePricesScreen = () => {
    const navigation = useNavigation();
    const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

    const rideOptions = {
        uber: [
            { price: 10.50, distance: 3.5, eta: 8 },
            { price: 15.75, distance: 2.8, eta: 6 },
            { price: 20.00, distance: 1.5, eta: 4 },
        ],
        lyft: [
            { price: 11.25, distance: 3.7, eta: 9 },
            { price: 16.50, distance: 3.0, eta: 7 },
            { price: 21.75, distance: 1.7, eta: 5 },
        ]
    };

    const renderRideOptions = (company) => {
        return rideOptions[company].map((option, index) => (
            <View key={index} style={styles.optionRow}>
                <Text style={[styles.price, company === 'lyft' && styles.lyftText]}>
                    ${option.price.toFixed(2)}
                </Text>
                <Text style={[styles.distance, company === 'lyft' && styles.lyftText]}>
                    {option.distance.toFixed(1)} mi
                </Text>
                <Text style={[styles.eta, company === 'lyft' && styles.lyftText]}>
                    {option.eta} min
                </Text>
            </View>
        ));
    };

    const openApp = (appName) => {
        const urls = {
            uber: 'uber://',
            lyft: 'lyft://'
        };
        Linking.canOpenURL(urls[appName]).then(supported => {
            if (supported) {
                Linking.openURL(urls[appName]);
            } else {
                console.log(`Don't know how to open URI: ${urls[appName]}`);
            }
        });
    };

    const handleBackPress = () => {
        navigation.popToTop();
    };

    return (
        <View style={styles.container}>
            <View style={styles.mapContainer}>
                <Text style={styles.mapPlaceholder}>Map View</Text>
            </View>

            <BottomSheet
                index={0}
                snapPoints={snapPoints}
                handleIndicatorStyle={styles.handleIndicator}
                backgroundStyle={styles.bottomSheetBackground}
            >
                <SafeAreaView style={styles.sheetContent}>
                    <View style={styles.header}>
                        <TouchableOpacity 
                            style={styles.backButtonContainer}
                            onPress={handleBackPress}
                        >
                            <Ionicons name="arrow-back" size={24} color="#97BAE4" />
                            <Text style={styles.backText}>Back</Text>
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Compare Prices</Text>
                    </View>
                    <View style={styles.columns}>
                        <View style={styles.column}>
                            <Text style={styles.columnTitle}>Uber</Text>
                            {renderRideOptions('uber')}
                            <TouchableOpacity 
                                style={[styles.appButton, styles.uberButton]} 
                                onPress={() => openApp('uber')}
                            >
                                <Text style={styles.appButtonText}>Uber $69.69</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.columnSeparator} />
                        <View style={styles.column}>
                            <Text style={[styles.columnTitle, styles.lyftTitle]}>Lyft</Text>
                            {renderRideOptions('lyft')}
                            <TouchableOpacity 
                                style={[styles.appButton, styles.lyftButton]} 
                                onPress={() => openApp('lyft')}
                            >
                                <Text style={styles.appButtonText}>Lyft $69.69</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </BottomSheet>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    mapContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapPlaceholder: {
        color: '#fff',
        fontSize: 20,
    },
    bottomSheetBackground: {
        backgroundColor: '#161B21',
    },
    handleIndicator: {
        backgroundColor: '#3A3A3C',
        width: 40,
        height: 4,
    },
    sheetContent: {
        flex: 1,
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        position: 'relative',
        paddingHorizontal: 16,
    },
    backButtonContainer: {
        position: 'absolute',
        left: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backText: {
        color: '#97BAE4',
        fontSize: 16,
        marginLeft: 5,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    columns: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    column: {
        flex: 1,
        alignItems: 'center',
    },
    columnSeparator: {
        width: 10,
    },
    columnTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#FFFFFF',
    },
    lyftTitle: {
        color: '#FF00BF',
        fontFamily: 'Gotham-Bold',
    },
    lyftText: {
        fontFamily: 'Gotham-Book',
    },
    optionRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    price: {
        fontSize: 14,
        fontWeight: 'bold',
        width: 50,
        marginRight: 10,
        color: '#97BAE4',
        textAlign: 'right',
    },
    distance: {
        fontSize: 14,
        color: '#007AFF',
        width: 50,
        marginRight: 10,
        textAlign: 'center',
    },
    eta: {
        fontSize: 14,
        color: '#28a745',
        width: 50,
        textAlign: 'left',
    },
    appButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginTop: 10,
    },
    uberButton: {
        backgroundColor: '#C8F7C5',
    },
    lyftButton: {
        backgroundColor: '#F7C8F5',
    },
    appButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center',
    },
});

export default ComparePricesScreen;