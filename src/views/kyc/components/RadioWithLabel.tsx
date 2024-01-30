import React, { FC } from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import RadioButton from "../../../components/global/RadioButton";
import COLORS from "../../../constants/Colors";
import fontFamily from "../../../constants/FontFamily";
import { spacing, radius } from "../../../constants/Spacing";

interface RadioWithLabelProps {
  label: string;
  isChecked: boolean;
  onClick: () => void;
  customStyles?: ViewStyle;
}

const RadioWithLabel: FC<RadioWithLabelProps> = ({
  label,
  isChecked,
  onClick,
  customStyles,
}) => {
  return (
    <View style={[styles.container, customStyles]}>
      <Text style={styles.radioLabel}>{label}</Text>
      <RadioButton selected={() => onClick()} isChecked={isChecked} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.RoyalBlue,
    borderRadius: radius.xxxl,
    paddingLeft: spacing.sxs,
    paddingVertical: spacing.xxss,
    paddingRight: spacing.xxss,
    backgroundColor: COLORS.White,
    marginRight: spacing.sxs,
  },
  radioLabel: {
    marginRight: spacing.xxss,
    fontSize: 14,
    fontFamily: fontFamily.LatoRegular,
    color: COLORS.RoyalBlue,
    lineHeight: 24,
  },
});

export default RadioWithLabel;
