import { View } from "react-native";
import React from "react";
import tw from "twrnc";
import TabButton from "./TabButton";

const ProfileTabs = ({ tabs, selectedTab, setSelectedTab }) => {
  return (
    <View style={tw`w-full flex-row items-center`}>
      {tabs.map((item) => (
        <TabButton
          tab={item}
          key={item}
          selectedTab={selectedTab}
          onHandleChange={() => setSelectedTab(item)}
        />
      ))}
    </View>
  );
};

export default ProfileTabs;
