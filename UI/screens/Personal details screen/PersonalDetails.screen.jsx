import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../../hooks/AuthContext";
import { Colors } from "../../constants/colors";
import { Style } from "../../constants/ComponentStyle";

// 1.personal details (name,email,phone number)

export const PersonalDetails = () => {
 
    const {userData} = useContext(AuthContext);
    // const {displayName,email,phone} = userData;
    // console.log(userData);
  return (
    <View style={Style.userDetailsContainer}>
      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>Name: </Text>
        <Text style={styles.detailInput}>Frankline Kispotta</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>Email ID: </Text>
        <Text style={styles.detailInput}>zackfrankline@gmail.com</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>Phone Number: </Text>
        <Text style={styles.detailInput}>+91 8249575138</Text>
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
