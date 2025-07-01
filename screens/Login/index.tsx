import { Image, View } from 'react-native';
import React, { useEffect } from 'react';
import { statusCodes } from '@react-native-google-signin/google-signin';
import { AuthService } from '../../services/auth';
import { useFirebaseInit } from '../../hooks/useFirebaseInit';
import { AuthButton } from '../../components/AuthButton';
import styles from './styles';

const Login = ({ navigation }: { navigation: any }) => {
  const isFirebaseInitialized = useFirebaseInit();

  useEffect(() => {
    AuthService.configureGoogleSignIn();

    const checkSignInStatus = async () => {
      const userCredential = await AuthService.checkExistingSignIn();
      if (userCredential) {
        navigation.navigate('Dashboard', { user: userCredential.user });
      }
    };

    checkSignInStatus();
  }, [navigation]);

  const handleGoogleSignIn = async () => {
    if (!isFirebaseInitialized) {
      console.error('Firebase not initialized yet');
      return;
    }

    try {
      const userCredential = await AuthService.signInWithGoogle();
      navigation.navigate('Dashboard', { user: userCredential.user });
    } catch (error: any) {
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          console.log('User cancelled the sign-in flow');
          break;
        case statusCodes.IN_PROGRESS:
          console.log('Sign-in is already in progress');
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          console.log('Play services not available');
          break;
        default:
          console.error('Google Sign-In Error:', error);
      }
    }
  };

  const handleAppleSignIn = async () => {
    try {
      const userCredential = await AuthService.signInWithApple();
      navigation.navigate('Dashboard', { user: userCredential.user });
    } catch (error) {
      console.error('Apple Sign-In Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logo_with_text.png')}
        style={styles.logo}
      />

      <AuthButton
        onPress={handleGoogleSignIn}
        icon={require('../../assets/images/GoogleLogo.png')}
        text="Continue with Google"
        style={styles.googleButton}
        textStyle={styles.googleText}
        iconStyle={styles.googleIcon}
      />

      <AuthButton
        onPress={handleAppleSignIn}
        icon={require('../../assets/images/icons8-apple-150.png')}
        text="Continue with Apple"
        style={styles.appleButton}
        textStyle={styles.appleText}
        iconStyle={styles.appleIcon}
      />
    </View>
  );
};

export default Login;
