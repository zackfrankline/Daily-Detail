import { View, TextInput, StyleSheet } from "react-native";
import { forwardRef, useState } from "react";

const Input = ({ id,name,handleChange }) => {
    const [data,setData] = useState("")
  return (
    <View>
      <TextInput
        accessibilityLabel={name}
        style={styles.textInput}
        placeholder={name}
        value={data}
        onChangeText={(val)=>setData(val)}
        onSubmitEditing={(val)=>handleChange(id,val.nativeEvent.text)}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: "#f6f6f6",
    color: "#000000",
    borderRadius: 20,
    height: 40,
    minWidth: "50%",
    paddingLeft: 20,
    marginTop: 20,
  },
});
