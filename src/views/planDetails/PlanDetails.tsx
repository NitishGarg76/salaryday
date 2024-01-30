import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Back from "../../assets/vectors/Back";
import Icon from "../../components/global/Icon";
import COLORS from "../../constants/Colors";
import fontFamily from "../../constants/FontFamily";
import { spacing } from "../../constants/Spacing";
import CalculateAmount from "./components/CalculateAmount";
import { Slider } from "react-native-elements";
import CardChild from "./components/CardChild";
import { ScrollView } from "react-native-gesture-handler";
import ButtonComponent from "../../components/global/ButtonComponent";
import { Dropdown } from "react-native-element-dropdown";
import DownArrow from "../../assets/vectors/DownArrow";
import CustomInputText from "../../components/global/CustomInputText";
import { loanPlansColor, numberWithCommas, numFormatter } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { getAuthToken } from "../../services/redux/selector/selector";
import {
  calculateLoanAmount,
  getLoanPurposes,
  applyLoan,
  getProfileDetails,
} from "../../services/api-services/api";
import CustomModal from "../../components/global/CustomModal";
import PlanDetailsRightIcon from "../../assets/vectors/PlanDetailsRightIcon";
import { useNavigation } from "@react-navigation/native";
import Oops from "../../assets/vectors/Oops";
import { setLoanID, setSelectButtonStatus } from "../../services/redux/action/actions";
import HappyFace from "../../assets/vectors/HappyFace";

function PlanDetails(props: any) {
  const navigation = useNavigation();
  const token = useSelector(getAuthToken);
  const planId = props.route.params.planId;
  const plan_tenure = props.route.params.plan_tenure;
  const [sliderValue, setSliderValue] = useState<any>(5000);
  const [calculatedPlans, setCalculatePlans] = useState<any>({});
  const [loanPurposes, setLoanPurposes] = useState<any>([]);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [value, setValue] = useState("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [modalError, setErrorModal] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);
  const [bankNameData, setBankNameData] = useState<string>("");
  const dispatch = useDispatch()
  const calculateLoanData = async (value: number) => {
    let payload = {
      loan_amount: value,
    };
    const response = await calculateLoanAmount(payload, planId, token);
    if (response.data.success) {
      setCalculatePlans(response.data.response.plan_details);
    } else {
      console.log(response.data.message);
    }
  };
  //.data?.response?.user?.financial_details[0].account_name
  const getLoanPurposeData = async () => {
    const response = await getLoanPurposes(token);
    if (response.data.success) {
      let loan = response?.data?.response?.loan_purpose;
      let purposeArr: { label: string; id: string }[] = [];
      loan.forEach((item: any) => {
        purposeArr.push({ label: item, id: item });
      });
      setLoanPurposes(purposeArr);
    } else {
      console.error("Something went wrong!");
    }
  };
  const getProfileDetailData = async () => {
    const userDetails = await getProfileDetails(token);
    const name = userDetails?.data?.response?.user?.financial_details[0]?.bank_name;
    setBankNameData(name)
  };
  const applySelectedLoan = async () => {

    setLoader(true)
    let payload: any = {
      loan_amount: calculatedPlans.loan_amount,
      max_eligible_amount: calculatedPlans.max_eligible_amount,
      closure_amount: calculatedPlans.closure_amount,
      emi_amount: calculatedPlans.emi_amount,
      in_hand_amount: calculatedPlans.in_hand_amount,
      total_emi: calculatedPlans.total_emi,
      loan_purpose: value,
      promo_code: "", //TODO promo code apply
      offer_id: 0, //TODO change offer_id later
    };
    const response = await applyLoan(payload, planId, token);
    setLoader(false)
    if (response.data.success) {
      dispatch(setLoanID(response?.data?.response?.plan?.loan_details?.id))
      dispatch(setSelectButtonStatus(false))
      setShowModal(true);
    } else {
      setErrorModal(response.data.message);
      setShowErrorModal(true);
    }
  };

  useEffect(() => {
    getLoanPurposeData();
    calculateLoanData(5000);
    getProfileDetailData();
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ marginHorizontal: spacing.m, marginTop: spacing.xxl }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon icon={Back} />
        </TouchableOpacity>
        <Text style={styles.header}>Select loan amount</Text>

        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={[
            loanPlansColor[plan_tenure]?.primaryColor,
            loanPlansColor[plan_tenure]?.secondaryColor,
          ]}
          style={styles.gradient}
        >
          <View style={styles.sliderBox}>
            <Text style={styles.rs}>
              ₹
              <Text style={styles.amount}>{numberWithCommas(sliderValue)}</Text>
            </Text>
            <Slider
              minimumValue={5000}
              maximumValue={50000}
              minimumTrackTintColor={COLORS.White}
              maximumTrackTintColor={COLORS.White}
              onValueChange={(value: number) => {
                setSliderValue(value);
                calculateLoanData(value);
              }}
              trackStyle={styles.trackStyle}
              thumbProps={{
                children: (
                  <View style={styles.box}>
                    <Text style={styles.updatedVal}>
                      <Text style={styles.updatedRs}>₹</Text>
                      {numFormatter(sliderValue)}
                    </Text>
                  </View>
                ),
              }}
              thumbTintColor={COLORS.RoyalBlue}
              thumbStyle={styles.thunbStyle}
              step={1000}
              value={sliderValue}
            />
          </View>
          <View style={{ marginTop: spacing.mm }}>
            <View style={{ flexDirection: "row" }}>
              <CardChild
                label={"Loan Tenure"}
                amount={plan_tenure} // TODO Add Loan tenure from the api
                cardStyle={{ borderRightWidth: 1 }}
              />
              <CardChild
                label={"Total EMIs"}
                amount={calculatedPlans?.total_emi}
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              <CardChild
                label={"Your EMI"}
                amount={numberWithCommas(calculatedPlans?.emi_amount)}
                cardStyle={{ borderRightWidth: 1 }}
              />
              <CardChild
                label={"Total Payable"}
                amount={numberWithCommas(calculatedPlans?.closure_amount)}
              />
            </View>
          </View>
        </LinearGradient>
        <CalculateAmount
          label={"Selected loan amount"}
          amount={numberWithCommas(calculatedPlans?.loan_amount)}
        />
        <CalculateAmount
          label={`Interest rate (${(plan_tenure === 120 || plan_tenure === 180) ? "3" : "3.5"}% per month)`}
          amount={numberWithCommas(calculatedPlans?.interest_rate_amount)}
        />
        <CalculateAmount
          label={"Process fee (2.50%)"}
          amount={numberWithCommas(calculatedPlans?.processing_fee_amount)}
        />
        <CalculateAmount
          label={"GST (18.00%)"}
          amount={numberWithCommas(calculatedPlans?.GST_amount)}
        />
        <CalculateAmount
          label={"In hand amount"}
          amount={numberWithCommas(calculatedPlans?.in_hand_amount)}
        />
        <Text style={styles.text}>Purpose of the loan</Text>
        <View style={styles.dropdownContainer}>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
            selectedTextStyle={styles.selectedTextStyle}
            data={loanPurposes}
            maxHeight={300}
            labelField="label"
            valueField="id"
            placeholder="Select"
            placeholderStyle={{ color: COLORS.Black }}
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setValue(item.label);
              setIsFocus(false);
            }}
            renderRightIcon={() => <Icon icon={DownArrow} />}
          />
        </View>
        <Text style={styles.text}>Salary Account</Text>
        <CustomInputText
          placeHolderColor={COLORS.DustyGrey}
          label={"Bank"}
          customStyles={{ marginTop: 0, marginHorizontal: 0 }}
          value={bankNameData ?? "ICICI Bank "}
          editable={false}
          onValChange={() => { }}
        />
        <ButtonComponent
          buttonLoading={loader}
          customStyles={styles.button}
          title={"Apply"}
          onPress={() => applySelectedLoan()}
        />
      </View>
      <CustomModal
        buttonLoader={false}
        hideOnPress={() => {
        }}
        onConfirm={() => {
          navigation.goBack();
        }}
        onDismiss={() => {
        }}
        primaryText={""}
        linkText={"You made it!\n"}
        secondaryText={"Your loan is under review."}
        iconName={HappyFace}
        isVisible={showModal}
      />
      <CustomModal
        iconName={Oops}
        buttonLoader={false}
        hideOnPress={() => {
          setShowErrorModal(false);
        }}
        onConfirm={() => {
          setShowErrorModal(false);
        }}
        onDismiss={() => { }}
        buttonLable={"Okay"}
        secondaryText={modalError}
        isVisible={showErrorModal}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: spacing.m,
    alignSelf: "flex-start",
    marginBottom: spacing.m,
  },
  promoButton: {
    marginTop: -60,
    alignSelf: "flex-end",
    backgroundColor: COLORS.RobinGreen,
    marginBottom: spacing.m,
  },
  text: {
    color: COLORS.RoyalBlue,
    fontFamily: fontFamily.LatoMedium,
    marginTop: spacing.xxxxl,
  },
  thunbStyle: {
    height: 24,
    width: 24,
    borderColor: COLORS.White,
    borderWidth: 3,
  },
  updatedRs: {
    color: COLORS.White,
    fontFamily: fontFamily.LatoBold,
    fontSize: 16,
    lineHeight: 30,
  },
  updatedVal: {
    color: COLORS.White,
    fontFamily: fontFamily.LatoBold,
    fontSize: 20,
    lineHeight: 30,
  },
  box: {
    marginTop: 20,
    width: 400,
    height: 400,
    marginLeft: -10,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: COLORS.Black,
    fontFamily: fontFamily.LatoBold,
  },
  dropdown: {
    height: 50,
    borderBottomColor: COLORS.DustyGrey,
    borderBottomWidth: 1,
    paddingLeft: spacing.xxxs,
    paddingRight: spacing.xxs,
    marginTop: 6,
  },
  trackStyle: { width: "100%", height: 7, borderRadius: 15 },
  amount: {
    color: COLORS.White,
    fontFamily: fontFamily.LatoBold,
    fontSize: 36,
    lineHeight: 40,
  },
  rs: {
    alignSelf: "center",
    color: COLORS.White,
    fontFamily: fontFamily.LatoBold,
    fontSize: 24,
    lineHeight: 40,
  },
  sliderBox: {
    marginHorizontal: spacing.m,
    marginBottom: spacing.m,
    marginTop: spacing.m,
  },
  dropdownContainer: {
    paddingHorizontal: 0,
  },
  gradient: {
    borderWidth: 2,
    borderColor: COLORS.White,
    borderRadius: 15,
    elevation: 10,
    marginVertical: spacing.m,
  },
  label: {
    marginTop: spacing.sxs,
    fontSize: 16,
    lineHeight: 24,
    fontFamily: fontFamily.LatoSemiBold,
    color: COLORS.RobinGreen,
  },
  header: {
    fontSize: 24,
    fontFamily: fontFamily.LatoBold,
    lineHeight: 24,
    color: COLORS.RoyalBlue,
    marginTop: spacing.sms,
  },
  value: {
    fontSize: 16,
    fontFamily: fontFamily.LatoBold,
    lineHeight: 24,
    color: COLORS.RoyalBlue,
  },
});
export default PlanDetails;
