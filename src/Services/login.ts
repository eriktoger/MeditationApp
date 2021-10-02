import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {Toast} from 'native-base';

//Settings.initializeSDK();
GoogleSignin.configure({
  webClientId:
    '1086345239546-7vi3s5ep1enjg25fbe9e7bfggjrrhrbm.apps.googleusercontent.com',
});

const errorToast = () => {
  Toast.show({
    title: 'Login failed',
    description: 'Try again',
    status: 'error',
  });
};

export const anonymousLogin = async (): Promise<void> => {
  try {
    await auth().signInAnonymously();
  } catch (e) {
    console.log('e', e);
    errorToast();
  }
};

export const googleLogin = async (): Promise<void> => {
  try {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    await auth().signInWithCredential(googleCredential);
  } catch (e) {
    console.log(e);
    errorToast();
  }
};

export const facebookLogin = async (): Promise<void> => {
  try {
    await LoginManager.logOut();
    const result = await LoginManager.logInWithPermissions(['public_profile']);
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign-in the user with the credential
    auth().signInWithCredential(facebookCredential);
  } catch (e) {
    console.log(e);
    errorToast();
  }
};
