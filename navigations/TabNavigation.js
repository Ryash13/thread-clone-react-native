import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, AntDesign, FontAwesome } from "@expo/vector-icons";

import { Home, Profile, Activity, Threads, Search } from "../screens";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarLabelStyle: { color: "black" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="home" size={24} color="black" />
            ) : (
              <Ionicons name="home-outline" size={24} color="black" />
            ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: "Search",
          tabBarLabelStyle: { color: "black" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <FontAwesome name="search" size={24} color="black" />
            ) : (
              <AntDesign name="search1" size={24} color="black" />
            ),
        }}
      />
      <Tab.Screen
        name="Threads"
        component={Threads}
        options={{
          tabBarLabel: "Threads",
          tabBarLabelStyle: { color: "black" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="create" size={24} color="black" />
            ) : (
              <Ionicons name="create-outline" size={24} color="black" />
            ),
        }}
      />
      <Tab.Screen
        name="Activity"
        component={Activity}
        options={{
          tabBarLabel: "Activity",
          tabBarLabelStyle: { color: "black" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <AntDesign name="heart" size={24} color="black" />
            ) : (
              <AntDesign name="hearto" size={24} color="black" />
            ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarLabelStyle: { color: "black" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="person-sharp" size={24} color="black" />
            ) : (
              <Ionicons name="person-outline" size={24} color="black" />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
