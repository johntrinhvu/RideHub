import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ComparePricesScreen = () => {
    const navigation = useNavigation();
    const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

    const generateRandomPrice = () => Number((Math.random() * 30 + 10).toFixed(2));
    const generateRandomDistance = () => Number((Math.random() * 3 + 1).toFixed(1));
    const generateRandomEta = () => Math.floor(Math.random() * 10 + 3);

    const rideOptions = useMemo(() => {
        return Array(6).fill().map(() => ({
            price: generateRandomPrice(),
            distance: generateRandomDistance(),
            eta: generateRandomEta()
        })).sort((a, b) => a.price - b.price);
    }, []);

    const [selectedOption, setSelectedOption] = useState(null);

    const renderRideOptions = (options, isWheelchairAccessible = false) => {
        const getEtaColor = (eta) => {
            if (eta <= 5) return '#28a745'; // Green
            if (eta <= 10) return '#ffc107'; // Yellow
            return '#dc3545'; // Red
        };

        return options.map((option, index) => {
            const isSelected = selectedOption && 
                selectedOption.index === index && 
                selectedOption.isWheelchairAccessible === isWheelchairAccessible;
            
            // Calculate estimated arrival time
            const now = new Date();
            const estimatedArrival = new Date(now.getTime() + option.eta * 60000);
            
            return (
                <TouchableOpacity
                    key={index}
                    style={[
                        styles.optionContainer,
                        isSelected && styles.selectedOptionContainer
                    ]}
                    onPress={() => handleOptionPress(index, isWheelchairAccessible)}
                >
                    <View style={styles.optionContent}>
                        <Text style={[styles.optionText, styles.price]}>
                            ${option.price.toFixed(2)}
                        </Text>
                        <Text style={[styles.optionText, styles.eta, { color: getEtaColor(option.eta) }]}>
                            {option.eta} min
                        </Text>
                    </View>
                    {isSelected && (
                        <View style={styles.expandedContent}>
                            <Text style={styles.expandedText}>
                                {option.distance.toFixed(1)} mi away
                            </Text>
                            <Text style={styles.expandedText}>
                                Estimated arrival: {estimatedArrival.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </Text>
                        </View>
                    )}
                </TouchableOpacity>
            );
        });
    };

    const handleOptionPress = (index, isWheelchairAccessible) => {
        setSelectedOption(prevSelected => 
            prevSelected && prevSelected.index === index && prevSelected.isWheelchairAccessible === isWheelchairAccessible
                ? null 
                : { index, isWheelchairAccessible }
        );
    };

    const handleBackPress = () => {
        navigation.goBack(); // This will navigate to the previous screen
    };

    const handleBookRide = () => {
        // Implement booking logic here
        console.log('Booking ride:', rideOptions[selectedOption]);
    };

    // Generate some wheelchair accessible options
    const wheelchairAccessibleOptions = useMemo(() => {
        return Array(3).fill().map(() => ({
            price: generateRandomPrice() * 1.2, // Slightly more expensive
            distance: generateRandomDistance(),
            eta: generateRandomEta() + 5 // Slightly longer ETA
        })).sort((a, b) => a.price - b.price);
    }, []);

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
                        <Text style={styles.headerTitle}>Choose a Ride</Text>
                    </View>
                    <ScrollView style={styles.rideOptionsContainer}>
                        {renderRideOptions(rideOptions)}
                        <View style={styles.sectionDivider} />
                        <View style={styles.sectionTitleContainer}>
                            <Text style={styles.sectionTitle}>Wheelchair Accessible Vehicles</Text>
                        </View>
                        {renderRideOptions(wheelchairAccessibleOptions, true)}
                    </ScrollView>
                    {selectedOption !== null && (
                        <TouchableOpacity style={styles.bookButton} onPress={handleBookRide}>
                            <Text style={styles.bookButtonText}>Book Ride</Text>
                        </TouchableOpacity>
                    )}
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
    },
    backButtonContainer: {
        position: 'absolute',
        left: 10, // Changed from 0 to 10
        flexDirection: 'row',
        alignItems: 'center',
    },
    backText: {
        color: '#97BAE4',
        fontSize: 16,
        marginLeft: 5,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    rideOptionsContainer: {
        marginTop: 10,
        marginBottom: 80,
    },
    optionContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#97BAE4',
        borderRadius: 8,
    },
    selectedOptionContainer: {
        borderWidth: 2,
        borderColor: '#007AFF',
        backgroundColor: 'rgba(151, 186, 228, 0.1)',
    },
    optionContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    optionText: {
        fontSize: 16,
    },
    price: {
        fontWeight: 'bold',
        color: '#97BAE4',
    },
    eta: {
        // Remove the color property from here, as it will be set dynamically
    },
    expandedContent: {
        marginTop: 10,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#97BAE4',
    },
    expandedText: {
        fontSize: 14,
        color: '#FFFFFF',
        marginBottom: 5,
    },
    bookButton: {
        position: 'absolute',
        bottom: 35, // Increased from 25 to 35
        left: 16,
        right: 16,
        backgroundColor: '#007AFF',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    bookButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    sectionDivider: {
        height: 1,
        backgroundColor: '#97BAE4',
        marginVertical: 15,
    },
    sectionTitleContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
    },
});

export default ComparePricesScreen;
