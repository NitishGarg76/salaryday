import React, { FC, useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from "react-native";
import AdhaarCross from "../../assets/vectors/AdhaarCross";
import DownArrow from "../../assets/vectors/DownArrow";
import COLORS from "../../constants/Colors";
import fontFamily from "../../constants/FontFamily";
import STRINGS from "../../constants/locale";
import { spacing } from "../../constants/Spacing";
import OtpInputField from "../../views/authentication/verifyOtp/Components/OtpInputField";
import ButtonComponent from "./ButtonComponent";
import Icon from "./Icon";

interface componentProps {
  isVisible: boolean;
  hideOnPress: () => void;
  buttonLoader?: boolean;
  buttonLable?: string;
  errorMsg: string;
  onPressResend: () => void;
  onPressVerify: () => void;
  setValue: (val: any) => void;
  userMobileNumber: any;
  onCross: () => void;

}

const VerifyAadharOTPComponent: FC<componentProps> = ({ ...props }) => {

  return (
    <Modal visible={props.isVisible} transparent={true}>
      <Pressable
        style={styles.modalBox}
        onPress={() => {
          props.hideOnPress();
        }}
      >
        <TouchableOpacity style={styles.container}>
          <TouchableOpacity onPress={props.onCross}>       
             <Icon style={{ position: "absolute", right: 20, top: 10 }} icon={AdhaarCross} />
          </TouchableOpacity>

          <View style={{ alignSelf: "center", marginTop: spacing.xxl }}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: fontFamily.LatoRegular,
                color: COLORS.RoyalBlue,
              }}
            >
              Aadhar Verification
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: fontFamily.LatoBold,
                lineHeight: 15,
                color: COLORS.DustyGrey,
              }}
            >
              Enter the OTP You received to
            </Text>
            <Text
              style={{ fontSize: 15, lineHeight: 30, color: COLORS.RoyalBlue }}
            >
              {props.userMobileNumber}
            </Text>
          </View>
          <OtpInputField
            numberOfInputs={6}
            errorMsg={props.errorMsg}
            onChange={(code) => {
              props.setValue(code);
            }}
          />
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "flex-end",
              marginRight: spacing.xxll,
            }}
            onPress={() => {
              props.onPressResend();
            }}
          >
            <Text style={styles.text}>{STRINGS.EnterOtpComponent.text}</Text>
            <Icon
              icon={DownArrow}
              style={{
                marginTop: spacing.xxxl,
                transform: [{ rotate: "-90deg" }],
                marginLeft: spacing.sxs,
              }}
              fill={COLORS.RobinGreen}
            />
          </TouchableOpacity>
          <ButtonComponent
            buttonLoading={props.buttonLoader}
            title={STRINGS.EnterOtpComponent.buttonTitle}
            onPress={() => {
              props.onPressVerify();
            }}
            customStyles={{
              paddingHorizontal: spacing.ll,
              marginTop: spacing.m,
            }}
          />
        </TouchableOpacity>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  label: {
    marginLeft: spacing.m,
    fontSize: 16,
    lineHeight: 36,
    fontFamily: fontFamily.LatoBold,
    color: COLORS.Abbey,
    marginTop: spacing.s,
  },
  modalBox: {
    backgroundColor: COLORS.Black + "85",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    backgroundColor: COLORS.White,
    borderRadius: 15,
    height: 450,
    width: "95%",
  },
  text: {
    fontSize: 15,
    lineHeight: 30,
    fontFamily: fontFamily.LatoRegular,
    color: COLORS.RobinGreen,
    marginTop: spacing.xxxl,
  },
});

export default VerifyAadharOTPComponent;
