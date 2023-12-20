import React, { useContext, useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import axios from "../../api/axiosState";
import {
  FETCH_USER_PROFILE,
  FETCH_USER_THREADS,
  FOLLOW_USER,
  UNFOLLOW_USER,
} from "@env";
import UserProfileInfo from "../../components/Profile/UserProfileInfo";
import ProfileTabs from "../../components/Profile/ProfileTabs";
import { ActivityIndicator, SafeAreaView, View } from "react-native";
import tw from "twrnc";
import UserThreads from "../../components/Profile/UserThreads";
import UserReplies from "../../components/Profile/UserReplies";
import { AuthContext } from "../../context/AuthContext";

const UserProfile = () => {
  const route = useRoute();
  const { userId, isFollowed } = route.params;
  const { loggedInUser } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [threadsLoading, setThreadsLoading] = useState(true);
  const [user, setUser] = useState();
  const [selectedTab, setSelectedTab] = useState("Threads");
  const [threads, setThreads] = useState([]);

  const Tabs = ["Threads", "Replies"];

  useEffect(() => {
    fetchUserProfile(userId);
  }, [userId]);

  const fetchUserProfile = async (userId) => {
    setLoading(true);
    setThreadsLoading(true);
    await axios
      .get(`${FETCH_USER_PROFILE}uid=${+userId}`)
      .then((response) => {
        setUser(response.data);

        setTimeout(() => {
          setLoading(false);
        }, 1500);
        fetchUserThreads(userId);
      })
      .catch((error) => {
        console.log(
          "Error Occured while fetching user profile from backend",
          JSON.stringify(error)
        );
        setLoading(false);
      });
  };

  const followUser = async () => {
    axios
      .post(`${FOLLOW_USER}/${loggedInUser.id}/${user?.id}`)
      .then((response) => {})
      .catch((error) => {
        console.log(
          "Error occured while following user from UserProfile screen",
          JSON.stringify(error)
        );
      });
  };

  const unfollowUser = async () => {
    axios
      .post(`${UNFOLLOW_USER}/${loggedInUser.id}/${user?.id}`)
      .then((response) => {})
      .catch((error) => {
        console.log(
          "Error occured while following user from UserProfile screen",
          JSON.stringify(error)
        );
      });
  };

  const fetchUserThreads = async (userId) => {
    setThreadsLoading(true);
    await axios
      .get(`${FETCH_USER_THREADS}uid=${+userId}`)
      .then((response) => {
        setThreads(response.data);
        setTimeout(() => {
          setThreadsLoading(false);
        }, 5000);
      })
      .catch((error) => {
        console.log(
          "Error Occured while fetching user profile from backend",
          JSON.stringify(error)
        );
        setThreadsLoading(false);
      });
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case "Threads":
        return <UserThreads threads={threads} />;

      case "Replies":
        return <UserReplies />;
    }
  };

  return (
    <SafeAreaView>
      <UserProfileInfo
        loading={loading}
        user={user}
        onPressFollow={followUser}
        onPressUnfollow={unfollowUser}
        isFollowed={isFollowed}
      />
      {!loading ? (
        <View style={tw`mt-0`}>
          <ProfileTabs
            tabs={Tabs}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        </View>
      ) : null}
      {!threadsLoading ? (
        renderTabContent()
      ) : (
        <ActivityIndicator
          style={tw`self-center mt-10`}
          size={"large"}
          color={"black"}
        />
      )}
    </SafeAreaView>
  );
};

export default UserProfile;
