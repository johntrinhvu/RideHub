import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View, SafeAreaView, TextInput, Button, Image, Dimensions } from "react-native";
import LottieView from 'lottie-react-native';

const { height } = Dimensions.get('window');

const LoginForm = () => {
    const fadeAnim = useRef(new Animated.Value(0)).current
    return (
        <View style={styles.bottomHalf}>
            <Text style={styles.loginText}>Login</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    bottomHalf: {
        height: height * 0.7,
        backgroundColor: '#161B21',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
    },
    loginText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#FFFFFF',
        textAlign: 'center',
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
        color: '#FFFFFF',
    },
    buttonContainer: {
        borderWidth: 1,
        borderColor: '#FFFFFF',
        padding: 5,
        alignSelf: 'flex-start',
        marginBottom: 20,
        
    },
});

export default LoginForm;