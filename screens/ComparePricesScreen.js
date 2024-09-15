import React, { useMemo, useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import MapComponent from "../components/MapComponent";
import BottomSheet from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from "react-redux";
import { selectTravelTimeInformation } from '../slices/navSlice';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GOOGLE_API_KEY } from "@env";
import { Linking } from "react-native";

const ComparePricesScreen = () => {
    const navigation = useNavigation();
    const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);
    const travelTimeInformation = useSelector(selectTravelTimeInformation);
    const SURGE_CHARGE_RATE = 1.5;

    // Memo table for the non-repeated values
    const genAI = useMemo(() => new GoogleGenerativeAI(GOOGLE_API_KEY), []);
    const [aiMultiplier, setAiMultiplier] = useState(Array(9).fill(1));

    const getAIMultiplier = async (distance, duration) => {
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const prompt = `Based on a ride distance of ${distance} miles and a duration of ${duration} minutes, generate
            a price multiplier in floating point with 2 decimal places. Do not give me any text other than the value of the multiplier itself.`;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const generatedText = response.text();
            console.log("Generated text: ", generatedText);

            // response correctly handled
            const multiplier = parseFloat(generatedText);
            return isNaN(multiplier) ? 1 : multiplier;

        } catch (error) {
            console.error("Error gen AI mult: ", error);
            return 1;
        }
    }

    // run ai mult logic once
    useEffect(() => {
        if (travelTimeInformation && aiMultiplier === 1) { // run if hasn't been set
            const distance = travelTimeInformation.distance.value / 1609.34;
            const duration = travelTimeInformation.duration.value / 60;

            getAIMultiplier(distance, duration).then(multiplier => {
                setAiMultiplier(multiplier);
            })
        }
    }, [travelTimeInformation]);

    const generateRandomPrice = () => Number((Math.random() * 30 + 10).toFixed(2));
    const generateRandomDistance = () => Number((Math.random() * 3 + 1).toFixed(1));
    const generateRandomEta = () => Math.floor(Math.random() * 10) + 3;

    const getRandomRideService = () => {
        return Math.random() > 0.5 ? "Uber" : "Lyft";
    }

    const rideOptions = useMemo(() => {
        return Array(6).fill().map(() => ({
            price: generateRandomPrice(),
            distance: generateRandomDistance(),
            eta: generateRandomEta(),
            service: getRandomRideService(),
        })).sort((a, b) => a.price - b.price);
    }, []);

    const [selectedOption, setSelectedOption] = useState(null);

    const renderRideOptions = (options, isWheelchairAccessible = false) => {
        const getEtaColor = (eta) => {
            if (eta <= 5) return '#28a745'; // Green
            if (eta <= 10) return '#ffc107'; // Yellow
            return '#dc3545'; // Red
        };

        const handleVisitService = (service) => {
            const serviceUrl = service === "Uber" ? "https://www.uber.com" : "https://www.lyft.com";
            Linking.openURL(serviceUrl);
        }

        return options.map((option, index) => {
            const isSelected = selectedOption && 
                selectedOption.index === index && 
                selectedOption.isWheelchairAccessible === isWheelchairAccessible;
            
            // Calculate estimated arrival time
            const now = new Date();
            const estimatedArrival = new Date(now.getTime() + option.eta * 60000);

            // Apply conditional styles for Lyft or Uber
            const serviceStyle = option.service === 'Lyft' ? styles.lyftService : styles.uberService;
            const serviceTextStyle = option.service === 'Lyft' ? styles.lyftServiceText : styles.uberServiceText;
            
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
                            {/* {new Intl.NumberFormat('en-us', {
                                style: 'currency',
                                currency: 'USD',
                            }).format(
                                (travelTimeInformation?.duration.value * SURGE_CHARGE_RATE * aiMultiplier) / 100
                            )} */}
                        </Text>
                        <View className="flex flex-row">
                            <View style={[serviceStyle]} className="mr-5">
                                <Text style={[serviceTextStyle]}>{option.service}</Text>
                            </View>
                            <Text style={[styles.optionText, styles.eta, { color: getEtaColor(option.eta) }]}>
                                {option.eta} mins away
                            </Text>
                        </View>
                    </View>
                    {isSelected && (
                        <View style={styles.expandedContent} className="flex flex-row justify-between">
                            <View className="flex flex-col">
                                <Text style={styles.expandedText}>
                                    {option.distance.toFixed(1)} mi away
                                </Text>
                                <Text style={styles.expandedText}>
                                    Estimated arrival: {estimatedArrival.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={styles.visitButton}
                                onPress={() => handleVisitService(option.service)}
                            >
                                <Text style={styles.visitButtonText}>Visit {option.service}</Text>
                            </TouchableOpacity>
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

    // Generate some wheelchair accessible options
    const wheelchairAccessibleOptions = useMemo(() => {
        return Array(3).fill().map(() => ({
            price: generateRandomPrice() * 1.2, // Slightly more expensive
            distance: generateRandomDistance(),
            eta: generateRandomEta() + 5, // Slightly longer ETA
            service: getRandomRideService()
        })).sort((a, b) => a.price - b.price);
    }, []);

    return (
        <View style={styles.container}>
            <MapComponent />
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
                        </TouchableOpacity>
                        <View className="flex flex-col items-center">
                            <Text style={styles.headerTitle}>Choose a Ride - {travelTimeInformation?.distance.text}</Text>
                            <Text className="text-white font-medium mt-1">{travelTimeInformation?.duration.text} ETA</Text>
                        </View>
                    </View>
                    <ScrollView style={styles.rideOptionsContainer}>
                        {renderRideOptions(rideOptions)}
                        <View style={styles.sectionDivider} />
                        <View style={styles.sectionTitleContainer}>
                            <Text style={styles.sectionTitle}>Wheelchair Accessible Vehicles</Text>
                        </View>
                        {renderRideOptions(wheelchairAccessibleOptions, true)}
                    </ScrollView>
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
    lyftService: {
        backgroundColor: '#FF00BF',  // Pink background for Lyft
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    lyftServiceText: {
        color: 'white',  // White text for Lyft
        fontWeight: 'bold',
    },
    uberService: {
        backgroundColor: '#000000',  // Black background for Uber
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    uberServiceText: {
        color: 'white',  // White text for Uber
        fontWeight: 'bold',
    },
    visitButton: {
        marginTop: 10,
        backgroundColor: '#007AFF', // Blue button for "Visit {service}"
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 6,
        alignItems: 'center',
    },
    visitButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default ComparePricesScreen;
