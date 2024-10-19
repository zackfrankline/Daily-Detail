import { StyleSheet } from "react-native"
import { View,Text } from "react-native"
import { Style } from "../../constants/ComponentStyle";
import { Colors } from "../../constants/colors";
import { useContext } from "react";
import { AuthContext } from "../../hooks/AuthContext";

export const Address = () =>{
    const { userData } = useContext(AuthContext);
    return (
    <View style={Style.userDetailsContainer}>
      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>Address: </Text>
        <Text style={styles.detailInput}>axch , asdjfl , asjdlkfjlasd</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>Building: </Text>
        <Text style={styles.detailInput}>asdfjkashdf</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>Pincode: </Text>
        <Text style={styles.detailInput}>123456</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  
  detailContainer: {
    flexDirection: "row",
    paddingVertical: 20,
    // justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    borderRadius: 17,
    marginVertical: 8,
    borderColor: Colors.titleTextColor,
    borderBottomWidth: 4,
    borderWidth: 2,
  },
  detailLabel: {
    color:"black",
    fontFamily: "Sora_600SemiBold",
    fontSize: 17,
  },
  detailInput: {
    color: Colors.titleTextColor,
    fontFamily: "Sora_600SemiBold",
    fontSize: 17,
  },
});