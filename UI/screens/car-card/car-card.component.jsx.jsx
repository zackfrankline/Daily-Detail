import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Colors } from "../../constants/colors";
import { Style } from "../../constants/ComponentStyle";
import {IMAGE, IMAGES} from "../../assets/index.js"

//2. Implement shadow for cards and change overall layout of button and have casaroul

const Card = ({ img, variant, id, selectedId, setSelectedId }) => {
  console.log(typeof img);
  return (
    <Pressable
      onPress={() => setSelectedId(id)}
      style={
        selectedId === id
          ? [styles.container, { backgroundColor: Colors.accentColor }]
          : [styles.container]
      }
    >
      <View style={styles.button}>
        <Text
          style={
            selectedId === id
              ? [Style.secondaryText, { color: Colors.backgroundC }]
              : Style.secondaryText
          }
        >
          {variant}
        </Text>
      </View>
      <Image
        source={IMAGES[variant]}
        resizeMode="cover"
        style={{
          width: Dimensions.get("window").width / 2 - 50,
        }}
      />
    </Pressable>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 3,
    borderWidth: 2,
    borderColor: Colors.titleTextColor,
    backgroundColor: Colors.backgroundC,
    alignItems: "center",
    justifyContent: "space-evenly",
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    width: 170,
    height: 200,
    paddingHorizontal: 10,
    elevation: 4,
  },
});
