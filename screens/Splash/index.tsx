import { View, Animated } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import { AuthService } from "../../services/auth";

const Splash = ({ navigation }: { navigation: any }) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [yPosition] = useState(new Animated.Value(-1000));

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      Animated.spring(yPosition, {
        toValue: 20,
        velocity: 4,
        tension: 2,
        friction: 7,
        useNativeDriver: true,
      }).start(() => {
        AuthService.configureGoogleSignIn();

        const checkSignInStatus = async () => {
          const userCredential = await AuthService.checkExistingSignIn();
          if (userCredential) {
            navigation.navigate("Groups", { user: userCredential.user });
          } else {
            navigation.navigate("Login");
          }
        };

        checkSignInStatus();
      });
    });
  };

  useEffect(() => {
    fadeIn();
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../../assets/images/logo.png")}
        style={[
          styles.logo,
          {
            opacity: fadeAnim,
            transform: [{ translateX: yPosition }],
          },
        ]}
        resizeMode="contain"
      />
    </View>
  );
};

export default Splash;
