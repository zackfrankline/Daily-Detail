import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";
import Card from "../car-card/car-card.component.jsx.jsx";
import carVariantData from "./cars.js";
import { Style } from "../../constants/ComponentStyle.js";
import { useContext, useState } from "react";
import ButtonComponent from "../../components/button.jsx";
import { Colors } from "../../constants/colors.js";
import { VariantContext } from "../../hooks/VariantContext.js";


const Variant = ({navigation}) => {

  const {setCurrentSelectedVariant} = useContext(VariantContext)
  const [selectedId, setSelectedId] = useState(null);

  const handleVariantSubmit = () =>{
    setCurrentSelectedVariant(carVariantData.find((variant)=> variant.id === selectedId));
    navigation.navigate("Variant-detail")
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={[Style.titleText,{fontSize:24,marginBottom:100,marginTop:20}]}>Let's select your Car's body</Text>
      </View>
      {/* <View> */}
        <FlatList
          data={carVariantData}
          keyExtractor={(card) => card.variant}
          showsVerticalScrollIndicator={false}
          horizontal={false}
          numColumns={2}
          renderItem={({ item }) => (
            <Card
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              id={item.id}
              variant={item.variant}
              img={item.uri}
            />
          )}
        />
      <View>
        <ButtonComponent text="Continue" color={Colors.primaryColor} onPress={handleVariantSubmit}/>
      </View>
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
    marginVertical:20,
  }, 
});
