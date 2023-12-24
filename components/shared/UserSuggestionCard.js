import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import tw from "twrnc";
import { USER_PLACEHOLDER_IMAGE } from "@env";
import { checkIfImageIsValid } from "../../utils";
import { Skeleton } from "moti/skeleton";
import { COLORS, skeletonProp } from "../../constants/theme";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";

const UserSuggestionCard = ({ user, skeleton }) => {
  const navigation = useNavigation();
  const { loggedInUser } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  let activeTheme = COLORS[theme];

  const onPressUser = () => {
    navigation.navigate("UserProfile", {
      userId: user?.id,
      isFollowed: checkIfalreadyFollowed,
    });
  };

  const checkIfalreadyFollowed = loggedInUser?.userProfile?.followingUsers.some(
    (obj) => obj.id == user?.id
  );

  return (
    <View style={tw`w-full rounded-md p-4 mb-3`}>
      <Skeleton.Group show={true}>
        <TouchableOpacity onPress={onPressUser}>
          <View style={tw`flex-row items-center`}>
            {!skeleton ? (
              <Image
                source={{
                  uri: checkIfImageIsValid(user?.imageUrl)
                    ? user?.imageUrl
                    : USER_PLACEHOLDER_IMAGE,
                }}
                style={tw`w-9 h-9 rounded-full`}
                resizeMode="cover"
              />
            ) : (
              <Skeleton
                height={60}
                width={60}
                {...skeletonProp}
                colorMode={theme === "dark" ? "dark" : "light"}
                radius={"round"}
              ></Skeleton>
            )}
            <View style={tw`ml-3 flex-1 gap-1`}>
              {!skeleton ? (
                <Text
                  style={[
                    tw`font-semibold text-[16px]`,
                    { color: activeTheme.textPrimary },
                  ]}
                >
                  {user?.name}
                </Text>
              ) : (
                <Skeleton
                  width={150}
                  height={25}
                  colorMode={theme === "dark" ? "dark" : "light"}
                  {...skeletonProp}
                ></Skeleton>
              )}

              {!skeleton ? (
                <Text
                  style={[tw`text-[12px]`, { color: activeTheme.textGray }]}
                >
                  {user?.username}
                </Text>
              ) : (
                <Skeleton
                  width={100}
                  height={20}
                  colorMode={theme === "dark" ? "dark" : "light"}
                  {...skeletonProp}
                ></Skeleton>
              )}
            </View>
            {!skeleton ? (
              !checkIfalreadyFollowed ? (
                <TouchableOpacity
                  style={[
                    tw`py-2 px-4 rounded-md min-w-[95px] items-center justify-center`,
                    { borderColor: activeTheme.buttonBorder, borderWidth: 1 },
                  ]}
                >
                  <Text style={{ color: activeTheme.textPrimary }}>Follow</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[
                    tw`py-2 px-4 rounded-md`,
                    { borderColor: activeTheme.buttonBorder, borderWidth: 1 },
                  ]}
                >
                  <Text style={{ color: activeTheme.textPrimary }}>
                    Following
                  </Text>
                </TouchableOpacity>
              )
            ) : null}
          </View>
        </TouchableOpacity>
      </Skeleton.Group>
      <View style={tw`ml-12 relative top-4`}>
        <Text style={[{ color: activeTheme.textPrimary }, tw`absolute`]}>
          11 Followers
        </Text>
      </View>
    </View>
  );
};

export default UserSuggestionCard;

const styles = StyleSheet.create({});
