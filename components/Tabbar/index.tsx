import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import Icon2 from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

function Tabbar({ state, descriptors, navigation }: any) {
  const icons = {
    Groups: <Icon2 name="users" size={24} color="black" />,
    Chats: <Icon2 name="message-circle" size={18} color="black" />,
    Profile: <Icon2 name="user" size={24} color="black" />,
  };
  return (
    <LinearGradient
      colors={['#f6b300', '#f69400']}
      style={styles.tabBar}
      start={{ x: 0, y: 1 }}
      end={{ x: 0, y: 0 }}
    >
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        return (
          <TouchableOpacity
            key={route.key}
            style={styles.tabButton}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={() => navigation.navigate(route.name)}
          >
            {React.cloneElement(icons[route.name as keyof typeof icons], {
              color: isFocused ? '#F07321' : '#000',
            })}
            <Text
              style={[
                styles.tabButtonText,
                { color: isFocused ? '#F07321' : '#000' },
              ]}
            >
              {route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </LinearGradient>
  );
}

export default Tabbar;
