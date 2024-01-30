import React, { FC } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import COLORS from "../../../constants/Colors";
import { spacing } from "../../../constants/Spacing";
interface SelectDateProps {
  data?: JSX.Element[];
}
const SelectDate: FC<SelectDateProps> = ({ data }) => {
  return (
    <View style={styles.container}>
      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity onPress={() => {}}>
          <View style={{ alignItems: "center" }}>
            <View style={styles.box}>{data}</View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.White,
    elevation: 10,
    height: 73,
    marginRight: spacing.s,
    marginVertical: spacing.sxs,
  },
  box: {
    backgroundColor: COLORS.Gallery,
    width: "100%",
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.sxs,
  },
});
export default SelectDate;
