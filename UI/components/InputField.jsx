import { TextInput, View } from "react-native";
import { Style } from "../constants/ComponentStyle";
import { Colors } from "../constants/colors";

const InputField = ({ placeholder, value, onChange, ...other }) => {
  return (
    <View style={{ marginVertical: 7.5 }}>
      <TextInput
        style={Style.textInput}
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        {...other}
      />
    </View>
  );
};

export default InputField;
