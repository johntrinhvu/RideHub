import React from "react";
import { StyleSheet, Text, View, TextInput, Button, Dimensions, Image, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

const LoginScreen = () => {
    const navigation = useNavigation();

    const handleSignIn = () => {
        navigation.navigate('HomeScreen');
    };

    return (
        <View style={styles.container}>
            <View style={styles.topHalf} className="h-1/2">
                <Text style={styles.welcomeText} className="">Welcome to RideHub</Text>
                <View className="rounded-xl bg-white flex mt-20">
                    <Image 
                        source={require("../assets/RHLogo.png")}
                        style={styles.logo}
                        className="mr-6 mt-6 ml-4"
                    />
                </View>
            </View>
            <View style={styles.bottomHalf} className="h-1/2">
                <View className="flex flex-col justify-between">
                    <Text style={styles.loginText} className="mt-2">Login</Text>
                    <View className="flex flex-col mt-16 mb-16 px-6">
                        <TextInput
                            style={styles.input}
                            placeholder="Enter RideHub Username"
                            placeholderTextColor="#999"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Password"
                            placeholderTextColor="#999"
                            secureTextEntry={true}
                        />
                    </View>
                    <TouchableOpacity 
                        style={styles.smallButton} 
                        onPress={handleSignIn}
                    >
                        <Text style={styles.buttonText}>Sign In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="items-center mt-3"
                        onPress={handleSignIn}
                    >
                        <Text className="text-white font-medium">Continue as Guest</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#97BAE4',
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20
    },
    topHalf: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#161B21',
    },
    bottomHalf: {
        backgroundColor: '#161B21',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
    },
    loginText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#FFFFFF',
        textAlign: 'center',
    },
    input: {
        height: 70,
        borderColor: '#97BAE4',
        borderWidth: 1,
        marginTop: -40,
        marginBottom: 80,
        paddingHorizontal: 10,
        borderRadius: 20,
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',

    },
    smallButton: {
        marginTop: -105,
        backgroundColor: '#97BAE4',
        paddingVertical: 10,  // Adjust the padding to make the button smaller
        paddingHorizontal: 50, // Adjust to make the width smaller
        borderRadius: 20,
        alignItems: 'center',
        alignSelf: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default LoginScreen;