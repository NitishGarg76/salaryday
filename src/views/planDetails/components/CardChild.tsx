import React, { FC } from "react";
import { Text, View, ViewStyle } from "react-native";
import COLORS from "../../../constants/Colors";
import fontFamily from "../../../constants/FontFamily";
import { spacing } from "../../../constants/Spacing";
interface CardProps {
  label: string;
  amount: string;
  cardStyle?: ViewStyle;
}
const CardChild: FC<CardProps> = ({ label, amount, cardStyle }) => {
  return (
    <View
      style={[
        {
          borderColor: "#F5F5F5",
          flex: 1,
          borderTopWidth: 1,
          alignItems: "center",
          paddingVertical: spacing.xs,
        },
        cardStyle,
      ]}
    >
      <Text
        style={{
          fontSize: 16,
          fontFamily: fontFamily.LatoBold,
          lineHeight: 24,
          color: COLORS.White,
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          fontSize: 20,
          fontFamily: fontFamily.LatoBold,
          lineHeight: 24,
          color: COLORS.White,
        }}
      >
        {amount}
      </Text>
    </View>
  );
};

export default CardChild;
