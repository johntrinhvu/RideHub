import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LoginForm from "../components/LoginForm";
import LottieView from 'lottie-react-native';

const LoginScreen2 = () => {
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
        <View style={styles.container}>
            <View style={styles.topHalf}>
                <Text style={styles.welcomeText}>Welcome to RideHub</Text>
            </View>
            <LoginForm/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#161B21",
    },
    topHalf: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcomeText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default LoginScreen;