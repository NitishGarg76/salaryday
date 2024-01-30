import React, { FC } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import COLORS from "../../constants/Colors";
import fontFamily from "../../constants/FontFamily";
import { spacing } from "../../constants/Spacing";
import ButtonComponent from "./ButtonComponent";
import Icon, { IconProp } from "./Icon";

interface Props {
  iconName: IconProp;
  documentName: string;
  heading: string;
  subHeading: string;
  onPress: () => void;
  imageURL?: string;
  format?: string;
}

const UploadDocument: FC<Props> = ({
  iconName,
  documentName,
  heading,
  subHeading,
  imageURL,
  onPress,
  format,
}) => {
  return (
    <View >
      <Text style={styles.heading}>{heading}</Text>
      <Text style={styles.subHeading}>{subHeading}</Text>
      <View style={styles.row}>
        <View style={styles.box}>
          {imageURL ? (
            <Image source={{ uri: imageURL }} style={styles.box} />
          ) : (
            <Icon icon={iconName} />
          )}
        </View>
        <View
          style={{marginHorizontal:spacing.mm, alignItems: "flex-start" }}
        >
          <Text style={styles.Heading}>{documentName}</Text>
          <Text style={styles.title}>
            {format ? format : "Only pdf, jpg,png format with\nmax size 8MB"}
          </Text>
          <ButtonComponent
            customStyles={styles.button}
            buttonLoading={false}
            title={"Upload"}
            onPress={() => {
              onPress();
            }}
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  heading: {
    marginLeft: spacing.m,
    fontSize: 24,
    lineHeight: 30,
    color: COLORS.RoyalBlue,
    fontFamily: fontFamily.LatoBold,
  },
  subHeading: {
    marginLeft: spacing.m,
    fontSize: 18,
    lineHeight: 24,
    color: COLORS.RobinGreen,
    fontFamily: fontFamily.LatoSemiBold,
    marginBottom: spacing.xl,
    marginTop: spacing.xs,
  },
  button: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.RobinGreen,
    borderColor: COLORS.RoyalBlue,
    borderWidth: 1,
  },
  row: {
    flexDirection: "row",
   marginLeft:spacing.m,
    marginTop: spacing.sxs,
    alignSelf: "center",
  },
  box: {
    height: 110,
    width: 148,
    backgroundColor: COLORS.White,
    borderColor: COLORS.RoyalBlue,
    borderWidth: 1,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  Heading: {
    color: COLORS.RoyalBlue,
    lineHeight: 24,
    fontFamily: fontFamily.LatoMedium,
  },
  title: {
    lineHeight: 18,
    color: COLORS.Black,
    fontSize: 12,
    fontFamily: fontFamily.LatoItalic,
    marginBottom: spacing.xxss,
  },
});
export default UploadDocument;
