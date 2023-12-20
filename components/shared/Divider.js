import { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { ThemeContext } from "../../context/ThemeContext";
import { COLORS } from "../../constants/theme";

const Divider = () => {
  const { theme } = useContext(ThemeContext);
  let activeTheme = COLORS[theme];

  return (
    <View
      style={{
        borderColor: activeTheme.dividerBorder,
        marginTop: 10,
        borderWidth: StyleSheet.hairlineWidth,
      }}
    />
  );
};

export default Divider;
