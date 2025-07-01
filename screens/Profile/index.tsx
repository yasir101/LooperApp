import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import React from 'react';
import { View, Button } from 'react-native';
import styles from './styles';

function Profile({ navigation }: { navigation: any }) {
  const signOut = React.useCallback(async () => {
    try {
      await GoogleSignin.signOut();
      await auth().signOut();
      navigation.navigate('Login');
    } catch (error) {
      console.error('Sign-out Error:', error);
    }
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
}

export default Profile;
