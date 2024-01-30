import {
  View,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import React from "react";
import WebView from "react-native-webview";
import COLORS from "../../../../constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "../../../../components/global/Icon";
import Back from "../../../../assets/vectors/Back";
import { useNavigation } from "@react-navigation/native";
import { spacing } from "../../../../constants/Spacing";

const Emandate = (props: any) => {
  const mandate_link = props.route.params.mandate_link;
  const navigation = useNavigation();
  const onNavigationGoBack = props.route.params.onNavigationGoBack;

  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.container}>
      <StatusBar
        animated={true}
        translucent
        backgroundColor={COLORS.RobinGreen}
        barStyle={"light-content"}
      />
      <View style={{ height: spacing.xxxxxl, backgroundColor: COLORS.White }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
            onNavigationGoBack();
          }}
          style={{ margin: spacing.s }}
        >
          <Icon icon={Back} />
        </TouchableOpacity>
      </View>
      <WebView
        style={{ marginTop: 0 }}
        allowsLinkPreview={true}
        source={{ uri: mandate_link }}
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

export default Emandate;
