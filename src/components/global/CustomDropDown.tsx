import React, { FC } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import DownArrow from "../../assets/vectors/DownArrow";
import COLORS from "../../constants/Colors";
import fontFamily from "../../constants/FontFamily";
import { spacing } from "../../constants/Spacing";
import Icon from "./Icon";

interface dropDownProps {
  isFocus: boolean;
  dataList: any[];
  value: any;
  onChangeItem: (item: any) => void;
  errorMessage: any;
  labelField: string;
  valueField: string;
  onFocus: () => void;
  onBlur: () => void;
  placeHolder: string;
  search: boolean;
}
const CustomDropDown: FC<dropDownProps> = ({ ...props }) => {
  return (
    <View style={styles.dropdownContainer}>
      <Dropdown
        inputSearchStyle={{ color:COLORS.Black, }}
        searchPlaceholder="search here"
        search={props.search}
        style={[styles.dropdown, props.isFocus && { borderColor: "blue" }]}
        selectedTextStyle={styles.selectedTextStyle}
        data={props.dataList}
        maxHeight={300}
        labelField={props.labelField}
        valueField={props.valueField}
        placeholder={"   " + props.placeHolder}
        placeholderStyle={{ color: COLORS.RoyalBlue }}
        value={props.value}
        onFocus={() => props.onFocus}
        onBlur={() => props.onBlur}
        onChange={(item) => props.onChangeItem(item)}
        renderRightIcon={() => <Icon icon={DownArrow} />}
      />
      {props.errorMessage && (
        <Text style={{ color: COLORS.Red }}>{props.errorMessage}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  selectedTextStyle: {
    marginLeft: spacing.sxs,
    fontSize: 16,
    color: COLORS.Black,
    fontFamily: fontFamily.LatoBold,
  },
  dropdownContainer: {
    paddingHorizontal: 20,
  },
  dropdown: {
    height: Platform.OS == "ios" ? 45 : 50,
    borderBottomColor: COLORS.DustyGrey,
    borderBottomWidth: 1,
    paddingLeft: spacing.xxxs,
    paddingRight: spacing.xxs,
    marginTop: Platform.OS == "ios" ? spacing.s : spacing.xxss,
  },
});

export default CustomDropDown;
