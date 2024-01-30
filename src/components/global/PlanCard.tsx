import React, { FC, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import COLORS from "../../constants/Colors";
import fontFamily from "../../constants/FontFamily";

interface PlanCardProps {
  days: number;
  minSalary: number;
  numOfEmi: number;
  customStyles?: ViewStyle;
  showButton?: boolean;
  primaryColor: any;
  secondaryColor: any;
  onPress?: () => void;
}
const PlanCard: FC<PlanCardProps> = ({
  days,
  minSalary,
  numOfEmi,
  customStyles,
  showButton,
  primaryColor,
  secondaryColor,
  onPress,
}) => {
  return (
    <LinearGradient
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={[primaryColor, secondaryColor]}
      style={[styles.mainCard, customStyles]}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.heading}>{days} Days Tenure</Text>
        {showButton && (
          <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
            <LinearGradient
              colors={[primaryColor, secondaryColor]}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>Select</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.content}>
        <Text style={styles.labelText}>Min. Salary{"\n"}Eligibility</Text>
        <Text style={[styles.valueText, { textAlign: "right" }]}>
          Rs. {minSalary}
          <Text style={{ fontWeight: "400" }}>
            /month{"\n"}(after deductions)
          </Text>
        </Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.labelText}>No. of EMIs</Text>
        <Text style={styles.valueText}>{numOfEmi}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.labelText}>Interest per month</Text>
        <Text style={styles.valueText}>3.0% to 3.5%</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.labelText}>Interest per annum</Text>
        <Text style={styles.valueText}>36% to 42%</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.labelText}>Processing fee</Text>
        <Text style={styles.valueText}>2.5%</Text>
      </View>
      <Text style={styles.addGst}>
        (Additionally, GST @18% will be levied on Processing Fee)
      </Text>
      {/* {showButton && (
        <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
          <LinearGradient
            colors={[primaryColor, secondaryColor]}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>Select</Text>
          </LinearGradient>
        </TouchableOpacity>
      )} */}
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
    alignContent: "center",
    textAlign: "center",
    alignItems: "center",
    flex: 1,
  },
  mainCard: {
    height:"90%",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: COLORS.White,
    paddingHorizontal: 15,
    marginVertical: 30,
    elevation: 4,
    shadowColor: "red",
    shadowOffset: { width: 10, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  heading: {
    fontSize: 18,
    textAlign: "center",
    color: COLORS.White,
    fontFamily: fontFamily.LatoBold,
    marginTop: 20,
    marginBottom: 10,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 22,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
  labelText: {
    color: COLORS.White,
    fontFamily: fontFamily.LatoBold,
    fontSize: 14,
  },
  valueText: {
    color: COLORS.White,
    fontFamily: fontFamily.LatoBold,
    fontSize: 16,
    textAlign: "right",
    marginLeft: 12,
  },
  addGst: {
    textAlign: "center",
    color: COLORS.White,
    fontSize: 10,
    marginTop: 7,
    marginBottom:20,
  },
  buttonContainer: {
    width: 70,
    height: 30,
  },
  buttonGradient: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: COLORS.White,
    borderRadius: 30,
  },
  buttonText: {
    color: COLORS.White,
    fontSize: 14,
    fontFamily: fontFamily.LatoBold,
  },
});
export default PlanCard;
