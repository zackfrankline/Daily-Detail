import { Text, View, StyleSheet, ScrollView } from "react-native";
import Card from "../car-card/car-card.component.jsx.jsx";
import options from "./cars.js";

const Variant = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Let's select your Variant</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {options.map((car) => {
          return (
            <Card
              key={car.variant}
              variant={car.variant}
              img={car.uri}
              desc={car.desc}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Variant;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    marginBottom: 10,
  },
  titleText: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "bold",
    fontFamily: "sans-serif",
  },
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
