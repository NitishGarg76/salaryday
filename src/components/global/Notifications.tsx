import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function requestUserPermission() {
  const hasPermission = await messaging().hasPermission();
  if (hasPermission === messaging.AuthorizationStatus.AUTHORIZED) {
    getFcmToken();
  } else {
    requestPermission();
    // linking naivgate to setting
  }
  console.log(
    'hasPermission',
    hasPermission,
    messaging.AuthorizationStatus.AUTHORIZED,
    messaging.AuthorizationStatus.PROVISIONAL,
  );
  // const authStatus = await messaging().requestPermission();
  // const enabled =
  //   authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //   authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  //   console.log('enabled', enabled, authStatus)
  // if (enabled) {
  //   console.log('Authorization status:', authStatus);
  //   getFcmToken();
  // }
}

const requestPermission = async () => {
  try {
    await messaging().requestPermission();
    getFcmToken();
  } catch (error) {
    // User has rejected permissions
  }
};

const getFcmToken = async () => {
  const checkFcmToken = await AsyncStorage.getItem('FCM_TOKEN');
  console.log('checkFcmToken', checkFcmToken);
  if (!checkFcmToken) {
    try {
      const fcmToken = await messaging().getToken();
      if (!!fcmToken) {
        await AsyncStorage.setItem('FCM_TOKEN', fcmToken);
      }
      console.log('fcmToken generated', fcmToken);
    } catch (error) {
      console.log('Error in fcm token', error);
    }
  }
};

export const notificationListener = async () => {
  // Assume a message-notification contains a "type" property in the data payload of the screen to open

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
    console.log('background state', remoteMessage.notification);
    // navigation.navigate(remoteMessage.data.type);
  });
  messaging().onMessage(async remoteMessage => {
    console.log('foreground', remoteMessage);
  });
  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
        console.log('remote message', remoteMessage.notification);
        // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
      }
      //   setLoading(false);
    });
};
