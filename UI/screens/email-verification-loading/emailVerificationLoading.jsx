import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import LottieView from "lottie-react-native";
import { Style } from "../../constants/ComponentStyle";
import ButtonComponent from "../../components/button";
import { Colors } from "../../constants/colors";

const { height, width } = Dimensions.get("screen");
const EmailVerificationLoading = ({isModalVisible, handlePress}) => {
  return (
    
      <Modal animationType="slide" transparent={false} visible={isModalVisible}>
        <View style={styles.modal}>
          <View style={styles.animationContainer}>
            <LottieView
              autoPlay
              source={require("../../assets/animation/email-verification-loading.json")}
              style={{ width: "200%", height: "200%" }}
              loop
            />
          </View>
          <View style={styles.loadingDescription}>
            <Text style={{ fontFamily: "Sora_700Bold", textAlign: "center",fontSize:16,color:Colors.titleTextColor }}>
              Check your Email to confirm your Identity, Press verified once
              done
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <ButtonComponent text="Confirm" color={Colors.primaryColor} onPress={handlePress} />
          </View>
        </View>
      </Modal>
  );
};

export default EmailVerificationLoading;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
 
  animationContainer: {
    width: width - 100,
    height: width - 150,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
  loadingDescription: {
    marginHorizontal: 30,
  },
  buttonContainer: {
    position:"absolute",
    bottom:25,
    alignItems:"center",
    justifyContent:"center",
  },
});
