// To Do: if a user doesnt have active subscription then :
//         render page to choose variant
//        else
        // render AppView(home) with profile and Calendar




import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "@rneui/base";
import { Calendar, UserSettings } from "../screens/user-setting/user-settings.screen";
import { ProfileCalendarScreen } from "../screens/profile-calendar/profile-calendar.screen";

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={ProfileCalendarScreen}
        options={{
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <Icon
              name="car-sport-outline"
              type="ionicon"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="User Settings"
        component={UserSettings}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon
              name="car-sport-outline"
              type="ionicon"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
