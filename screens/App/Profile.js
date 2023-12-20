import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions,
  Linking,
  Alert,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import tw from "twrnc";
import axios from "../../api/axiosState";
import Animated, { FadeIn, Layout } from "react-native-reanimated";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Skeleton } from "moti/skeleton";

import { LOGIN_PROFILE_API, USER_PLACEHOLDER_IMAGE } from "@env";
import { COLORS, skeletonProp } from "../../constants/theme";
import { checkIfImageIsValid } from "../../utils";
import StorageService from "../../utils/StorageService";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";
import { MotiView } from "moti";
import ProfileHeader from "../../components/Profile/ProfileHeader";

const Profile = () => {
  const { setLoggedInUser } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  let activeTheme = COLORS[theme];

  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchProfileInfo();
  }, []);

  const fetchProfileInfo = async () => {
    setLoading(true);
    await axios
      .get(`${LOGIN_PROFILE_API}`)
      .then((response) => {
        setUser(response.data);
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      })
      .catch((error) => {
        setLoading(false);
        console.log(
          "Error occured while fetching loggedIn user profile info",
          error
        );
      });
  };

  const openWebVersion = async () => {
    const url = "https://www.threads.net/";
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Cannot open URL: ${url}`);
    }
  };

  const handleLogOut = () => {
    Alert.alert("Confirmation", "Are you sure you want to Log Out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          StorageService.clearAllStorage();
          setLoggedInUser(null);
        },
      },
    ]);
  };

  return (
    <View style={[{ backgroundColor: activeTheme.background }, tw`h-full`]}>
      <SafeAreaView>
        <ScrollView style={styles.wrapper}>
          <Skeleton.Group show={loading}>
            <ProfileHeader showBack={false} openWebVersion={openWebVersion} />

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
                          tw`rounded-lg w-24 h-7 p-1 items-center justify-center`,
                          { backgroundColor: activeTheme.threadweb },
                        ]}
                      >
                        <Text
                          style={[
                            tw`text-center`,
                            { color: activeTheme.dividerBorder },
                          ]}
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

            <View style={tw`w-3/4`}>
              <MotiView style={tw`gap-2 mt-2`}>
                {!loading ? (
                  <Text
                    numberOfLines={3}
                    style={[tw`leading-5`, { color: activeTheme.textPrimary }]}
                  >
                    Hi I am Yash raj, I am a software developer in Capgemini
                    India working on GE Vernova project
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
              <Skeleton width={75} height={15} {...skeletonProp}>
                <TouchableOpacity>
                  <Text style={{ color: activeTheme.textGray }}>
                    {user?.followersCount} Followers
                  </Text>
                </TouchableOpacity>
              </Skeleton>
              <Skeleton width={75} height={15} {...skeletonProp}>
                <TouchableOpacity>
                  <Text style={{ color: activeTheme.textGray }}>
                    {user?.followingCount} Following
                  </Text>
                </TouchableOpacity>
              </Skeleton>
            </Animated.View>

            {/* Edit Profile and Share Profile Buttons */}
            <Animated.View
              layout={Layout}
              entering={FadeIn.duration(1000)}
              style={tw`mt-6 flex-row items-center justify-around`}
            >
              <TouchableOpacity
                style={[
                  styles.btnContainer,
                  { borderColor: activeTheme.buttonBorder },
                ]}
              >
                <Text style={{ color: activeTheme.textPrimary }}>
                  Edit Profile
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.btnContainer,
                  { borderColor: activeTheme.buttonBorder },
                ]}
                onPress={handleLogOut}
              >
                <Text style={{ color: activeTheme.textPrimary }}>Log Out</Text>
              </TouchableOpacity>
            </Animated.View>
          </Skeleton.Group>
          <View
            style={{
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: activeTheme.dividerBorder,
              marginTop: 20,
            }}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Profile;

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
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 7,
    width: Dimensions.get("window").width * 0.4,
  },
});
