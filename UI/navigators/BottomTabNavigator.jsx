// To Do: if a user doesnt have active subscription then :
//         render page to choose variant
//        else
        // render AppView(home) with profile and Calendar




import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Variant from "../screens/car-variant/car-variant.component";
import { Icon } from "@rneui/base";
import { Calendar } from "../screens/calendar-container/calendar-container.component";
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
        name="Calendar"
        component={Calendar}
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
    </Tab.Navigator>
  );
};
