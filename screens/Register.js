import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import tw from "twrnc";
import axios from "../api/axiosState";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

import { COLORS, SIZES } from "../constants/theme";
import { Branding } from "../components";
import { REGISTER_API } from "@env";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassowrd] = useState("");

  const navigation = useNavigation();

  const handleRegister = () => {
    const user = {
      name: name,
      username: userName,
      email: email,
      password: password,
    };
    axios
      .post(REGISTER_API, user)
      .then((response) => {
        console.log(response.data);
        setEmail("");
        setPassowrd("");
        setUserName("");
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
    <KeyboardAvoidingView behavior={"position"} style={[tw`mt-10`]}>
      <Branding />
      <View style={[tw`mt-4`]}>
        <View style={{ paddingHorizontal: 30 }}>
          <View style={tw`items-center justify-center`}>
            <Text style={tw`font-semibold text-xl`}>Register Your Account</Text>
          </View>

          {/* Input Fields */}
          <View style={[tw`mt-10`, styles.inputContainer]}>
            <View style={[tw`flex-row gap-2`, styles.inputFields]}>
              <Ionicons name="person" size={24} color="black" />
              <TextInput
                style={tw`flex-1`}
                value={name}
                secureTextEntry={false}
                onChangeText={(text) => setName(text)}
                placeholder="Enter Your Full Name"
              />
            </View>
            <View style={[tw`flex-row gap-2 mt-5`, styles.inputFields]}>
              <MaterialIcons name="account-circle" size={24} color="black" />
              <TextInput
                style={tw`flex-1`}
                value={userName}
                secureTextEntry={false}
                onChangeText={(text) => setUserName(text)}
                placeholder="Enter a unique Username"
              />
            </View>
            <View style={[tw`flex-row gap-2 mt-5`, styles.inputFields]}>
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
        </View>
        <View style={tw`mt-6 justify-center items-center`}>
          <TouchableOpacity style={styles.registerBtn} onPress={handleRegister}>
            <Text style={styles.registerBtnText}>Register</Text>
          </TouchableOpacity>
          <Pressable style={tw`mt-4`} onPress={() => navigation.goBack()}>
            <Text style={{ fontSize: 16, textAlign: "center" }}>
              Already have an account? Log In
            </Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
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
