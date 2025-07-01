import { useState, useEffect } from 'react';
import firebase from '@react-native-firebase/app';
import { FIREBASE_CONFIG } from '../config/firebaseConfig';

export const useFirebaseInit = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeFirebase = async () => {
      try {
        if (!firebase.apps.length) {
          await firebase.initializeApp(FIREBASE_CONFIG);
        }
        setIsInitialized(true);
      } catch (error) {
        console.error('Firebase initialization error:', error);
        setIsInitialized(false);
      }
    };

    initializeFirebase();
  }, []);

  return isInitialized;
};
