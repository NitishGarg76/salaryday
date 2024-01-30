import React, { FC, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import ArrowRight from "../../../assets/vectors/ArrowRight";
import ButtonComponent from "../../../components/global/ButtonComponent";
import Icon from "../../../components/global/Icon";
import COLORS from "../../../constants/Colors";
import fontFamily from "../../../constants/FontFamily";
import STRINGS from "../../../constants/locale";
import { spacing } from "../../../constants/Spacing";
import { loanPlansColor, numberWithCommas } from "../../../utils";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";

interface loanViewProps {
  loanAmount: number;
  inHandAmount: number;
  cln: number;
  loanId: number;
  currentDueAmount: number;
  onPayCurrentDueAmount: () => void;
  colorLoanTenure: number;
  planTenure: number;
  loanInstallments: Array<string | number | object | any>
}

const LoanView: FC<loanViewProps> = ({
  loanAmount,
  inHandAmount,
  cln,
  loanId,
  currentDueAmount,
  onPayCurrentDueAmount,
  colorLoanTenure,
  planTenure,
  loanInstallments
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <>
      <ScrollView style={styles.scrollStyle} bounces={false} showsVerticalScrollIndicator={false}>
        <View
          style={{ paddingHorizontal: spacing.m, paddingBottom: spacing.m }}
        >
          <View>
            <Text style={styles.activeLoanTitle}>
              {STRINGS.loanDetails.activeLoan}
            </Text>
          </View>
          <View style={styles.activeLoanContent}>
            <View style={{ width: "60%" }}>
              <Text style={styles.loantitle}>{STRINGS.loanDetails.amount}</Text>
              <Text style={styles.loanAmountStyle}>
                ₹{loanAmount ?? "---"}
              </Text>
            </View>
            <View style={{ width: "40%" }}>
              <Text style={styles.loantitle}>{STRINGS.loanDetails.inHand}</Text>
              <Text style={styles.loanAmountStyle}>
                ₹{inHandAmount ?? "---"}
              </Text>
            </View>
          </View>
          <View style={styles.activeLoanContent}>
            <View style={{ width: "60%" }}>
              <Text style={styles.loantitle}>{STRINGS.loanDetails.cln}</Text>
              <Text style={styles.loanAmountStyle}>
                {cln ?? "---"}
              </Text>
            </View>
            <View style={{ width: "40%" }}>
              <Text style={styles.loantitle}>{STRINGS.loanDetails.loanId}</Text>
              <Text style={styles.loanAmountStyle}>{loanId ?? "---"}</Text>
            </View>
          </View>
          <View>
            <View style={styles.currentDueBox}>
              <View>
                <Text style={styles.currentDueTxt}>
                  {STRINGS.loanDetails.currentDue}
                </Text>
                <Text style={styles.currentDueAmountStyle}>₹{currentDueAmount}</Text>
              </View>
              <View>
                <ButtonComponent
                  title="Pay Now"
                  onPress={() => onPayCurrentDueAmount()}
                />
              </View>
            </View>
            <View>
              <Text style={styles.loadContentPara}>
                {STRINGS.loanDetails.alreadyMade}
              </Text>
              <TouchableOpacity onPress={() => setShowModal(true)}>
                <Text style={styles.raiseAdispute}>
                  {STRINGS.loanDetails.raise}
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <LinearGradient
                colors={[
                  loanPlansColor[colorLoanTenure]?.primaryColor ??
                    "red",
                  loanPlansColor[colorLoanTenure]?.secondaryColor ??
                    "red",
                ]}
                style={styles.gradientBox}
              >
                <View style={{ paddingVertical: spacing.xxs }}>
                  <Text style={styles.daysTitle}>
                    {planTenure}
                    {STRINGS.loanDetails.daysTenure}
                  </Text>
                </View>
              </LinearGradient>
              {loanInstallments?.map((item: any, index: number) => {
                return (
                  <View key={index}>
                    <Collapse style={styles.emiButton}>
                      <CollapseHeader>
                        <View style={styles.emiBox}>
                          <View style={styles.emiHeader}>
                            <Icon icon={ArrowRight} />
                            <Text style={styles.emiText}>
                              {item?.installment_number} EMI
                            </Text>
                          </View>
                          <View>
                            {item?.is_paid === 0 ? (
                              <Text style={styles.due}>DUE</Text>
                            ) : (
                              <Text style={styles.paid}>PAID</Text>
                            )}
                          </View>
                        </View>
                      </CollapseHeader>
                      <CollapseBody style={styles.headerBorder}>
                        <View>
                          <View style={styles.bodyView}>
                            <Text style={styles.amountText}>EMI Amount</Text>
                            <Text style={styles.amount}>
                              ₹{numberWithCommas(item?.due_amount)}
                            </Text>
                          </View>
                          <View style={styles.installmentsDate}>
                            {item?.is_paid === 0 ? (
                              <>
                                <Text style={styles.paidText}>Due On</Text>
                                <Text style={styles.dateText}>
                                  {item?.installment_due_date}
                                </Text>
                                {/* installment due date */}
                              </>
                            ) : (
                              <>
                                <Text style={styles.paidText}>Paid On</Text>
                                <Text style={styles.dateText}>
                                  {item?.paid_date ?? "---"}
                                </Text>
                                {/* paid_date */}
                              </>
                            )}
                          </View>
                        </View>
                      </CollapseBody>
                    </Collapse>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollStyle: {
    flex: 1,
    height: "70%",
    backgroundColor: COLORS.Polar,
    paddingLeft: spacing.m,
    paddingRight: spacing.m,
    paddingTop: spacing.m,
  },
  raiseAdispute: { color: COLORS.RoyalBlue, textDecorationLine: "underline" },
  due: {
    color: COLORS.Orange,
    paddingRight: spacing.m,
  },
  paid: {
    color: COLORS.Green,
    paddingRight: spacing.m,
  },
  amount: {
    color: COLORS.Black,
    fontSize: 10,
    fontFamily: fontFamily.LatoRegular,
  },
  amountText: {
    color: COLORS.Black,
    fontSize: 12,
    fontFamily: fontFamily.LatoRegular,
  },
  dateText: {
    color: COLORS.Black,
    fontSize: 10,
    fontFamily: fontFamily.LatoRegular,
  },
  paidText: {
    color: COLORS.Black,
    fontSize: 12,
    fontFamily: fontFamily.LatoRegular,
  },
  installmentsDate: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: spacing.m,
    marginVertical: spacing.xss,
  },
  bodyView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: spacing.m,
    marginVertical: spacing.xss,
  },
  activeLoanTitle: {
    fontSize: 24,
    color: COLORS.RoyalBlue,
    fontFamily: fontFamily.LatoBold,
    marginTop: spacing.sms,
  },
  activeLoanContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing.s,
  },
  loantitle: {
    fontSize: 16,
    fontFamily: fontFamily.LatoMedium,
    color: COLORS.RobinGreen,
    lineHeight: 24,
  },
  loanAmountStyle: {
    fontSize: 14,
    fontFamily: fontFamily.LatoMedium,
    color: COLORS.Black,
    lineHeight: 24,
  },
  daysTitle: {
    color: COLORS.White,
    fontSize: 18,
    fontFamily: fontFamily.LatoBold,
    lineHeight: 30,
    textAlign: "center",
  },
  currentDueBox: {
    backgroundColor: COLORS.RobinGreen,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.RoyalBlue,
    borderRadius: 15,
    marginTop: spacing.xl,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.sxs,
    paddingVertical: spacing.sms,
    flex: 1,
  },
  currentDueTxt: {
    color: COLORS.White,
    fontSize: 16,
    fontFamily: fontFamily.LatoBold,
  },
  currentDueAmountStyle: {
    fontSize: 16,
    fontFamily: fontFamily.LatoBold,
    color: COLORS.White,
  },
  loadContentPara: {
    marginTop: spacing.xl,
    lineHeight: 24,
    fontSize: 16,
    fontFamily: fontFamily.LatoMedium,
    color: COLORS.Black,
  },
  gradientBox: {
    marginTop: 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.White,
  },
  emiButton: {
    marginTop: spacing.m,
    backgroundColor: COLORS.White,
    borderRadius: 15,
    borderLeftColor: COLORS.RoyalBlue,
    borderLeftWidth: 2,
  },
  emiHeader: {
    flexDirection: "row",
    paddingTop: spacing.xs,
    paddingBottom: spacing.sxs,
    paddingLeft: spacing.m,
  },
  emiText: {
    marginLeft: spacing.sxs,
    fontSize: 14,
    color: COLORS.Black,
    fontFamily: fontFamily.LatoMedium,
  },
  emiBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerBorder: {
    borderTopWidth: 1,
    borderTopColor: COLORS.RegentGray,
  },
});

export default LoanView;
