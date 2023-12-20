import { ScrollView, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";
import ThreadPost from "../Home/ThreadPost";

const UserThreads = ({ threads }) => {
  return (
    <>
      {threads.length > 0 ? (
        <ScrollView style={tw`p-3`}>
          {threads.map((post) => (
            <ThreadPost loading={false} thread={post} key={post.id} />
          ))}
        </ScrollView>
      ) : (
        <View style={tw`flex items-center justify-center p-3`}>
          <Text style={tw`text-[15px] text-center text-gray-400 mt-[50%]`}>
            User haven't Posted any Threads yet
          </Text>
        </View>
      )}
    </>
  );
};

export default UserThreads;
