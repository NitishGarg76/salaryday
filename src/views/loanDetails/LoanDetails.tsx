import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
  Linking,
} from "react-native";
import Icon from "../../components/global/Icon";
import Back from "../../assets/vectors/Back";
import { spacing } from "../../constants/Spacing";
import fontFamily from "../../constants/FontFamily";
import STRINGS from "../../constants/locale";
import ButtonComponent from "../../components/global/ButtonComponent";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";
import LinearGradient from "react-native-linear-gradient";
import COLORS from "../../constants/Colors";
import ArrowRight from "../../assets/vectors/ArrowRight";
import { SafeAreaView } from "react-native-safe-area-context";
import { userLoanDetails } from "../../services/api-services/api";
import { getAuthToken } from "../../services/redux/selector/selector";
import { useDispatch, useSelector } from "react-redux";
import { loanPlansColor, numberWithCommas } from "../../utils";
import Loader from "../../components/global/FullScreenLoader";
import { useNavigation } from "@react-navigation/native";
import CustomerSupport from "../../assets/vectors/CustomerSupport";
import CustomModal from "../../components/global/CustomModal";
import { setUserLoanDetailsAction } from "../../services/redux/action/actions";

const LoanDetails = (props: any) => {
  const navigation = useNavigation();
  const token = useSelector(getAuthToken);
  const id = props?.route?.params?.id;
  const [loanData, setLoanData] = useState<any>({});
  const [loader, setLoader] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState<boolean>(false);

  const fetchLoanDetails = async () => {
    setLoader(true);
    const response = await userLoanDetails(token, id);
    if (response.data.success) {
      setLoanData(response.data.response.loan);
      console.log(response.data.response.loan.user.payment_link_url, "fetchLoanDetails") 
      dispatch(setUserLoanDetailsAction(response.data.response.loan))
      setLoader(false);
    } else {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchLoanDetails();
  }, []);

  const onGoBack = () => {
    navigation.goBack();
  };

  function onPayCurrentAmount() {
    if (loanData.user.status === 12) {
      navigation.navigate("CustomWebView" as any, {
        link: loanData.user.payment_link_url, //TODO payment link key should be added (user.payment_link_url)
      });
    }
  }

  function onRaise_a_dispute() {
    let gmail = "";
    Platform.OS === "ios"
      ? (gmail = `mailto:Support@SalaryDay.in?subject=SendMail&body=Description`)
      : (gmail = `mailto:Support@SalaryDay.in?subject=SendMail&body=Description`);
    Linking.openURL(gmail);
  }

  return (
    <SafeAreaView
      edges={["right", "left", "top", "bottom"]}
      style={styles.container}
    >
      <TouchableOpacity onPress={() => onGoBack()}>
        <View style={styles.iconContainer}>
          <Icon icon={Back} />
        </View>
      </TouchableOpacity>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
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
              <Text style={styles.loanAmount}>
                ₹{loanData?.loan_amount ?? "---"}
              </Text>
            </View>
            <View style={{ width: "40%" }}>
              <Text style={styles.loantitle}>{STRINGS.loanDetails.inHand}</Text>
              <Text style={styles.loanAmount}>
                ₹{loanData?.in_hand_amount ?? "---"}
              </Text>
            </View>
          </View>
          <View style={styles.activeLoanContent}>
            <View style={{ width: "60%" }}>
              <Text style={styles.loantitle}>{STRINGS.loanDetails.cln}</Text>
              <Text style={styles.loanAmount}>
                {loanData?.user?.cln ?? "---"}
              </Text>
            </View>
            <View style={{ width: "40%" }}>
              <Text style={styles.loantitle}>{STRINGS.loanDetails.loanId}</Text>
              <Text style={styles.loanAmount}>{loanData?.id ?? "---"}</Text>
            </View>
          </View>
          <View>
            <View style={styles.currentDueBox}>
              <View>
                <Text style={styles.currentDueTxt}>
                  {STRINGS.loanDetails.currentDue}
                </Text>
                <Text style={styles.currentDueAmount}>₹15,000</Text>
              </View>
              <View>
                <ButtonComponent
                  title="Pay Now"
                  onPress={() => onPayCurrentAmount()}
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
                  loanPlansColor[loanData?.plan?.plan_tenure]?.primaryColor ??
                    "red",
                  loanPlansColor[loanData?.plan?.plan_tenure]?.secondaryColor ??
                    "red",
                ]}
                style={styles.gradientBox}
              >
                <View style={{ paddingVertical: spacing.xxs }}>
                  <Text style={styles.daysTitle}>
                    {loanData?.plan?.plan_tenure}
                    {STRINGS.loanDetails.daysTenure}
                  </Text>
                </View>
              </LinearGradient>
              {loanData?.loan_installments?.map((item: any, index: number) => {
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
      {loader && <Loader isVisible={loader} />}
      <CustomModal
        buttonLoader={false}
        hideOnPress={() => {
          setShowModal(false);
        }}
        onConfirm={() => {
          setShowModal(false);
          onRaise_a_dispute()
        }}
        onDismiss={() => {}}
        buttonLable={"Okay"}
        primaryText={"Please write to Customer Support at"}
        linkText={"\nSupport@SalaryDay.in"}
        iconName={CustomerSupport}
        isVisible={showModal}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: COLORS.Polar,
  },
  raiseAdispute: { color: COLORS.RoyalBlue, textDecorationLine: "underline" },
  iconContainer: {
    paddingLeft: spacing.m,
    marginTop: spacing.sxs,
  },
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
  loanAmount: {
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
  currentDueAmount: {
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

export default LoanDetails;
