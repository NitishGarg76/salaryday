import React, { FC } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import OtpInputs from "react-native-otp-inputs";
import COLORS from "../../../../constants/Colors";
import { spacing } from "../../../../constants/Spacing";
interface OTPProps {
  onChange: (code: string) => void;
  errorMsg?: string;
  numberOfInputs?: number;
}

const OtpInputField: FC<OTPProps> = ({
  onChange,
  errorMsg,
  numberOfInputs,
}) => {
  return (
    <View
      style={{
        marginTop: spacing.xxxxl,
        marginHorizontal: 10,
        width: "100%"
      }}
    >
      <OtpInputs

        autofillFromClipboard={false}
        autoFocus
        handleChange={(code) => onChange(code)}
        numberOfInputs={numberOfInputs ? numberOfInputs : 4}
        inputContainerStyles={styles.inputContainerStyle}
        inputStyles={styles.inputStyle}
      />
      <Text style={{ marginTop: "30%", color: COLORS.Red }}>{errorMsg}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainerStyle: {
    height: 41,
    width: 60,

  },
  inputStyle: {
    color: COLORS.Black,
    backgroundColor: COLORS.White,
    textAlign: "center",
    height: "150%",
    width: "65%",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: Platform.OS == "ios" ? 2 : 10,
  },
});

export default OtpInputField;
