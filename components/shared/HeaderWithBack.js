import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import tw from "twrnc";
import { AntDesign } from "@expo/vector-icons";
import { ThemeContext } from "../../context/ThemeContext";
import { COLORS } from "../../constants/theme";

const HeaderWithBack = ({ onBackPress, label, isBackAvailable }) => {
  const { theme } = useContext(ThemeContext);

  let activaTheme = COLORS[theme];

  return (
    <View style={tw`flex-row gap-2 items-center`}>
      {isBackAvailable && (
        <AntDesign
          onPress={onBackPress}
          name="arrowleft"
          size={24}
          color="black"
        />
      )}
      <Text style={[tw`text-xl font-bold`, { color: activaTheme.textPrimary }]}>
        {label}
      </Text>
    </View>
  );
};

export default HeaderWithBack;

const styles = StyleSheet.create({});
