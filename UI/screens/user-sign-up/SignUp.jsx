import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { signUpUserWithEmailAndPassword } from "../../config/fireabse.utils";
import { Style } from "../../constants/ComponentStyle";
import InputField from "../../components/InputField";
import ButtonComponent from "../../components/button";
import { Colors } from "../../constants/colors";

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async () => {
    if (password === confirmPassword) {
      try {
        await signUpUserWithEmailAndPassword(email, password);
        navigation.navigate("SignIn");
      } catch (e) {
        console.log("CreateUserWithEmailAndPassword Error:", e);
      }
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        enabled={true}
      >
        <ScrollView>
          <ImageBackground
            source={require("../../assets/SignUpBackground.png")}
            resizeMode="cover"
            style={styles.backgroundImage}
          >
            <View style={Style.logInTextContainer}>
              <Text style={Style.titleText}>Create Account</Text>
            </View>

            <View style={[Style.inputContainer, { marginTop: 70 }]}>
              <InputField
                value={email}
                placeholder="Enter Email"
                onChange={(val) => {
                  setEmail(val);
                }}
              />
              <InputField
                value={password}
                placeholder="Enter Password"
                onChange={(val) => {
                  setPassword(val);
                }}
                secureTextEntry={true}
              />
              <InputField
                value={confirmPassword}
                placeholder="Confirm Password"
                onChange={(val) => {
                  setConfirmPassword(val);
                }}
                secureTextEntry={true}
              />
              <Text
                style={[
                  Style.secondaryText,
                  {
                    color: "#f7f7f9",
                    marginTop: 5,
                    marginLeft: 5,
                    alignSelf: "flex-start",
                    flexDirection: "row",
                  },
                ]}
              >
                Password must be 8 characters.
              </Text>
            </View>

            <View style={[Style.bottomButtonContainer, { marginTop: 60 }]}>
              <ButtonComponent
                onPress={handleSignUp}
                color={Colors.accentColor}
                text="Sign Up"
              />
              <Text
                style={[
                  Style.secondaryText,
                  {
                    color: "#3c3c3c",
                  },
                ]}
              >
                Already have an account?
              </Text>
              <Pressable
                onPress={() => {
                  navigation.navigate("SignIn");
                }}
              >
                <Text style={[Style.secondaryText, { color: "#F1916D" }]}>
                  Log In
                </Text>
              </Pressable>
            </View>
          </ImageBackground>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    flex: 1,
    height: "1vh",
  },
  backgroundImage: {
    alignItems: "center",
    left: 0,
    top: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  SignUpTextContainer: {
    alignSelf: "flex-start",
    marginLeft: 35,

    marginTop: 170,
  },
  textInput: {
    backgroundColor: "#f6f6f6",
    color: "#000000",
    borderRadius: 20,
    height: 40,
    minWidth: "50%",
    paddingLeft: 20,
    marginTop: 20,
  },
  titleText: {
    fontSize: 20,
    marginTop: 10,
    fontWeight: "bold",
    fontFamily: "sans-serif",
  },
  button: {
    marginTop: 25,
    backgroundColor: "#4f5b66",
    borderRadius: 10,
    height: 40,
    minWidth: "50%",
    alignItems: "center",
    padding: 10,
  },
  buttonText: {
    color: "#fff",
    letterSpacing: 1,
  },
});

export default SignUp;
