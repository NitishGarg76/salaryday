import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import UploadDocument from "../../../components/global/UploadDocument";
import Icon from "../../../components/global/Icon";
import Back from "../../../assets/vectors/Back";
import { spacing } from "../../../constants/Spacing";
import STRINGS from "../../../constants/locale";
import COLORS from "../../../constants/Colors";
import fontFamily from "../../../constants/FontFamily";
import PanCardIcon from "../../../assets/vectors/PanCardIcon";
import ButtonComponent from "../../../components/global/ButtonComponent";
import CustomInputText from "../../../components/global/CustomInputText";
import FiveOfFive from "../../../assets/vectors/FiveOfFive";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  uploadBankStatements,
  updateBankDetails,
  getBankNames,
  getProfileDetails,
} from "../../../services/api-services/api";
import DocumentPicker, { types } from "react-native-document-picker";
import { getAuthToken } from "../../../services/redux/selector/selector";
import { useDispatch, useSelector } from "react-redux";
import RNFS from "react-native-fs";
import CustomModal from "../../../components/global/CustomModal";
import Perfect from "../../../assets/vectors/Perfect";
import PDFIcon from "../../../assets/vectors/PDFIcon";
import { setKyCompletedAction } from "../../../services/redux/action/actions";
import Oops from "../../../assets/vectors/Oops";
import CustomDropDown from "../../../components/global/CustomDropDown";
import Loader from "../../../components/global/FullScreenLoader";

const BankDetails = (props: any) => {
  const mode = props?.route?.params?.mode ?? "New";
  const token = useSelector(getAuthToken);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [bankStatementURL, setBankStatementURL] = useState<string>("");
  const [buttonLoader, setButtonLoader] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [pdfError, setPdfError] = useState<string>("");
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [modalError, setErrorModal] = useState<string>("");
  const [bankNameList, setBankNameList] = useState([]);
  const [updated, setUpdated] = useState<boolean>(false);
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [underVerificationModal, setUnderVerificationModal] = useState<boolean>(false);
  const [bankDetailsData, setBankDetailsData] = useState<
    Record<string, string | undefined>
  >({});
  const [verificationData, setVerificationData] = useState<any>(0);

  const getProfileDetailData = async () => {
    const userDetails = await getProfileDetails(token);
    const data = userDetails?.data?.response.user?.financial_details[0];
    const user_Data = userDetails?.data?.response.user;
    setVerificationData(user_Data?.status)
    // if (mode == "edit") {
    //   if (user_Data?.status == 0) {
    //     setUnderVerificationModal(false)
    //   } else if (user_Data?.status == 1) {
    //     setUnderVerificationModal(false)
    //   } else if (user_Data?.status == 2) {
    //     setUnderVerificationModal(false)
    //   } else if (user_Data?.status == 3) {
    //     setUnderVerificationModal(false)
    //   } else if (user_Data?.status == 4) {
    //     setUnderVerificationModal(false)
    //   } else if (user_Data?.status == 8) {
    //     setUnderVerificationModal(false)
    //   } else if (user_Data?.status == 9) {
    //     setUnderVerificationModal(false)
    //   } else {
    //     setUnderVerificationModal(true)
    //   }
    // }
    setBankStatementURL(userDetails?.data?.response.user?.bank_statement);
    setBankDetailsData({
      numberAccount: data.account_no,
      nameAccount: data.account_name,
      codeIFSC: data.ifsc_code,
      branchNameOrAddress: data.bank_address,
      nameBank: data.bank_name,
    });
  };

  const validationSchema = Yup.object().shape({
    bankName: Yup.string()
      .required("This field is mandatory.")
      .matches(/^[a-zA-Z ]+$/, "Please enter a valid Account name.")
      .min(2, "Too Short!"),
    accName: Yup.string()
      .required("This field is mandatory.")
      .matches(/^[a-zA-Z ]+$/, "Please enter a valid Account name.")
      .min(5, "This field must be atleast 5 letters longer."),
    branchName: Yup.string()
      .required("This field is mandatory."),
    accNumber: Yup.string()
      .required("This field is mandatory.")
      .matches(/^[0-9]+$/, "Please enter a valid Number.")
      .min(5, "Please enter at least 5 digits number."),
    confirmAccNumber: Yup.string()
      .required("This field is mandatory.")
      .matches(/^[0-9]+$/, "Please enter a valid Number.")
      .min(5, "Please enter at least 5 digits number."),
    ifsc: Yup.string()
      .required("This field is mandatory.")
      .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Please enter a valid Number.")
      .min(11, "Please enter 11 digit IFSC code."),
  });

  useEffect(() => {
    getProfileDetailData();
    fetchBankName();
  }, []);

  const fetchBankName = async () => {
    const bankList = await getBankNames(token);
    setBankNameList(bankList?.data?.response?.Banks);
  };

  const uploadPDF = async () => {
    setShowLoader(true);
    try {
      const res = await DocumentPicker.pickSingle({
        presentationStyle: "fullScreen",
        type: [types.pdf],
        copyTo: "documentDirectory",
      });
      if (res.size! <= 8000000) {
        await RNFS.readFile(res.uri, "base64")
          .then((data) => {
            var convertToBase64 = "data:" + res.type + ";" + "base64," + data;
            setUpdated(true);
            setShowLoader(false)
            setBankStatementURL(convertToBase64);
            setPdfError("");
          })
          .catch((err) => { });
      } else {
        setBankStatementURL("");
        setShowLoader(false)
        setPdfError("This field allow only 8 mb");
      }
    } catch (e) {
      setShowLoader(false)
      if (DocumentPicker.isCancel(e)) {
        //If user canceled the document selection
        console.log("Canceled from single doc picker");
      } else {
        //For Unknown Error
        console.log("Unknown Error: " + JSON.stringify(e));
        throw e;
      }
    }
  };

  const submitData = async (
    bankNameVal: string,
    accNumberVal: string,
    confirmAccNumberVal: string,
    accNameVal: string,
    ifscVal: string,
    branchNameVal: string
  ) => {
    setButtonLoader(true);
    let payloadBankStatements = {
      bank_statements: [bankStatementURL],
    };
    let payloadbankDetailsUpdate = {
      bank_name: bankNameVal,
      account_no: accNumberVal,
      account_name: accNameVal,
      ifsc_code: ifscVal,
      bank_address: branchNameVal,
    };
    console.log("payloadBankStatements", payloadBankStatements)
    console.log("payloadbankDetailsUpdate", payloadbankDetailsUpdate)
    const bankStatementsRes = await uploadBankStatements(
      payloadBankStatements,
      token
    );
    console.log("bankStatementsRes nitish", bankStatementsRes.data)
    if (updated) {
      if (bankStatementsRes.data.success) {
        const bankDetailsUpdateRes = await updateBankDetails(
          payloadbankDetailsUpdate,
          token
        );
        console.log("bankDetailsUpdateRes nitish", bankDetailsUpdateRes.data)

        if (bankDetailsUpdateRes.data.success) {
          setButtonLoader(false);
          // dispatch(setKyCompletedAction(true));
          mode != "edit" ? setShowModal(true) : navigation.goBack();
        } else {
          setErrorModal(bankDetailsUpdateRes.data.message);
          setShowErrorModal(true);
          setButtonLoader(false);
        }
      } else {
        setErrorModal(bankStatementsRes.data.message);
        setShowErrorModal(true);
        setButtonLoader(false);
      }
    } else {
      const bankDetailsUpdateRes = await updateBankDetails(
        payloadbankDetailsUpdate,
        token
      );
      if (bankDetailsUpdateRes.data.success) {
        setButtonLoader(false);
        // dispatch(setKyCompletedAction(true));
        mode != "edit" ? setShowModal(true) : navigation.goBack();
      } else {
        setErrorModal(bankDetailsUpdateRes.data.message);
        setShowErrorModal(true);
        setButtonLoader(false);
      }
    }
  };

  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.main}>
      <View style={[styles.main]}>
        <View style={[styles.back, {
          justifyContent: mode != "edit" ? "flex-end" : "space-between",
        }]}>
          {mode == "edit" ? <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon icon={Back} />
          </TouchableOpacity> : null}
          {mode != "edit" && <Icon icon={FiveOfFive} />}
        </View>
        <ScrollView>
          <View style={{ flex: 1, backgroundColor: COLORS.Polar }}>
            <Formik
              enableReinitialize
              initialValues={{
                bankName: bankDetailsData?.nameBank ?? "",
                accNumber: bankDetailsData?.numberAccount ?? "",
                confirmAccNumber: bankDetailsData?.numberAccount ?? "",
                accName: bankDetailsData?.nameAccount ?? "",
                ifsc: bankDetailsData?.codeIFSC ?? "",
                branchName: bankDetailsData?.branchNameOrAddress ?? "",
              }}
              onSubmit={(values) => {
                if (values.accNumber != values.confirmAccNumber) {
                  setErrorModal("Bank account numbers should be Same!");
                  setShowErrorModal(true);
                } else {
                  if (bankStatementURL) {
                    submitData(
                      values.bankName,
                      values.accNumber,
                      values.confirmAccNumber,
                      values.accName,
                      values.ifsc,
                      values.branchName
                    );
                  } else {
                    setPdfError("This field is Mandatory");
                  }
                }
              }}
              validationSchema={validationSchema}
            >
              {({ setFieldValue, handleSubmit, errors, touched, values }) => (
                <View >
                  <UploadDocument
                    format={"Only pdf format with max size 8MB"}
                    iconName={bankStatementURL ? PDFIcon : PanCardIcon}
                    documentName={STRINGS.bankDetails.title}
                    heading={STRINGS.bankDetails.heading}
                    subHeading={STRINGS.bankDetails.subHeading}
                    onPress={() => uploadPDF()}
                  />
                  {pdfError && (
                    <Text style={{ color: COLORS.Red, marginLeft: spacing.m }}>
                      {pdfError}
                    </Text>
                  )}

                  <CustomDropDown
                    search={true}
                    isFocus={isFocus}
                    dataList={bankNameList}
                    value={values.bankName}
                    onChangeItem={(item) => {
                      setFieldValue("bankName", item.name);
                      setFieldValue("ifsc", "");

                      setIsFocus(false);
                    }}
                    errorMessage={touched.bankName && errors.bankName}
                    labelField={"name"}
                    valueField={"name"}
                    placeHolder={"Bank Name"}
                    onFocus={() => {
                      setIsFocus(true);
                    }}
                    onBlur={() => {
                      setIsFocus(false);
                    }}
                  />
                  <CustomInputText
                    value={values.accNumber}
                    label={"Account number"}
                    onValChange={(val) => setFieldValue("accNumber", val)}
                    errorMsg={touched.accNumber && errors.accNumber}
                    isRequired={true}
                  />
                  <CustomInputText
                    value={values.confirmAccNumber}
                    label={"Confirm account number"}
                    onValChange={(val) =>
                      setFieldValue("confirmAccNumber", val)
                    }
                    errorMsg={
                      touched.confirmAccNumber && errors.confirmAccNumber
                    }
                    isRequired={true}
                  />
                  <CustomInputText
                    value={values.accName}
                    label={"Account holder name"}
                    onValChange={(val) => setFieldValue("accName", val)}
                    errorMsg={touched.accName && errors.accName}
                    isRequired={true}
                  />
                  <CustomInputText
                    setToUpperCase={"characters"}
                    value={values.ifsc}
                    label={"IFSC code"}
                    onValChange={(val) => setFieldValue("ifsc", val)}
                    errorMsg={touched.ifsc && errors.ifsc}
                    isRequired={true}
                  />
                  <CustomInputText
                    value={values.branchName}
                    label={"Branch name/Bank Address"}
                    onValChange={(val) => setFieldValue("branchName", val)}
                    errorMsg={touched.branchName && errors.branchName}
                    isRequired={true}
                  />
                  <ButtonComponent
                    title={mode == "edit" ? "Save" : "Finish"}
                    onPress={() => {
                      if (mode == "edit") {
                        if (
                          verificationData == 0 ||
                          verificationData == 1 ||
                          verificationData == 2 ||
                          verificationData == 3 ||
                          verificationData == 4 ||
                          verificationData == 8 ||
                          verificationData == 9
                        ) {
                          setUnderVerificationModal(false);
                          handleSubmit();
                        } else {
                          setUnderVerificationModal(true);
                        }
                      } else {
                        handleSubmit();
                      }
                    }}
                    buttonLoading={buttonLoader}
                    customStyles={styles.button}
                  />
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>
      </View>
      <CustomModal
        buttonLoader={false}
        hideOnPress={() => {
          setShowModal(false);
        }}
        onConfirm={() => {
          const resetAction = CommonActions.reset({
            index: 0,
            routes: [{ name: "Dashboard" }],
          });
          navigation.dispatch(resetAction);

          setShowModal(false);
        }}

        onDismiss={() => {
          setShowModal(false);
        }}
        isButtonGroup={false}
        primaryText={""}
        linkText={"Awesome!"}
        secondaryText={"\nGo ahead and quickly \napply for a loan."}
        iconName={Perfect}
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
      <CustomModal
        confirmColor={COLORS.RobinGreen}
        iconName={Oops}
        buttonLoader={false}
        hideOnPress={() => { }}
        onConfirm={() => {
          navigation.goBack()
        }}
        onDismiss={() => { }}
        buttonLable={"Okay"}
        secondaryText={"Verification Under\n Process."}
        isVisible={underVerificationModal}
      />
      <Loader isVisible={showLoader} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderBottomColor: COLORS.DustyGrey,
    borderBottomWidth: 1,
    paddingLeft: spacing.xxxs,
    paddingRight: spacing.xxs,
    marginTop: 6,
  },
  selectedTextStyle: {
    fontSize: 12,
    color: COLORS.RoyalBlue,
    fontFamily: fontFamily.LatoBold,
  },
  button: {
    alignSelf: "flex-start",
    marginVertical: "20%",
    marginLeft: spacing.m,
  },
  format: {
    fontFamily: fontFamily.LatoItalic,
    marginTop: spacing.xs,
    color: COLORS.MineShaft,
  },
  main: {
    height: "100%",
    width: "100%",
    backgroundColor: COLORS.Polar,
  },
  back: {
    marginTop: spacing.s,
    marginLeft: spacing.sxs,
    paddingLeft: spacing.m,
    paddingRight: spacing.m,
    flexDirection: "row",
  },
  title: {
    fontSize: 24,
    color: COLORS.RoyalBlue,
    width: "80%",
    fontFamily: fontFamily.LatoBold,
    lineHeight: 30,
  },
  subTitle: {
    color: COLORS.RobinGreen,
  },
  dropdownContainer: {
    paddingHorizontal: 20,
  },
});
export default BankDetails;
