import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../constants/colors";
import { Style } from "../constants/ComponentStyle";

const OnboardingItem = ({ img, title, desc }) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        locations={[0.5, 0.8]}
        style={styles.gradient}
        colors={["#149DFF", "#3C3CFF"]}
      >
        <View style={styles.logo}>
          <Image source={img} />
        </View>

        <View style={styles.textConatiner}>
          <Text style={styles.textTitle}>{title}</Text>
          <Text style={[Style.secondaryText,styles.description]}>{desc}</Text>
        </View>
      </LinearGradient>
    </View>
  );
};

export default OnboardingItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get("window").width,
  },
  gradient: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    alignItems: "center",
  },
  logo: {
    marginTop: 120,
    maxHeight:300,
  },
  textConatiner: {
    marginTop: 60,
    width:"85%",
    alignItems:"center"
  },
  textTitle: {
    fontFamily: "Sora_700Bold",
    fontSize: 24,
    color: Colors.secondaryColor,
    textAlign: "center",
  },
  description:{
    width:"83%",
    color:Colors.secondaryColor, 
    textAlign:'center',
  }
});
