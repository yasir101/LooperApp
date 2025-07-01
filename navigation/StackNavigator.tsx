import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import Splash from '../screens/Splash';
import BottomTabNavigator from './BottomTabNavigator';

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
        name="Dashboard"
        component={BottomTabNavigator}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
