import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View, SafeAreaView, TextInput, Button, Image } from "react-native";
import LottieView from 'lottie-react-native';

const LoginScreen = () => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }
        ).start();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Text className="text-blue-500">I am LoginScreen</Text>
            <Animated.View style={{...styles.loginContainer, opacity: fadeAnim}}>
                <Text style={styles.label}>Username</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter RideHub Username"
                />
                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Password"
                    secureTextEntry={true}
                />
                <View style={styles.buttonContainer}>
                    <Button
                        title="Sign In"
                        onPress={() => {}}
                    />
                </View>
                <LottieView 
                    source={require('../assets/space.json')} 
                    autoPlay 
                    loop 
                    style={styles.animation}
                />
            </Animated.View>
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#161B21', // Updated background color
    },
    loginContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 20,
    },
    label: {
        alignSelf: 'flex-start',
        marginBottom: 5,
    },
    input: {
        height: 40,
        width: '80%',
        marginBottom: 15,
        borderWidth: 1,
        padding: 10,
        alignSelf: 'flex-start',
    },
    buttonContainer: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 5,
        alignSelf: 'flex-start',
        marginBottom: 20,
    },
    animation: {
        width: 200,
        height: 200,
        alignSelf: 'center',
    },
});

export default LoginScreen;