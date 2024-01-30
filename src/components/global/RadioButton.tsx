import React from "react";
import { FC } from "react";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import Checked from "../../assets/vectors/Checked";
import COLORS from "../../constants/Colors";
import Icon from "./Icon";
interface RadioButtonProps {
  customStyles?: ViewStyle;
  selected: () => void;
  isChecked: boolean;
}
const RadioButton: FC<RadioButtonProps> = ({
  customStyles,
  selected,
  isChecked,
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        selected();
      }}
    >
      <View style={[styles.outerCircle, customStyles]}>
        {isChecked && (
          <View style={styles.checkedContainer}>
            <Icon icon={Checked} style={styles.iconStyle} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  outerCircle: {
    height: 22,
    width: 22,
    borderRadius: 20,
    borderColor: COLORS.RoyalBlue,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  checkedContainer: {
    width: 22,
    height: 22,
    backgroundColor: COLORS.RoyalBlue,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  iconStyle: { width: 15, height: 15 },
});

export default RadioButton;
