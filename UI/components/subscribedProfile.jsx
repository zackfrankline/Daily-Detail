import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/colors";

const ProfileCard = ({ title, days, index, orderId, handlePress }) => {
  return (
    <View
      style={styles.container}
    >
      <Pressable
        onPress={() => {
          handlePress(orderId);
        }}
      >
        <View>
          <Text style={{ color: "white" }}>{title}</Text>
        </View>
        <View>
          <Text style={{ color: "white" }}>Validity: {days} days</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 100,
    backgroundColor: Colors.titleTextColor,
    marginHorizontal: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
