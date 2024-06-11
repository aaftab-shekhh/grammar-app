import {Alert, Linking} from 'react-native';

export const permissionDenied = () => {
  Alert.alert(
    'Permission permanently denied',
    'The Permission Please enable it in the application settings.',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Open Settings',
        style: 'destructive',
        onPress: () => {
          Linking.openSettings();
        },
      },
    ],
  );
};
