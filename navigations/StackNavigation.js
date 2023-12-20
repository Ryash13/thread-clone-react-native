import { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Appearance } from "react-native";

import { Login, Register, UserProfile } from "../screens/App";
import { StatusBar } from "expo-status-bar";
import TabNavigation from "./TabNavigation";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import StorageService from "../utils/StorageService";

const StackNavigation = () => {
  const Stack = createStackNavigator();
  const systemTheme = Appearance.getColorScheme();

  const [loggedInUser, setLoggedInUser] = useState();
  const [theme, setTheme] = useState(systemTheme);

  useEffect(() => {
    StorageService.getLoggedInUserFromStorage()
      .then((response) => {
        if (response) {
          let currentDate = new Date();
          if (currentDate.valueOf() < new Date(response.expiresAt).valueOf()) {
            setLoggedInUser(response);
          } else {
            console.log("token expired, Please login again");
            StorageService.clearAllStorage();
            setLoggedInUser(null);
          }
        } else {
          setLoggedInUser(null);
        }
      })
      .catch((err) => {
        console.log(
          "Error occured while checking if loggedIn user available in localstorage",
          err
        );
      });
  }, []);

  // Monitoring if system theme get changed
  if (systemTheme) {
    Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme);
    });
  }
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <AuthContext.Provider value={{ loggedInUser, setLoggedInUser }}>
          {!loggedInUser ? (
            <Stack.Navigator>
              <Stack.Screen
                name="Login"
                component={Login}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Register"
                component={Register}
                options={{
                  headerShown: false,
                }}
              />
            </Stack.Navigator>
          ) : (
            <Stack.Navigator>
              <Stack.Screen
                name="Main"
                component={TabNavigation}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="UserProfile"
                component={UserProfile}
                options={{
                  headerShown: false,
                }}
              />
            </Stack.Navigator>
          )}
        </AuthContext.Provider>
      </ThemeContext.Provider>
    </NavigationContainer>
  );
};

export default StackNavigation;
