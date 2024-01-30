import React, { FC } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DownArrow from "../../assets/vectors/DownArrow";
import COLORS from "../../constants/Colors";
import fontFamily from "../../constants/FontFamily";
import STRINGS from "../../constants/locale";
import { spacing } from "../../constants/Spacing";
import OtpInputField from "../../views/authentication/verifyOtp/Components/OtpInputField";
import ButtonComponent from "./ButtonComponent";
import Icon from "./Icon";

interface EnterOtpProps {
  onPress: () => void;
  isValid: boolean;
  errorMsg: any;
  setValue: (val: any) => void;
  buttonloader?: boolean;
  onPressResend: () => void;
  seconds: number;
}

const EnterOtpComponent: FC<EnterOtpProps> = ({
  onPress,
  isValid,
  errorMsg,
  setValue,
  onPressResend,
  buttonloader,
  seconds,
}) => {
  return (
    <View>
      <View
        style={{
          marginTop: 30,
          justifyContent: "center",
          width: "60%",
          marginLeft: 60,
          marginRight: 40,
        }}
      >
        <OtpInputField
          errorMsg={errorMsg}
          onChange={(code) => {
            setValue(code);
          }}
        />
        <Text style={[styles.label, { marginTop: errorMsg ? -10 : -25 }]}>
          {STRINGS.EnterOtpComponent.label}
          <Text style={styles.timmer}>
            {seconds < 10 ? " 00:0" + seconds : " 00:" + seconds}
          </Text>
        </Text>
      </View>

      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          alignSelf: "flex-end",
          marginRight: 60,
        }}
        onPress={() => {
          onPressResend();
        }}
      >
        <Text style={styles.text}>{STRINGS.EnterOtpComponent.text}</Text>
        <Icon
          icon={DownArrow}
          style={{
            marginTop: 59,
            transform: [{ rotate: "-90deg" }],
            marginLeft: spacing.sxs,
          }}
          fill={COLORS.RobinGreen}
        />
      </TouchableOpacity>

      <ButtonComponent
        disable={isValid}
        buttonLoading={buttonloader}
        title={STRINGS.EnterOtpComponent.buttonTitle}
        onPress={() => onPress()}
        customStyles={{
          paddingHorizontal: spacing.ll,
          marginTop: spacing.xxxxl,
          width: "40%",
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    lineHeight: 30,
    fontFamily: fontFamily.LatoRegular,
    color: COLORS.RobinGreen,
    marginTop: 63,
  },
  timmer: {
    fontSize: 16,
    lineHeight: 36,
    fontFamily: fontFamily.LatoBold,
    color: COLORS.RoyalBlue,
  },
  label: {
    fontSize: 16,
    lineHeight: 36,
    fontFamily: fontFamily.LatoBold,
    color: COLORS.Abbey,
  },
});
export default EnterOtpComponent;
