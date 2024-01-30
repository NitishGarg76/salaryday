import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import ForwardArrow from "../../../assets/vectors/ForwardArrow";
import MenuIcon from "../../../assets/vectors/MenuIcon";
import Icon from "../../../components/global/Icon";
import PageWrapper from "../../../components/global/PageWrapper";
import COLORS from "../../../constants/Colors";
import fontFamily from "../../../constants/FontFamily";
import { spacing } from "../../../constants/Spacing";
import MyLoanData from "./components/MyLoanData";
import LoanDetailsCard from "./components/LoanDetailsCard";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getAuthToken } from "../../../services/redux/selector/selector";
import {
  closedUserLoans,
  getProfileDetails,
} from "../../../services/api-services/api";
import { loanPlansColor } from "../../../utils";
import { HomeTopSection } from "../home/Home";
import NoActiveLoans from "../../../assets/vectors/NoActiveLoans";
import ButtonComponent from "../../../components/global/ButtonComponent";
import { setProfileDetails } from "../../../services/redux/action/actions";
import Loader from "../../../components/global/FullScreenLoader";
import CustomModal from "../../../components/global/CustomModal";
import AllDone from "../../../assets/vectors/AllDone";
import Oops from "../../../assets/vectors/Oops";
import moment from "moment";

const MyLoan = () => {
  const token = useSelector(getAuthToken);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [activeLoanData, setActiveLoanData] = useState<any>({});
  const [closedLoanData, setClosedLoanData] = useState<any>([]);
  const [profile_details, set_profile_details] = useState<any>({});
  const [loader, setLoader] = useState<boolean>(false);
  const [userStatus, setUserStatus] = useState<number>(0);
  const [errorPopupShowPopup, setErrorPopupShowPopup] =
    useState<boolean>(false);
  const [showPopUp, setShowPopup] = useState<boolean>(false);
  let { status, mandate_link } = profile_details;
  const isMandated = status === 10;
  const fetchUserLoans = async () => {
    const response = await closedUserLoans(token);
    if (response.data.success) {
      let res = response.data.response.loans;
      console.log("loann rreess", res);
      let filterdVal = res.filter(
        (item: any) =>
          item.disbursement_status === 1 && item.is_loan_closed === 0
      );
      let closedFilteredValue = res.filter(
        (item: any) => item.is_loan_closed === 1
      );
      console.log("filteredLoandata", closedFilteredValue);
      setActiveLoanData(filterdVal[0]);
      setClosedLoanData(closedFilteredValue);
    } else {
      console.log("Something went wrong!");
    }
  };

  const navigateToActiveLoan = () => {
    const resetAction = CommonActions.reset({
      index: 0,
      routes: [
        {
          name: "Dashboard",
        },
      ],
    });
    navigation.dispatch(resetAction);
  };
  const fetchProfileDeatails = async () => {
    const response = await getProfileDetails(token);
    setUserStatus(response?.data?.response?.user?.status);
    if (response.data.success) {
      dispatch(setProfileDetails(response.data.response.user));
      set_profile_details(response.data.response.user);
      return true;
    } else {
      return false;
    }
  };
  const fetchingItems = useCallback(async () => {
    setLoader(true);
    await fetchUserLoans();
    await fetchProfileDeatails();
    setLoader(false);
  }, []);
  const onNavigationHome = () => {
    navigation.navigate("Home");
    setShowPopup(false);
  };

  useEffect(() => {
    fetchingItems();
  }, []);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ marginBottom: "19%" }}
    >
      <PageWrapper>
        <>
          {activeLoanData && !!Object.keys(activeLoanData).length ? (
            <View style={{ marginTop: spacing.m, marginHorizontal: spacing.m }}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Icon icon={MenuIcon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigateToActiveLoan()}>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: spacing.s,
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.header}>Active Loan</Text>
                  <Icon
                    icon={ForwardArrow}
                    fill={"transparent"}
                    style={{ marginTop: spacing.l }}
                  />
                </View>
              </TouchableOpacity>
              <View style={styles.row}>
                <MyLoanData
                  label={"Loan Amount"}
                  amount={activeLoanData?.loan_amount ?? "---"}
                  showRS={true}
                />
                <MyLoanData
                  label={"Tenure Plan"}
                  amount={`${activeLoanData?.plan?.plan_tenure ?? "---"} Days`}
                />
              </View>
            </View>
          ) : (
            <HomeTopSection
              title={"No Active Loans"}
              subTitle={
                "There no loans on your account, you can apply for a loan now up to 50,000"
              }
            />
          )}
        </>
        <>
          <ScrollView
            style={{
              flex: 1,
              backgroundColor: COLORS.Polar,
              marginTop:
                closedLoanData && !!closedLoanData.length ? -50 : "20%",
            }}
            showsVerticalScrollIndicator={false}
          >
            {closedLoanData && !!closedLoanData.length ? (
              <View style={styles.box}>
                <Text style={styles.label}>Closed Loans</Text>
                {closedLoanData?.map((item: any, index: number) => (
                  <View key={index}>
                    <LoanDetailsCard
                      primaryColor={
                        loanPlansColor[item.plan.plan_tenure].primaryColor
                      }
                      secondaryColor={
                        loanPlansColor[item.plan.plan_tenure].secondaryColor
                      }
                      days={item.plan.plan_tenure ?? "---"}
                      loanAmount={item.loan_amount ?? "---"}
                      inHandAmount={item.in_hand_amount ?? "---"}
                      startDate={
                        moment(item.start_date).format("DD/MM/YYYY") ?? "---"
                      }
                      endDate={
                        moment(item.end_date).format("DD/MM/YYYY") ?? "---"
                      }
                      paidOn={item.loan_closed_date ?? "---"}
                    />
                  </View>
                ))}
              </View>
            ) : activeLoanData && !!Object.keys(activeLoanData).length ? (
              <View style={styles.box}>
                <Text style={styles.label}>Closed Loans</Text>
                <ScrollView
                  style={{ height: "100%", marginBottom: spacing.xxxl }}
                  showsVerticalScrollIndicator={false}
                >
                  <Text style={styles.label}>
                    There are no closed loans here.
                  </Text>
                </ScrollView>
              </View>
            ) : (
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
                  <View
                    style={[
                      styles.greateJobImg,
                      { marginBottom: !isMandated ? "0%" : "100%" },
                    ]}
                  >
                    <Icon icon={NoActiveLoans} />
                  </View>
                  <View style={styles.bottomContent}>
                    <Text style={styles.bottomTxt}>
                      {(userStatus === 4 ||
                        userStatus === 9) &&
                        "Please click on the button select loan plans."}
                    </Text>
                  </View>
                  {(userStatus === 4 || userStatus === 9) && (
                    <ButtonComponent
                      title={"Select Loan"}
                      onPress={() => navigation.navigate("PlansStack")}
                      customStyles={styles.button}
                    />
                  )}
                </View>
              </ScrollView>
            )}
          </ScrollView>
        </>
        <CustomModal
          iconName={AllDone}
          buttonLoader={loader}
          hideOnPress={() => {
            setShowPopup(false);
          }}
          onConfirm={() => onNavigationHome()}
          onDismiss={() => { }}
          isButtonGroup={false}
          linkText={"You're all done!\n"}
          secondaryText={"You will shortly receive the loan amount."}
          denyColor={COLORS.RoyalBlue}
          buttonLable={"Thank You"}
          isVisible={showPopUp}
        />
        <CustomModal
          iconName={Oops}
          buttonLoader={loader}
          hideOnPress={() => {
            setErrorPopupShowPopup(false);
          }}
          onConfirm={() => {
            setErrorPopupShowPopup(false);
          }}
          onDismiss={() => { }}
          buttonLable={"Try Again!"}
          secondaryText={"Something went wrong!"}
          isVisible={errorPopupShowPopup}
        />
        {/* {loader && <Loader isVisible={loader} />} */}
      </PageWrapper>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
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
    marginBottom: "50%",
  },
  label: {
    fontSize: 20,
    color: COLORS.RoyalBlue,
    lineHeight: 30,
    fontFamily: fontFamily.LatoBold,
    marginBottom: spacing.m,
  },
  box: {
    backgroundColor: COLORS.Polar,
    flex: 1,
    paddingVertical: spacing.m,
    paddingHorizontal: spacing.m,
    marginBottom: "15%",
  },
  header: {
    marginTop: spacing.m,
    fontSize: 24,
    lineHeight: 30,
    fontFamily: fontFamily.LatoBold,
    color: COLORS.White,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: spacing.m,
    marginBottom: "20%",
  },
});
export default MyLoan;
