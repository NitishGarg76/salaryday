import React from "react";
import { FC } from "react";
import {
  Pressable,
  View,
  StyleSheet,
  ColorValue,
  Platform,
} from "react-native";
import { Text } from "react-native-paper";
import CircularIcon from "../../../components/global/CircularIcon";
import { IconProp } from "../../../components/global/Icon";
import RadioButton from "../../../components/global/RadioButton";
import COLORS from "../../../constants/Colors";
import fontFamily from "../../../constants/FontFamily";
import { spacing } from "../../../constants/Spacing";

interface EmploymentTypeProps {
  borderColorValue: ColorValue;
  isChecked: boolean;
  onClick: () => void;
  iconName: IconProp;
  label: string;
}
const EmploymentType: FC<EmploymentTypeProps> = ({
  borderColorValue,
  isChecked,
  onClick,
  iconName,
  label,
}) => {
  return (
    <Pressable
      style={[
        styles.employmentTypeBox,
        {
          borderColor: borderColorValue,
        },
      ]}
    >
      <View style={styles.radioConatiner}>
        <RadioButton selected={() => onClick()} isChecked={isChecked} />
      </View>
      <CircularIcon iconName={iconName} customStyles={{ marginTop: -10 }} />
      <Text style={styles.labelStyle}>{label}</Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  employmentTypeBox: {
    width: 120,
    height: 120,
    backgroundColor: COLORS.White,
    borderRadius: 15,
    alignItems: "center",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: Platform.OS == "ios" ? 2 : 10,
    marginHorizontal: spacing.sxs,
  },
  radioConatiner: {
    width: "100%",
    alignItems: "flex-end",
    paddingTop: 6,
    paddingRight: 6,
  },
  labelStyle: {
    textAlign: "center",
    marginTop: 10,
    color: COLORS.Black,
    fontFamily: fontFamily.LatoRegular,
    fontSize: 14,
    lineHeight: 18,
  },
});
export default EmploymentType;
