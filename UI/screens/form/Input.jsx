import { View, TextInput, StyleSheet } from "react-native";

const Input = ({ id, label, inputFields, onChange, onSubmit }) => {
  return (
    <View>
        <TextInput
          accessibilityLabel={label}
          autoFocus={id==="displayName"}
          style={styles.textInput}
          value={inputFields.value}
          inputMode={id==="phone"||id==="pincode"?"tel":"text"}
          placeholder={label}
          onChangeText={(val) => onChange(id, val)}
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
    borderWidth: 1,
    height: 50,
    minWidth: "80%",
    paddingLeft: 20,
    marginTop: 20,
    elevation: 1,
  },
});
