import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Icon from "../../../components/global/Icon";
import BackIcon from "../../../assets/vectors/Back";
import PaySlipIcon from "../../../assets/vectors/PaySlip";
import TwoOfFive from "../../../assets/vectors/TwoOfFive";
import CalendarIcon from "../../../assets/vectors/Calendar";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../../../constants/Colors";
import fontFamily from "../../../constants/FontFamily";
import { radius, spacing } from "../../../constants/Spacing";
import STRINGS from "../../../constants/locale";
import CustomInputText from "../../../components/global/CustomInputText";
import EnterDigit from "../../../components/EnterDigit";
import RupeeIcon from "../../../assets/vectors/RupeeIcon";
import ButtonComponent from "../../../components/global/ButtonComponent";
import DatePicker from "react-native-date-picker";
import { CommonActions, useNavigation } from "@react-navigation/native";
import DocumentPicker, { types } from "react-native-document-picker";
import PDFIcon from "../../../assets/vectors/PDFIcon";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  addEmployementDetails,
  getProfileDetails,
  updateEmploymentDetails,
  uploadPaySlips,
} from "../../../services/api-services/api";
import moment from "moment";
import RNFS from "react-native-fs";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuthToken,
  getCompanyAddressDetails,
  getEligibilityDetails,
} from "../../../services/redux/selector/selector";
import CustomModal from "../../../components/global/CustomModal";
import Oops from "../../../assets/vectors/Oops";
import { setCompanyAddressAction } from "../../../services/redux/action/actions";
import Loader from "../../../components/global/FullScreenLoader";

const data = [
  { label: "Full time", value: "1" },
  { label: "Part time", value: "2" },
];

const EmploymentDetails = (props: any) => {
  const mode = props?.route?.params?.mode ?? "New";
  const token = useSelector(getAuthToken);
  const dispatch = useDispatch();
  const companyAdd = useSelector(getCompanyAddressDetails);
  const eligibilityData = useSelector(getEligibilityDetails);
  const [companyAddRessError, setCompanyAddressError] = useState<string>("");
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState<boolean>(false);
  const navigation = useNavigation();
  const [paySlip1, setPaySlip1] = useState<string>("");
  const [paySlip2, setPaySlip2] = useState<string>("");
  const [paySlip3, setPaySlip3] = useState<string>("");
  const [pdfSizeError, setPDFSizeError] = useState<string>();
  const [buttonLoader, setButtonLoader] = useState<boolean>(false);
  const [stayYearVal, setStayYearVal] = useState<number>(0);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [modalError, setErrorModal] = useState<string>("");
  const [fullCompanyAddress, setFullCompanyAddress] = useState<string>("");
  const [underVerificationModal, setUnderVerificationModal] =
    useState<boolean>(false);
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [employementDetailData, setEmployementDetailData] = useState<
    Record<string, string | undefined>
  >({});
  const [verificationData, setVerificationData] = useState<any>(0);


  useEffect(() => {
    getProfileDetailData();
  }, []);

  const getProfileDetailData = async () => {
    const userDetails = await getProfileDetails(token);
    const data = userDetails?.data?.response?.user?.official_details[0];
    const pdfData = userDetails?.data?.response?.user?.pay_slips;
    const addressData = userDetails?.data?.response?.user;
    setVerificationData(addressData?.status)
    console.log("add ress data", addressData);

    setPaySlip1(pdfData[0]?.doc_src);
    setPaySlip2(pdfData[1]?.doc_src);
    setPaySlip3(pdfData[2]?.doc_src);
    dispatch(
      setCompanyAddressAction({
        addOne: addressData.office_address_details.address,
        addTwo: addressData.office_address_details.locality,
        city: addressData.office_address_details.city.id,
        pinCode: addressData.office_address_details.pincode,
        state: addressData.office_address_details.state.id,
      })
    );

    setEmployementDetailData({
      comp_address: data?.office_address,
      emp_id: data?.id,
      nameCompany: data?.company_name,
      typeEmployment: data?.employment_type,
      emailOfficial: data?.office_email,
      designation: data?.designation,
      numberOfficial: data?.office_contact_no,
      joiningDate: data?.joining_date,
      incomeMonthly: data?.monthly_home_salary,
    });
  };

  const uploadPDF = async (setpath: (val: string) => void) => {
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
            setpath(convertToBase64);
            setShowLoader(false);
            setPDFSizeError("");
          })
          .catch(() => { });
      } else {
        setShowLoader(false);
        setpath("");

        setPDFSizeError("This field allow only 8 mb");
      }
    } catch (e) {
      setShowLoader(false);

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

  const navigateToAddressProof = () => {
    const resetAction = CommonActions.reset({
      index: 0,
      routes: [{ name: "AddressProof" }],
    });
    mode != "edit" ? navigation.dispatch(resetAction) : navigation.goBack();
  };

  const validationSchema = Yup.object().shape({
    designation: Yup.string()
      .required("This field is mandatory.")
      .matches(/^[a-zA-Z ]+$/, "Please enter a valid name.")
      .min(5, "Please enter at least 5 char."),
    companyName: Yup.string()
      .required("This field is mandatory.")
      .matches(/^[a-zA-Z0-9 ]+$/, "Please enter a valid company name.")
      .min(5, "Please enter at least 5 char."),
    monthlyIncome: Yup.number()
      .required("This field is mandatory.")
      .moreThan(14999, "Your net salary should be 15k or more."),
    joiningDate: Yup.string().required("This field is mandatory."),
  });

  const sendData = async (
    paySlip1Val: string,
    paySlip2Val: string,
    paySlip3Val: string,
    employementType: string,
    designantion: string,
    companyName: string,
    officialnumber: string,
    officialEmail: string,
    joiningDate: string,
    monthlySalary: string
  ) => {
    setButtonLoader(true);
    let res: any = "";
    if (!paySlip1Val || !paySlip2Val || !paySlip3Val) {
      return;
    }
    if (
      !paySlip1Val.includes("https://") ||
      !paySlip2Val.includes("https://") ||
      !paySlip3Val.includes("https://")
    ) {
      const slipsArr = [];
      !paySlip1Val.includes("https://")
        ? slipsArr.push(paySlip1Val)
        : slipsArr.push("data:image/pdf;base64,");
      !paySlip2Val.includes("https://")
        ? slipsArr.push(paySlip2Val)
        : slipsArr.push("data:image/pdf;base64,");
      !paySlip3Val.includes("https://")
        ? slipsArr.push(paySlip3Val)
        : slipsArr.push("data:image/pdf;base64,");

      let paylodSlips = {
        salary_slips: slipsArr,
      };
      res = await uploadPaySlips(paylodSlips, token);
      if (res.status !== 200) {
        return;
      }
    }
    let payloadEmployment = {
      employment_type: employementType,
      designation: designantion,
      company_name: companyName,
      office_contact_no: officialnumber,
      office_email: officialEmail,
      joining_date: joiningDate,
      office_address: companyAdd.addOne,
      office_address_details: {
        address_mode: 3,
        staying_years: stayYearVal,
        address: companyAdd.addOne,
        locality: companyAdd.addTwo,
        city: companyAdd.city,
        state: companyAdd.state,
        pincode: companyAdd.pinCode,
      },
      monthly_home_salary: monthlySalary,
      employee_id: "",
      is_office_email_varify: 1,
    };

    const response =
      mode == "edit"
        ? await updateEmploymentDetails(
          payloadEmployment,
          token,
          employementDetailData.emp_id
        )
        : await addEmployementDetails(payloadEmployment, token);

    setButtonLoader(false);
    if (response.data?.success) {
      navigateToAddressProof();
    } else {
      setErrorModal(res?.data?.message + "\n" + response.data?.message);
      setShowErrorModal(true);
    }
  };

  const calculateStayYear = (value: Date) => {
    var today = new Date();
    var years = today.getFullYear() - value.getFullYear();
    setStayYearVal(years);
  };
  useEffect(() => {
    mode == "edit"
      ? setFullCompanyAddress(
        employementDetailData?.comp_address ?? " Company Address"
      )
      : setFullCompanyAddress(
        companyAdd.addOne
          ? companyAdd.addOne + "," + companyAdd.addTwo
          : " Company Address"
      );
  }, [employementDetailData, companyAdd]);
  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.container}>
      <View style={styles.container}>
        <View
          style={[
            styles.headerIconWrapper,
            {
              justifyContent: mode != "edit" ? "flex-end" : "space-between",
            },
          ]}
        >
          {mode == "edit" ? (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon icon={BackIcon} />
            </TouchableOpacity>
          ) : null}
          {mode != "edit" && <Icon icon={TwoOfFive} />}
        </View>
        <Text style={styles.titleText}>{STRINGS.employmentDetails.title}</Text>
        <Text style={styles.subTitleText}>
          {STRINGS.employmentDetails.subTitle}
        </Text>
        <View style={styles.paySlipBoxContainer}>
          <TouchableOpacity
            onPress={() => {
              uploadPDF(setPaySlip1);
            }}
            style={styles.paySlipBox}
          >
            <Icon icon={paySlip1 ? PDFIcon : PaySlipIcon} />

            <View style={styles.textContainer}>
              <Text style={styles.paySlipText}>Pay Slip 1</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              uploadPDF(setPaySlip2);
            }}
            style={styles.paySlipBox}
          >
            <Icon icon={paySlip2 ? PDFIcon : PaySlipIcon} />

            <View style={styles.textContainer}>
              <Text style={styles.paySlipText}>Pay Slip 2</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              uploadPDF(setPaySlip3);
            }}
            style={styles.paySlipBox}
          >
            <Icon icon={paySlip3 ? PDFIcon : PaySlipIcon} />

            <View style={styles.textContainer}>
              <Text style={styles.paySlipText}>Pay Slip 3</Text>
            </View>
          </TouchableOpacity>
        </View>

        <Text style={styles.infoText}>Only pdf format with max size 8MB</Text>
        {/* {pdfSizeError && ( */}
        <Text style={{ color: COLORS.Red, marginLeft: spacing.m }}>
          {pdfSizeError}
        </Text>
        {/* )} */}
        <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
          <Formik
            enableReinitialize
            initialValues={{
              companyName: employementDetailData?.nameCompany ?? "",
              emailID: employementDetailData?.emailOfficial ?? "",
              contactNumber: employementDetailData?.numberOfficial ?? "",
              designation: employementDetailData?.designation ?? "",

              monthlyIncome:
                employementDetailData?.incomeMonthly ??
                eligibilityData.monthlyIncome ??
                "",
              joiningDate: employementDetailData?.joiningDate ?? "",
            }}
            onSubmit={(value) => {
              if (
                !companyAdd.addOne ||
                !companyAdd.addTwo ||
                !companyAdd.city ||
                !companyAdd.state ||
                !companyAdd.pinCode
              ) {
                setCompanyAddressError("ThisField is Mandatory");
              } else {
                sendData(
                  paySlip1,
                  paySlip2,
                  paySlip3,
                  "salaried",
                  value.designation,
                  value.companyName,
                  value.contactNumber,
                  value.emailID,
                  value.joiningDate,
                  value.monthlyIncome
                );
              }
            }}
            validationSchema={validationSchema}
          >
            {({ handleSubmit, errors, setFieldValue, touched, values }) => (
              <View>
                <CustomInputText
                  value={values.companyName}
                  errorMsg={touched.companyName && errors.companyName}
                  label={"Company name"}
                  isRequired={true}
                  onValChange={(val) => setFieldValue("companyName", val)}
                />
                <CustomInputText
                  value={values.emailID}
                  errorMsg={touched.emailID && errors.emailID}
                  label={"Official email ID"}
                  onValChange={(val) => setFieldValue("emailID", val)}
                />
                <CustomInputText
                  value={values.contactNumber}
                  errorMsg={touched.contactNumber && errors.contactNumber}
                  label={"Official contact number"}
                  maxLength={11}
                  onValChange={(val) => setFieldValue("contactNumber", val)}
                />
                <CustomInputText
                  value={values.designation}
                  errorMsg={touched.designation && errors.designation}
                  isRequired={true}
                  label={"Designation"}
                  onValChange={(val) => setFieldValue("designation", val)}
                />
                <Pressable
                  onPress={() => setOpen(true)}
                  style={styles.datePickerContainer}
                >
                  <Text style={{ color: COLORS.RoyalBlue }}>
                    {"   Joining Date"}
                    <Text style={{ color: COLORS.Red }}>*</Text>
                  </Text>
                  <View style={{ flexDirection: "row" }}></View>
                  <Text style={{ color: COLORS.DustyGrey }}>
                    {values.joiningDate}
                  </Text>
                  <Icon icon={CalendarIcon} />
                </Pressable>
                {touched.joiningDate && errors.joiningDate && (
                  <Text style={{ color: COLORS.Red, marginLeft: spacing.m }}>
                    {touched.joiningDate && errors.joiningDate}
                  </Text>
                )}
                <DatePicker
                  modal
                  open={open}
                  mode="date"
                  date={date}
                  onConfirm={(date) => {
                    calculateStayYear(date);
                    setOpen(false);
                    setFieldValue(
                      "joiningDate",
                      moment(date).format("YYYY-MM-DD")
                    );
                  }}
                  onCancel={() => {
                    setOpen(false);
                  }}
                />
                <TouchableOpacity
                  style={styles.tab}
                  onPress={() => {
                    setCompanyAddressError("");

                    navigation.navigate("CompanyAddress");
                  }}
                >
                  <Text
                    style={{
                      color:
                        fullCompanyAddress == " Company Address"
                          ? COLORS.RoyalBlue
                          : fullCompanyAddress
                            ? COLORS.Black
                            : COLORS.RoyalBlue,
                      marginBottom: spacing.sxs,
                    }}
                  >
                    {fullCompanyAddress
                      ? "   " + fullCompanyAddress
                      : "  Company address"}
                    {
                      <Text style={{ color: COLORS.Red }}>

                        {fullCompanyAddress == " Company Address"
                          ? "*"
                          : fullCompanyAddress
                            ? ""
                            : "*"}
                      </Text>
                    }
                  </Text>
                </TouchableOpacity>
                {companyAddRessError && (
                  <Text style={{ color: COLORS.Red, marginLeft: spacing.m }}>
                    {companyAddRessError}
                  </Text>
                )}
                <View style={styles.netIncomeContainer}>
                  <Text style={styles.netMonthly}>
                    {STRINGS.eligibility.netMonthly}
                  </Text>
                  <EnterDigit
                    value={values.monthlyIncome}
                    errorMessage={touched.monthlyIncome && errors.monthlyIncome}
                    iconName={RupeeIcon}
                    hintText={"15,000"}
                    onBlur={() => { }}
                    onChangeText={(val) => {
                      setFieldValue("monthlyIncome", val);
                    }}
                  />
                </View>
                <ButtonComponent
                  title={mode == "edit" ? "Save" : "Next"}
                  onPress={
                    () => {
                      if (!paySlip1 || !paySlip2 || !paySlip3) {
                        setPDFSizeError("This Field is Mandatory.")
                      } else {
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
                      }

                    }

                  }
                  buttonLoading={buttonLoader}
                  customStyles={styles.buttonStyles}
                />
              </View>
            )}
          </Formik>
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
          confirmColor={COLORS.RobinGreen}
          iconName={Oops}
          buttonLoader={false}
          hideOnPress={() => { }}
          onConfirm={() => {
            navigation.goBack();
          }}
          onDismiss={() => { }}
          buttonLable={"Okay"}
          secondaryText={"Verification Under\n Process."}
          isVisible={underVerificationModal}
        />
        <Loader isVisible={showLoader} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.Polar,
  },
  headerIconWrapper: {
    marginTop: spacing.m,
    marginLeft: spacing.sxs,
    flexDirection: "row",
    paddingHorizontal: spacing.m,
  },
  titleText: {
    fontSize: 24,
    fontFamily: fontFamily.LatoBold,
    lineHeight: 30,
    color: COLORS.RoyalBlue,
    marginHorizontal: spacing.m,
  },
  subTitleText: {
    fontSize: 18,
    fontFamily: fontFamily.LatoBold,
    lineHeight: 24,
    color: COLORS.RobinGreen,
    marginHorizontal: spacing.m,
  },
  paySlipBoxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: spacing.m,
    marginTop: spacing.xxs,
  },
  paySlipBox: {
    borderWidth: 1,
    borderColor: COLORS.RoyalBlue,
    borderRadius: radius.xl,
    width: "28%",
    alignItems: "center",
    height: 120,
    paddingTop: spacing.l,
  },
  textContainer: {
    backgroundColor: "#ACB3BF",
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 30,
    borderBottomLeftRadius: radius.xl,
    borderBottomRightRadius: radius.xl,
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 1,
    borderTopColor: COLORS.RoyalBlue,
  },
  paySlipText: {
    fontSize: 14,
    fontFamily: fontFamily.LatoBold,
    color: COLORS.White,
    lineHeight: 18,
  },
  infoText: {
    fontSize: 12,
    fontFamily: fontFamily.LatoItalic,
    color: COLORS.MineShaft,
    lineHeight: 18,
    marginTop: spacing.xs,
    marginLeft: spacing.m,
  },
  dropdownContainer: {
    paddingHorizontal: 20,
  },
  dropdown: {
    height: 50,
    borderBottomColor: COLORS.DustyGrey,
    borderBottomWidth: 1,
    paddingLeft: spacing.xxxs,
    paddingRight: spacing.xxs,
    marginTop: 6,
    color: "black",
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    left: 15,
    top: 0,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    color: COLORS.RoyalBlue,
    fontFamily: fontFamily.LatoBold,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: COLORS.Black,
    fontFamily: fontFamily.LatoBold,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  datePickerContainer: {
    borderBottomColor: COLORS.DustyGrey,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: spacing.xxll,
  },
  netIncomeContainer: {
    alignSelf: "center",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: spacing.l,
  },
  netMonthly: {
    lineHeight: 24,
    fontFamily: fontFamily.LatoMedium,
    color: COLORS.RoyalBlue,
  },
  buttonStyles: {
    alignSelf: "flex-start",
    marginTop: spacing.xxl,
    marginLeft: spacing.s,
    paddingHorizontal: spacing.xxl,
  },
  tab: {
    marginTop: spacing.xxll,
    borderColor: COLORS.DustyGrey,
    borderBottomWidth: 1,
    marginHorizontal: spacing.m,
    justifyContent: "space-between",
  },
});

export default EmploymentDetails;
