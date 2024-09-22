import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
} from "react-native";
import ButtonComponent from "../../components/button";
import { Colors } from "../../constants/colors";

const HomeScreen = ({ navigation }) => {
  return (
    // <View style={styles.container}>
    <ImageBackground
      source={require("../../assets/Logos/DD Logo.png")}
      resizeMode="cover"
      style={styles.container}
    >
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../../assets/Logos/WelcomeLogo.png")}
        />
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Welcome to Daily Detailed</Text>
        <Text style={styles.subText}>Your car's bestfriend</Text>
      </View>

      <View style={styles.logInContainer}>
        <ButtonComponent
          text="Log In"
          onPress={() => navigation.navigate("SignIn")}
          color={Colors.buttonColor}
        />
         

        <ButtonComponent
          text="Sign Up"
          onPress={() => {
            navigation.navigate("SignUp");
          }}
          color={Colors.accentColor}
        />
      </View>
    </ImageBackground>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
  },
  logoContainer: {
    position: "relative",
    elevation: 4,
  },
  logo: {
    // position:"absolute",
    resizeMode: "contain",
  },
  titleContainer: {
    alignItems: "center",
  },
  titleText: {
    textAlign: "center",
    fontSize: 24,
    fontFamily: "Amaranth_700Bold",
    marginBottom: 10,
  },
  subText: {
    fontFamily: "Satisfy_400Regular",
    fontSize: 18,
    letterSpacing: 2,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
    padding: 10,
    minWidth: 100,
    width: 323,
    height: 65,
    margin: 10,
    textAlign: "center",
    borderRadius: 14,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: "Sora_600SemiBold",
  },
});

export default HomeScreen;
