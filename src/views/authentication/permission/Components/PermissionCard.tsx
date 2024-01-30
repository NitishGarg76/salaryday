import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import CircularIcon from "../../../../components/global/CircularIcon";
import { IconProp } from "../../../../components/global/Icon";
import COLORS from "../../../../constants/Colors";
import fontFamily from "../../../../constants/FontFamily";
import { spacing } from "../../../../constants/Spacing";
interface cardProps {
  heading: string;
  iconName: IconProp;
  para: string;
}
const PermissionCard: FC<cardProps> = ({ heading, iconName, para }) => {
  return (
    <View style={styles.box}>
      <View style={styles.line}>
        <CircularIcon iconName={iconName} customStyles={styles.key} />
        <Text style={styles.heading}>{heading}</Text>
      </View>
      <Text style={styles.para}>{para}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  line: { flexDirection: "row", alignItems: "center" },
  box: {
    backgroundColor: COLORS.White,
    marginHorizontal: spacing.m,
    elevation: 10,
    borderRadius: 15,
    marginTop: spacing.m,
  },
  key: {
    backgroundColor: COLORS.White,
    height: 44,
    width: 44,
    marginLeft: spacing.m,
    marginTop: spacing.m,
  },
  heading: {
    marginTop: spacing.sxs,
    fontSize: 16,
    color: COLORS.Black,
    fontFamily:fontFamily.LatoBold,
    lineHeight: 24,
    marginLeft: spacing.xss,
  },
  para: {
    fontSize: 14,
    color: COLORS.Black,
    lineHeight: 18,
    marginTop: spacing.xxss,
    marginLeft: spacing.m,
    marginRight: spacing.xs,
    marginBottom: spacing.s,
    fontFamily:fontFamily.LatoRegular,
  },
});
export default PermissionCard;