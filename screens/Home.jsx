import { StatusBar } from "expo-status-bar";
import Logo from "../assets/Logos/logo1.svg";
import { StyleSheet, Text, View, Pressable } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Welcome</Text>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("LogIn")}
      >
        <Text style={styles.buttonText}>Log in</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => {
          navigation.navigate("SignIn");
        }}
      >
        <Text style={styles.buttonText}>Sign In</Text>
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
  titleText: {
    fontSize: 40,
    marginTop: 10,
    fontWeight: "bold",
    fontFamily: "sans-serif",
    marginBottom: 20,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
    padding: 10,
    minWidth: 100,
    width: 150,
    margin: 10,
    textAlign: "center",
    borderRadius: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
  },
});

export default HomeScreen;
