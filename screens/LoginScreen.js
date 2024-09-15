import React from "react";
import { StyleSheet, Text, View, TextInput, Button, Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

const LoginScreen = () => {
    const navigation = useNavigation();

    const handleSignIn = () => {
        navigation.navigate('HomeScreen');
    };

    return (
        <View style={styles.container}>
            <View style={styles.topHalf}>
                <Text style={styles.welcomeText}>Welcome to RideHub</Text>
            </View>
            <View style={styles.bottomHalf}>
                <Text style={styles.loginText}>Login</Text>
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
                <View style={styles.buttonContainer}>
                    <Button
                        title="Sign in as Guest"
                        onPress={handleSignIn}
                        color="#97BAE4"
                    />
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
        height: height * 0.6,
        backgroundColor: '#161B21',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
        justifyContent: 'center',
    },
    loginText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#FFFFFF',
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#97BAE4',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 5,
        color: '#FFFFFF',
    },
    buttonContainer: {
        marginTop: 10,
    },
});

export default LoginScreen;