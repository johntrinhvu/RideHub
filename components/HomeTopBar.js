import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import MainSearch from "./MainSearch";

const HomeTopBar = () => {
  return (
    <View
        style={{ backgroundColor: "rgb(22, 27, 33)" }}
        className="p-4 pt-10"
    >
      <View className="flex flex-row justify-between">
        <Text className="text-white ml-2 text-2xl font-bold">Hello, Guest.</Text>
        <Image 
            source={require("../assets/RHLogo.png")}
            className="mr-6 ml-4 -mt-1"
            style={styles.logo}
        />
      </View>
      <MainSearch />
      
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
      width: 40,
      height: 40,
      marginRight: 8,
      // marginTop: 40,
  },
});

export default HomeTopBar;
