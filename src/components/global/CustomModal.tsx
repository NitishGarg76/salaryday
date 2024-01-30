import React, { FC } from "react";
import { ColorValue } from "react-native";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import COLORS from "../../constants/Colors";
import fontFamily from "../../constants/FontFamily";
import { spacing } from "../../constants/Spacing";
import ButtonComponent from "./ButtonComponent";
import Icon, { IconProp } from "./Icon";

interface ModalProps {
  primaryText?: string;
  title?: string;
  linkText?: string;
  secondaryText?: string;
  iconName?: IconProp;
  isButtonGroup?: boolean;
  isVisible: boolean;
  hideOnPress: () => void;
  onConfirm: () => void;
  onDismiss: () => void;
  buttonLoader?: boolean;
  buttonLable?: string;
  denyLabel?: string;
  denyButtonLoader?: boolean;
  denyColor?: ColorValue | undefined;
  onPressLink?: () => void;
  salariedButton?: () => void;
  showSalariedButton?: boolean;
  salariedButtonLabel?: string;
  confirmColor?: ColorValue | undefined;
  salariedLoader?: boolean;
}
const CustomModal: FC<ModalProps> = ({
  title,
  primaryText,
  linkText,
  secondaryText,
  iconName,
  isButtonGroup,
  isVisible,
  hideOnPress,
  onConfirm,
  onDismiss,
  buttonLoader,
  buttonLable,
  denyLabel,
  denyColor,
  onPressLink,
  denyButtonLoader,
  salariedButton,
  showSalariedButton,
  salariedButtonLabel,
  confirmColor,
  salariedLoader,
}) => {
  return (
    <Modal visible={isVisible} transparent={true}>
      <Pressable
        style={styles.box}
        onPress={() => {
          hideOnPress();
        }}
      >
        <TouchableOpacity style={styles.container}>
          <Icon style={{ marginHorizontal: spacing.xxxxl }} icon={iconName} />
          <Text style={styles.label}>
            {primaryText}
            <Text onPress={() => onPressLink()} style={styles.linkText}>
              {linkText}
            </Text>
            {secondaryText}
          </Text>
          <View style={{ flexDirection: "row" }}>
            {isButtonGroup && (
              <ButtonComponent
                buttonLoading={denyButtonLoader ? denyButtonLoader : false}
                title={denyLabel ? denyLabel : "Deny"}
                onPress={() => {
                  onDismiss();
                }}
                customStyles={{
                  backgroundColor: denyColor ? denyColor : COLORS.RobinGreen,
                  paddingHorizontal: spacing.l,
                  marginVertical: spacing.m,
                  marginHorizontal: spacing.s,
                }}
              />
            )}
            <ButtonComponent
              buttonLoading={buttonLoader ? buttonLoader : false}
              title={buttonLable ? buttonLable : "Allow"}
              onPress={() => {
                onConfirm();
              }}
              customStyles={{
                backgroundColor: confirmColor ? confirmColor : COLORS.RoyalBlue,
                paddingHorizontal: spacing.l,
                marginVertical: spacing.m,
                marginHorizontal: spacing.s,
              }}
            />
          </View>
          {showSalariedButton && (
            <ButtonComponent
              buttonLoading={salariedLoader}
              title={salariedButtonLabel ?? ""}
              onPress={() => {
                salariedButton();
              }}
              customStyles={{
                backgroundColor: COLORS.Grey,
                paddingHorizontal: spacing.l,
                marginBottom: spacing.m,
                marginHorizontal: spacing.s,
              }}
            />
          )}
        </TouchableOpacity>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  linkText: {
    fontSize: 18,
    lineHeight: 24,
    color: COLORS.RoyalBlue,
    fontFamily: fontFamily.LatoBold,
  },
  box: {
    backgroundColor: COLORS.Black + "85",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    backgroundColor: COLORS.White,
    margin: 30,
    borderRadius: 15,
    alignItems: "center",
    paddingTop: spacing.l,
  },
  label: {
    fontSize: 18,
    lineHeight: 24,
    color: COLORS.Black,
    fontFamily: fontFamily.LatoBold,
    textAlign: "center",
    marginVertical: spacing.mm,
    marginHorizontal: spacing.m,
  },
  button: {
    paddingHorizontal: spacing.l,
    marginVertical: spacing.m,
    marginHorizontal: spacing.s,
  },
  primaryButton: {
    backgroundColor: COLORS.RobinGreen,
    paddingHorizontal: spacing.l,
    marginVertical: spacing.m,
    marginHorizontal: spacing.s,
  },
});
export default CustomModal;
