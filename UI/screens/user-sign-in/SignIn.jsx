import { useContext, useState } from "react";
import {
  Alert,
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import {useForm} from "react-hook-form";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";

import {
  signInUserWithEmailAndPassword,
  signOutUser,
} from "../../config/fireabse.utils";

import { AuthContext } from "../../hooks/AuthContext";
import { Style } from "../../constants/ComponentStyle";
import InputField from "../../components/InputField";
import ButtonComponent from "../../components/button";
import { Colors } from "../../constants/colors";
import FormInputController from "../../components/controllers/FormInputController";

const SignIn = ({ navigation }) => {

  const schema = yup.object().shape({
    email:yup.string().trim().required("Email is required").email('Invalid email'),
    password:yup.string().trim().required("Password is required").min(8,"Password must contain at least 8 characters"),
  });
  
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver:yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });



  const { currentUser } = useContext(AuthContext);

  const handleErrorAlert = (errorCode) => {
    Alert.alert(
      "Error",
      `${errorCode}`,
    );
  };

  const handleSignIn = async ({email,password}) => {
    try {
      const { user } = await signInUserWithEmailAndPassword(email, password);
      user && navigation.navigate("Welcome");
    } catch (err) {
      handleErrorAlert(err.code);
    }
  };

  const handleSignOut = async () => {
    await signOutUser();
  };

  const onSubmit = (data) => handleSignIn(data); 

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      enabled={true}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <ImageBackground
          source={require("../../assets/LogInbackground.png")}
          resizeMode="cover"
          style={[styles.backgroundImage]}
        >
          <>
            <View style={Style.logInTextContainer}>
              <Text style={Style.titleText}>Log In</Text>
              <Text style={Style.secondaryText}>
                Please Sign In to continue
              </Text>
            </View>

            <View style={Style.inputContainer}>
              <FormInputController
                name="email"
                control={control}
                placeholder="Email"
              />

              {errors.email && (
                <Text style={styles.errorMessage}>{errors.email.message}</Text>
              )}
              <FormInputController
                name="password"
                control={control}
                placeholder="Password"
                secureTextEntry={true}
              />
              {errors.password && (
                <Text style={styles.errorMessage}>
                  {errors.password.message}
                </Text>
              )}
              <Pressable style={{ alignSelf: "flex-end", backgroundColor:Colors.buttonColor }}>
                <Text
                  style={[
                    Style.secondaryText,
                    {
                      color: Colors.accentColor,
                      fontSize: 16,
                      marginTop: 5,
                    },
                  ]}
                >
                  Forget Password?
                </Text>
              </Pressable>
            </View>

            <View style={Style.bottomButtonContainer}>
              
              <ButtonComponent
                text="Log In"
                onPress={handleSubmit(onSubmit)}
                color={Colors.buttonColor}
                disabled={false}
              />

              <Text
                style={[
                  Style.secondaryText,
                  {
                    color: "#3c3c3c",
                  },
                ]}
              >
                Don't have an account?
              </Text>
              <Pressable
                onPress={() => {
                  navigation.navigate("SignUp");
                }}
              >
                <Text style={[Style.secondaryText, { color: "#F1916D" }]}>
                  Sign Up
                </Text>
              </Pressable>
            </View>
          </>
        </ImageBackground>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    alignItems: "center",
    left: 0,
    top: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  errorMessage:{
    textAlign:"left",
    alignSelf:"flex-start",
    // borderWidth:3,
    width:"100%",
    color:"orange",
  }
});
