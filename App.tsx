import React, { useEffect } from "react";
import MainStackNavigator from "./src/navigation/MainStackNavigator";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { useFlipper } from "@react-navigation/devtools";
import messaging from "@react-native-firebase/messaging";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuthToken } from "./src/services/redux/selector/selector";
import { useSelector } from "react-redux";

const App = () => {
  const token = useSelector(getAuthToken);

  useEffect(() => {
    checkPermission();

  }, []);

  ///getting Firebase data
  const checkPermission = async () => {
    const enabled = await messaging().hasPermission();
    if (enabled) {
      getToken();
    } else {
      requestPermission();
    }
  };

  const getToken = async () => {
    let fcmToken = "";
    fcmToken = await messaging().getToken();
    console.log("fcmToken_kk",fcmToken)
    if (fcmToken) {
      storeFcmToken(fcmToken);
    }
  };
  const requestPermission = async () => {
    try {
      await messaging().requestPermission();
      getToken();
    } catch (error) {
      // User has rejected permissions
    }
  };

  ///Store token
  const storeFcmToken = async (token: any) => {
    try {
      await AsyncStorage.setItem("fcmToken", token);
    } catch (e) {
      console.log("Token key Store Error" + e);
      // saving error
    }
  };
  const navigationRef = useNavigationContainerRef();
  useFlipper(navigationRef);

  return (
    <NavigationContainer ref={navigationRef}>
      <MainStackNavigator />
    </NavigationContainer>
  );
};

export default App;
