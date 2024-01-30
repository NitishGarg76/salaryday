import React, { Fragment, useEffect } from "react";
import { StyleSheet, StatusBar, Platform, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SplashLogo } from "../../constants/Images";
import COLORS from "../../constants/Colors";
import { useSelector } from "react-redux";
import { getKycCompletedStatus } from "../../services/redux/selector/selector";
import { CommonActions } from '@react-navigation/routers';


const Splash = () => {
  const isKYCDone = useSelector(getKycCompletedStatus);
  const navigation = useNavigation();
  useEffect(() => {
    const clearInterval = setTimeout(() => {
      // console.log("isKYCDone", isKYCDone)
      const resetAction = CommonActions.reset({
        index: 0,
        routes: [{
          name: isKYCDone ? "Dashboard" : "OnBoard"
        }],
      });
      // navigation.navigate("OnBoard");
      return navigation.dispatch(resetAction);

    }, 3000);

    return () => {
      clearTimeout(clearInterval);
    };
  }, []);

  return (
    <Fragment>
      <SafeAreaView
        style={styles.container}
        edges={["right", "bottom", "left", "top"]}

      >
        <StatusBar
          animated={true}
          translucent={Platform.OS == "android" ? true : false}
          backgroundColor={COLORS.Transparent}
          barStyle="dark-content"
        />
        <Image
          source={SplashLogo}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.RobinGreen,
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -60,
  },
  logoImage: {
    width: "80%",
    height: 200,
  },
});

export default Splash;
