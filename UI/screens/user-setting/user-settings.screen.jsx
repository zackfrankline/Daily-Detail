import { Dimensions, FlatList, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import AntDesign from "@expo/vector-icons/AntDesign";

//render user setting, includes
// 1.personal details (name,email,phone number)
// 2. address (picode, building name or number)
// 3. payments and status
// 4. customer care

const SettingCards = ({title,handlePress}) => {
   
  return (
    <Pressable onPress={() => handlePress(title)} style={styles.cardContainer}>
      <Text style={styles.cardTitle}>{title}</Text>
      <AntDesign name="right" size={24} color={Colors.titleTextColor} />
    </Pressable>
  );
};

const settingCardTitles = [
  {
    name: "Personal Details",
    id: 1,
  },
  {
    name: "Address",
    id: 2,
  },
  {
    name: "Payments and Status",
    id: 3,
  },
  {
    name: "Customer Care",
    id: 4,
  },
];

export const UserSettings = ({navigation}) => {
  const { width, height } = Dimensions.get("window");

  const handlePress = (name) =>{
    navigation.navigate(name);
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Settings</Text>
        <FlatList style={styles.settingCardContainer} data={settingCardTitles} keyExtractor={(item)=>item.id} renderItem={({item,index}) => 
      <SettingCards handlePress={handlePress} title={item.name} />
      }/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    // marginTop:40,
  },
  title: {
    fontFamily: "SuezOne_400Regular",
    fontSize: 30,
    color: Colors.titleTextColor,
  },
  settingCardContainer:{
    marginTop:40,
  },
  cardContainer: {
    // backgroundColor: Colors.titleTextColor,
    flexDirection: "row",
    paddingVertical: 20,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    borderRadius: 17,
    marginVertical:8,
    borderColor:Colors.titleTextColor,
    borderBottomWidth:4,
    borderWidth:2,
  },
  cardTitle: {
    color: Colors.titleTextColor,
    backgroundColor:Colors.backgroundC,
    fontFamily: "Sora_600SemiBold",
    fontSize: 17,
  },
});
