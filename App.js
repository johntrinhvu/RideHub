import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { Provider } from "react-redux";
import { store } from "./store";
import HomeScreen from "./screens/HomeScreen";
import PlanRideScreen from "./screens/PlanRideScreen";
import ComparePricesScreen from "./screens/ComparePricesScreen";
import LoginScreen from "./screens/LoginScreen";
import "react-native-gesture-handler";
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator } from "@react-navigation/stack";

export default function App() {
  const Stack = createStackNavigator();

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
              {/* <Stack.Screen 
                name="HomeScreen"
                component={HomeScreen}
                options={{
                  headerShown: false,
                }}
              /> */}
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
