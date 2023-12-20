import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import React, { useState, useContext } from "react";
import tw from "twrnc";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { Branding } from "../../components";
import { COLORS, SIZES } from "../../constants/theme";
import axios from "../../api/axiosState";
import { LOGIN_API } from "@env";
import StorageService from "../../utils/StorageService";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../../components/Loader/Loader";
import { ThemeContext } from "../../context/ThemeContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const { setLoggedInUser } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  let activeTheme = COLORS[theme];

  const navigation = useNavigation();

  const handleLogin = () => {
    setLoading(true);
    const data = {
      email: email,
      password: password,
    };
    axios
      .post(`${LOGIN_API}`, data)
      .then((response) => {
        StorageService.setLoggedInUserInStorage(response.data);
        StorageService.setAuthTokenInStorage(response.data?.token);
        setLoggedInUser(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error Occured while logging in", JSON.stringify(error));
        setLoading(false);
        Alert.alert("FAILED", "Invalid Username or Password");
      });
  };

  return (
    <View style={[tw`h-full`, { backgroundColor: activeTheme.background }]}>
      <Loader loading={loading} />
      <Branding />
      <KeyboardAvoidingView style={[tw`mt-4`]}>
        <View style={{ paddingHorizontal: 30 }}>
          <View style={tw`items-center justify-center`}>
            <Text
              style={[
                tw`font-semibold text-xl`,
                { color: activeTheme.textPrimary },
              ]}
            >
              Login to Your Account
            </Text>
          </View>

          {/* Input Fields */}
          <View style={[tw`mt-10`, styles.inputContainer]}>
            <View
              style={[
                tw`flex-row gap-2`,
                styles.inputFields,
                { borderColor: activeTheme.buttonBorder },
              ]}
            >
              <MaterialIcons name="email" size={24} color={activeTheme.icon} />
              <TextInput
                style={[tw`flex-1`, { color: activeTheme.textPrimary }]}
                value={email}
                textContentType="none"
                onChangeText={(text) => setEmail(text)}
                placeholder="Enter Your Registered Email"
                placeholderTextColor={activeTheme.textGray}
              />
            </View>
            <View
              style={[
                tw`flex-row gap-2 mt-5`,
                styles.inputFields,
                { borderColor: activeTheme.buttonBorder },
              ]}
            >
              <MaterialIcons name="lock" size={24} color={activeTheme.icon} />
              <TextInput
                style={[tw`flex-1`, { color: activeTheme.textPrimary }]}
                value={password}
                onChangeText={(text) => setPassowrd(text)}
                secureTextEntry={hidePassword}
                placeholder="Enter Your Password"
                placeholderTextColor={activeTheme.textGray}
              />
              {hidePassword ? (
                <Entypo
                  onPress={() => setHidePassword(!hidePassword)}
                  name="eye-with-line"
                  size={24}
                  color={activeTheme.icon}
                />
              ) : (
                <Entypo
                  onPress={() => setHidePassword(!hidePassword)}
                  name="eye"
                  size={24}
                  color={activeTheme.icon}
                />
              )}
            </View>
          </View>
          <View
            style={[
              tw`flex-row items-center justify-between mt-2`,
              { marginHorizontal: 20 },
            ]}
          >
            <Text style={{ color: activeTheme.textGray }}>
              Keep me logged in
            </Text>
            <Text style={{ color: activeTheme.textGray }}>Forgot Password</Text>
          </View>
        </View>
        <View style={tw`mt-16 justify-center items-center`}>
          <TouchableOpacity
            style={[
              styles.loginBtn,
              { backgroundColor: activeTheme.btnBackground },
            ]}
            onPress={handleLogin}
          >
            <Text style={[styles.loginBtnText, { color: activeTheme.btnText }]}>
              Login
            </Text>
          </TouchableOpacity>
          <Pressable
            style={tw`mt-4`}
            onPress={() => navigation.navigate("Register")}
          >
            <Text
              style={{
                fontSize: 16,
                textAlign: "center",
                color: activeTheme.textPrimary,
              }}
            >
              Don't have an account?{" "}
              <Text style={tw`font-bold text-[18px]`}>Sign Up</Text>
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
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
    fontSize: SIZES.medium,
    width: "50%",
    padding: 15,
    borderRadius: 10,
  },
  loginBtnText: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: SIZES.large,
  },
});
