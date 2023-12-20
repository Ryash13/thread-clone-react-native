import { View, Image } from "react-native";
import { THREAD_LOGO } from "@env";
import tw from "twrnc";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { COLORS } from "../../constants/theme";

const Branding = () => {
  const { theme } = useContext(ThemeContext);
  let activeTheme = COLORS[theme];
  return (
    <View style={tw`items-center justify-center mt-16`}>
      <Image
        style={[tw`w-22 h-22`]}
        resizeMode="contain"
        tintColor={activeTheme.btnBackground}
        source={{ uri: THREAD_LOGO }}
      />
    </View>
  );
};

export default Branding;
