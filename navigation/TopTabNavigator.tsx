import React, { useRef, useState, useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import Active from "../screens/Active";
import Challenges from "../screens/Challenges";
import Clubs from "../screens/Clubs";

const Tab = createMaterialTopTabNavigator();

const TopTabNavigator = () => {
  const screenWidth = Dimensions.get("window").width;
  const tabWidth = screenWidth / 3;

  const translateX = useRef(new Animated.Value(0)).current;

  const handleTabPress = (index: number) => {
    Animated.spring(translateX, {
      toValue: index * tabWidth,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Tab.Navigator
      tabBar={({ state, descriptors, navigation }) => {
        const prevIndex = useRef(state.index);

        useEffect(() => {
          if (prevIndex.current !== state.index) {
            Animated.spring(translateX, {
              toValue: state.index * tabWidth,
              useNativeDriver: true,
            }).start();
            prevIndex.current = state.index;
          }
        }, [state.index]);

        return (
          <View style={styles.customTabBar}>
            <View style={styles.tabRow}>
              {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                  options.tabBarLabel ?? options.title ?? route.name;
                const isFocused = state.index === index;

                return (
                  <TouchableOpacity
                    key={route.key}
                    onPress={() => {
                      navigation.navigate(route.name); // no need to manually animate
                    }}
                    style={[styles.tabButton, { width: tabWidth }]}
                  >
                    <Text
                      style={{
                        color: isFocused ? "#000" : "#666",
                        fontWeight: isFocused ? "bold" : "normal",
                      }}
                    >
                      {label as string}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Animated.View
              style={[
                styles.animatedIndicator,
                {
                  width: tabWidth - 50,
                  transform: [{ translateX }],
                },
              ]}
            />
          </View>
        );
      }}
    >
      <Tab.Screen
        name="Active"
        component={Active}
        options={{ tabBarLabel: "Active" }}
      />
      <Tab.Screen
        name="Challenges"
        component={Challenges}
        options={{ tabBarLabel: "Challenges" }}
      />
      <Tab.Screen
        name="Clubs"
        component={Clubs}
        options={{ tabBarLabel: "Clubs" }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  customTabBar: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
    position: "relative",
    width: "100%",
    marginTop: 10,
  },
  tabRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tabButton: {
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  animatedIndicator: {
    height: 3,
    backgroundColor: "#f6b300",
    position: "absolute",
    bottom: 0,
    left: 25,
    right: 25,
  },
});

export default TopTabNavigator;
