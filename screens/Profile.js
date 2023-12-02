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
} from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import axios from "../api/axiosState";
import { LOGIN_PROFILE_API } from "@env";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Skeleton } from "moti/skeleton";
import { skeletonProp } from "../constants/theme";

const Profile = () => {
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
        console.log("data = ", response.data);
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

  return (
    <SafeAreaView>
      <View style={styles.wrapper}>
        <Skeleton.Group show={loading}>
          {/* Header */}
          <View style={tw`flex-row items-center justify-between mb-1`}>
            <MaterialCommunityIcons
              onPress={openWebVersion}
              name="web"
              size={30}
              color="black"
            />
            <Image
              style={[tw`w-6 h-6`, { tintColor: "black" }]}
              source={require("../assets/menu.png")}
              resizeMode="contain"
            />
          </View>

          <View style={tw`flex-row items-center justify-between`}>
            <View style={styles.textContainer}>
              <Skeleton width={150} height={35} {...skeletonProp}>
                <Text style={tw`font-bold text-2xl mt-2 uppercase`}>
                  {user?.name}
                </Text>
              </Skeleton>
              <View style={tw`flex-row justify-between gap-2`}>
                <Skeleton width={75} height={30} {...skeletonProp}>
                  <Text style={tw`font-semibold text-lg`}>
                    {user?.username}
                  </Text>
                </Skeleton>
                <View
                  style={[
                    tw` rounded-lg w-24 h-7 bg-gray-200 items-center justify-center`,
                    // { backgroundColor: "#1e1e1e" },
                  ]}
                >
                  <Text style={[tw`text-center text-gray-400`]}>
                    threads.net
                  </Text>
                </View>
              </View>
            </View>
            <Skeleton height={80} width={80} {...skeletonProp} radius={"round"}>
              <Image
                style={tw`rounded-full`}
                resizeMode="cover"
                height={80}
                width={80}
                source={{ uri: user?.imageUrl }}
              />
            </Skeleton>
          </View>

          {/* Bio */}
          <View style={tw`w-3/4`}>
            <Skeleton width={"100%"} height={15} {...skeletonProp}>
              {!loading && (
                <Text numberOfLines={3} style={tw`leading-5`}>
                  Hi I am Yash raj, I am a software developer in Capgemini India
                  working on GE Vernova project
                </Text>
              )}
            </Skeleton>
            {loading && (
              <View style={tw`mt-2`}>
                <Skeleton
                  width={"100%"}
                  height={15}
                  {...skeletonProp}
                ></Skeleton>
              </View>
            )}
            {loading && (
              <View style={tw`mt-2`}>
                <Skeleton
                  width={"100%"}
                  height={15}
                  {...skeletonProp}
                ></Skeleton>
              </View>
            )}
          </View>

          {/* Number of Followers and Number of followings */}
          <View style={tw`flex-row gap-4 items-center mt-3 pl-2`}>
            <Skeleton width={75} height={15} {...skeletonProp}>
              <TouchableOpacity>
                <Text style={tw`text-gray-400`}>
                  {user?.followersCount} Followers
                </Text>
              </TouchableOpacity>
            </Skeleton>
            <Skeleton width={75} height={15} {...skeletonProp}>
              <TouchableOpacity>
                <Text style={tw`text-gray-400`}>
                  {user?.followingCount} Following
                </Text>
              </TouchableOpacity>
            </Skeleton>
          </View>

          {/* Edit Profile and Share Profile Buttons */}
          <View style={tw`mt-6 flex-row items-center justify-around`}>
            <TouchableOpacity style={styles.btnContainer}>
              <Text>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnContainer}>
              <Text>Log Out</Text>
            </TouchableOpacity>
          </View>
        </Skeleton.Group>
      </View>
    </SafeAreaView>
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
    borderColor: "#e4e4e4",
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 7,
    width: Dimensions.get("window").width * 0.4,
  },
});
