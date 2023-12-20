import { View, Text, Image } from "react-native";
import React, { useContext } from "react";
import tw from "twrnc";
import { Skeleton } from "moti/skeleton";
import { COLORS, skeletonProp } from "../../constants/theme";
import { MotiView } from "moti";
import { ThemeContext } from "../../context/ThemeContext";

const ThreadContent = ({ content, image, loading }) => {
  const { theme } = useContext(ThemeContext);
  let activeTheme = COLORS[theme];

  return (
    <View style={tw`gap-2`}>
      <MotiView style={tw`mt-2 gap-2`}>
        <Skeleton.Group show={loading}>
          {!loading ? (
            <Text style={{ color: activeTheme.textPrimary }}>{content}</Text>
          ) : (
            <Skeleton
              height={15}
              width={"85%"}
              style={tw`mt-4`}
              colorMode={theme === "dark" ? "dark" : "light"}
              {...skeletonProp}
            />
          )}
          {loading ? (
            <>
              <Skeleton
                height={15}
                width={"85%"}
                colorMode={theme === "dark" ? "dark" : "light"}
                {...skeletonProp}
              />
              <Skeleton
                height={15}
                width={"85%"}
                colorMode={theme === "dark" ? "dark" : "light"}
                {...skeletonProp}
              />
            </>
          ) : null}
          {image && !loading ? (
            <Image
              source={{ uri: image }}
              style={tw`w-full m-h-[300px] rounded-xl`}
              resizeMode="cover"
            />
          ) : null}
        </Skeleton.Group>
      </MotiView>
    </View>
  );
};

export default ThreadContent;
