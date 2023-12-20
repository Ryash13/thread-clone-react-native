import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SUGGESTIONS_API, SEARCH_API } from "@env";
import tw from "twrnc";
import axios from "../../api/axiosState";
import { AntDesign } from "@expo/vector-icons";
import Divider from "../../components/shared/Divider";
import { AuthContext } from "../../context/AuthContext";
import { UserSuggestionCard } from "../../components";
import { ThemeContext } from "../../context/ThemeContext";
import { COLORS } from "../../constants/theme";

const Search = () => {
  const { loggedInUser } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  let activeTheme = COLORS[theme];

  const [userList, setUserList] = useState([]);
  const [suggestionUsers, setSuggestionUsers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchSuggestions();
  }, [refreshing]);

  const fetchSuggestions = async () => {
    setLoading(true);
    const id = loggedInUser?.userProfile?.id;
    await axios
      .get(`${SUGGESTIONS_API}${id}`)
      .then((response) => {
        setUserList(response.data);
        setSuggestionUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(
          "Error occured while fetching user suggesstions from backend",
          error
        );
      });
  };

  useEffect(() => {
    if (keyword && keyword.length > 3) {
      onKeywordSearch();
    } else {
      setUserList(suggestionUsers);
    }
  }, [keyword]);

  const onRefresh = () => {
    fetchSuggestions();
  };

  const onKeywordSearch = async () => {
    setLoading(true);
    setTimeout(() => {
      axios
        .get(`${SEARCH_API}q=${keyword}`)
        .then((response) => {
          setUserList(response.data);
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        })
        .catch((error) => {
          setLoading(false);
          console.log(
            "Error occured while fetching user with Keyword from backend",
            error
          );
        });
    }, 1000);
  };

  return (
    <View
      style={{
        paddingTop: 45,
        paddingHorizontal: 12,
        height: "100%",
        backgroundColor: activeTheme.background,
      }}
    >
      <Text
        style={[tw`font-bold text-2xl`, { color: activeTheme.textPrimary }]}
      >
        Search
      </Text>
      <View
        style={[
          tw`flex-row gap-2 mt-1 rounded-xl p-2 my-3`,
          { backgroundColor: activeTheme.inputBg },
        ]}
      >
        <AntDesign name="search1" size={24} color={activeTheme.textGray} />
        <TextInput
          style={[tw`flex-1`, { color: activeTheme.textGray }]}
          value={keyword}
          onChangeText={(val) => {
            setKeyword(val);
          }}
          placeholder="Search..."
          placeholderTextColor={activeTheme.textGray}
        />
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {userList?.map((user, index) => (
          <>
            <UserSuggestionCard user={user} key={user.id} skeleton={loading} />
            {index !== userList.length - 1 && <Divider key={index} />}
          </>
        ))}
      </ScrollView>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
