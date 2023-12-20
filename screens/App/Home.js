import {
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import tw from "twrnc";

import axios from "../../api/axiosState";
import { FETCH_THREADS } from "@env";
import ThreadPost from "../../components/Home/ThreadPost";
import { ThemeContext } from "../../context/ThemeContext";
import { COLORS } from "../../constants/theme";
import Divider from "../../components/shared/Divider";

const Home = () => {
  const navigation = useNavigation();
  const animation = useRef(null);

  const { theme } = useContext(ThemeContext);
  let activeTheme = COLORS[theme];

  const [loading, setLoading] = useState(false);
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    fetchThreads();
  }, []);

  const fetchThreads = async () => {
    setLoading(true);
    await axios
      .get(`${FETCH_THREADS}`)
      .then((response) => {
        setThreads(response.data);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      })
      .catch((error) => {
        setLoading(false);
        console.log("Error occured while fetching threads for homepage", error);
      });
  };

  return (
    <View style={[tw`h-full`, { backgroundColor: activeTheme.background }]}>
      <SafeAreaView>
        {/* <Loader loading={loading} /> */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 2 }}
          style={[tw`mt-3 px-3`]}
          refreshControl={
            <RefreshControl
              refreshing={false}
              tintColor={"transparent"}
              onRefresh={() => {
                animation.current?.play();
                fetchThreads();
              }}
            />
          }
        >
          {theme == "Dark" ? (
            <LottieView
              style={[tw`w-16 h-16 self-center`]}
              loop={false}
              ref={animation}
              autoPlay
              source={require("../../animations/Threads_New_1.json")}
            />
          ) : (
            <LottieView
              style={[tw`w-16 h-16 self-center`]}
              loop={false}
              ref={animation}
              autoPlay
              source={require("../../animations/Threads_New_1.json")}
            />
          )}
          {threads.map((post, index) => (
            <>
              <ThreadPost loading={loading} thread={post} key={post.id} />
              {index !== threads.length - 1 && <Divider key={index} />}
            </>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
