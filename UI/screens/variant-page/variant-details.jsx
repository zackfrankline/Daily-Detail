import {
  Dimensions,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  unstable_batchedUpdates,
  View,
} from "react-native";
import { Colors } from "../../constants/colors";
import InputField from "../../components/InputField";
import ButtonComponent from "../../components/button";
import { Style } from "../../constants/ComponentStyle";
import { useContext, useState } from "react";
import { AuthContext } from "../../hooks/AuthContext";
import { VariantContext } from "../../hooks/VariantContext";

const productfeatureCardDetails = [
  {
    id: 1,
    title: "Rinse",
    desc: "A rinse of water with pressure to remove hard struck mud and dirt to prevent scratches on paint surface.",
    img: require("../../assets/Logos/Variant Details/rinse.png"),
  },
  {
    id: 2,
    title: "Window Wipes",
    desc: "Wipe off windows with wiper provide a clear view but avoid the chances of water marks.",
    img: require("../../assets/Logos/Variant Details/ww.png"),
  },
  {
    id: 3,
    title: "Drying",
    desc: "A two step drying process once with a damp microfiber and then with a drying towel effectively cleans the surface without damaging paint",
    img: require("../../assets/Logos/Variant Details/dry.png"),
  },
];

const FeatureCard = ({ img, title, desc }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.featureCardPic}>
        <Image resizeMode="cover" source={img} />
      </View>
      <View style={styles.featureCardText}>
        <Text
          style={{
            fontFamily: "Sora_700Bold",
            color: Colors.backgroundC,
            fontSize: 12,
            marginBottom: 4,
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            fontFamily: "Sora_600SemiBold",
            fontSize: 9,
            color: Colors.backgroundC,
            textAlign: "center",
          }}
        >
          {desc}
        </Text>
      </View>
    </View>
  );
};

const VariantDetails = ({ navigation }) => {
  const [vehicleNo, setVehicleNo] = useState(null);
  const [parkingNo, setParkingNo] = useState(null);

  const { userData } = useContext(AuthContext);
  // const { currentSelectedVariant } = useContext(VariantContext);
  const currentSelectedVariant = {
    id: "1",
    order_id: "hatch-back1",
    variant: "Hatchback",
    uri: require("../../assets/Cars/cars logo/hatchBack.png"),
    desc: "Alto,i20,Polo",
  };
  const { order_id, variant,uri,desc } = currentSelectedVariant;

  const onBook = () => {
    console.log(userData);
    const newProfile = {vechile_no:vehicleNo,parking_no:parkingNo}
    console.log(newProfile)
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      enabled={true}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.variantPic}>
          <Image
            resizeMode="cover"
            source={require("../../assets/Background/variant-bg.png")}
          />
          <View style={styles.car}></View>
        </View>
        <View style={styles.detailCard}>
          <View style={styles.headerContainer}>
            <View style={styles.titleAndDesc}>
              <Text style={styles.title}>{variant}</Text>
              <Text style={styles.desc}>
                {desc}
              </Text>
            </View>
            <View style={styles.priceContainer}>
              <Text
                style={[
                  styles.title,
                  { color: Colors.backgroundC, fontSize: 16 },
                ]}
              >
                $999
              </Text>
            </View>
          </View>

          <View style={styles.flatlistContainer}>
            <FlatList
              contentContainerStyle={styles.flatlist}
              data={productfeatureCardDetails}
              keyExtractor={(item) => item.id}
              horizontal={true}
              renderItem={({ item }) => (
                <FeatureCard
                  img={item.img}
                  title={item.title}
                  desc={item.desc}
                />
              )}
            />
          </View>
          <View style={{ marginVertical: 15 }}>
            <InputField
              placeholder="Vehicle Number"
              value={vehicleNo}
              onChange={(val) => {
                setVehicleNo(val);
              }}
            />

            <InputField
              placeholder="Parking Number"
              value={parkingNo}
              onChange={(val) => {
                setParkingNo(val);
              }}
            />
            <View style={{ marginVertical: 20 }}>
              {!(vehicleNo && parkingNo) ? (
                <ButtonComponent
                  onPress={onBook}
                  text="Book Now"
                  color={Colors.paraTextColor}
                  disabled={true}
                />
              ) : (
                <ButtonComponent
                  onPress={onBook}
                  text="Book Now"
                  color={Colors.primaryColor}
                />
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  detailCard: {
    flex: 5,
    alignItems: "center",
    backgroundColor: Colors.backgroundC,
    width: Dimensions.get("screen").width,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  variantPic: {
    maxHeight: 250,
  },
  headerContainer: {
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: Dimensions.get("window").width - 40,
  },
  title: {
    fontFamily: "Sora_700Bold",
    fontSize: 20,
    color: Colors.titleTextColor,
  },
  desc: {
    fontFamily: "Sora_600SemiBold",
    fontSize: 13,
    color: Colors.titleTextColor,
  },
  priceContainer: {
    // borderWidth:3,
    padding: 10,
    paddingHorizontal: 20,
    // marginHorizontal: 10,
    borderRadius: 20,
    backgroundColor: Colors.titleTextColor,
  },
  flatlistContainer: {
    maxHeight: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  cardContainer: {
    marginHorizontal: 6,
    width: Dimensions.get("window").width / 3 - 15,
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: Colors.titleTextColor,
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  featureCardPic: {
    flex: 1,
    width: "80%",
    marginVertical: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  featureCardText: {
    flex: 2,
    alignItems: "center",
  },
});

export default VariantDetails;
