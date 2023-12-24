import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { COLORS, SIZES } from "../../constants/theme";
import { ThemeContext } from "../../context/ThemeContext";

const TabButton = ({ tab, selectedTab, onHandleChange }) => {
  const { theme } = useContext(ThemeContext);
  let activeTheme = COLORS[theme];

  return (
    <TouchableOpacity
      style={styles.btn(tab, selectedTab, activeTheme)}
      onPress={onHandleChange}
      activeOpacity={0.9}
    >
      <Text style={styles.btnText(tab, selectedTab, activeTheme)}>{tab}</Text>
    </TouchableOpacity>
  );
};

export default TabButton;

const styles = StyleSheet.create({
  btn: (tab, selectedTab, activeTheme) => ({
    paddingVertical: SIZES.medium,
    paddingHorizontal: SIZES.xLarge,
    width: "50%",
    borderRadius: SIZES.medium,
    marginLeft: 2,
    borderBottomWidth: tab === selectedTab ? 2 : 1,
    borderBottomColor: tab === selectedTab ? activeTheme.textPrimary : null,
  }),
  btnText: (tab, selectedTab, activeTheme) => ({
    fontSize: SIZES.small * 1.1,
    textAlign: "center",
    color: tab === selectedTab ? activeTheme.textPrimary : activeTheme.textGray,
    fontWeight: 600,
  }),
});
