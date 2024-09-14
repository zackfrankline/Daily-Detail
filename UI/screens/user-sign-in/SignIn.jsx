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

import {
  signInUserWithEmailAndPassword,
  signOutUser,
} from "../../config/fireabse.utils";

import { AuthContext } from "../../hooks/AuthContext";
import { Style } from "../../constants/ComponentStyle";
import InputField from "../../components/InputField";
import ButtonComponent from "../../components/button";
import { Colors } from "../../constants/colors";

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { currentUser } = useContext(AuthContext);

  const handleErrorAlert = (errorCode) => {
    Alert.alert(
      "Error",
      `${errorCode}`,
      [
        {
          text: "Cancel",
          onPress: () => Alert.alert("Cancelled"),
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const handleSignIn = async () => {
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
          {currentUser ? (
            <>
              <Text>You're Logged In</Text>
              {/* signOut Button */}
              <Pressable style={styles.button} onPress={handleSignOut}>
                <Text style={styles.buttonText}>Sign Out</Text>
              </Pressable>
              <ButtonComponent
                text="Variant"
                onPress={()=>{navigation.navigate("Variant-detail")}}
                color={Colors.buttonColor}
                disabled={false}
              />
            </>
          ) : (
            <>
              <View style={Style.logInTextContainer}>
                <Text style={Style.titleText}>Log In</Text>
                <Text style={Style.secondaryText}>
                  Please Sign In to continue
                </Text>
              </View>

              <View style={Style.inputContainer}>
                <InputField
                  placeholder="Email"
                  value={email}
                  onChange={(val) => {
                    setEmail(val);
                  }}
                />
                <InputField
                  placeholder="password"
                  value={password}
                  onChange={(val) => {
                    setPassword(val);
                  }}
                  secureTextEntry={true}
                />
                <Pressable style={{ alignSelf: "flex-end" }}>
                  <Text
                    style={[
                      Style.secondaryText,
                      {
                        color: "#F7F7F9",
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
                {!(email && password) ? (
                  <ButtonComponent
                    text="Log In"
                    onPress={handleSignIn}
                    color={Colors.paraTextColor}
                    disabled={true}
                  />
                ) : (
                  <ButtonComponent
                    text="Log In"
                    onPress={handleSignIn}
                    color={Colors.buttonColor}
                    disabled={false}
                  />
                )}
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
          )}
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
});
