import { View, Image } from "react-native";
import { THREAD_LOGO } from "@env";
import tw from "twrnc";

const Branding = () => {
  return (
    <View style={tw`items-center justify-center mt-16`}>
      <Image
        style={[tw`w-22 h-22`]}
        resizeMode="contain"
        source={{ uri: THREAD_LOGO }}
      />
    </View>
  );
};

export default Branding;
