import React from "react";
import { View, Text } from "react-native";
import MainSearch from "./MainSearch";

const HomeTopBar = () => {
  return (
    <View
        style={{ backgroundColor: "rgb(22, 27, 33)" }}
        className="p-4 pt-10 rounded-lg"
    >
      <Text className="text-white ml-2 text-2xl font-bold pt-8">Hi, John.</Text>
      <MainSearch />
      
    </View>
  );
};

export default HomeTopBar;
