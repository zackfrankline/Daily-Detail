import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { FIREBASE_AUTH } from "../../config/firebaseConfig";

const LogIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = FIREBASE_AUTH;

  const logIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate("Form");
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, letterSpacing: 1 }}>Enter Credential</Text>
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
      <Pressable style={styles.button} onPress={logIn}>
        <Text style={styles.buttonText}>Log In</Text>
      </Pressable>
      <Pressable
        style={styles.SignUpButton}
        onPress={() => {
          navigation.navigate("SignIn");
        }}
      >
        <Text style={styles.SignUp}>Don't have an Account? Sign Up</Text>
      </Pressable>
    </View>
  );
};

export default LogIn;

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
