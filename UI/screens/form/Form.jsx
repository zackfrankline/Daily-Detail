import { useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import * as yup from "yup"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from "../../hooks/AuthContext";
import { Style } from "../../constants/ComponentStyle";

import ButtonComponent from "../../components/button";
import { Colors } from "../../constants/colors";

import FormInputController from "../../components/controllers/FormInputController";


const Form = ({ navigation }) => {
  const { storeUserDetail } = useContext(AuthContext);
  
  const phoneNumberRules = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;


  const userDataSchema = yup.object().shape({
    displayName:yup.string().required("Your name is required"),
    phone:yup.string().matches(phoneNumberRules,"Please enter valid Phone No.").required("Phone Number is Required"),
    address:yup.string().required("Address is required"),
    pincode:yup.string().min(6,"Pincode is invalid").max(6,"Pincode is invalid").required("Pincode is required"),
    building:yup.string().required("Building number or name is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userDataSchema),
    defaultValues: {
      displayName: "",
      phone: "",
      address: "",
      pincode: "",
      building:'',
    },
  });

  const storeUserData = async (userData) => {
    console.log("Pressed");
    try {
      await storeUserDetail(userData);
      navigation.navigate("AppView");
    } catch (e) {
      console.log("Form request to send UserData Error:" + e);
    }
  };

  const onSubmit = (data) => storeUserData(data)

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
              <FormInputController
                control={control}
                name="displayName"
                placeholder="Enter your full name"
              />
              {errors.displayName && (
                <Text style={styles.errorMessage}>{errors.displayName.message}</Text>
              )}
              <FormInputController
                control={control}
                name="phone"
                placeholder="Enter your phone number"
                keyboardType="numeric"
              />
              {errors.phone && (
                <Text style={styles.errorMessage}>{errors.phone.message}</Text>
              )}
              <FormInputController
                control={control}
                name="address"
                placeholder="Enter Address (Street/plotno/sector)"
              />
              {errors.address && (
                <Text style={styles.errorMessage}>{errors.address.message}</Text>
              )}
              <FormInputController
                control={control}
                name="pincode"
                keyboardType="numeric"
                placeholder="Pincode"
              />
              {errors.pincode && (
                <Text style={styles.errorMessage}>{errors.pincode.message}</Text>
              )}
              <FormInputController
                control={control}
                name="building"
                placeholder="Building number or name"
              />
              {errors.building && (
                <Text style={styles.errorMessage}>{errors.building.message}</Text>
              )}
              
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

            <View style={Style.bottomButtonContainer}>
              <ButtonComponent
                text="Continue"
                color={Colors.buttonColor}
                onPress={handleSubmit(onSubmit)}
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
  errorMessage: {
    textAlign: "left",
    alignSelf: "flex-start",
    // borderWidth:3,
    width: "100%",
    color: "red",
  },
});
