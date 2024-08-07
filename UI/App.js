import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import StackNavigator from "./navigators/StackNavigator";
import { AuthProvider } from "./hooks/AuthContext";

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StackNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
