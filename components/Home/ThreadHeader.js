import { Pressable, Text, View } from "react-native";
import React, { useContext } from "react";
import tw from "twrnc";
import { timeAgo } from "../../utils";
import { Feather } from "@expo/vector-icons";
import { Skeleton } from "moti/skeleton";
import { COLORS, skeletonProp } from "../../constants/theme";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";

const ThreadHeader = ({ username, postedAt, loading, userId }) => {
  const { loggedInUser } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  let activeTheme = COLORS[theme];
  const navigation = useNavigation();

  const onPressUser = () => {
    if (loggedInUser?.id == userId) {
      navigation.navigate("Profile");
    } else {
      navigation.navigate("UserProfile", {
        userId: userId,
      });
    }
  };

  return (
    <View style={tw`flex-row items-center justify-between w-[100%]`}>
      <Skeleton.Group show={loading}>
        {!loading ? (
          <Pressable onPress={onPressUser}>
            <Text
              style={[
                tw`font-semibold text-lg`,
                { color: activeTheme.textPrimary },
              ]}
            >
              {username}
            </Text>
          </Pressable>
        ) : (
          <Skeleton
            height={20}
            width={80}
            colorMode={theme === "dark" ? "dark" : "light"}
            {...skeletonProp}
          ></Skeleton>
        )}

        <View style={tw`flex-row items-center gap-2`}>
          {!loading ? (
            <>
              <Text style={{ color: activeTheme.textGray }}>
                {timeAgo(postedAt)}
              </Text>
              <Feather
                name="more-horizontal"
                size={18}
                color={activeTheme.icon}
              />
            </>
          ) : (
            <Skeleton
              height={15}
              width={40}
              colorMode={theme === "dark" ? "dark" : "light"}
              {...skeletonProp}
            ></Skeleton>
          )}
        </View>
      </Skeleton.Group>
    </View>
  );
};

export default ThreadHeader;
