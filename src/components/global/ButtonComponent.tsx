import React, { FC } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from "react-native";
import COLORS from "../../constants/Colors";
import FontFamily from "../../constants/FontFamily";

interface ButtonProps {
  title: string;
  buttonLoading?: boolean;
  disable?: boolean;
  customStyles?: ViewStyle;
  customTextStyles?: TextStyle;
  onPress: () => void;
}

const ButtonComponent: FC<ButtonProps> = ({
  title,
  onPress,
  buttonLoading = false,
  customStyles,
  customTextStyles,
  disable,
}) => {
  return (
    <TouchableOpacity
      style={[styles.buttonStyle, customStyles]}
      disabled={disable}
      onPress={() => {
        onPress != undefined && !buttonLoading ? onPress() : null;
      }}
    >
      {buttonLoading ? (
        <ActivityIndicator
          color={COLORS.White}
          style={{ width: 70, alignSelf: "center" }}
        />
      ) : (
        <Text style={[styles.buttonText, customTextStyles]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    height: 50,
    justifyContent: "center",
    alignSelf: "center",
    paddingHorizontal: 33,
    backgroundColor: COLORS.RoyalBlue,
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 20,
    lineHeight: 36,
    textAlign: "center",
    fontFamily: FontFamily.LatoBold,
    color: COLORS.White,
  },
});

export default ButtonComponent;
