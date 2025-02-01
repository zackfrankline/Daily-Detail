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
  Alert,
} from "react-native";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import {
  checkUserEmailVerification,
  sendUserVerificationEmail,
  signUpUserWithEmailAndPassword,
} from "../../services/fireabse.utils";
import { Style } from "../../constants/ComponentStyle";
import InputField from "../../components/InputField";
import ButtonComponent from "../../components/button";
import { Colors } from "../../constants/colors";
import FormInputController from "../../components/controllers/FormInputController";
import { yupResolver } from "@hookform/resolvers/yup";
import EmailVerificationLoading from "../email-verification-loading/emailVerificationLoading";

const SignUp = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const schema = yup.object().shape({
    email: yup
      .string()
      .trim()
      .required("Email is required")
      .email("Invalid email"),
    password: yup
      .string()
      .matches(/^\S*$/, "Whitespace is not allowed")
      .required("Password is required")
      .min(8, "Password must contain at least 8 characters"),
    confirmPassword: yup
      .string()
      .matches(/^\S*$/, "Whitespace is not allowed")
      .required("Please re-type your Password")
      .oneOf([yup.ref("password")], "Your passwords do not match"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSignUp = async ({ email, password }) => {
    try {
      setIsLoading(!isLoading);
      setIsModalVisible(!isModalVisible);
      await signUpUserWithEmailAndPassword(email, password);
      await sendUserVerificationEmail();
      
    } catch (e) {
      console.log("CreateUserWithEmailAndPassword Error:", e);
      handleErrorAlert(e.code);
    }
  };

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

  const onSubmit = (data) => handleSignUp(data);

  
  const handlePress = () => {
    navigation.navigate("SignIn")
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <EmailVerificationLoading
          isModalVisible={isModalVisible}
          handlePress={handlePress}
        />
      ) : (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
          enabled={true}
        >
          <ScrollView>
            <ImageBackground
              source={require("../../assets/SignUpBackground.png")}
              resizeMode="cover"
              style={Style.backgroundImage}
            >
              <View style={Style.logInTextContainer}>
                <Text style={Style.titleText}>Create Account</Text>
              </View>

              <View style={[Style.inputContainer]}>
                <FormInputController
                  control={control}
                  name="email"
                  placeholder="Enter Email"
                  isPassword={false}
                />
                {errors.email && (
                  <Text style={styles.errorMessage}>
                    {errors.email.message}
                  </Text>
                )}
                <FormInputController
                  control={control}
                  name="password"
                  placeholder="Enter Password"
                  isPassword={true}
                />
                {errors.password && (
                  <Text style={styles.errorMessage}>
                    {errors.password.message}
                  </Text>
                )}
                <FormInputController
                  control={control}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  isPassword={true}
                />
                {errors.confirmPassword && (
                  <Text style={styles.errorMessage}>
                    {errors.confirmPassword.message}
                  </Text>
                )}
                <Text
                  style={[
                    Style.secondaryText,
                    {
                      color: "#f7f7f9",
                      marginTop: 5,
                      marginLeft: 5,
                      alignSelf: "flex-start",
                      flexDirection: "row",
                      width: "100%",
                    },
                  ]}
                >
                  Password must be 8 characters.
                </Text>
              </View>

              <View style={[Style.bottomButtonContainer]}>
                <ButtonComponent
                  onPress={handleSubmit(onSubmit)}
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderWidth:5,
    // borderColor:"red"
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
  errorMessage: {
    textAlign: "left",
    alignSelf: "flex-start",
    marginLeft: 5,
    width: "100%",
    color: "white",
  },
});

export default SignUp;
