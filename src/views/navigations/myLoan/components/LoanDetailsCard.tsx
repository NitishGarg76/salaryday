import React, { FC } from "react";
import { Text, View, StyleSheet, ViewStyle } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import COLORS from "../../../../constants/Colors";
import fontFamily from "../../../../constants/FontFamily";
import { spacing } from "../../../../constants/Spacing";
import ForwardArrow from "../../../../assets/vectors/ForwardArrow";
import Icon from "../../../../components/global/Icon";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface LoanCardProps {
  days: number;
  customStyles?: ViewStyle;
  primaryColor: string;
  secondaryColor: string;
  loanAmount: number;
  inHandAmount: number;
  startDate?: string;
  endDate?: string;
  paidOn?: string;
}

const LoanDetailsCard: FC<LoanCardProps> = ({
  days,
  primaryColor,
  secondaryColor,
  loanAmount,
  inHandAmount,
  startDate,
  endDate,
  paidOn,
}) => {
  const navigation = useNavigation();

  return (
    <View>
      <View style={{ marginBottom: spacing.m }}>
        <View style={styles.closedLoanBox}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={[primaryColor, secondaryColor]}
            style={styles.gradient}
          >
            <Text style={styles.daysPlan}>{days} Days Tenure Plan</Text>
            {/* <TouchableOpacity
              onPress={() => {
                navigation.navigate("LoanDetails");
              }}
            >
              <Icon icon={ForwardArrow} fill={"transparent"} />
            </TouchableOpacity> */}
          </LinearGradient>
          <View style={styles.loanCardInfoRow}>
            <View style={styles.loanInfoSection}>
              <Text style={styles.infoText}>Loan amount</Text>
              <Text style={styles.infoText}>₹{loanAmount}</Text>
            </View>
            <View
              style={[
                styles.loanInfoSection,
                {
                  borderLeftColor: COLORS.DustyGrey,
                  borderLeftWidth: 1,
                },
              ]}
            >
              <Text style={styles.infoText}>In hand amount</Text>
              <Text style={styles.infoText}>₹{inHandAmount}</Text>
            </View>
          </View>
          <View
            style={[
              styles.loanCardInfoRow,
              {
                borderTopColor: COLORS.RegentGray,
                borderTopWidth: 1,
              },
            ]}
          >
            <View style={styles.loanInfoSection}>
              <Text style={styles.infoText}>Start Date</Text>
              <Text style={styles.infoText}>{startDate?.toString()}</Text>
            </View>
            <View
              style={[
                styles.loanInfoSection,
                {
                  borderLeftColor: COLORS.DustyGrey,
                  borderLeftWidth: 1,
                },
              ]}
            >
              <Text style={styles.infoText}>End Date</Text>
              <Text style={styles.infoText}>{endDate?.toString()}</Text>
            </View>
          </View>
          <View
            style={[
              styles.loanCardInfoRow,
              {
                borderTopColor: COLORS.RegentGray,
                borderTopWidth: 1,
              },
            ]}
          >
            <View style={styles.loanInfoSection}>
              <Text style={styles.infoText}>Paid on</Text>
            </View>
            <View
              style={[
                styles.loanInfoSection,
                {
                  borderLeftColor: COLORS.DustyGrey,
                  borderLeftWidth: 1,
                },
              ]}
            >
              <Text style={styles.infoText}>{paidOn}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  closedLoanBox: {
    backgroundColor: COLORS.White,
    borderRadius: 15,
    elevation: 6,
  },
  gradient: {
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    paddingVertical: spacing.sxs,
    paddingHorizontal: spacing.xs,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  daysPlan: {
    fontSize: 18,
    color: COLORS.White,
    fontFamily: fontFamily.LatoBold,
  },
  loanCardInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  loanInfoSection: {
    alignItems: "center",
    paddingHorizontal: spacing.sxs,
    paddingVertical: spacing.sxs,
    width: "50%",
  },
  infoText: {
    fontSize: 16,
    fontFamily: fontFamily.LatoMedium,
    lineHeight: 24,
    color: COLORS.Black,
  },
});
export default LoanDetailsCard;
