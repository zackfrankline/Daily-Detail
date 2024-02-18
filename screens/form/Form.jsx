import { useState, useContext } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import Input from "./Input";
import { AuthContext } from "../../hooks/AuthContext";

const userPersonalDetails = {
  displayName: null,
  address: null,
  phone: null,
  pincode: null,
};

const Form = ({ navigation }) => {
  const { storeUserDetail } = useContext(AuthContext);
  const [userData, setUserData] = useState(userPersonalDetails);

  const handleTextChange = (id, val) => {
    setUserData({ ...userData, [id]: val });
  };

  const handleFormSubmit = async () => {
    console.log("Pressed");
    try {
      await storeUserDetail(userData);
    } catch (e) {
      console.log("Form request to send UserData Error:" + e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.formTitle}>Enter Details</Text>

      <Input
        id="displayName"
        label="Name"
        inputFields={userData}
        onChange={handleTextChange}
      />
      <Input
        id="address"
        label="Address"
        inputFields={userData}
        onChange={handleTextChange}
      />
      <Input
        id="pincode"
        label="Pincode"
        inputFields={userData}
        onChange={handleTextChange}
      />
      <Input
        id="phone"
        label="Phone no."
        inputFields={userData}
        onChange={handleTextChange}
      />

      <Pressable onPress={handleFormSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Next</Text>
      </Pressable>
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
