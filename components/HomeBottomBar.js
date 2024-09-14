import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';

const HomeBottomBar = () => {
  return (
    <View
        style={{ backgroundColor: "rgb(22, 27, 33)" }}
        className="p-5 flex flex-col"
    >
        <TouchableOpacity 
            className="ml-2 items-center justify-center"
        >
            <FontAwesome name="car" size={24} color="rgb(147 197 253)" />
            <Text className="font-medium" style={{color: "rgb(147, 197, 253)"}}>Ride</Text>
        </TouchableOpacity>
    </View>
  );
};

export default HomeBottomBar;
