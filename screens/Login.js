import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import React, { useState, useContext } from "react";
import tw from "twrnc";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { Branding } from "../components";
import { COLORS, SIZES } from "../constants/theme";
import axios from "../api/axiosState";
import { LOGIN_API } from "@env";
import StorageService from "../utils/StorageService";
import { AuthContext } from "../utils/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");

  const { loggedInUser, setLoggedInUser } = useContext(AuthContext);

  const navigation = useNavigation();

  const handleLogin = () => {
    const data = {
      email: email,
      password: password,
    };
    axios
      .post(`${LOGIN_API}`, data)
      .then((response) => {
        Alert.alert("SUCCESS", "Logged In Successfully");
        StorageService.setLoggedInUserInStorage(response.data);
        StorageService.setAuthTokenInStorage(response.data?.token);
        setLoggedInUser(response.data);
      })
      .catch((error) => {
        console.log("Error Occured while logging in", error);
        Alert.alert("FAILED", "Error occured while logging in");
      });
  };

  return (
    <SafeAreaView style={tw`mt-10`}>
      <Branding />
      <KeyboardAvoidingView style={[tw`mt-4`]}>
        <View style={{ paddingHorizontal: 30 }}>
          <View style={tw`items-center justify-center`}>
            <Text style={tw`font-semibold text-xl`}>Login to Your Account</Text>
          </View>

          {/* Input Fields */}
          <View style={[tw`mt-10`, styles.inputContainer]}>
            <View style={[tw`flex-row gap-2`, styles.inputFields]}>
              <MaterialIcons name="email" size={24} color="black" />
              <TextInput
                style={tw`flex-1`}
                value={email}
                secureTextEntry={false}
                onChangeText={(text) => setEmail(text)}
                placeholder="Enter Your Registered Email"
              />
            </View>
            <View style={[tw`flex-row gap-2 mt-5`, styles.inputFields]}>
              <MaterialIcons name="lock" size={24} color="black" />
              <TextInput
                style={tw`flex-1`}
                value={password}
                onChangeText={(text) => setPassowrd(text)}
                secureTextEntry={true}
                placeholder="Enter Your Password"
              />
            </View>
          </View>
          <View
            style={[
              tw`flex-row items-center justify-between mt-2`,
              { marginHorizontal: 20 },
            ]}
          >
            <Text>Keep me logged in</Text>
            <Text style={{ color: COLORS.textButton }}>Forgot Password</Text>
          </View>
        </View>
        <View style={tw`mt-16 justify-center items-center`}>
          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
            <Text style={styles.loginBtnText}>Login</Text>
          </TouchableOpacity>
          <Pressable
            style={tw`mt-4`}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={{ fontSize: 16, textAlign: "center" }}>
              Don't have an account? Sign Up
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  inputContainer: {
    padding: 10,
  },
  inputFields: {
    borderWidth: StyleSheet.hairlineWidth,
    padding: 10,
    borderRadius: 15,
  },
  loginBtn: {
    backgroundColor: COLORS.primary,
    fontSize: SIZES.medium,
    width: "50%",
    padding: 15,
    borderRadius: 10,
  },
  loginBtnText: {
    color: COLORS.white,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: SIZES.large,
  },
});
