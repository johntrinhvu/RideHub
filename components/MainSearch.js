import React from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Importing icons
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const MainSearch = () => {
  const navigation = useNavigation();

  return (
    <View
        style={{ backgroundColor: "rgb(74, 90, 109)" }}
        className="p-2 rounded-full flex-row items-center mt-3"
    >
        <TouchableOpacity 
            className="ml-2"
            onPress={() => navigation.navigate('PlanRideScreen')}
            >
            <Ionicons name="search" size={20} color="rgb(147 197 253)" />
        </TouchableOpacity>
        <TouchableOpacity
            className="ml-2 flex-1 font-bold"
            onPress={() => navigation.navigate('PlanRideScreen')}
        >
            <Text className="font-bold" style={{ color: "rgb(147 197 253)" }}>Where To?</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-blue-950 p-2 rounded-full flex-row items-center mr-1">
            <View className="mr-1">
                <Ionicons name="time" size={20} color="rgb(147 197 253)" />
            </View>
            <Text style={{ color: "rgb(147 197 253)" }} className="font-medium">Now</Text>
            <View className="ml-1">
                <AntDesign name="down" size={14} color="rgb(147 197 253)" />
            </View>
        </TouchableOpacity>
    </View>
  );
};

export default MainSearch;
