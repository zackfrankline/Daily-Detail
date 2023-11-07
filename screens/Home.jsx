import { StyleSheet, Text, View, Pressable ,Image } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../assets/Logos/logo.png")} />
      </View>
      <View style={styles.logInContainer}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    paddingTop:10,
  },
  logo: {
    resizeMode: "contain",
    height: 100,
    width: 130,
    paddingBottom:20,
  },
  titleText: {
    textAlign:"center",
    fontSize: 35,
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
