import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Calendar } from "react-native-calendars";
import { useState } from "react";
import { Style } from "../../constants/ComponentStyle";
import ProfileCard from "../../components/subscribedProfile";

const subscribedProfiledata = [
  {
    payment_reference: 1,
    orderID: 1234,
    variant: "HatchBack",
    remaining_days: 26,
    subscription_start_data: "2024-09-06",
    subscription_end_data: "2024-10-06",
    wash_record: ["2024-09-07", "2024-09-08"],
  },
  {
    payment_reference: 2,
    orderID: 1235,
    variant: "Sedan",
    remaining_days: 26,
    subscription_start_data: "2024-09-11",
    subscription_end_data: "2024-10-11",
    wash_record: ["2024-09-13", "2024-09-25"],
  },
  {
    payment_reference: 3,
    orderID: 1236,
    variant: "Suv",
    remaining_days: 26,
    subscription_start_data: "2024-09-04",
    subscription_end_data: "2024-10-04",
    wash_record: ["2024-09-06", "2024-09-07"],
  },
];



export const ProfileCalendarScreen = ({navigation}) => {
  const [selectedProfile, setSelectedProfile] = useState(subscribedProfiledata[0]);

  const updateMarkedDates = () => {
    let { subscription_start_data, subscription_end_data, wash_record } =
      selectedProfile;
    let dates = [
      subscription_start_data,
      ...wash_record,
      subscription_end_data,
    ];
    let marked = {};
    dates.forEach((element, index) => {
      if (index == 0) {
        marked[element] = {
          startingDay: true,
          color: "#50cebb",
          textColor: "white",
        };
      } else if (index == dates.length - 1) {
        marked[element] = {
          endingDay: true,
          color: "#50cebb",
          textColor: "white",
        };
      } else {
        marked[element] = { marked: true };
      }
    })
    return marked;
  };


  const markedDates = updateMarkedDates();

  const handleProfileSelection = (orderID) => {
    setSelectedProfile(subscribedProfiledata.find((item) => item.orderID === orderID));
  };

  const handleProfileAdd = () =>{
    navigation.navigate("Variant");
  }

  return (
    <View style={styles.container}>
    <Text style={[Style.secondaryText,{fontSize:16,marginHorizontal:20,marginVertical:20}]}>Your Subscribed Profiles</Text>
      <View style={[styles.profileFlatListContainer, { flexDirection: "row" }]}>
        <Pressable
          onPress={handleProfileAdd}
          style={styles.addButton}
        >
          <AntDesign name="pluscircle" size={32} color="black" />
        </Pressable>
        <FlatList
          data={subscribedProfiledata}
          keyExtractor={(item) => item.payment_reference}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <ProfileCard
                orderId={item.orderID}
                selectedId = {selectedProfile.orderID}
                title={item.variant}
                days={item.remaining_days}
                handlePress={handleProfileSelection}
                index={index}
              />
            );
          }}
        />
      </View>
      <View style={styles.calendarContainer}>
        {/* selected Profile to render calander with (startDate,endDate,washrecords) */}
        <Calendar
          markingType={"period"}
          markedDates={markedDates}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  profileFlatListContainer: {
    marginLeft: 10,
    marginBottom: 20,
  },
  addButton: {
    width: 100,
    height: 100,
    marginHorizontal: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
  },
});
