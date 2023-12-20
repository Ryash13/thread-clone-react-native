import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../constants/theme";

const TabButton = ({ tab, selectedTab, onHandleChange }) => {
  return (
    <TouchableOpacity
      style={styles.btn(tab, selectedTab)}
      onPress={onHandleChange}
      activeOpacity={0.9}
    >
      <Text style={styles.btnText(tab, selectedTab)}>{tab}</Text>
    </TouchableOpacity>
  );
};

export default TabButton;

const styles = StyleSheet.create({
  btn: (tab, selectedTab) => ({
    paddingVertical: SIZES.medium,
    paddingHorizontal: SIZES.xLarge,
    width: "50%",
    borderRadius: SIZES.medium,
    marginLeft: 2,
    borderBottomWidth: tab === selectedTab ? 2 : 1,
    borderBottomColor:
      tab === selectedTab ? COLORS.dark.black : COLORS.dark.gray,
  }),
  btnText: (tab, selectedTab) => ({
    fontSize: SIZES.small * 1.1,
    textAlign: "center",
    color: tab === selectedTab ? COLORS.dark.black : COLORS.dark.gray,
    fontWeight: 600,
  }),
});
