import React, { FC, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  Linking,
  Platform,
} from "react-native";
import PageWrapper from "../../../components/global/PageWrapper";
import COLORS from "../../../constants/Colors";
import { spacing } from "../../../constants/Spacing";
import Icon from "../../../components/global/Icon";
import fontFamily from "../../../constants/FontFamily";
import MenuIcon from "../../../assets/vectors/MenuIcon";
import LogoIcon from "../../../assets/vectors/LogoIcon";
import ButtonComponent from "../../../components/global/ButtonComponent";
import CongratesImage from "../../../assets/vectors/CongratesImage";
import GreatJobImage from "../../../assets/vectors/GreatJobImage";
import { useNavigation } from "@react-navigation/native";
import {
  setKyCompletedAction,
  setUserLoanDetailsAction,
} from "../../../services/redux/action/actions";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuthToken,
  getLoanID,
  getProfileDetailsSelector,
  getWebViewClose,
} from "../../../services/redux/selector/selector";
import {
  activeUserLoans,
  closedUserLoans,
  getProfileDetails,
  saveContacts,
  saveCustomerSMS,
  userLoanDetails,
} from "../../../services/api-services/api";
import Oops from "../../../assets/vectors/Oops";
import CustomModal from "../../../components/global/CustomModal";
import LinearGradient from "react-native-linear-gradient";
import ArrowRight from "../../../assets/vectors/ArrowRight";
import Back from "../../../assets/vectors/Back";
import CustomerSupport from "../../../assets/vectors/CustomerSupport";
import Loader from "../../../components/global/FullScreenLoader";
import STRINGS from "../../../constants/locale";
import { loanPlansColor, numberWithCommas } from "../../../utils";
import { SafeAreaView } from "react-native-safe-area-context";
import SmsAndroid from "react-native-get-sms-android";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";
import Contacts from "react-native-contacts";
import moment from "moment";
import { PERMISSIONS, request } from "react-native-permissions";
interface HomeTopProps {
  title: string;
  subTitle?: string;
}

export const HomeTopSection: FC<HomeTopProps> = ({ title, subTitle }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.main}>
      <View style={styles.topSection}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Icon icon={MenuIcon} />
        </TouchableOpacity>
        <Icon icon={LogoIcon} style={styles.logo} />
      </View>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
      </View>
    </View>
  );
};

const Home = () => {
  const webViewStatus = useSelector(getWebViewClose);

  const [contactListData, setContactListData] = useState<[]>([]);
  const loanIDValue = useSelector(getLoanID);
  const [smsArray, setSMSArray] = useState<[]>([]);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const token = useSelector(getAuthToken);
  const [userStatus, setUserStatus] = useState<number>(0);
  const [loanData, setLoanData] = useState<any>({});
  const [loader, setLoader] = useState<boolean>(false);
  const [totalDueLoanAmount, setTotalDueLoanAmount] = useState<string>();
  const [activeLoanData, setActiveLoanData] = useState<any>({});
  const [closedLoanData, setClosedLoanData] = useState<any>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [disbursmentStatus, setDisbursmentStatus] = useState<number>();
  const [showPopUp, setShowPopup] = useState<boolean>(false);
  const [paymentLink, setPaymentLink] = useState<string>("");
  const [temporaryBlockedModal, setTemporaryBlockedModal] =
    useState<boolean>(false);
  const [fullyPaidStatus, setFullyPaidStatus] = useState<number>();
  const [errorPopupShowPopup, setErrorPopupShowPopup] =
    useState<boolean>(false);
  const profile_details = useSelector(getProfileDetailsSelector);
  const [userProfileData, setUserProfileData] = useState<
    Record<string, string | undefined>
  >({});
  const [permanentBlockedModal, setPermanentBlockedModal] =
    useState<boolean>(false);

  let { status, mandate_link } = profile_details;
  const getProfileDetailData = async () => {
    const userDetails = await getProfileDetails(token);
    const data = userDetails.data.response.user;
    setFullyPaidStatus(data?.loan_details?.status);
    // console.log("userDetails.data.response++++", typeof(userDetails.data.response.user.loan_details.status))
    setUserStatus(data?.status);
    setDisbursmentStatus(parseInt(data?.loan_details?.disbursement_status));
    data?.status == 15
      ? setTemporaryBlockedModal(true)
      : setTemporaryBlockedModal(false);
    data?.status == 16
      ? setPermanentBlockedModal(true)
      : setPermanentBlockedModal(false);
    setUserProfileData({ loan_id: data.loan_details.id, cln: data.cln });
  };
  const isMandated = status === 10;

  useEffect(() => {
    dispatch(setKyCompletedAction(true));

    gettaestData();
  }, []);
  const gettaestData = async () => {
    const user_act_loan = await activeUserLoans(token);
    console.log("user_act_lr..", user_act_loan);
  };
  const onNavigationGoBack = async () => {
    const response = await getProfileDetails(token);
    if (response.data.response.user.status === 11) {
      setShowPopup(true);
    } else {
      setErrorPopupShowPopup(true);
      console.log("something went wrong");
    }
  };
  const fetchUserLoans = async () => {
    setLoader(true);
    const response = await closedUserLoans(token);
    if (response.data.success) {
      let res = response.data.response.loans;
      console.log("ressopop", res);
      let filterdVal = res.filter((item: any) => {
        // console.log("check status_dis here:", item.disbursement_status, " loan closed:", item.is_loan_closed)
        setPaymentLink(item?.user?.payment_link_url);
        return item.disbursement_status === 1 && item.is_loan_closed === 0;
      });
      let closedFilteredValue = res.filter(
        (item: any) => item.is_loan_closed === 1
      );
      console.log("filterdVal___", filterdVal);
      setActiveLoanData(filterdVal[0]);
      setClosedLoanData(closedFilteredValue);
      setLoader(false);
      fetchLoanDetails(filterdVal[0].id);
    } else {
      setLoader(false);
      console.log("Something went wrong!");
    }
  };
  const fetchLoanDetails = async (userLoan_Id: number) => {
    console.log("userLoan_Id", userLoan_Id);
    setLoader(true);
    const response = await userLoanDetails(token, userLoan_Id);
    // console.log(
    //   "nitish res",
    //   response?.data?.response?.loan?.total_due_amount
    // );

    if (response.data.success) {
      const loan_data = response?.data?.response?.loan;

      const total_due_loan = loan_data?.loan_installments?.filter(
        (item: any) => {
          return item.is_paid == 0;
        }
      );
      setTotalDueLoanAmount(total_due_loan[0]?.total_due_amount);
      console.log(
        "response?wqw...",
        response?.data?.response?.loan?.total_due_amount
      );

      setLoanData(response?.data?.response?.loan);
      console.log(
        response.data.response.loan.user.payment_link_url,
        "fetchLoanDetails"
      );
      dispatch(setUserLoanDetailsAction(response.data.response.loan));
      setLoader(false);
    } else {
      console.log("try with test", response.data);
      setLoader(false);
    }
  };
  useEffect(() => {
    getProfileDetailData();
  }, [webViewStatus]);

  useEffect(() => {
    const currentDate = Number(moment().format("DD"));
    currentDate == 1 || currentDate == 15 ? getContacts() : console.log("ok");
    fetchUserLoans();
  }, []);
  function onPayCurrentAmount() {
    if (loanData?.user?.status === 12 || loanData?.user?.status === 14) {
      console.log("paymentLink", paymentLink);
      navigation.navigate("CustomWebView" as any, {
        link: paymentLink, //TODO payment link key should be added (user.payment_link_url)
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
  const navigationToEmandate = () => {
    navigation.navigate("Emandate" as any, {
      mandate_link: mandate_link,
      onNavigationGoBack: onNavigationGoBack,
    });
  };
  const getContacts = async () => {
    let contactArr: any = [];
    request(
      Platform.OS == "android"
        ? PERMISSIONS.ANDROID.READ_CONTACTS
        : PERMISSIONS.IOS.CONTACTS
    ).then((result: string) => {
      if (result == "granted") {
        Contacts.getAll().then((contacts: any[]) => {
          contacts.forEach((element) => {
            if (element.phoneNumbers.length != 0) {
              contactArr.push({
                contact_name: element.givenName,
                contact_number: element.phoneNumbers[0].number,
              });
            }
          });
          saveCustomerContact(contactArr);
          // setContactListData(contactArr);
        });
        readCustomerSMS();
      } else {
        console.log("something went wrong");
      }
    });
  };
  const readCustomerSMS = async () => {
    var filter = {};
    if (Platform.OS == "android") {
      try {
        await request(PERMISSIONS.ANDROID.READ_SMS).then((res) => {
          let permissionResult;
          if (res == "granted") {
            permissionResult = true;
          }
          if (permissionResult) {
            console.log("filter", filter);
            SmsAndroid.list(
              JSON.stringify(filter),

              (fail: string) => {
                console.log("Failed with this error: " + fail);
              },
              async (count: any, smsList: string) => {
                var arr = JSON.parse(smsList);
                var array: [] = [];
                for (let index = 0; index < arr.length; index++) {
                  const element = arr[index];
                  var body = element["body"] + "";
                  var checkBankOnly1 = body.includes("debited");
                  var checkBankOnly2 = body.includes("credited");
                  var checkBankOnly4 = body.includes("a/c");
                  if (
                    checkBankOnly1 == true ||
                    checkBankOnly2 == true ||
                    checkBankOnly4 == true
                  ) {
                    array.push({
                      sms_id: element["_id"],
                      address: element["address"],
                      body: element["body"],
                      creator: element["creator"],
                      date: moment(element["date"]).format("YYYY-MM-DD") + "",
                      date_sent:
                        moment(element["date_sent"]).format("YYYY-MM-DD") + "",
                      error_code: element["error_code"],
                      locked: element["locked"],
                      priority: element["priority"],
                      protocol: element["protocol"],
                      rcs_extra: element["rcs_extra"],
                      rcs_message_type: element["rcs_message_type"],
                      rcs_timestamp_delivered:
                        element["rcs_timestamp_delivered"],
                      rcs_timestamp_displayed:
                        element["rcs_timestamp_displayed"],
                      read: element["read"],
                      reply_path_present: element["reply_path_present"],
                      seen: element["seen"],
                      service_center: element["service_center"],
                      status: element["status"],
                      sub_id: element["sub_id"],
                      thread_id: element["thread_id"],
                      type: element["type"],
                    });
                    setSMSArray(array);
                    readCustomerSMSData(array);
                  }
                }
              }
            );
          }
        });
      } catch (err) {}
    } else {
    }
  };

  const saveCustomerContact = async (userContacts: any) => {
    let payload = { contacts: userContacts };

    const response = await saveContacts(payload, token);

    if (response.data.success) {
      console.log("print true", response.data.message);
    } else {
      console.log("print else", response.data.message);
    }
  };
  const readCustomerSMSData = async (messageArray: any) => {
    let payload = {
      sms: messageArray,
    };

    const response = await saveCustomerSMS(payload, token);
    if (response.data.success) {
      console.log("sms read true response", response.data.message);
    } else {
      console.log("sms read false responce", response.data.message);
    }
  };
  // console.log("xdgauskdiland", loanData.loan_installments)
  // useEffect(() => {
  //   const abc = loanData?.loan_installments?.filter((item: any) => {
  //     return item.is_paid == 0
  //   }

  //   )
  //   console.log("hahahahha", abc[0])
  // }, [])
  return (
    // (fullyPaidStatus === 6 && userStatus === 12 && disbursmentStatus === 1)
    <>
      {/* <PageWrapper> */}
      <>
        {fullyPaidStatus === 6 &&
        userStatus === 12 &&
        disbursmentStatus === 1 ? (
          <PageWrapper>
            <View style={{ flex: 1 }}>
              <HomeTopSection title={"Great Job!"} />
              <ScrollView style={styles.scrollStyle}>
                <View style={{ height: "100%", paddingBottom: 100 }}>
                  <View style={styles.clnNumber}>
                    <View>
                      <Text style={styles.clnTitle}>CLN number</Text>
                      {
                        <Text style={styles.clnNo}>
                          {userProfileData?.cln ?? "XXXXXX"}
                        </Text>
                      }
                    </View>
                    <View>
                      <Text style={styles.clnTitle}>Loan ID</Text>
                      <Text style={styles.clnNo}>
                        {loanIDValue ?? userProfileData?.loan_id ?? "XXXXXX"}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.greateJobImg}>
                    <Icon icon={GreatJobImage} />
                  </View>
                  <View style={styles.bottomContent}>
                    <Text style={styles.bottomTxt}>
                      Our team is verifying your profile we will get back to you
                      soon.
                    </Text>
                  </View>
                </View>
              </ScrollView>
            </View>
          </PageWrapper>
        ) : isMandated ? (
          <PageWrapper>
            <View style={{ flex: 1 }}>
              <HomeTopSection
                title={"Congrats!"}
                subTitle={"You’re just a step away to receive loan amount."}
              />
              <ScrollView contentContainerStyle={{ height: "100%" }}>
                <View
                  style={{
                    flex: 1,
                    height: "100%",
                    backgroundColor: COLORS.Polar,
                    paddingLeft: spacing.m,
                    paddingRight: spacing.m,
                  }}
                >
                  <View style={styles.greateJobImg}>
                    <Icon icon={CongratesImage} />
                  </View>
                  <View style={styles.bottomContent}>
                    <Text style={styles.bottomTxt}>
                      Please click on the button to complete the emandate
                      process.
                    </Text>
                  </View>
                  <ButtonComponent
                    title={"eMandate"}
                    onPress={() => navigationToEmandate()}
                    customStyles={styles.button}
                  />
                </View>
              </ScrollView>
            </View>
          </PageWrapper>
        ) : (userStatus == 12 || userStatus == 14) && disbursmentStatus == 1 ? (
          // <SafeAreaView
          //   edges={["right", "left", "top", "bottom"]}
          //   style={styles.container}

          // >
          <View
            style={{
              backgroundColor: COLORS.Polar,
              flex: 1,
              marginTop: spacing.xxll,
            }}
          >
            <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
              <View
                style={{
                  paddingHorizontal: spacing.m,
                  paddingBottom: spacing.m,
                }}
              >
                <View>
                  <Text style={styles.activeLoanTitle}>
                    {STRINGS.loanDetails.activeLoan}
                  </Text>
                </View>
                <View style={styles.activeLoanContent}>
                  <View style={{ width: "60%" }}>
                    <Text style={styles.loantitle}>
                      {STRINGS.loanDetails.amount}
                    </Text>
                    <Text style={styles.loanAmount}>
                      ₹{loanData?.loan_amount ?? "---"}
                    </Text>
                  </View>
                  <View style={{ width: "40%" }}>
                    <Text style={styles.loantitle}>
                      {STRINGS.loanDetails.inHand}
                    </Text>
                    <Text style={styles.loanAmount}>
                      ₹{loanData?.in_hand_amount ?? "---"}
                    </Text>
                  </View>
                </View>
                <View style={styles.activeLoanContent}>
                  <View style={{ width: "60%" }}>
                    <Text style={styles.loantitle}>
                      {STRINGS.loanDetails.cln}
                    </Text>
                    <Text style={styles.loanAmount}>
                      {loanData?.user?.cln ?? "---"}
                    </Text>
                  </View>
                  <View style={{ width: "40%" }}>
                    <Text style={styles.loantitle}>
                      {STRINGS.loanDetails.loanId}
                    </Text>
                    <Text style={styles.loanAmount}>
                      {loanData?.id ?? "---"}
                    </Text>
                  </View>
                </View>
                <View>
                  <View style={styles.currentDueBox}>
                    <View>
                      <Text style={styles.currentDueTxt}>
                        {STRINGS.loanDetails.currentDue}
                      </Text>
                      <Text style={styles.currentDueAmount}>
                        {/* ₹15,000 */}
                        {totalDueLoanAmount ?? "----"}
                      </Text>
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
                        loanPlansColor[loanData?.plan?.plan_tenure]
                          ?.primaryColor ?? "red",
                        loanPlansColor[loanData?.plan?.plan_tenure]
                          ?.secondaryColor ?? "red",
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
                    <ScrollView style={{ marginBottom: "30%" }}>
                      {loanData?.loan_installments?.map(
                        (item: any, index: number) => {
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
                                      <Text style={styles.amountText}>
                                        EMI Amount
                                      </Text>
                                      <Text style={styles.amount}>
                                        ₹
                                        {numberWithCommas(
                                          item?.installment_amount
                                        )}
                                      </Text>
                                    </View>
                                    {item?.delayed_interest_accumulated > 0 && (
                                      <View style={styles.bodyView}>
                                        <Text style={styles.penalityCharges}>
                                          Penalty Charges
                                        </Text>
                                        <Text style={styles.penalityCharges}>
                                          ₹{item?.delayed_interest_accumulated}
                                        </Text>
                                      </View>
                                    )}

                                    <View style={styles.installmentsDate}>
                                      {item?.is_paid === 0 ? (
                                        <>
                                          <Text style={styles.paidText}>
                                            Due On
                                          </Text>
                                          <Text style={styles.dateText}>
                                            {item?.installment_due_date}
                                          </Text>
                                          {/* installment due date */}
                                        </>
                                      ) : (
                                        <>
                                          <Text style={styles.paidText}>
                                            Paid On
                                          </Text>
                                          <Text style={styles.dateText}>
                                            {item?.last_payment_date ?? "---"}
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
                        }
                      )}
                    </ScrollView>
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
                onRaise_a_dispute();
              }}
              onDismiss={() => {}}
              buttonLable={"Okay"}
              primaryText={"Please write to Customer Support at"}
              linkText={"\nSupport@SalaryDay.in"}
              iconName={CustomerSupport}
              isVisible={showModal}
            />
          </View>
        ) : (
          // </SafeAreaView>
          <PageWrapper>
            <View style={{ flex: 1 }}>
              <HomeTopSection title={"Great Job!"} />
              <ScrollView style={styles.scrollStyle}>
                <View style={{ height: "100%", paddingBottom: 100 }}>
                  <View style={styles.clnNumber}>
                    <View>
                      <Text style={styles.clnTitle}>CLN number</Text>
                      {
                        <Text style={styles.clnNo}>
                          {userProfileData?.cln ?? "XXXXXX"}
                        </Text>
                      }
                    </View>
                    <View>
                      <Text style={styles.clnTitle}>Loan ID</Text>
                      <Text style={styles.clnNo}>
                        {loanIDValue ?? userProfileData?.loan_id ?? "XXXXXX"}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.greateJobImg}>
                    <Icon icon={GreatJobImage} />
                  </View>
                  <View style={styles.bottomContent}>
                    <Text style={styles.bottomTxt}>
                      Our team is verifying your profile we will get back to you
                      soon.
                    </Text>
                  </View>
                </View>
              </ScrollView>
            </View>
          </PageWrapper>
        )}
      </>
      <CustomModal
        iconName={Oops}
        buttonLoader={false}
        hideOnPress={() => {}}
        onConfirm={() => {
          BackHandler.exitApp();
        }}
        onDismiss={() => {}}
        buttonLable={"Okay"}
        secondaryText={"You are\nTemporarily Blocked for\n3 Months"}
        isVisible={temporaryBlockedModal}
      />
      <CustomModal
        iconName={Oops}
        buttonLoader={false}
        hideOnPress={() => {}}
        onConfirm={() => {
          BackHandler.exitApp();
        }}
        onDismiss={() => {}}
        buttonLable={"Okay"}
        secondaryText={"You are\nPermanent Blocked"}
        isVisible={permanentBlockedModal}
      />
      {/* </PageWrapper > */}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: COLORS.Polar,
  },
  raiseAdispute: {
    color: COLORS.RoyalBlue,
    textDecorationLine: "underline",
  },
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
  penalityCharges: {
    color: COLORS.Orange,
    fontSize: 10,
    fontFamily: fontFamily.LatoRegular,
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
  main: {
    marginLeft: spacing.m,
    marginRight: spacing.m,
    marginBottom: spacing.m,
    marginTop: spacing.m,
    height: "28%",
  },
  scrollStyle: {
    flex: 1,
    height: "70%",
    backgroundColor: COLORS.Polar,
    paddingLeft: spacing.m,
    paddingRight: spacing.m,
    paddingTop: spacing.m,
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logo: {
    width: 60,
    height: 60,
  },
  title: {
    fontSize: 24,
    color: COLORS.White,
    fontFamily: fontFamily.LatoBold,
    lineHeight: 30,
  },
  subTitle: {
    fontSize: 18,
    color: COLORS.White,
    fontFamily: fontFamily.LatoSemiBold,
    lineHeight: 24,
    marginTop: spacing.sxs,
    marginBottom: spacing.sxs,
    width: "80%",
  },
  clnNumber: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  clnTitle: {
    fontSize: 16,
    color: COLORS.RobinGreen,
    fontFamily: fontFamily.LatoSemiBold,
    lineHeight: 24,
  },
  clnNo: {
    fontSize: 16,
    color: COLORS.Black,
    fontFamily: fontFamily.LatoSemiBold,
    lineHeight: 24,
  },
  greateJobImg: {
    marginTop: spacing.mm,
    alignSelf: "center",
  },
  bottomContent: {
    textAlign: "center",
    marginTop: spacing.ll,
  },
  bottomTxt: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: fontFamily.LatoSemiBold,
    color: COLORS.Black,
    lineHeight: 24,
  },
  button: {
    marginTop: spacing.m,
  },
});
export default Home;
