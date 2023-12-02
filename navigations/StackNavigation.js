import { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import { Login, Register } from "../screens";
import { StatusBar } from "expo-status-bar";
import TabNavigation from "./TabNavigation";
import { AuthContext } from "../utils/AuthContext";
import StorageService from "../utils/StorageService";

const StackNavigation = () => {
  const Stack = createStackNavigator();

  const [loggedInUser, setLoggedInUser] = useState();

  useEffect(() => {
    StorageService.getLoggedInUserFromStorage()
      .then((response) => {
        if (response) {
          let currentDate = new Date();
          if (currentDate.valueOf() < new Date(response.expiresAt).valueOf()) {
            console.log("Token not expired yet");
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

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <AuthContext.Provider value={{ loggedInUser, setLoggedInUser }}>
        <Stack.Navigator>
          {!loggedInUser ? (
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false,
              }}
            />
          ) : (
            <Stack.Screen
              name="Main"
              component={TabNavigation}
              options={{
                headerShown: false,
              }}
            />
          )}
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
  );
};

export default StackNavigation;
