import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import IndianFlagIcon from "../../../assets/vectors/IndianFlagIcon";
import SentOtpMobileIcon from "../../../assets/vectors/SentOtpMobileIcon";
import EnterDigit from "../../../components/EnterDigit";
import ButtonComponent from "../../../components/global/ButtonComponent";
import CircularIcon from "../../../components/global/CircularIcon";
import PageWrapper from "../../../components/global/PageWrapper";
import COLORS from "../../../constants/Colors";
import fontFamily from "../../../constants/FontFamily";
import STRINGS from "../../../constants/locale";
import { spacing } from "../../../constants/Spacing";
import * as Yup from "yup";
import { sendOTPOnMobile } from "../../../services/api-services/api";
import { useSelector } from "react-redux";
import { getAuthToken } from "../../../services/redux/selector/selector";
import CustomModal from "../../../components/global/CustomModal";
import Oops from "../../../assets/vectors/Oops";

function EnterMobileNumber() {
  const navigation = useNavigation();
  const token = useSelector(getAuthToken);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [modalError, setErrorModal] = useState<string>("");
  const [buttonLoader, setButtonLoader] = React.useState<boolean>(false);

  const navigateToOTP = (value: any) => {
    navigation.navigate("VerifyOtp", {
      mobileNumber: value,
    });
  };

  const validationSchema = Yup.object().shape({
    mobileNumber: Yup.string()
      .required("Please enter a valid number.")
      .matches(/^[0-9]+$/, "Please enter a valid number.")
      .min(10, "Please enter a valid number."),
  });

  const mobileVerification = async (values: any) => {
    setButtonLoader(true);
    let payload = {
      contact_no: values.mobileNumber,
    };
    const response = await sendOTPOnMobile(payload, token);
    setButtonLoader(false);
    if (response.data.success) {
      navigateToOTP(values.mobileNumber);
    } else if (
      response.data.message === "The contact no has already been taken."
    ) {
      setErrorModal(response.data.message);
      setShowErrorModal(true);
    } else {
      setErrorModal(response.data.message);
      setButtonLoader(false);
      setShowErrorModal(true);
    }
  };
  return (
    <PageWrapper>
      <CircularIcon iconName={SentOtpMobileIcon} customStyles={styles.icon} />
      <Formik
        enableReinitialize
        initialValues={{ mobileNumber: "" }}
        onSubmit={(values) => {
          mobileVerification(values);
        }}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          errors,
          touched,
          values,
        }) => (
          <View style={styles.box}>
            <Text style={styles.title}>{STRINGS.enterMobileNumber.title}</Text>
            <View
              style={{
                marginLeft: spacing.xxll,
                marginTop: spacing.xxll,
                marginRight: spacing.xxll,
              }}
            >
              <EnterDigit
                keyboardType={"number-pad"}
                maxLength={10}
                onBlur={handleBlur("mobileNumber")}
                onChangeText={handleChange("mobileNumber")}
                iconName={IndianFlagIcon}
                hintText={STRINGS.enterMobileNumber.hint}
                value={values.mobileNumber}
                errorMessage={touched.mobileNumber && errors.mobileNumber}
              />
              <Text style={styles.label}>{STRINGS.enterMobileNumber.info}</Text>
              <ButtonComponent
                buttonLoading={buttonLoader}
                disable={false}
                title={STRINGS.enterMobileNumber.buttonTitle}
                onPress={handleSubmit} 
                customStyles={styles.button}
              />
            </View>
          </View>
        )}
      </Formik>
      <CustomModal
        iconName={Oops}
        buttonLoader={false}
        hideOnPress={() => {
          setShowErrorModal(false);
        }}
        onConfirm={() => {
          setShowErrorModal(false);
        }}
        onDismiss={() => {}}
        buttonLable={"Okay"}
        secondaryText={modalError}
        isVisible={showErrorModal}
      />
    </PageWrapper>
  );
}

const styles = StyleSheet.create({
  button: { alignSelf: "flex-start", marginTop: "20%" },
  label: {
    fontSize: 10,
    lineHeight: 15,
    color: COLORS.DustyGrey,
    marginTop: spacing.xss,
  },
  container: {
    borderColor: COLORS.DustyGrey,
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    marginRight: "20%",
    height: 35,
  },
  box: { flex: 1, backgroundColor: COLORS.White },
  icon: {
    backgroundColor: COLORS.White,
    width: 100,
    height: 100,
    borderRadius: 50,
    marginLeft: spacing.xxxl,
    marginTop: "6%",
    marginBottom: "12%",
  },
  title: {
    marginLeft: spacing.xxll,
    marginTop: spacing.xxll,
    fontSize: 30,
    color: COLORS.RoyalBlue,
    fontFamily: fontFamily.LatoRegular,
  },
});
export default EnterMobileNumber;
