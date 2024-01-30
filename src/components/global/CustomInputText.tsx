import React, { FC } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  Platform,
} from "react-native";
import { TextInput } from "react-native-paper";
import COLORS from "../../constants/Colors";
import { spacing } from "../../constants/Spacing";
import Icon, { IconProp } from "./Icon";
interface InputProps {
  label: string;
  isRequired?: boolean;
  iconName?: IconProp;
  data?: string;
  customStyles?: ViewStyle;
  onValChange: (val: string) => void;
  errorMsg?: any;
  maxLength?: number;
  editable?: boolean;
  value?: string;
  placeHolderColor?: string;
  setToUpperCase?: any;
}
const CustomInputText: FC<InputProps> = ({
  label,
  iconName,
  data,
  customStyles,
  onValChange,
  errorMsg,
  maxLength,
  isRequired,
  editable = true,
  value,
  placeHolderColor,
  setToUpperCase,
}) => {
  return (
    <View>
      <View style={[styles.box, customStyles]}>
        <View style={styles.row}>
          <TextInput
            activeUnderlineColor="transparent"
            underlineColor="transparent"
            mode="flat"
            label={
              <Text style={{ color: COLORS.RoyalBlue }}>
                {label}
                <Text style={{ color: isRequired ? "red" : "transparent" }}> *</Text>
              </Text>
            }
            autoCapitalize={setToUpperCase}
            style={{
              flex: 1,
              color: COLORS.Black,
              backgroundColor: "transparent",
              borderWidth: 0,
            }}
            value={value}
            maxLength={maxLength}
            placeholder={label}
            // placeholderTextColor={
            //   placeHolderColor ? placeHolderColor : COLORS.RoyalBlue
            // }
            editable={editable}
            onChangeText={(val) => {
              onValChange(val);
            }}
          />
          {/* {isRequired && !value && (
            <Text
              style={{
                color: COLORS.Red,
                position: "absolute",
                marginLeft: `${label.length*2.5}%`,
              }}
            >
              *
            </Text>
          )} */}
        </View>
        {data && <Text>{data}</Text>}
        {iconName && (
          <TouchableOpacity>
            <Icon style={{ marginLeft: -20 }} icon={iconName} />
          </TouchableOpacity>
        )}
      </View>
      {errorMsg && (
        <Text style={{ color: COLORS.Red, marginLeft: spacing.m }}>
          {errorMsg}
        </Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  box: {
    // marginTop: Platform.OS == "ios" ? 20 : 0,
    flexDirection: "row",
    alignItems: "center",
    borderColor: COLORS.DustyGrey,
    borderBottomWidth: 1,
    marginHorizontal: spacing.m,
    justifyContent: "space-between",
    paddingBottom: -15,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});
export default CustomInputText;
