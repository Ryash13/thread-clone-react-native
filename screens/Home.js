import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
