import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { Style } from "../constants/ComponentStyle";
import { Colors } from "../constants/colors";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from "react";


const InputField = ({ name, placeholder,isPassword, value, onChange, ...other }) => {
  
  const [showPassword,setShowPassword] = useState(true);

  const toggleShowPassword = () => {
      setShowPassword(!showPassword)
  }
 
  return (
    <View style={[{ marginVertical: 7.5 }, styles.inputField]}>
      <TextInput
        // style={Style.textInput}
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        secureTextEntry={isPassword ? showPassword : false}
        // secureTextEntry={showPassword}
        // {...other}
      />
      {name === "password" ? (
        <Pressable onPress={toggleShowPassword}>
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color="black"
          />
        </Pressable>
      ) : (
        name === "confirmPassword" && (
          <Pressable onPress={toggleShowPassword}>
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="black"
            />
          </Pressable>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputField: {
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    backgroundColor: "#F7F7F9",
    alignSelf: "center",
    color: "#000000",
    borderRadius: 14,
    height: 65,
    width: 323,
    paddingLeft: 20,
    paddingRight:20,
    elevation: 8,
    // borderWidth:1,
    // borderColor:Colors.titleTextColor,
  },
});

export default InputField;
