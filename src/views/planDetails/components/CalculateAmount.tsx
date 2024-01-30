import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import COLORS from "../../../constants/Colors";
import fontFamily from "../../../constants/FontFamily";
import { spacing } from "../../../constants/Spacing";
interface ComponentProps {
  label: string;
  amount: number;
}
const CalculateAmount: FC<ComponentProps> = ({ label, amount }) => {
  return (
    <View style={styles.box}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.rs}>
        <Text>Rs.</Text>
        {amount}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: COLORS.DustyGrey,
    borderBottomWidth: 1,
    marginTop: spacing.m,
    height: 30,
  },
  label: {
    fontSize: 14,
    fontFamily: fontFamily.LatoRegular,
    lineHeight: 18,
    color: COLORS.Black,
  },
  rs: {
    color: COLORS.RoyalBlue,
    fontSize: 18,
    fontFamily: fontFamily.LatoMedium,
    lineHeight: 18,
  },
});
export default CalculateAmount;
