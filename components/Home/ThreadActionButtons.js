import { Image, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { FontAwesome } from "@expo/vector-icons";
import tw from "twrnc";
import { ThemeContext } from "../../context/ThemeContext";
import { COLORS } from "../../constants/theme";

const ThreadActionButtons = ({ onPressLike, onPressUnlike, liked }) => {
  const { theme } = useContext(ThemeContext);
  let activeTheme = COLORS[theme];

  return (
    <View style={tw`flex-row gap-4 my-1 mb-2 items-center`}>
      {liked ? (
        <TouchableOpacity onPress={onPressUnlike}>
          <FontAwesome name="heart" size={26} color="red" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onPressLike}>
          <Image
            source={require("../../assets/Images/like.png")}
            resizeMode="cover"
            tintColor={activeTheme.icon}
          />
        </TouchableOpacity>
      )}
      <Image
        source={require("../../assets/Images/comment.png")}
        resizeMode="cover"
        tintColor={activeTheme.icon}
      />
      <Image
        source={require("../../assets/Images/repost.png")}
        resizeMode="cover"
        tintColor={activeTheme.icon}
      />
      <Image
        source={require("../../assets/Images/send.png")}
        resizeMode="cover"
        tintColor={activeTheme.icon}
      />
    </View>
  );
};

export default ThreadActionButtons;
