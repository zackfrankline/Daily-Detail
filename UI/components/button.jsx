import { Pressable, Text } from "react-native"
import { Style } from "../constants/ComponentStyle"

function ButtonComponent ({text,onPress,color}) {

    return (
      <Pressable
        style={[Style.button, { backgroundColor: color}]}
        onPress={onPress}
        android_ripple={{ color: "#149DFF", borderless: false }}
      >
        <Text style={Style.buttonText}>{text}</Text>
      </Pressable>
    );
}

export default ButtonComponent