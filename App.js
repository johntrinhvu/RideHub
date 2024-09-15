import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, Animated, Dimensions } from 'react-native';
import { Provider } from "react-redux";
import { store } from "./store";
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator } from "@react-navigation/stack";
import LottieView from 'lottie-react-native';

// Import your existing screens
import HomeScreen from "./screens/HomeScreen";
import PlanRideScreen from "./screens/PlanRideScreen";
import ComparePricesScreen from "./screens/ComparePricesScreen";
import "react-native-gesture-handler";

const Stack = createStackNavigator();

const SplashAnimation = ({ onAnimationComplete }) => {
  const fadeAnim = new Animated.Value(0);
  const { width, height } = Dimensions.get('window');

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start(() => {
      onAnimationComplete();
    });
  }, []);

  return (
    <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
      <LottieView 
        source={require('./assets/map.json')}
        autoPlay
        loop={false}
        resizeMode="contain"
        style={{ flex: 1 }}
        speed={1.7}
        backgroundColor="#161B21"
      />
    </Animated.View>
  );
};

export default function App() {
  const [showAnimation, setShowAnimation] = useState(true);


  if (showAnimation) {
    return <SplashAnimation onAnimationComplete={() => setShowAnimation(false)} />;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <KeyboardAvoidingView 
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
          >
            <Stack.Navigator>
              <Stack.Screen 
                name="LoginScreen"
                component={LoginScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen 
                name="HomeScreen"
                component={HomeScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen   
                name="PlanRideScreen"
                component={PlanRideScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen   
                  name="ComparePricesScreen"
                  component={ComparePricesScreen}
                  options={{
                  headerShown: false,
                  }}
              />
            </Stack.Navigator>
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}
