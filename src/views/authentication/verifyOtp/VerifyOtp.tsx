import { CommonActions, useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import EnterOtpMobileIcon from "../../../assets/vectors/EnterOtpMobileIcon";
import CircularIcon from "../../../components/global/CircularIcon";
import EnterOtpComponent from "../../../components/global/EnterOtpComponent";
import PageWrapper from "../../../components/global/PageWrapper";
import COLORS from "../../../constants/Colors";
import fontFamily from "../../../constants/FontFamily";
import STRINGS from "../../../constants/locale";
import { spacing } from "../../../constants/Spacing";
import * as Yup from "yup";
import { sendOTPOnMobile, verifyOTP } from "../../../services/api-services/api";
import { useSelector } from "react-redux";
import { getAuthToken } from "../../../services/redux/selector/selector";

const VerifyOtp = (props: any) => {
  const { mobileNumber } = props.route?.params;
  const navigation = useNavigation();
  const token = useSelector(getAuthToken);
  const [seconds, setSeconds] = useState<number>(60);
  const [errorSMS, setErrorSMS] = useState<string>("");
  const [buttonLoader, setButtonLoader] = React.useState<boolean>(false);

  const navigateToEligibility = () => {
    const resetAction = CommonActions.reset({
      index: 0,
      routes: [{name: "Eligibility" }],
    });
navigation.dispatch(resetAction);
  };

  const resendOTP = async () => {
    let payload = {
      contact_no: mobileNumber,
    };
    const response = await sendOTPOnMobile(payload, token);
    if (response.data.success) {
      setErrorSMS("");
      setSeconds(60);
    } else {
      console.log("false", response.data.message);
    }
  };

  const verifyReceivedOTP = async (values: any, contactNum: any) => {
    let payload = {
      contact_no: contactNum,
      otp: values.otp,
    };

    setButtonLoader(true);
    if (seconds > 0) {
      const response = await verifyOTP(payload, token);
      if (response.data.success) {
        setButtonLoader(false);
        navigateToEligibility();
      } else {
        setButtonLoader(false);
        setErrorSMS(response.data.message);
      }
    } else if (seconds == 0) {
      setButtonLoader(false);
      setErrorSMS("Please enter a valid otp");
    }
  };

  const validationSchema = Yup.object().shape({
    otp: Yup.string()
      .required("Please enter a valid number.")
      .matches(/^[0-9]+$/, "Please enter a valid otp.")
      .min(4, "Please enter a valid number."),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) setSeconds((seconds) => seconds - 1);
      if (seconds === 0) {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <PageWrapper>
      <CircularIcon iconName={EnterOtpMobileIcon} customStyles={styles.icon} />
      <Formik
        initialValues={{ otp: "" }}
        onSubmit={(values) => verifyReceivedOTP(values, mobileNumber)}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, errors, setFieldValue, touched }) => (
          <View style={styles.box}>
            <View style={styles.container}>
              <Text style={styles.title}>{STRINGS.verifyOtp.title}</Text>
              <Text style={styles.subTitles}>{STRINGS.verifyOtp.subTitle}</Text>
              <Text style={styles.num}>{"+91 " + mobileNumber}</Text>
            </View>
            <EnterOtpComponent
              seconds={seconds}
              buttonloader={buttonLoader}
              onPress={handleSubmit}
              isValid={false}
              errorMsg={errorSMS ? errorSMS : touched.otp && errors.otp}
              setValue={(code) => {
                setFieldValue("otp", code);
              }}
              onPressResend={() => {
                resendOTP();
              }}
            />
          </View>
        )}
      </Formik>
    </PageWrapper>
  );
};
const styles = StyleSheet.create({
  num: {
    fontSize: 20,
    lineHeight: 30,
    fontFamily: fontFamily.LatoRegular,
    color: COLORS.RoyalBlue,
    marginTop: spacing.xxxs,
  },
  subTitles: {
    fontSize: 12,
    lineHeight: 15,
    fontFamily: fontFamily.LatoBold,
    color: COLORS.DustyGrey,
    marginTop: spacing.xxxxl,
  },
  title: {
    fontSize: 30,
    color: COLORS.RoyalBlue,
    fontFamily: fontFamily.LatoRegular,
    marginTop: spacing.m,
  },
  box: { flex: 1, backgroundColor: COLORS.White },
  container: { marginLeft: spacing.xxll, marginTop: spacing.xss },
  icon: {
    backgroundColor: COLORS.White,
    width: 100,
    height: 100,
    borderRadius: 50,
    marginLeft: spacing.xxxl,
    marginTop: "6%",
    marginBottom: "12%",
  },
  text: {
    fontSize: 15,
    lineHeight: 30,
    fontFamily: fontFamily.LatoRegular,
    color: COLORS.RobinGreen,
    alignSelf: "flex-end",
    marginTop: spacing.xxxl,
    marginRight: spacing.xxxl,
  },
  timmer: {
    fontSize: 16,
    lineHeight: 36,
    fontFamily: fontFamily.LatoBold,
    color: COLORS.RoyalBlue,
    marginTop: spacing.sxs,
  },
  label: {
    fontSize: 16,
    lineHeight: 36,
    fontFamily: fontFamily.LatoBold,
    color: COLORS.Abbey,
    marginTop: spacing.s,
  },
});
export default VerifyOtp;
