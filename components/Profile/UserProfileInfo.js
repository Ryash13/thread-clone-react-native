import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Linking,
} from "react-native";
import React from "react";
import tw from "twrnc";
import { Skeleton } from "moti/skeleton";
import Animated, { FadeIn, Layout } from "react-native-reanimated";
import { MotiView } from "moti";

import { skeletonProp } from "../../constants/theme";
import { checkIfImageIsValid } from "../../utils";
import ProfileHeader from "./ProfileHeader";
import { USER_PLACEHOLDER_IMAGE } from "@env";
import { useNavigation } from "@react-navigation/native";

const UserProfileInfo = ({
  loading,
  user,
  onPressFollow,
  isFollowed,
  onPressUnfollow,
}) => {
  const navigation = useNavigation();

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
                  style={tw`font-bold text-2xl mt-2 uppercase`}
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
                    style={tw`font-semibold text-lg`}
                  >
                    {user?.username}
                  </Animated.Text>
                ) : (
                  <Skeleton width={75} height={20} {...skeletonProp} />
                )}
                {!loading ? (
                  <View
                    style={tw` rounded-lg w-24 h-7 bg-gray-200 items-center justify-center`}
                  >
                    <Text style={[tw`text-center text-gray-400`]}>
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
              <Text numberOfLines={3} style={tw`leading-5`}>
                Hi I am Yash raj, I am a software developer in Capgemini India
                working on GE Vernova project
              </Text>
            ) : (
              <Skeleton width={"100%"} height={15} {...skeletonProp} />
            )}
            {loading ? (
              <>
                <Skeleton width={"100%"} height={15} {...skeletonProp} />
                <Skeleton width={"100%"} height={15} {...skeletonProp} />
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
                style={tw`p-2 mt-3 items-center justify-center bg-slate-800 rounded-md`}
                onPress={onPressFollow}
              >
                <Text style={tw`text-white font-semibold`}>Follow</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.5}
                style={tw`p-2 mt-3 items-center justify-center bg-slate-800 rounded-md`}
                onPress={onPressUnfollow}
              >
                <Text style={tw`text-gray-300 font-semibold`}>Unfollow</Text>
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
