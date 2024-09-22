import {
  Text,
  View,
  StyleSheet,
  FlatList,
} from "react-native";
import Card from "../car-card/car-card.component.jsx.jsx";
import { Style } from "../../constants/ComponentStyle.js";
import { useContext, useState } from "react";
import ButtonComponent from "../../components/button.jsx";
import { Colors } from "../../constants/colors.js";
import { VariantContext } from "../../hooks/VariantContext.js";
import { ProductContext } from "../../hooks/ProductContext.jsx";


const Variant = ({navigation}) => {

  const {currentSelectedVariant, setCurrentSelectedVariant} = useContext(VariantContext)
  const {products} = useContext(ProductContext);
  const [selectedId, setSelectedId] = useState(null);

  const handleVariantSubmit = () =>{
    if(selectedId){
      setCurrentSelectedVariant(products.find((variant)=> variant.id === selectedId));
      console.log(currentSelectedVariant)
      navigation.navigate("Variant-detail")

    }
    else{
      alert("select a Variant");
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={[Style.titleText,{fontSize:24,marginBottom:100,marginTop:20}]}>Let's select your Car's body</Text>
      </View>
      {/* <View> */}
        <FlatList
          data={products}
          keyExtractor={(card) => card.title}
          showsVerticalScrollIndicator={false}
          horizontal={false}
          numColumns={2}
          renderItem={({ item }) => (
            <Card
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              id={item.id}
              variant={item.title}
              img={item.imageUri}
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
