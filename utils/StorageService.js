import AsyncStorage from "@react-native-async-storage/async-storage";

const setLoggedInUserInStorage = async (value) => {
  await AsyncStorage.setItem("loggedInUser", JSON.stringify(value));
};

const getLoggedInUserFromStorage = async () => {
  const user = await AsyncStorage.getItem("loggedInUser");
  return JSON.parse(user);
};

const setAuthTokenInStorage = async (token) => {
  await AsyncStorage.setItem("authToken", JSON.stringify(token));
};

const getAuthTokenFromStorage = async () => {
  const token = await AsyncStorage.getItem("authToken");
  return token;
};

const setSystemTheme = async (theme) => {
  await AsyncStorage.setItem("theme", JSON.stringify(theme));
};

const getSystemThemeStored = async () => {
  const theme = await AsyncStorage.getItem("theme");
  return JSON.parse(theme);
};

const clearAllStorage = () => {
  AsyncStorage.clear();
};

export default {
  setLoggedInUserInStorage,
  getLoggedInUserFromStorage,
  setAuthTokenInStorage,
  getAuthTokenFromStorage,
  clearAllStorage,
};
