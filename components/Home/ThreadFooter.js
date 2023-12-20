import { View, Text } from "react-native";
import React, { useContext } from "react";
import tw from "twrnc";
import { Skeleton } from "moti/skeleton";
import { COLORS, skeletonProp } from "../../constants/theme";
import { ThemeContext } from "../../context/ThemeContext";

const ThreadFooter = ({ likes, comments, loading }) => {
  const { theme } = useContext(ThemeContext);
  let activeTheme = COLORS[theme];

  return (
    <View style={tw`my-2 flex-row gap-1`}>
      <Skeleton.Group show={loading}>
        {!loading ? (
          <>
            <Text style={[tw`text-[14px]`, { color: activeTheme.textGray }]}>
              {comments} replies .
            </Text>
          </>
        ) : (
          <Skeleton
            height={10}
            width={45}
            colorMode={theme === "dark" ? "dark" : "light"}
            {...skeletonProp}
          ></Skeleton>
        )}
        {!loading ? (
          <>
            <Text style={[tw`text-[14px]`, { color: activeTheme.textGray }]}>
              {likes} likes
            </Text>
          </>
        ) : (
          <Skeleton
            height={10}
            width={45}
            colorMode={theme === "dark" ? "dark" : "light"}
            {...skeletonProp}
          ></Skeleton>
        )}
      </Skeleton.Group>
    </View>
  );
};

export default ThreadFooter;
