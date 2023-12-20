import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import tw from "twrnc";
import axios from "../../api/axiosState";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

import { COLORS, SIZES } from "../../constants/theme";
import { Branding } from "../../components";
import { REGISTER_API } from "@env";
import { ThemeContext } from "../../context/ThemeContext";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassowrd] = useState("");

  const { theme } = useContext(ThemeContext);
  let activeTheme = COLORS[theme];

  const navigation = useNavigation();

  const handleRegister = (e) => {
    e.preventDefault();
    const user = {
      name: name,
      email: email,
      password: password,
    };
    axios
      .post(REGISTER_API, user)
      .then((response) => {
        setEmail("");
        setPassowrd("");
        setName("");
        Alert.alert(
          "SUCCESS",
          "A Verification Email Sent to your registered email id"
        );
      })
      .catch((error) => {
        console.log("error", error);
        Alert.alert("FAILED", "An error occurred during registrating user");
      });
  };

  return (
    <View style={[tw`h-full`, { backgroundColor: activeTheme.background }]}>
      <KeyboardAvoidingView behavior={"position"} style={[tw`mt-10`]}>
        <Branding />
        <View style={[tw`mt-4`]}>
          <View style={{ paddingHorizontal: 30 }}>
            <View style={tw`items-center justify-center`}>
              <Text
                style={[
                  tw`font-semibold text-xl`,
                  { color: activeTheme.textPrimary },
                ]}
              >
                Register Your Account
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
                <Ionicons name="person" size={24} color={activeTheme.icon} />
                <TextInput
                  style={[tw`flex-1`, { color: activeTheme.textPrimary }]}
                  value={name}
                  secureTextEntry={false}
                  onChangeText={(text) => setName(text)}
                  placeholder="Enter Your Full Name"
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
                <MaterialIcons
                  name="email"
                  size={24}
                  color={activeTheme.icon}
                />
                <TextInput
                  style={[tw`flex-1`, { color: activeTheme.textPrimary }]}
                  value={email}
                  secureTextEntry={false}
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
                  secureTextEntry={true}
                  placeholder="Enter Your Password"
                  placeholderTextColor={activeTheme.textGray}
                />
              </View>
            </View>
          </View>
          <View style={tw`mt-6 justify-center items-center`}>
            <TouchableOpacity
              style={[
                styles.registerBtn,
                { backgroundColor: activeTheme.btnBackground },
              ]}
              onPress={handleRegister}
            >
              <Text
                style={[styles.registerBtnText, { color: activeTheme.btnText }]}
              >
                Register
              </Text>
            </TouchableOpacity>
            <Pressable style={tw`mt-4`} onPress={() => navigation.goBack()}>
              <Text
                style={{
                  fontSize: 16,
                  textAlign: "center",
                  color: activeTheme.textPrimary,
                }}
              >
                Already have an account?{" "}
                <Text style={tw`font-bold text-[18px]`}>Log In</Text>
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  inputContainer: {
    padding: 10,
  },
  inputFields: {
    borderWidth: StyleSheet.hairlineWidth,
    padding: 10,
    borderRadius: 15,
  },
  registerBtn: {
    backgroundColor: COLORS.primary,
    fontSize: SIZES.medium,
    width: "50%",
    padding: 15,
    borderRadius: 10,
  },
  registerBtnText: {
    color: COLORS.white,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: SIZES.large,
  },
});
