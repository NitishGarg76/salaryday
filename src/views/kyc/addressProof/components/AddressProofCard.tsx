import React, { FC } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import KycUserIcon from "../../../../assets/vectors/KycUserIcon";
import PanCardIcon from "../../../../assets/vectors/PanCardIcon";
import ButtonComponent from "../../../../components/global/ButtonComponent";
import Icon, { IconProp } from "../../../../components/global/Icon";
import COLORS from "../../../../constants/Colors";
import fontFamily from "../../../../constants/FontFamily";
import { spacing } from "../../../../constants/Spacing";

interface BoxProps {
  label: string;
  iconName: IconProp;
  loader: boolean;
  onUpload: () => void;
  imageURL:string |undefined;
}

const AddressProofCard: FC<BoxProps> = ({
  label,
  iconName,
  onUpload,
  loader,
  imageURL
}) => {
  return (
    <View>
      <View style={styles.box}>
      {imageURL ? (
                    <Image
                      source={{ uri:imageURL }}
                      style={styles.image}
                    />
                  ) : (
                    <Icon icon={iconName} />
                  )}
        {/* <Icon icon={iconName} /> */}
       {!imageURL&& <Text>{label}</Text>}
      </View>

      <ButtonComponent
        customStyles={styles.button}
        title={"Upload"}
        buttonLoading={loader}
        onPress={() => onUpload()}
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
    marginRight: spacing.mm,
  },
  image: {
    height: 110,
    width: 148,
    borderRadius: 15
  },
});
export default AddressProofCard;
