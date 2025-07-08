import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import Splash from "../screens/Splash";
import BottomTabNavigator from "./BottomTabNavigator";
import GroupDetail from "../screens/GroupDetail";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        options={{ headerShown: false }}
        name="Splash"
        component={Splash}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Groups"
        component={BottomTabNavigator}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="GroupDetail"
        component={GroupDetail}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
