import { TextInput } from "react-native";
import { Style } from "../constants/ComponentStyle";

const InputField = ({placeholder,value,onChange,...other}) => {
    return (
      <TextInput
        style={Style.textInput}
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        {...other}
      />
    );
}

export default InputField