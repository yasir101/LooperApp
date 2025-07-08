import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "../screens/Profile";
import Icon from "react-native-vector-icons/MaterialIcons";
import Tabbar from "../components/Tabbar";
import Community from "../screens/Community";
import Groups from "../screens/Groups";
import TopTabNavigator from "./TopTabNavigator";

const Tab = createBottomTabNavigator();

function BottomTabNavigator({ route }: { route: any }) {
  return (
    <Tab.Navigator tabBar={Tabbar}>
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Icon
              name="groups"
              color={color}
              size={focused ? size + 4 : size}
              style={[
                { fontWeight: "900", fontSize: focused ? 26 : 22 },
                focused && {},
              ]}
            />
          ),
          tabBarActiveTintColor: "#000",
          tabBarInactiveTintColor: "#999",
        }}
        name="Groups"
        initialParams={route.params}
        component={Groups}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Icon
              name="chat"
              color={color}
              size={focused ? size + 4 : size}
              style={[
                { fontWeight: "900", fontSize: focused ? 26 : 22 },
                focused && {},
              ]}
            />
          ),
          tabBarActiveTintColor: "#000",
          tabBarInactiveTintColor: "#999",
        }}
        name="Chats"
        component={Community}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Icon
              name="person"
              color={color}
              size={focused ? size + 4 : size}
              style={[
                { fontWeight: "900", fontSize: focused ? 26 : 22 },
                focused && {},
              ]}
            />
          ),
          tabBarActiveTintColor: "#000",
          tabBarInactiveTintColor: "#999",
        }}
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
