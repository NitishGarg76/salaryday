import React, { FC } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import RightClickSign from "../../../assets/vectors/RightClickSign";
import UserIcon from "../../../assets/vectors/UserIcon";
import Icon from "../../../components/global/Icon";
import COLORS from "../../../constants/Colors";
import fontFamily from "../../../constants/FontFamily";
import { spacing } from "../../../constants/Spacing";
interface componentprops {
  name: string;
  number: string;
  onPress: () => void;
  isSelected?: boolean;
}

const ContactListUserCard: FC<componentprops> = ({
  name,
  number,
  onPress,
  isSelected,
}) => {
  return (
    <TouchableOpacity onPress={() => onPress()} style={styles.box}>
      <View style={styles.card}>
        <Icon icon={UserIcon} />
      </View>

      <View style={{ marginLeft: spacing.m }}>
        <Text style={styles.label}>{name}</Text>
        <Text style={styles.title}>{number}</Text>
      </View>
      {isSelected && (
        <Icon
          style={{
            position: "absolute",
            left: 35,
            bottom: 12,
          }}
          icon={RightClickSign}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  box: {
    flexDirection: "row",
    marginTop: spacing.s,
    paddingBottom: spacing.xs,
    marginHorizontal: spacing.m,
    borderBottomColor: COLORS.DustyGrey,
    borderBottomWidth: 1,
  },
  card: {
    height: 50,
    width: 50,
    backgroundColor: COLORS.White,
    borderRadius: 50,
    borderColor: COLORS.RoyalBlue,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontFamily: fontFamily.LatoSemiBold,
    color: COLORS.RoyalBlue,
  },
  title: {
    fontSize: 12,
    fontFamily: fontFamily.LatoMedium,
    color: COLORS.Black,
  },
});

export default ContactListUserCard;
