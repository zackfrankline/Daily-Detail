import HomeScreen from "../screens/home-screen/home-screen.component";
import SignUp from "../screens/user-sign-up/SignUp";
import SignIn from "../screens/user-sign-in/SignIn";
import Welcome from "../screens/welcome-screen/welcome-screen.component";
import Form from "../screens/form/Form";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../hooks/AuthContext";
import { useContext } from "react";
import { BottomTabNavigator } from "./BottomTabNavigator";
import VariantDetails from "../screens/variant-page/variant-details";
import Variant from "../screens/variant-selection-screen/variant-selection.component";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    // <Stack.Navigator initialRouteName={currentUser ? "Variant-detail" : "Home"}>
     <Stack.Navigator initialRouteName="Form"> 
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Form"
        component={Form}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AppView"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Variant"
        component={Variant}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Variant-detail"
        component={VariantDetails}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
