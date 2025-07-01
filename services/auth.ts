import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { FIREBASE_CONFIG } from '../config/firebaseConfig';

export class AuthService {
  static configureGoogleSignIn() {
    GoogleSignin.configure({
      iosClientId: FIREBASE_CONFIG.clientId,
      webClientId: FIREBASE_CONFIG.clientId,
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });
  }

  static async checkExistingSignIn(): Promise<FirebaseAuthTypes.UserCredential | null> {
    try {
      const hasUser = await GoogleSignin.getCurrentUser();
      if (!hasUser) return null;

      const userInfo = await GoogleSignin.signInSilently();
      if (!userInfo) return null;

      const { accessToken } = await GoogleSignin.getTokens();
      const credential = await GoogleSignin.getTokens();
      const googleCredential = auth.GoogleAuthProvider.credential(
        credential.idToken,
        accessToken,
      );

      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.error('Silent sign-in error:', error);
      return null;
    }
  }

  static async signInWithGoogle(): Promise<FirebaseAuthTypes.UserCredential> {
    await GoogleSignin.hasPlayServices();
    await GoogleSignin.signIn();

    const { accessToken, idToken } = await GoogleSignin.getTokens();
    const googleCredential = auth.GoogleAuthProvider.credential(
      idToken,
      accessToken,
    );

    return auth().signInWithCredential(googleCredential);
  }

  static async signInWithApple(): Promise<FirebaseAuthTypes.UserCredential> {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });

    if (!appleAuthRequestResponse.identityToken) {
      throw new Error('Apple Sign-In failed - no identity token returned');
    }

    const { identityToken, nonce } = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(
      identityToken,
      nonce,
    );

    return auth().signInWithCredential(appleCredential);
  }
}
