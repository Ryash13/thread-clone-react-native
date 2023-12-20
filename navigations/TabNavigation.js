import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useContext } from "react";

import { Home, Profile, Activity, Threads, Search } from "../screens/App";
import { COLORS } from "../constants/theme";
import { ThemeContext } from "../context/ThemeContext";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const iconSize = 28;
  const { theme } = useContext(ThemeContext);
  let activeTheme = COLORS[theme];
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
          backgroundColor: activeTheme.background,
        },
        tabBarIconStyle: {
          paddingBottom: 0,
          textAlignVertical: "center",
          textAlign: "center",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              // <Octicons name="home" size={iconSize} color={COLORS.dark.black} />
              <Image
                source={require("../assets/Images/home_active.png")}
                resizeMode="contain"
                tintColor={activeTheme.icon}
                width={24}
                height={24}
              />
            ) : (
              <Image
                source={require("../assets/Images/home_gray.png")}
                resizeMode="contain"
                tintColor={"gray"}
                width={24}
                height={24}
              />
            ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Image
                source={require("../assets/Images/search_active.png")}
                resizeMode="contain"
                tintColor={activeTheme.icon}
                width={24}
                height={24}
              />
            ) : (
              <Image
                source={require("../assets/Images/search_gray.png")}
                resizeMode="contain"
                tintColor={"gray"}
                width={24}
                height={24}
              />
            ),
        }}
      />
      <Tab.Screen
        name="Threads"
        component={Threads}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Image
                source={require("../assets/Images/thread_active.png")}
                resizeMode="contain"
                tintColor={activeTheme.icon}
                width={24}
                height={24}
              />
            ) : (
              <Image
                source={require("../assets/Images/thread_gray.png")}
                resizeMode="contain"
                tintColor={"gray"}
                width={24}
                height={24}
              />
            ),
        }}
      />
      <Tab.Screen
        name="Activity"
        component={Activity}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Image
                source={require("../assets/Images/heart_active.png")}
                resizeMode="contain"
                tintColor={activeTheme.icon}
                width={24}
                height={24}
              />
            ) : (
              <Image
                source={require("../assets/Images/heart_gray.png")}
                resizeMode="contain"
                tintColor={"gray"}
                width={24}
                height={24}
              />
            ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Image
                source={require("../assets/Images/user_active.png")}
                resizeMode="contain"
                tintColor={activeTheme.icon}
                width={24}
                height={24}
              />
            ) : (
              <Image
                source={require("../assets/Images/user_gray.png")}
                resizeMode="contain"
                tintColor={"gray"}
                width={24}
                height={24}
              />
            ),
        }}
        tabBarIconStyle={{ alignItems: "center" }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
