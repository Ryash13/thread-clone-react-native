import { Image, View, Pressable } from "react-native";
import React, { useContext } from "react";
import { Skeleton } from "moti/skeleton";
import tw from "twrnc";

import { skeletonProp } from "../../constants/theme";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";

const ThreadLeftPanel = ({ thread, loading }) => {
  const { loggedInUser } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  const img =
    "https://img.lovepik.com/free-png/20211129/lovepik-robot-avatar-png-image_401191268_wh1200.png";

  const navigation = useNavigation();

  const onPressUser = () => {
    if (loggedInUser?.id == thread?.userId) {
      navigation.navigate("Profile");
    } else {
      navigation.navigate("UserProfile", {
        userId: thread?.userId,
      });
    }
  };

  return (
    <View style={tw`justify-between gap-1`}>
      <Skeleton.Group show={loading}>
        {loading ? (
          <Skeleton
            radius={"round"}
            height={50}
            width={50}
            colorMode={theme === "dark" ? "dark" : "light"}
            {...skeletonProp}
          />
        ) : (
          <Pressable onPress={onPressUser}>
            <Image
              style={tw`w-11 h-11 rounded-full`}
              resizeMode="cover"
              source={{ uri: thread?.userImage }}
            />
          </Pressable>
        )}
        {!loading ? (
          <View
            style={{
              borderWidth: "0.45x",
              alignSelf: "center",
              borderColor: "gray",
              borderStyle: "dotted",
              flexGrow: 1,
            }}
          />
        ) : null}
        <View
          style={{
            alignItems: "center",
            alignSelf: "center",
            gap: 5,
          }}
        >
          {!loading
            ? [1, 2, 3].map((index) => (
                <Image
                  key={index}
                  source={{ uri: img }}
                  style={{
                    width: index * 6,
                    height: index * 6,
                    borderRadius: 15,
                  }}
                  resizeMode="cover"
                />
              ))
            : null}
        </View>
      </Skeleton.Group>
    </View>
  );
};

export default ThreadLeftPanel;
