import { View, Image, Linking, Alert, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import Animated, { Layout, FadeIn } from "react-native-reanimated";
import tw from "twrnc";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { ThemeContext } from "../../context/ThemeContext";
import { COLORS } from "../../constants/theme";

const ProfileHeader = ({ openWebVersion, showBack, onPressBack }) => {
  const { theme } = useContext(ThemeContext);

  let activeTheme = COLORS[theme];
  return (
    <View>
      <Animated.View
        layout={Layout}
        entering={FadeIn.duration(1000)}
        style={tw`flex-row items-center justify-between mb-1`}
      >
        {!showBack ? (
          <MaterialCommunityIcons
            onPress={openWebVersion}
            name="web"
            size={30}
            color={activeTheme.icon}
          />
        ) : (
          <AntDesign
            onPress={onPressBack}
            name="arrowleft"
            size={30}
            color={activeTheme.icon}
          />
        )}
        <View style={tw`flex-row gap-3`}>
          <TouchableOpacity
            onPress={async () => {
              const url = "https://www.instagram.com/";
              const supported = await Linking.canOpenURL(url);
              if (supported) {
                await Linking.openURL(url);
              } else {
                Alert.alert(`Cannot open URL: ${url}`);
              }
            }}
          >
            <Image
              style={[tw`w-6 h-6`, { tintColor: activeTheme.icon }]}
              source={require("../../assets/Images/insta.png")}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Image
            style={[tw`w-6 h-6`, { tintColor: activeTheme.icon }]}
            source={require("../../assets/Images/menu.png")}
            resizeMode="contain"
          />
        </View>
      </Animated.View>
    </View>
  );
};

export default ProfileHeader;
