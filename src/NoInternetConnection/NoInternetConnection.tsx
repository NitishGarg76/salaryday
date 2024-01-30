import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import ButtonComponent from "../components/global/ButtonComponent";
import Loader from "../components/global/FullScreenLoader";
import COLORS from "../constants/Colors";
import { NoInternet } from "../constants/Images";
import { spacing } from "../constants/Spacing";
import { useNetInfo } from "@react-native-community/netinfo";

function NoInternetConnection() {
  const [isInternetConnected, setIsInternetConnected] =
    useState<boolean>(false);
  const netInfo = useNetInfo();
  useEffect(() => {
    netInfo.isConnected
      ? setIsInternetConnected(true)
      : setIsInternetConnected(false);
  }, []);
  return (
    <View style={styles.container}>
      <Image
        source={NoInternet}
        style={styles.logoImage}
        resizeMode="contain"
      />
      <ButtonComponent
        buttonLoading={isInternetConnected}
        title={"Try Again"}
        onPress={() => {
          setIsInternetConnected(true);
          setTimeout(() => {
            netInfo.isConnected
              ? setIsInternetConnected(true)
              : setIsInternetConnected(false);
          }, 1000);
        }}
        customStyles={{
          backgroundColor: COLORS.RoyalBlue,
          paddingHorizontal: spacing.l,
          marginVertical: spacing.m,
          marginHorizontal: spacing.s,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Polar,
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  logoImage: {
    width: "80%",
  },
});

export default NoInternetConnection;
