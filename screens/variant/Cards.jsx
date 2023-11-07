import { addDoc, collection } from "firebase/firestore";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { FIREBASE_DB } from "../../config/firebaseConfig";

const db=FIREBASE_DB;

const Cards = ({ img, variant, desc }) => {
  const handlePress = async() =>{
    try{
      const docRef = await addDoc(collection(db,"Users"),{
        var:`${variant}`,
        user:"xyz",
      })
      console.log("Document",docRef.id)
    }
    catch(e){
      console.log("Khatarnak error",e);
    }
  }
  return (
    <View style={styles.container}>
      <Image source={img} style={{ height: 150, width: 300 }} />
      {/* <Text>{desc}</Text> */}
      <Pressable style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>{variant}</Text>
      </Pressable>
    </View>
  );
};

export default Cards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffd8b2",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    borderRadius:10,
  },
  button: {
    // backgroundColor: "#4f5b66",
    borderRadius: 10,
    height: 40,
    minWidth: "50%",
    alignItems: "center",
    padding: 10,
  },
  buttonText: {
    color: "#000",
    fontSize:16,
    fontWeight:"bold",
    letterSpacing: 1,
  },
});
