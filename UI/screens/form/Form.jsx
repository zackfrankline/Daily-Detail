import { useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Input from "./Input";
import { AuthContext } from "../../hooks/AuthContext";
import { Style } from "../../constants/ComponentStyle";
import InputField from "../../components/InputField";
import ButtonComponent from "../../components/button";
import { Colors } from "../../constants/colors";

const userPersonalDetails = {
  displayName: null,
  address: null,
  phone: null,
  pincode: null,
  buildingName: null,
};

const Form = ({ navigation }) => {
  const { storeUserDetail } = useContext(AuthContext);
  const [userData, setUserData] = useState(userPersonalDetails);

  const handleTextChange = (id, val) => {
    setUserData({ ...userData, [id]: val });
    console.log(userData);
  };

  const handleFormSubmit = async () => {
    console.log("Pressed");
    try {
      await storeUserDetail(userData);
      navigation.navigate("AppView");
    } catch (e) {
      console.log("Form request to send UserData Error:" + e);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView>
          <ImageBackground
            style={styles.backgroundImage}
            source={require("../../assets/Formbackground.png")}
            resizeMode="cover"
          >
            <View style={[Style.logInTextContainer, { marginTop: 100 }]}>
              <Text style={Style.titleText}>More About you</Text>
              <Text style={Style.secondaryText}>Help us with you details</Text>
            </View>

            <View style={[Style.inputContainer, { marginTop: 10 }]}>
              <InputField
                placeholder="Full Name"
                value={userData.displayName}
                inputMode="text"
                onChange={(val) => handleTextChange("displayName", val)}
              />
              <InputField
                placeholder="Phone number"
                value={userData.phone}
                onChange={(val) => handleTextChange("phone", val)}
              />
              <InputField
                placeholder="Pincode"
                value={userData.pincode}
                onChange={(val) => handleTextChange("pincode", val)}
              />
              <InputField
                placeholder="Street/plotno/sector"
                value={userData.address}
                onChange={(val) => handleTextChange("address", val)}
              />
              <InputField
                placeholder="Building Name"
                value={userData.buildingName}
                onChange={(val) => handleTextChange("buildingName", val)}
              />
              <Text
                style={[
                  Style.secondaryText,
                  {
                    color: Colors.accentColor,
                    marginTop: 5,
                    marginLeft: 5,
                    alignSelf: "flex-start",
                    width: "80%",
                    fontSize: 15,
                  },
                ]}
              >
                Every field is mandatory
              </Text>
            </View>

            <View
              style={[
                Style.bottomButtonContainer,
                {
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 0,
                },
              ]}
            >
              <ButtonComponent
                text="Continue"
                color={Colors.buttonColor}
                onPress={handleFormSubmit}
              />
            </View>
          </ImageBackground>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: "100%",
    // alignItems: "center",
    // justifyContent: "center",
  },
  backgroundImage: {
    alignItems: "center",
    left: 0,
    top: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  formTitle: {
    fontSize: 20,
    marginTop: 10,
    fontWeight: "bold",
    fontFamily: "sans-serif",
    paddingBottom: 20,
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
  buttonText: {
    color: "#fff",
    letterSpacing: 1,
  },
});
