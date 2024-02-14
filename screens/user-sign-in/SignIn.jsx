import { useContext, useState } from "react";
import {
  Alert,
  Pressable,
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
    <View style={styles.container}>
      {currentUser ? (
        <>
          <Text>You're Logged In</Text>
          {/* signOut Button */}
          <Pressable style={styles.button} onPress={handleSignOut}>
            <Text style={styles.buttonText}>Sign Out</Text>
          </Pressable>
        </>
      ) : (
        <>
          <Text style={{ fontSize: 20, letterSpacing: 1 }}>
            Enter Credential
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            value={email}
            onChangeText={(val) => {
              setEmail(val);
            }}
          />
          <TextInput
            style={styles.textInput}
            placeholder="password"
            value={password}
            onChangeText={(val) => {
              setPassword(val);
            }}
            secureTextEntry={true}
          />
          <Pressable style={styles.button} onPress={handleSignIn}>
            <Text style={styles.buttonText}>Log In</Text>
          </Pressable>
          <Pressable
            style={styles.SignUpButton}
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text style={styles.SignUp}>Don't have an Account? Sign Up</Text>
          </Pressable>
        </>
      )}
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
  button: {
    marginTop: 25,
    backgroundColor: "#4f5b66",
    borderRadius: 10,
    height: 40,
    minWidth: "50%",
    alignItems: "center",
    padding: 10,
  },
  SignUpButton: {
    marginTop: 7,
  },
  SignUp: {
    color: "#00a6fb",
  },
  buttonText: {
    color: "#fff",
    letterSpacing: 1,
  },
});
