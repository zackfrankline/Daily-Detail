import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import StackNavigator from "./navigators/StackNavigator";
import { AuthProvider } from "./hooks/AuthContext";

import * as SplashScreen from "expo-splash-screen";
import { Amaranth_700Bold } from "@expo-google-fonts/amaranth";
import { Sora_600SemiBold, Sora_700Bold } from "@expo-google-fonts/sora";
import { SuezOne_400Regular } from "@expo-google-fonts/suez-one";
import { Satisfy_400Regular } from "@expo-google-fonts/satisfy";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { VariantProvider } from "./hooks/VariantContext";
import { ProductProvider } from "./hooks/ProductContext";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    Amaranth_700Bold,
    Sora_600SemiBold,
    Sora_700Bold,
    SuezOne_400Regular,
    Satisfy_400Regular,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <NavigationContainer>
      <AuthProvider>
        <VariantProvider>
          <ProductProvider>
            <StackNavigator />
          </ProductProvider>
        </VariantProvider>
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
