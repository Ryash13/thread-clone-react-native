import { StyleSheet, View, SafeAreaView } from "react-native";
import React, { useContext } from "react";
import tw from "twrnc";
import { HeaderWithBack } from "../../components";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "../../context/ThemeContext";
import { COLORS } from "../../constants/theme";

const Activity = () => {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);

  let activaTheme = COLORS[theme];

  const onBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={[tw`h-full`, { backgroundColor: activaTheme.background }]}>
      <SafeAreaView>
        <View style={tw`p-3`}>
          <HeaderWithBack onBackPress={onBackPress} label={"Activities"} />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Activity;

const styles = StyleSheet.create({});
