import {
  Dimensions,
  FlatList,
  Image,
 
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  
  View,
} from "react-native";

import * as yup from 'yup'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Colors } from "../../constants/colors";

import ButtonComponent from "../../components/button";

import { useContext } from "react";
import { AuthContext } from "../../hooks/AuthContext";
import { VariantContext } from "../../hooks/VariantContext";

import { IMAGES } from "../../assets";
import FormInputController from "../../components/controllers/FormInputController";
import { handleCheckout } from "../../services/razropayHandler";


const user = {
  active_subscription: false,
  address: "57,Bhimatangi,Bhubneswar",
  buildingName: "57",
  createdAt: { nanoseconds: 395000000, seconds: 1726840476 },
  displayName: "Frankline Kispotts",
  email: "zackfrankline@gmail.com",
  phone: "8249575138",
  pincode: "751005",
};

const FeatureCard = ({ img, title, desc }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.featureCardPic}>
        <Image resizeMode="cover" source={IMAGES[title]} />
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

  const oldVehicleRegex = /(^[A-Z]{2}[0-9]{2}[A-HJ-NP-Z]{1,2}[0-9]{4}$|^[0-9]{2}BH[0-9]{4}[A-HJ-NP-Z]{1,2}$)/;



  const schema = yup.object().shape({
    vehicleNo:yup.string().matches(oldVehicleRegex ,"Please Enter Valid Vehicle Number").required("Vehicle Number is Required"),
    parkingNo:yup.string().required("Parking Number is required"),
  })

  const {control, handleSubmit,formState:{errors}} = useForm({
    resolver:yupResolver(schema),
    defaultValues:{
      vehicleNo:"",
      parkingNo:""
    }
  })


  const { userData } = useContext(AuthContext);
  const { currentSelectedVariant } = useContext(VariantContext);

  const { order_id, title,price, desc , productFeatureDetail } = currentSelectedVariant;


  const onSubmit = (subscriptionData) =>{
    // send amount,description, prefil data{email,contact,name} 
    // console.log(price, subscriptionData, userData);
    handleCheckout(title, price, userData, subscriptionData);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      enabled={true}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View
          source={require("../../assets/Background/variant-bg.png")}
          style={styles.variantPic}
        >
          <Image source={IMAGES[title+"ScreenImg"]} />
        </View>
        <View style={styles.detailCard}>
          <View style={styles.headerContainer}>
            <View style={styles.titleAndDesc}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.desc}>{desc}</Text>
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
              data={productFeatureDetail}
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
            <FormInputController
              control={control}
              name="vehicleNo"
              placeholder="Enter your Vehicle Number"
            />
            {errors.vehicleNo && (
              <Text style={styles.errorMessage}>
                {errors.vehicleNo.message}
              </Text>
            )}
            <FormInputController
              control={control}
              name="parkingNo"
              placeholder="Enter your Parking Number"
            />
            {errors.parkingNo && (
              <Text style={styles.errorMessage}>
                {errors.parkingNo.message}
              </Text>
            )}
            <View style={{ marginVertical: 20 }}>
              <ButtonComponent
                onPress={handleSubmit(onSubmit)}
                text="Book Now"
                color={Colors.buttonColor}
              />
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
    height:250,
    alignItems:"center",
    justifyContent:"center"
  },
  carImage:{
    flex:1,
    height:200,
    width:300,
    marginTop:60,
    alignSelf:"flex-end"
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
  errorMessage: {
    textAlign: "left",
    alignSelf: "flex-start",
    marginLeft:20,
    width: "100%",
    color: "red",
  },
});

export default VariantDetails;
