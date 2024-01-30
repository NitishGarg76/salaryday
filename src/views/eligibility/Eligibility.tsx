import { View, StyleSheet, Text, Platform, Linking, BackHandler } from "react-native";
import React, { useState } from "react";
import moment from "moment";
import PageWrapper from "../../components/global/PageWrapper";
import LogoIcon from "../../assets/vectors/LogoIcon";
import Icon from "../../components/global/Icon";
import { spacing } from "../../constants/Spacing";
import COLORS from "../../constants/Colors";
import fontFamily from "../../constants/FontFamily";
import GetRevenue from "../../assets/vectors/GetRevenue";
import { ScrollView } from "react-native-gesture-handler";
import RupeeIcon from "../../assets/vectors/RupeeIcon";
import ButtonComponent from "../../components/global/ButtonComponent";
import Tie from "../../assets/vectors/Tie";
import STRINGS from "../../constants/locale";
import { Colors } from "react-native-paper";
import EmploymentType from "./Components/EmploymentType";
import EnterDigit from "../../components/EnterDigit";
import { useNavigation } from "@react-navigation/native";
import DatePicker from "react-native-date-picker";
import CustomModal from "../../components/global/CustomModal";
import SadEmoji from "../../assets/vectors/SadEmoji";
import Oops from "../../assets/vectors/Oops";
import { tempBlockStatus } from "../../services/api-services/api";
import { useDispatch, useSelector } from "react-redux";
import { getAuthToken } from "../../services/redux/selector/selector";
import { setEligibilityAction } from "../../services/redux/action/actions";

function Eligbility() {
  const token = useSelector(getAuthToken);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [selectSalaried, setSelectSalaried] = useState<boolean>(true);
  const [selectSelf, setSelectSelf] = useState<boolean>(false);
  const [date, setDate] = useState(new Date());
  const [currentAge, setCurrentAge] = useState<number>(0);
  const [monthlyIncom, setMonthlyIncom] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [buttonLoader, setButtonLoader] = useState<boolean>(false);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [modalError, setErrorModal] = useState<string>("");
  const [temporaryBlockedModal, setTemporaryBlockedModal] = useState<boolean>(false);

  const calculate_age = (value: Date) => {
    var today = new Date();
    var age_now = today.getFullYear() - value.getFullYear();
    setCurrentAge(age_now);
  };

  const submitData = async (values: number) => {
    let payload = {
      status: values,
    };
    setButtonLoader(true);
    const response = await tempBlockStatus(payload, token);
    if (response.data.success) {
      setButtonLoader(false);
      setShowModal(false)
      setTemporaryBlockedModal(true)

    } else {
      setErrorModal(response.data.message);
      setShowErrorModal(true);
      setButtonLoader(false);
    }
  };
  const navigateToPanCard = () => {
    if (
      selectSelf == true &&
      currentAge > 21 &&
      currentAge < 50 &&
      monthlyIncom > 15000
    ) {

      setShowModal(true);
    } else if (
      selectSelf == true &&
      currentAge > 21 &&
      currentAge < 50 &&
      monthlyIncom < 15000
    ) {

      setShowModal(true);
    } else if (
      selectSelf == true &&
      (currentAge < 21 || currentAge > 50) &&
      monthlyIncom > 15000
    ) {

      setShowModal(true);
    } else if (
      selectSelf == true &&
      (currentAge < 21 || currentAge > 50) &&
      monthlyIncom < 15000
    ) {

      setShowModal(true);
    } else if (
      selectSalaried == true &&
      currentAge > 21 &&
      currentAge < 50 &&
      monthlyIncom < 15000
    ) {

      setShowModal(true);
    } else if (
      selectSalaried == true &&
      (currentAge < 21 || currentAge > 50) &&
      monthlyIncom < 15000
    ) {

      setShowModal(true);
    } else if (
      selectSalaried == true &&
      (currentAge < 21 || currentAge > 50) &&
      monthlyIncom > 15000
    ) {

      setShowModal(true);
    } else if (
      selectSalaried == true &&
      currentAge > 21 &&
      currentAge < 50 &&
      monthlyIncom >= 15000
    ) {
      dispatch(
        setEligibilityAction({
          dobValue: moment(date).format("YYYY-MM-DD"),
          currentAge: currentAge,
          monthlyIncome: monthlyIncom,
        })
      );
      navigation.navigate("PanCard", {
        mode: "New User",
      });
    } else {
      setErrorModal("Something Went Wrong!.");
      setShowErrorModal(true);

    }
  };

  return (
    <PageWrapper>
      <ScrollView nestedScrollEnabled={true}>
        <View style={{ marginLeft: spacing.m }}>
          <Icon icon={LogoIcon} />
          <Text style={styles.label}>{STRINGS.eligibility.label}</Text>
          <Text style={styles.subLabel}>{STRINGS.eligibility.subLabel}</Text>
        </View>
        <View style={styles.box}>
          <View style={styles.card}>
            <EmploymentType
              borderColorValue={
                selectSalaried ? COLORS.RoyalBlue : Colors.white
              }
              isChecked={selectSalaried}
              onClick={() => {
                setSelectSalaried(true);
                setSelectSelf(false);
              }}
              iconName={GetRevenue}
              label={STRINGS.eligibility.employementTypeGetRevenueLabel}
            />
            <EmploymentType
              borderColorValue={selectSelf ? COLORS.RoyalBlue : Colors.white}
              isChecked={selectSelf}
              onClick={() => {
                setSelectSalaried(false);
                setSelectSelf(true);
              }}
              iconName={Tie}
              label={STRINGS.eligibility.employementTypeTieLabel}
            />
          </View>
          <View
            style={{
              marginTop: spacing.xxl,
              marginLeft: Platform.OS == "ios" ? 55 : 80,
              marginRight: 80,
              marginBottom: spacing.sxs,
            }}
          >
            <Text style={styles.DOB}>{STRINGS.eligibility.dob}</Text>
            <Text style={styles.subDOB}>{STRINGS.eligibility.subDob}</Text>
          </View>
          <DatePicker
            textColor={COLORS.Black}
            onDateChange={(value: Date) => {
              setDate(value);
              calculate_age(value);
            }}
            style={{
              width: Platform.OS == "ios" ? 300 : 220,
              height: 100,
              marginLeft: Platform.OS == "ios" ? 40 : 80,
            }}
            date={date}
            mode="date"
          />
          <View style={{ marginTop: spacing.ll, marginHorizontal: spacing.mm }}>
            <Text style={styles.netMonthly}>
              {STRINGS.eligibility.netMonthly}
            </Text>
            <EnterDigit
              iconName={RupeeIcon}
              hintText={STRINGS.eligibility.hintText}
              onBlur={() => { }}
              onChangeText={(val: number) => setMonthlyIncom(val)}
            />
            <Text style={styles.minSalary}>
              {STRINGS.eligibility.minSalaryText}
            </Text>
            <ButtonComponent
              title={STRINGS.eligibility.buttonTitle}
              onPress={navigateToPanCard}
              buttonLoading={false}
              customStyles={{
                alignSelf: "flex-start",
                marginTop: "15%",
                marginBottom: "30%",
              }}
            />
          </View>
        </View>
        <CustomModal
          salariedLoader={selectSelf ? buttonLoader : false}
          confirmColor={COLORS.RobinGreen}
          buttonLoader={selectSelf ? false : buttonLoader}
          isButtonGroup={false}
          buttonLable={selectSelf ? "Continue" : "Continue to Block"}

          hideOnPress={() => {
            setShowModal(false);
          }}
          onConfirm={() => {
            selectSelf ? setShowModal(false) : submitData(15);


          }}
          primaryText={
            selectSelf
              ? "We’re sorry! "
              : "Oops! You’re not eligible to avail our loan service. Please refer to our eligibility criteria on our"
          }
          linkText={
            selectSelf
              ? "SalaryDay"
              : " website."
          }
          onPressLink={() => {
            selectSelf ? console.log("SalaryDay") : Linking.openURL("https://salaryday.in/products.html")
          }}
          secondaryText={
            selectSelf ? " serves \nnow exclusively salaried \nemployees." : ""
          }
          iconName={selectSelf ? SadEmoji : Oops}
          isVisible={showModal}
          onDismiss={() => { submitData(15); }}
          salariedButton={() => { selectSelf ? submitData(15) : setShowModal(false) }}
          salariedButtonLabel={selectSelf ? "I’m not a salaried employee" : "I'm Eligible"}
          showSalariedButton={true}
        />
      </ScrollView>
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
      <CustomModal
        iconName={Oops}
        buttonLoader={false}
        hideOnPress={() => {
          setTemporaryBlockedModal(false);
        }}
        onConfirm={() => {
          BackHandler.exitApp();
          setTemporaryBlockedModal(false);
        }}
        onDismiss={() => { }}
        buttonLable={"Okay"}
        secondaryText={"You are\nTemporarily Blocked for\n3 Months"}
        isVisible={temporaryBlockedModal}
      />
    </PageWrapper>
  );
}

const styles = StyleSheet.create({
  netMonthly: {
    lineHeight: 24,
    fontFamily: fontFamily.LatoMedium,
    color: COLORS.RoyalBlue,
  },
  subDOB: {
    lineHeight: 20,
    fontSize: 12,
    fontFamily: fontFamily.LatoItalic,
    color: COLORS.Black,
  },
  DOB: {
    lineHeight: 24,
    fontFamily: fontFamily.LatoMedium,
    color: COLORS.RoyalBlue,
    textAlign: "left",
  },
  card: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: -40,
    marginLeft: spacing.m,
  },
  box: { flex: 1, backgroundColor: COLORS.White },
  container: {
    height: "100%",
    width: "100%",
  },
  label: {
    lineHeight: 30,
    color: COLORS.White,
    fontFamily: fontFamily.LatoBold,
    fontSize: 30,
    marginTop: spacing.s,
  },
  subLabel: {
    lineHeight: 20,
    color: COLORS.White,
    fontFamily: fontFamily.LatoBold,
    fontSize: 16,
    marginBottom: "17%",
  },
  minSalary: {
    lineHeight: 20,
    fontFamily: fontFamily.LatoItalic,
    color: COLORS.Black,
  },
});
export default Eligbility;
