import React, { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PanCardIcon from "../../../../assets/vectors/PanCardIcon";
import ButtonComponent from "../../../../components/global/ButtonComponent";
import Icon, { IconProp } from "../../../../components/global/Icon";
import COLORS from "../../../../constants/Colors";
import fontFamily from "../../../../constants/FontFamily";
import { spacing } from "../../../../constants/Spacing";

interface BoxProps {
  label: string;
  iconName:IconProp;
}

const AddressProofCardComponent: FC<BoxProps> = ({ label,iconName }) => {
  return (
    <View>
      <View style={styles.box}>
        <Icon icon={iconName} />
        <Text>{label}</Text>
      </View>

      <ButtonComponent
        customStyles={styles.button}
        title={"Upload"}
        onPress={() => {}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.RobinGreen,
    borderColor: COLORS.RoyalBlue,
    borderWidth: 1,
  },
  box: {
    height: 110,
    width: 148,
    backgroundColor: COLORS.White,
    borderColor: COLORS.RoyalBlue,
    borderWidth: 1,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
    marginVertical: spacing.xss,
    marginRight:spacing.mm
    
  },
});
export default AddressProofCardComponent;
