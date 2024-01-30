import {
  View,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import WebView from "react-native-webview";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Back from "../../assets/vectors/Back";
import COLORS from "../../constants/Colors";
import { spacing } from "../../constants/Spacing";
import Icon from "./Icon";
import { useDispatch, useSelector } from "react-redux";
import { setWebViewClose } from "../../services/redux/action/actions";
import { getWebViewClose } from "../../services/redux/selector/selector";

const CustomWebView = (props: any) => {
  const link = props.route.params.link;
  const navigation = useNavigation();
  const weViewStatus = useSelector(getWebViewClose)
  const dispatch = useDispatch()
  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.container}>
      <StatusBar
        animated={true}
        translucent
        backgroundColor={COLORS.Transparent}
        barStyle={"light-content"}
      />
      <View style={{ backgroundColor: COLORS.Transparent }}>
        <TouchableOpacity
          onPress={() => {
            dispatch(setWebViewClose(weViewStatus ? false : true))
            navigation.goBack();
          }}
          style={{ margin: spacing.s }}
        >
          <Icon icon={Back} />
        </TouchableOpacity>
      </View>
      <WebView
        style={{ marginTop: 0 }}
        allowsLinkPreview={true}
        source={{ uri: link }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Polar,
  },
});
export default CustomWebView;
