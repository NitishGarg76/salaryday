import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import LogoIcon from "../../../assets/vectors/LogoIcon";
import Icon from "../../../components/global/Icon";
import PageWrapper from "../../../components/global/PageWrapper";
import PlanCard from "../../../components/global/PlanCard";
import COLORS from "../../../constants/Colors";
import fontFamily from "../../../constants/FontFamily";
import { spacing } from "../../../constants/Spacing";
import { useNavigation } from "@react-navigation/native";
import Mail from "../../../assets/vectors/Mail";
import CustomModal from "../../../components/global/CustomModal";
import MenuIcon from "../../../assets/vectors/MenuIcon";
import {
  getAuthToken,
  getPlanDetails,
  getSelectButtonStatus,
} from "../../../services/redux/selector/selector";
import { useDispatch, useSelector } from "react-redux";
import { loanPlansColor } from "../../../utils";
import {
  activeUserLoans,
  getProfileDetails,
} from "../../../services/api-services/api";
import { setKyCompletedAction, setSelectButtonStatus } from "../../../services/redux/action/actions";

const Plans = () => {
  const selectLoanButtonStatus = useSelector(getSelectButtonStatus);
  const dispatch = useDispatch();
  const token = useSelector(getAuthToken);
  const plansData = useSelector(getPlanDetails);
  const [showModal, setShowModal] = useState<boolean>(false);
  const navigation = useNavigation();
  const getUserActiveLoans = async () => {
    const user_act_loan = await activeUserLoans(token);
    console.log(
      ";;;;usernm...",
      Object.keys(user_act_loan?.data?.response).length
    );

    Object.keys(user_act_loan?.data?.response).length === 0
      ? dispatch(setSelectButtonStatus(true))
      : dispatch(setSelectButtonStatus(false));
  };
  const navigateToTandC = () => {
    setShowModal(false);
    navigation.navigate("TermsAndCondition");
  };
  const navigateSliderScreen = (item: any) => {
    const { id, plan_tenure } = item;
    setShowModal(false);
    navigation.navigate("PlanDetails", {
      planId: id,
      plan_tenure: plan_tenure,
    } as any);
  };
  useEffect(() => {
    getUserActiveLoans();
  }, []);
  useEffect(() => {
    dispatch(setKyCompletedAction(true));


  }, []);
  return (
    <PageWrapper>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginLeft: spacing.m, marginRight: spacing.m }}>
          <View style={styles.topView}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Icon icon={MenuIcon} />
            </TouchableOpacity>
            <Icon icon={LogoIcon} />
          </View>
          <Text style={styles.label}>Great! go head and apply for a loan</Text>
          <Text style={styles.subLabel}>
            Flexible loan plans to suit your requirement
          </Text>
        </View>
        <View style={styles.container}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 10 }}
            automaticallyAdjustContentInsets={true}
          >
            <View style={{ flex: 1, flexDirection: "row" }}>
              {plansData.map((item: any, index: number) => {
                return (
                  <PlanCard
                    customStyles={{ marginHorizontal: 15, height: 420 }}
                    key={index}
                    days={item.plan_tenure}
                    minSalary={item.min_monthly_salary}
                    numOfEmi={item.no_of_emis}
                    showButton={selectLoanButtonStatus}
                    primaryColor={loanPlansColor[item.plan_tenure].primaryColor}
                    secondaryColor={
                      loanPlansColor[item.plan_tenure].secondaryColor
                    }
                    onPress={() => {
                      navigateSliderScreen(item);
                    }}
                  />
                );
              })}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
      <CustomModal
        hideOnPress={() => {
          setShowModal(false);
        }}
        onConfirm={navigateToTandC}
        onDismiss={() => {
          setShowModal(false);
        }}
        isButtonGroup={true}
        primaryText={"Allow "}
        linkText={"SalaryDay"}
        secondaryText={" to access SMS, and Notifications on your device."}
        iconName={Mail}
        isVisible={showModal}
      />
    </PageWrapper>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.White,
    paddingBottom: 100,
  },
  topView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing.xs,
  },
  title: {
    color: COLORS.Black,
    fontSize: 16,
    lineHeight: 24,
    fontFamily: fontFamily.LatoBold,
  },
  box: {
    width: "85%",
    backgroundColor: COLORS.White,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 15,
    paddingHorizontal: spacing.s,
    paddingVertical: spacing.sxs,
    elevation: 10,
    marginTop: -30,
    alignSelf: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  label: {
    lineHeight: 30,
    color: COLORS.White,
    fontFamily: fontFamily.LatoBold,
    fontSize: 24,
    width: "70%",
  },
  subLabel: {
    lineHeight: 24,
    color: COLORS.White,
    fontFamily: fontFamily.LatoBold,
    fontSize: 18,
    marginBottom: spacing.xxxxl,
    width: "80%",
    marginTop: spacing.xxs,
  },
  image: {
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: COLORS.Transparent,
  },
});
export default Plans;
