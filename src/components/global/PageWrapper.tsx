import React, { FC, ReactNode } from "react";
import {
  StyleSheet,
  StatusBar,
  ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../../constants/Colors";

interface PageWrapperProps {
  children: ReactNode;
  viewStyle?: ViewStyle
}

const PageWrapper: FC<PageWrapperProps> = ({ children, viewStyle }) => {
  return (
      <SafeAreaView edges={["right", "left", 'top']} style={[styles.container, viewStyle]}>
        <StatusBar />
        {children}
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: COLORS.RobinGreen,
  },
  mainBgStyle: {
    height: "100%",
    width: "100%",
    flex: 1,
  },
});

export default PageWrapper;