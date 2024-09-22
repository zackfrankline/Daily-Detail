import { StyleSheet } from "react-native";

export const Style = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    minWidth: 100,
    width: 323,
    height: 65,
    margin: 10,
    textAlign: "center",
    borderRadius: 14,
    elevation: 8,
  },
  inputContainer: {
    marginTop: 60,
    marginHorizontal: 100,
    alignItems: "center",
  },
  textInput: {
    backgroundColor: "#F7F7F9",
    alignSelf:"center",
    color: "#000000",
    borderRadius: 14,
    height: 65,
    width: 323,
    paddingLeft: 20,
    elevation: 8,
    // borderWidth:1,
    // borderColor:Colors.titleTextColor,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: "Sora_600SemiBold",
  },
  titleText: {
    fontSize: 32,
    fontFamily: "SuezOne_400Regular",
    color: "#3C3C3C",
  },
  secondaryText: {
    fontSize: 16,
    fontFamily: "Sora_600SemiBold",
    color: "#3c3c3c",
  },
  logInTextContainer: {
    alignSelf: "flex-start",
    marginLeft: 35,
    marginTop: 170,
  },
  bottomButtonContainer: {
    marginTop: 140,
    width: "80%",
    alignItems: "center",
  },
}); 