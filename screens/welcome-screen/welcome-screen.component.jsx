import { Text, Pressable, View, StyleSheet } from "react-native";

const Welcome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Welcome to Daily Detail</Text>
      <Pressable
        style={styles.button}
        onPress={() => {
          navigation.navigate("Form");
        }}
      >
        <Text style={styles.buttonText}>Next</Text>
      </Pressable>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingBottom: 25,
    paddingTop: 25,
  },
  titleText: {
    fontSize: 20,
    marginTop: 10,
    fontWeight: "bold",
    fontFamily: "sans-serif",
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
