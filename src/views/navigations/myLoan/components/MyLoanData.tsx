import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import COLORS from "../../../../constants/Colors";
import fontFamily from "../../../../constants/FontFamily";
import { spacing } from "../../../../constants/Spacing";

interface CardProps {
  label: string;
  amount: string;
  showRS?: boolean;
}

const MyLoanData: FC<CardProps> = ({ label, amount, showRS }) => {
  return (
    <View style={{ marginVertical: spacing.mm }}>
      <View style={styles.divider}>
        <Text style={styles.label}>{label}</Text>
      </View>
      <Text style={styles.rs}>
        {showRS && " ₹"}
        <Text style={styles.amount}>{amount}</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  divider: {
    borderColor: COLORS.White,
    borderBottomWidth: 1,
  },
  label: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: fontFamily.LatoBold,
    color: COLORS.White,
  },
  rs: {
    marginTop: spacing.xxss,
    fontSize: 14,
    lineHeight: 24,
    color: COLORS.White,
    fontFamily: fontFamily.LatoBold,
  },
  amount: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.White,
    fontFamily: fontFamily.LatoBold,
  },
});
export default MyLoanData;
