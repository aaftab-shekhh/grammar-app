import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid, Platform} from 'react-native';

const getFCMTokenAndroid = async () => {
  let fcmToken = 'dummy';
  try {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    fcmToken = await messaging().getToken();
  } catch (error) {}
  return fcmToken;
};

const getFCMTokenIOS = async () => {
  let fcmToken = 'dummy';
  try {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      fcmToken = await messaging().getToken();
    }
  } catch (err) {}
  return fcmToken;
};

export const getFCMToken = async () => {
  let fcmToken = 'dummy';
  Platform.OS === 'ios'
    ? (fcmToken = await getFCMTokenIOS())
    : (fcmToken = await getFCMTokenAndroid());
  return fcmToken;
};
