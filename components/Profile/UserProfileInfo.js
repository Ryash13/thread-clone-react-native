import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Linking,
} from "react-native";
import React, { useContext } from "react";
import tw from "twrnc";
import { Skeleton } from "moti/skeleton";
import Animated, { FadeIn, Layout } from "react-native-reanimated";
import { MotiView } from "moti";

import { COLORS, skeletonProp } from "../../constants/theme";
import { checkIfImageIsValid } from "../../utils";
import ProfileHeader from "./ProfileHeader";
import { USER_PLACEHOLDER_IMAGE } from "@env";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "../../context/ThemeContext";

const UserProfileInfo = ({
  loading,
  user,
  onPressFollow,
  isFollowed,
  onPressUnfollow,
}) => {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);

  let activeTheme = COLORS[theme];

  const openWebVersion = async () => {
    const url = "https://www.threads.net/";
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Cannot open URL: ${url}`);
    }
  };

  return (
    <ScrollView style={styles.wrapper}>
      <Skeleton.Group show={loading}>
        {/* Header */}
        <ProfileHeader
          openWebVersion={openWebVersion}
          showBack={true}
          onPressBack={() => navigation.goBack()}
        />

        <View style={tw`flex-row items-center justify-between`}>
          <View style={styles.textContainer}>
            <MotiView style={tw`mt-2 gap-2`}>
              {!loading ? (
                <Animated.Text
                  layout={Layout}
                  entering={FadeIn.duration(1000)}
                  style={[
                    tw`font-bold text-2xl mt-2 uppercase`,
                    { color: activeTheme.textPrimary },
                  ]}
                >
                  {user?.name}
                </Animated.Text>
              ) : (
                <Skeleton width={150} height={25} {...skeletonProp} />
              )}
              <View style={tw`flex-row justify-between gap-2`}>
                {!loading ? (
                  <Animated.Text
                    layout={Layout}
                    entering={FadeIn.duration(1000)}
                    style={[
                      tw`font-semibold text-lg`,
                      { color: activeTheme.textPrimary },
                    ]}
                  >
                    {user?.username}
                  </Animated.Text>
                ) : (
                  <Skeleton width={75} height={20} {...skeletonProp} />
                )}
                {!loading ? (
                  <View
                    style={[
                      tw`rounded-lg w-24 h-7 items-center justify-center`,
                      { backgroundColor: activeTheme.threadweb },
                    ]}
                  >
                    <Text
                      style={[tw`text-center`, { color: activeTheme.textGray }]}
                    >
                      threads.net
                    </Text>
                  </View>
                ) : null}
              </View>
            </MotiView>
          </View>

          {!loading ? (
            <Animated.Image
              layout={Layout}
              entering={FadeIn.duration(1500)}
              style={tw`rounded-full`}
              resizeMode="cover"
              height={80}
              width={80}
              source={{
                uri: checkIfImageIsValid(user?.imageUrl)
                  ? user?.imageUrl
                  : USER_PLACEHOLDER_IMAGE,
              }}
            />
          ) : (
            <Skeleton
              height={80}
              width={80}
              {...skeletonProp}
              radius={"round"}
            />
          )}
        </View>

        {/* Bio */}
        <View style={tw`w-3/4`}>
          <MotiView style={tw`gap-2 mt-2`}>
            {!loading ? (
              <Text
                numberOfLines={3}
                style={[tw`leading-5`, { color: activeTheme.textPrimary }]}
              >
                Hi I am Yash raj, I am a software developer in Capgemini India
                working on GE Vernova project
              </Text>
            ) : (
              <Skeleton
                colorMode={theme}
                width={"100%"}
                height={15}
                {...skeletonProp}
              />
            )}
            {loading ? (
              <>
                <Skeleton
                  colorMode={theme}
                  width={"100%"}
                  height={15}
                  {...skeletonProp}
                />
                <Skeleton
                  colorMode={theme}
                  width={"100%"}
                  height={15}
                  {...skeletonProp}
                />
              </>
            ) : null}
          </MotiView>
        </View>

        {/* Number of Followers and Number of followings */}
        <Animated.View
          layout={Layout}
          entering={FadeIn.duration(1000)}
          style={tw`flex-row gap-4 items-center mt-3 pl-2`}
        >
          {!loading ? (
            <TouchableOpacity>
              <Text style={tw`text-gray-400`}>
                {user?.followersCount} Followers
              </Text>
            </TouchableOpacity>
          ) : (
            <Skeleton width={75} height={15} {...skeletonProp} />
          )}

          {!loading ? (
            <TouchableOpacity>
              <Text style={tw`text-gray-400`}>
                {user?.followingCount} Following
              </Text>
            </TouchableOpacity>
          ) : (
            <Skeleton width={75} height={15} {...skeletonProp} />
          )}
        </Animated.View>
        {!loading ? (
          <View>
            {!isFollowed ? (
              <TouchableOpacity
                activeOpacity={0.5}
                style={[
                  tw`p-2 mt-3 items-center justify-center rounded-md`,
                  { backgroundColor: activeTheme.btnBackground },
                ]}
                onPress={onPressFollow}
              >
                <Text
                  style={[tw`font-semibold`, { color: activeTheme.btnText }]}
                >
                  Follow
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.5}
                style={[
                  tw`p-2 mt-3 items-center justify-center rounded-md`,
                  { backgroundColor: activeTheme.btnBackground },
                ]}
                onPress={onPressUnfollow}
              >
                <Text
                  style={[tw`font-semibold`, { color: activeTheme.btnText }]}
                >
                  Unfollow
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ) : null}
      </Skeleton.Group>
    </ScrollView>
  );
};

export default UserProfileInfo;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 12,
  },
  textContainer: {
    flexDirection: "column",
    marginBottom: 20,
  },
  btnContainer: {
    borderWidth: 1,
    borderColor: "#e4e4e4",
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 7,
    width: Dimensions.get("window").width * 0.4,
  },
});
