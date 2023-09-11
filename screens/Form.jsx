import { useState } from "react"
import { Text, View , StyleSheet, TextInput } from "react-native"


const Form = () => {
    const [name,setName] = useState("");
    const[address,setAddress] = useState("")    
    const[parking,setParking] = useState("")
    const[vehicle,setVehicle] = useState("")    
    return (
      <View style={styles.container}>
        <Text>Fill the form below</Text>
        <TextInput
          placeholder="Full Name"
          value={name}
          onChangeText={(val) => {
            setName(val);
          }}
        />
        <TextInput
          placeholder="Address"
          value={address}
          onChangeText={(val) => {
            setAddress(val);
          }}
        />
        <TextInput
          placeholder="Parking no."
          value={parking}
          onChangeText={(val) => {
            setParking(val);
          }}
        />
        <TextInput
          placeholder="Vehicle no."
          value={vehicle}
          onChangeText={(val) => {
            setVehicle(val);
          }}
        />
      </View>
    );
}

export default Form;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});