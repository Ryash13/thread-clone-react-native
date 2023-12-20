import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Modal from "react-native-modal";
import React, { useContext, useState } from "react";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import axios from "../../api/axiosState";

import Loader from "../../components/Loader/Loader";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";
import { checkIfImageIsValid } from "../../utils";
import { USER_PLACEHOLDER_IMAGE, POST_THREAD } from "@env";
import { COLORS } from "../../constants/theme";

const Threads = () => {
  const { loggedInUser } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  let activeTheme = COLORS[theme];

  const navigation = useNavigation();
  const [showModel, setShowModel] = useState(true);
  const [threadContent, setThreadContent] = useState("");
  const [loading, setLoading] = useState(false);

  const closeModel = () => {
    setShowModel(false);
    navigation.goBack();
    if (Platform.OS == "ios") {
      setTimeout(() => {
        setShowModel(true);
      }, 1000);
    }
  };

  const onPressPost = async () => {
    setLoading(true);
    const data = {
      thread: threadContent,
    };
    axios
      .post(`${POST_THREAD}q=${loggedInUser?.userProfile?.id}`, data)
      .then((response) => {
        setLoading(false);
        setShowModel(false);
        navigation.navigate("Home");
        setTimeout(() => {
          setShowModel(true);
        }, 1000);
      })
      .catch((error) => {
        console.log(
          "Error occred while posting the thread to the backend",
          error
        );
      });
  };

  return (
    <View
      style={[
        tw`items-center`,
        {
          width: Dimensions.get("screen").width,
        },
      ]}
    >
      <Loader loading={loading} />
      <Modal
        isVisible={showModel}
        animationType="slide"
        // transparent={true}
        style={tw`w-full m-0`}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={[
            tw`absolute h-[95%] w-full bg-white rounded-t-xl`,
            { bottom: 0, backgroundColor: activeTheme.background },
          ]}
        >
          {/* Header */}
          <View
            style={[
              tw`flex-row items-center justify-between px-4 py-3 border-b-[0.2px]`,
              { borderColor: activeTheme.dividerBorder },
            ]}
          >
            <TouchableOpacity onPress={closeModel}>
              <Text style={{ color: activeTheme.textPrimary }}>Cancel</Text>
            </TouchableOpacity>
            <Text
              style={[
                tw`text-center font-bold text-sm`,
                { color: activeTheme.textPrimary },
              ]}
            >
              New Threads
            </Text>
            <TouchableOpacity onPress={onPressPost}>
              <Text style={{ color: activeTheme.textPrimary }}>Post</Text>
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View style={tw`mt-4 px-4 flex-row gap-6`}>
            <View style={tw`flex`}>
              <Image
                resizeMode={"cover"}
                style={tw`w-12 h-12 rounded-full`}
                source={{
                  uri: checkIfImageIsValid(loggedInUser?.userProfile?.imageUrl)
                    ? loggedInUser?.userProfile?.imageUrl
                    : USER_PLACEHOLDER_IMAGE,
                }}
              />
            </View>
            <View style={tw`flex-shrink`}>
              <Text
                style={[
                  tw`font-bold text-lg`,
                  { color: activeTheme.textPrimary },
                ]}
              >
                {loggedInUser?.userProfile?.username}
              </Text>
              <TextInput
                style={[tw`mt-1`, { color: activeTheme.textPrimary }]}
                value={threadContent}
                onChangeText={(text) => setThreadContent(text)}
                placeholder="Type your message..."
                placeholderTextColor={activeTheme.textGray}
                numberOfLines={5}
                multiline={true}
                autoFocus={true}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

export default Threads;

const styles = StyleSheet.create({});
