import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";

const LoginForm = () => {
    return (
        <View style={styles.bottomHalf}>
            <Text style={styles.loginText}>Login Form</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    bottomHalf: {
        flex: 2,
        backgroundColor: '#F5F5F5',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
    },
    loginText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
});

export default LoginForm;