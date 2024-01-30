import React, { FC } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from "react-native";
import CheckedCircle from "../assets/vectors/CheckedCircle";
import COLORS from "../constants/Colors";
import fontFamily from "../constants/FontFamily";
import { spacing } from "../constants/Spacing";
import Icon, { IconProp } from "./global/Icon";

interface ComponentProps {
  iconName?: IconProp;
  labelText?: string;
  hintText?: string;
  showRightIcon?: boolean;
  onChangeText: (value: any) => void;
  value?: string;
  onBlur: (value: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  errorMessage?: any;
  maxLength?: number;
  keyboardType?: KeyboardTypeOptions;
  isEditable?: boolean;
}
const EnterDigit: FC<ComponentProps> = ({ ...props }) => {
  return (
    <View>
      <View style={styles.container}>
        {props.iconName ? (
          <Icon icon={props.iconName} />
        ) : (
          <Text style={styles.labelText}>{props.labelText}</Text>
        )}
        <View style={styles.divider}></View>
        <TextInput
        
          editable={props.isEditable}
          style={styles.placeHolder}
          maxLength={props.maxLength}
          keyboardType={props.keyboardType}
          placeholder={props.hintText}
          onChangeText={(value) => {
            props.onChangeText(value);
          }}
          onBlur={(value) => props.onBlur(value)}
          value={props.value}
        />
        {props.showRightIcon && <Icon icon={CheckedCircle} />}
      </View>
      {!!props.errorMessage && (
        <View style={styles.helperTextStyle}>
          <Text style={styles.errorText}>{props.errorMessage}</Text>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    borderColor: COLORS.DustyGrey,
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    height: 35,
    width: "100%",
  },
  placeHolder: {
    fontSize: 12,
    fontFamily: fontFamily.LatoMedium,
    color:COLORS.Black,
    lineHeight: 15,
    flex: 1,
    marginLeft: -10,
  },
  divider: {
    borderLeftWidth: 1,
    borderColor: COLORS.DustyGrey,
    marginVertical: spacing.sxs,
    marginHorizontal: spacing.s,
    height: 22,
  },
  labelText: {
    fontSize: 14,
    fontFamily: fontFamily.LatoMedium,
    color: COLORS.Black,
    lineHeight: 24,
  },
  errorText: {
    color: COLORS.Red,
  },
  helperTextStyle: {
    marginTop: 3,
  },
});
export default EnterDigit;
