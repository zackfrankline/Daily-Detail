import { useContext } from "react";
import { Text, Pressable, View, StyleSheet, FlatList, Dimensions, Button } from "react-native";
import { AuthContext } from "../../hooks/AuthContext";
import { carouselData } from "../../constants/carouselData";
import OnboardingItem from "../../components/OnboardingItem";
import Animated, { useAnimatedRef, useSharedValue } from "react-native-reanimated";
import CustomButton from "../../components/CustomButton";



const Welcome = ({ navigation }) => {
  const { userData } = useContext(AuthContext);
  const flatListRef = useAnimatedRef();
  const flatListIndex = useSharedValue(0)
  const x = useSharedValue(0);

  const checkUserDocComplete = () => {
    console.log(userData);
    userData?.pincode
      ? navigation.navigate("AppView")
      : navigation.navigate("Form");
  };

  
  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems[0].index !== null) {
      flatListIndex.value = viewableItems[0].index;
    }
  };

  const handleNavigation = () => {
    navigation.navigate("AppView")
  }

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={carouselData}
        style={styles.flatlist}
        keyExtractor={(item) => item.id}
        horizontal
        bounces={false}
        pagingEnabled={true}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          minimumViewTime: 300,
          viewAreaCoveragePercentThreshold: 10,
        }}
        renderItem={({ item }) => (
          <OnboardingItem img={item.img} title={item.title} desc={item.desc} />
        )}
      />
      <View style={styles.nextButton}>
        <CustomButton
          navigate={handleNavigation}
          flatListRef={flatListRef}
          flatListIndex={flatListIndex}
          dataLength={carouselData.length}
          x={x}
        />
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  flatlist:{
    height:Dimensions.get("window").height,
  },
  titleText: {
    fontSize: 20,
    marginTop: 10,
    fontWeight: "bold",
    fontFamily: "sans-serif",
  },
  nextButton:{
    position:"absolute",
    bottom:30,
    right:30,
  },
});
