import React, { FC } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import ButtonComponent from "../../../components/global/ButtonComponent";
import COLORS from "../../../constants/Colors";
import fontFamily from "../../../constants/FontFamily";
import { spacing } from "../../../constants/Spacing";

interface ModalProps {
  isGrouped: boolean;
  onConfirm: () => void;
  onDismiss: () => void;
  dataMap: any;
  onPressRadioButton: (val: any) => void;
  header: string;
  hideOnPress: () => void;
  isVisible: boolean;
  greenButtonLabel?: string;
  blueButtonLabel?: string;
  selectedValue: string;
}
const ReferenceModal: FC<ModalProps> = ({
  isGrouped,
  onConfirm,
  onDismiss,
  dataMap,
  onPressRadioButton,
  selectedValue,
  header,
  hideOnPress,
  isVisible,
  greenButtonLabel,
  blueButtonLabel,
}) => {
  return (
    <Modal visible={isVisible} transparent={true}>
      <Pressable
        style={mainStyles.box}
        onPress={() => {
          hideOnPress();
        }}
      >
        <TouchableOpacity style={mainStyles.container}>
          <Text style={mainStyles.text}>{header}</Text>
          {dataMap?.map((item: any, index: number) => {
            return (
              <TouchableOpacity
              style={{width:"100%",paddingLeft:spacing.m}}
                onPress={() => {
                  onPressRadioButton(item);
                }}
              >
                <ModalradioButton
                  radioColor={item == selectedValue ? COLORS.RoyalBlue : ""}
                  key={index}
                  label={item}
                  onPress={() => {
                    onPressRadioButton(item);
                  }}
                />
              </TouchableOpacity>
            );
          })}

          <View style={{ flexDirection: "row" }}>
            {isGrouped && (
              <ButtonComponent
                buttonLoading={false}
                title={greenButtonLabel ? greenButtonLabel : "Deny"}
                onPress={() => {
                  onDismiss();
                }}
                customStyles={mainStyles.primaryButton}
              />
            )}
            <ButtonComponent
              buttonLoading={false}
              title={blueButtonLabel ? blueButtonLabel : "Save"}
              onPress={() => {
                onConfirm();
              }}
              customStyles={mainStyles.button}
            />
          </View>
        </TouchableOpacity>
      </Pressable>
    </Modal>
  );
};

const mainStyles = StyleSheet.create({
  text: {
    fontFamily: fontFamily.LatoBold,
    fontSize: 24,
    lineHeight: 24,
    color: COLORS.RoyalBlue,
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
    width: "80%",
    borderRadius: 15,
    alignItems: "center",
    paddingTop: spacing.l,
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
export default ReferenceModal;

interface modalProps {
  label: string;
  onPress: () => void;
  radioColor?: string;
}

export const ModalradioButton: FC<modalProps> = ({
  label,
  onPress,
  radioColor,
}) => {
  return (
    <View style={componentStyle.box}>
      <TouchableOpacity
        onPress={() => {
          onPress();
        }}
        style={[
          componentStyle.radio,
          { backgroundColor: radioColor ? radioColor : COLORS.White },
        ]}
      />
      <Text style={componentStyle.label}>{label}</Text>
    </View>
  );
};
const componentStyle = StyleSheet.create({
  box: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.DustyGrey,
    paddingBottom: spacing.sxs,
    marginTop: spacing.s,
    paddingLeft: spacing.sxs,
  },
  radio: {
    height: 20,
    width: 20,
    borderRadius: 50,
    borderColor: COLORS.RoyalBlue,
    borderWidth: 1,
    marginRight: spacing.sxs,
  },
  label: {
    fontSize: 18,
    lineHeight: 24,
    fontFamily: fontFamily.LatoRegular,
    color: COLORS.Black,
  },
});
