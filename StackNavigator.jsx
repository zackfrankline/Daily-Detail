import HomeScreen from "./screens/Home";
import SignIn from "./screens/Authentication/SignIn";
import LogIn from "./screens/Authentication/LogIn";
import Welcome from "./screens/Welcome";
import Form from "./screens/form/Form";
import Variant from "./screens/variant/Variant";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Form">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LogIn"
        component={LogIn}
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
        name="Variant"
        component={Variant}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
