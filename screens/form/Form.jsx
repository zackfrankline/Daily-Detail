import { useRef, useState } from "react";
import { Text, View, StyleSheet, TextInput, Pressable } from "react-native";
import Input from "./Input";

//Todo : form Input type Checking

const labels = [
  {
    id: "name",
    name: "Full Name",
  },
  {
    id: "address",
    name: "Address1",
  },
  {
    id: "address2",
    name: "Address2",
  },
  {
    id: "phone",
    name: "Phone",
  },
  {
    id: "vehicle",
    name: "Vehicle No.",
  },
  {
    id: "pincode",
    name: "Pincode",
  },
  {
    id: "parking",
    name: "Parking No.",
  },
];

const Form = ({ navigation }) => {
  const [userData, setUserData] = useState({
    name: "",
    address: "",
    address2: "",
    vehicle: "",
    phone: "",
    pincode: "",
    parking: "",
  });

  const handleFormSubmit = () =>{
    console.log(userData);
  }

  const handleChange = (id,val) => {
    setUserData({...userData,[id]:val})
    console.log(userData[id]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.formTitle}>Enter Details</Text>
      {labels.map((label) => (
        <Input
          key={label.id}
          id={label.id}
          name={label.name}
          handleChange={handleChange}
        />
      ))}
      {/* <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Variant")}
      >
        <Text style={styles.buttonText}>Next</Text>
      </Pressable> */}
      <Pressable
        style={styles.button}
        onPress={handleFormSubmit}
      >
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
