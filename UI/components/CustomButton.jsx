import { Pressable, StyleSheet, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useState } from "react";
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Style } from "../constants/ComponentStyle";

const CustomButton = ({ flatListIndex, flatListRef, x, dataLength,navigate }) => {
  
  const buttonAnimationStyle = useAnimatedStyle(() => {
    return {
      width:
        flatListIndex.value === dataLength - 1
          ? withSpring(140)
          : withSpring(60),
      height: 60,
    };
  });

  const arrowAnimationStyle = useAnimatedStyle(() => {
    return {
      width: 30,
      height: 30,
      opacity:
        flatListIndex.value === dataLength - 1 ? withTiming(0) : withTiming(1),  
    };
  });

  const textAnimationStyle = useAnimatedStyle(() => {
    return {
      opacity:
        flatListIndex.value === dataLength - 1 ? withTiming(1) : withTiming(0),
    };
  });

  return (
    <Pressable
      onPress={() => {
        if (flatListIndex.value < dataLength - 1) {
          flatListRef.current?.scrollToIndex({
            index: flatListIndex.value + 1,
          });
        }
        else{
          navigate()
        }
      }}
    >
      <Animated.View style={[styles.button, buttonAnimationStyle]}>
        <Animated.Text style={[styles.textButton, textAnimationStyle]}>
          Next
        </Animated.Text>
        <Animated.View style={arrowAnimationStyle}>
          <AntDesign name="arrowright" size={32} color="white" />
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    width: 55,
    height: 55,
    borderRadius: 50,
    backgroundColor: "#025BA0",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  textButton: {
    ...Style.buttonText,
    position:'absolute'
  },
});
