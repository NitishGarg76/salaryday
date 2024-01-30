import React, { FC } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import COLORS from "../../constants/Colors";
import Icon, { IconProp } from "./Icon";

interface CircularIconProps {
  iconName?: IconProp;
  customStyles?: ViewStyle;
  customIconStyles?: ViewStyle;
}
const CircularIcon: FC<CircularIconProps> = ({ iconName, customStyles, customIconStyles }) => {
  return (
    <View style={[styles.circularIconContainer, customStyles]}>
      <Icon icon={iconName} style={customIconStyles} />
    </View>
  );
};

const styles = StyleSheet.create({
  circularIconContainer: {
    height: 44,
    width: 44,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    borderColor: COLORS.RobinGreen,
    borderWidth: 1,
  },
});

export default CircularIcon;
