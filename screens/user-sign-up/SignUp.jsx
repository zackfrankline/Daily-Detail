import { useState } from "react";
import { StyleSheet, View, Text, TextInput, Pressable } from "react-native";
import { signUpUserWithEmailAndPassword } from "../../config/fireabse.utils";


const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async() => {
    if(password===confirmPassword){
      try{
          const {user} = await signUpUserWithEmailAndPassword(email,password);
          navigation.navigate("Welcome")
      }
      catch(e)
      {
        console.log("CreateUserWithEmailAndPassword Error:",e)
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Create Your Account</Text>
      <TextInput
        style={styles.textInput}
        value={email}
        placeholder="Enter Email"
        onChangeText={(val) => {
          setEmail(val);
        }}
      />
      <TextInput
        style={styles.textInput}
        value={password}
        placeholder="Enter Password"
        onChangeText={(val) => {
          setPassword(val);
        }}
        secureTextEntry={true}
      />
      <TextInput
        style={styles.textInput}
        value={confirmPassword}
        placeholder="Confirm Password"
        onChangeText={(val) => {
          setConfirmPassword(val);
        }}
        secureTextEntry={true}
      />
      <Pressable style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>
    </View>
  );
};

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
