import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import Back from "../../../assets/vectors/Back";
import Icon from "../../../components/global/Icon";
import { spacing } from "../../../constants/Spacing";
import ButtonComponent from "../../../components/global/ButtonComponent";
import FourOfFive from "../../../assets/vectors/FourOfFive";
import COLORS from "../../../constants/Colors";
import fontFamily from "../../../constants/FontFamily";
import RadioWithLabel from "../components/RadioWithLabel";
import EnterDigit from "../../../components/EnterDigit";
import CustomInputText from "../../../components/global/CustomInputText";
import PlusIcon from "../../../assets/vectors/PlusIcon";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  getProfileDetails,
  profileUpdate,
} from "../../../services/api-services/api";
import {
  getAddressProofDetails,
  getAuthToken,
  getGeolocationCordinatesDetails,
  getPersonalReferenceDetails,
  getUserCurrentAddressDetails,
  getUserPermanentAddressDetails,
  getWorkReferenceDetails,
} from "../../../services/redux/selector/selector";
import CustomModal from "../../../components/global/CustomModal";
import Oops from "../../../assets/vectors/Oops";
import {
  setGeolocationAction,
  setUserCurrentAddressAction,
  setUserPermanentAddressAction,
} from "../../../services/redux/action/actions";

const PersonalDetails = (props?: any) => {
  const mode = props?.route?.params?.mode ?? "New";
  const token = useSelector(getAuthToken);
  const dispatch = useDispatch();
  const [personalDetailsData, setPersonalDetailsData] = useState<
    Record<string, string | undefined>
  >({});
  const [maleVal, setMaleVal] = useState<boolean>(false);
  const [femaleVal, setFemaleVal] = useState<boolean>(false);
  const [otherVal, setOtherVal] = useState<boolean>(false);
  const [buttonLoader, setButtonLoader] = useState<boolean>(false);
  const [marriedVal, setMarriedVal] = useState<boolean>(false);
  const [singleVal, setSingleVal] = useState<boolean>(false);
  const addressProof = useSelector(getAddressProofDetails);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [modalError, setErrorModal] = useState<string>("");
  const workReferenceContact = useSelector(getWorkReferenceDetails);
  const personalReferenceContact = useSelector(getPersonalReferenceDetails);
  const currentAddressDetails = useSelector(getUserCurrentAddressDetails);
  const permanentAddressDetails = useSelector(getUserPermanentAddressDetails);
  const [addReferenceError, setAddReferenceError] = useState<string>("");
  const [underVerificationModal, setUnderVerificationModal] =
    useState<boolean>(false);
    const [verificationData,setVerificationData]=useState<any>(0);

  const cords = useSelector(getGeolocationCordinatesDetails);
  useEffect(() => {
    getProfileDetailData();
  }, []);

  const getProfileDetailData = async () => {
    const userDetails = await getProfileDetails(token);
    const data = userDetails.data?.response.user;
    setVerificationData(data?.status)
    // if (mode == "edit") {
    //   if (data?.status == 0) {
    //     setUnderVerificationModal(false);
    //   } else if (data?.status == 1) {
    //     setUnderVerificationModal(false);
    //   } else if (data?.status == 2) {
    //     setUnderVerificationModal(false);
    //   } else if (data?.status == 3) {
    //     setUnderVerificationModal(false);
    //   } else if (data?.status == 4) {
    //     setUnderVerificationModal(false);
    //   } else if (data?.status == 8) {
    //     setUnderVerificationModal(false);
    //   } else if (data?.status == 9) {
    //     setUnderVerificationModal(false);
    //   } else {
    //     setUnderVerificationModal(true);
    //   }
    // }

    dispatch(
      setUserCurrentAddressAction({
        addOne: data?.current_address_details.address,
        addTwo: data?.current_address_details.locality,
        city: data?.current_address_details.city.id,
        pinCode: data?.current_address_details.pincode,
        radioVal: "",
        residingFrom: data?.current_address_details.staying_years,
        state: data?.current_address_details.state.id,
      })
    );
    dispatch(
      setGeolocationAction({
        lon: data?.current_address_details.long,
        lat: data?.current_address_details.lat,
      })
    );
    dispatch(
      setUserPermanentAddressAction({
        addOne: data?.permanent_address_details.address,
        addTwo: data?.permanent_address_details.locality,
        city: data?.permanent_address_details.city.id,
        pinCode: data?.permanent_address_details.pincode,
        radioVal: "",
        residingFrom: data?.permanent_address_details.staying_years,
        state: data?.permanent_address_details.state.id,
      })
    );
    setPersonalDetailsData({
      email: data?.email,
      contactNumber: data?.contact_no,
      gender: data?.gender,
      statusMartial: data?.marital_status,
      alternateNumber: data?.alternate_no,
    });
    data?.gender?.toLowerCase() == "male"
      ? setMaleVal(true)
      : data?.gender?.toLowerCase() == "female"
      ? setFemaleVal(true)
      : data?.gender?.toLowerCase() == "other"
      ? setOtherVal(true)
      : setOtherVal(false);
    data?.marital_status?.toLowerCase() == "unmarried"
      ? setSingleVal(true)
      : data?.marital_status?.toLowerCase() == "married"
      ? setMarriedVal(true)
      : setMarriedVal(false);
  };

  const navigation = useNavigation();
  const navigateToAddReference = () => {
    navigation.navigate("AddReference", { mode: mode });
  };

  const validationSchema = Yup.object().shape({
    alternateMobNumber: Yup.string()
      .matches(/^[0-9]+$/, "Please enter a valid number.")
      .min(10, "Too Short!"),
    genderRadioVal:
      maleVal || femaleVal || otherVal
        ? Yup.string()
        : Yup.string().required("This field is mandatory."),
    martialRadioVal:
      marriedVal || singleVal
        ? Yup.string()
        : Yup.string().required("This field is mandatory."),
  });
  const sendData = async (
    genderVal: string,
    martialStatusVal: string,
    alternateMobVal: string
  ) => {
    setButtonLoader(true);
    let payloadProfilePic = {
      gender: genderVal,
      marital_status: martialStatusVal,
      alternate_no: alternateMobVal,
      current_address:
        currentAddressDetails.addOne +
        "," +
        currentAddressDetails.addTwo +
        "," +
        currentAddressDetails.city +
        "," +
        currentAddressDetails.state +
        "," +
        currentAddressDetails.pinCode,
      is_different: addressProof.permanentSameAsCurrent ? 1 : 0,
      permanent_address: addressProof.permanentSameAsCurrent
        ? permanentAddressDetails.addOne +
          "," +
          permanentAddressDetails.addTwo +
          "," +
          permanentAddressDetails.city +
          "," +
          permanentAddressDetails.state +
          "," +
          permanentAddressDetails.pinCode
        : currentAddressDetails.addOne +
          "," +
          currentAddressDetails.addTwo +
          "," +
          currentAddressDetails.city +
          "," +
          currentAddressDetails.state +
          "," +
          currentAddressDetails.pinCode,
      reference_contact_relation_1: workReferenceContact.refRelation,
      reference_contact_name_1: workReferenceContact.refName,
      reference_contact_no_1: workReferenceContact.refNumber,
      reference_contact_relation_2: personalReferenceContact.refRelation,
      reference_contact_name_2: personalReferenceContact.refName,
      reference_contact_no_2: personalReferenceContact.refNumber,
      lat: cords?.lat ?? 0.0,
      long: cords?.lon ?? 0.0,
      current_address_details: {
        address_mode: 1,
        staying_years: currentAddressDetails.residingFrom,
        address: currentAddressDetails.addOne,
        locality: currentAddressDetails.addTwo,
        city: currentAddressDetails.city,
        state: currentAddressDetails.state,
        pincode: currentAddressDetails.pinCode,
      },
      permanent_address_details: {
        address_mode: 2,
        staying_years: addressProof.permanentSameAsCurrent
          ? permanentAddressDetails.residingFrom
          : currentAddressDetails.residingFrom,
        address: addressProof.permanentSameAsCurrent
          ? permanentAddressDetails.addOne
          : currentAddressDetails.addOne,
        locality: addressProof.permanentSameAsCurrent
          ? permanentAddressDetails.addTwo
          : currentAddressDetails.addTwo,
        city: addressProof.permanentSameAsCurrent
          ? permanentAddressDetails.city
          : currentAddressDetails.city,
        state: addressProof.permanentSameAsCurrent
          ? permanentAddressDetails.state
          : currentAddressDetails.state,
        pincode: addressProof.permanentSameAsCurrent
          ? permanentAddressDetails.pinCode
          : currentAddressDetails.pinCode,
      },
    };
    const response = await profileUpdate(payloadProfilePic, token);

    setButtonLoader(false);
    if (response.data?.success) {
      const resetAction = CommonActions.reset({
        index: 0,
        routes: [{ name: "BankDetails" }],
      });
      mode != "edit" ? navigation.dispatch(resetAction) : navigation.goBack();
    } else {
      setErrorModal(response.data?.message);
      setShowErrorModal(true);
    }
  };
  return (
    <ScrollView>
      <View style={styles.main}>
        <View
          style={[
            styles.topView,
            {
              justifyContent: mode != "edit" ? "flex-end" : "space-between",
            },
          ]}
        >
          {mode == "edit" ? (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon icon={Back} />
            </TouchableOpacity>
          ) : null}
          {mode != "edit" && <Icon icon={FourOfFive} />}
        </View>
        <View>
          <View style={styles.titleBox}>
            <Text style={styles.subTitle}>
              Let's get to know your personal details
            </Text>
          </View>
          <Formik
            enableReinitialize
            initialValues={{
              mobNumber: personalDetailsData?.contactNumber ?? "",
              emailID: personalDetailsData?.email ?? "",
              alternateMobNumber: personalDetailsData?.alternateNumber ?? "",
              referenceContactNumber: "",
              genderRadioVal: personalDetailsData?.gender ?? "",
              martialRadioVal: personalDetailsData?.statusMartial ?? "",
            }}
            onSubmit={(values) => {
              !personalReferenceContact.refRelation ||
              !workReferenceContact.refRelation
                ? setAddReferenceError("This Field is Mandatory.")
                : sendData(
                    values.genderRadioVal ?? personalDetailsData?.gender,
                    values.martialRadioVal ??
                      personalDetailsData?.statusMartial,
                    values.alternateMobNumber
                  );
            }}
            validationSchema={validationSchema}
          >
            {({ handleSubmit, errors, values, setFieldValue, touched }) => (
              <View>
                <View>
                  <View style={[styles.titleBox, { marginTop: spacing.xxl }]}>
                    <Text style={styles.inputLable}>Mobile number</Text>
                    <View>
                      <EnterDigit
                        isEditable={false}
                        value={values.mobNumber}
                        maxLength={10}
                        labelText="+91"
                        hintText="0000 000 000"
                        errorMessage={touched.mobNumber && errors.mobNumber}
                        showRightIcon={true}
                        onBlur={() => {}}
                        onChangeText={(val) => {
                          setFieldValue("mobNumber", val);
                        }}
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.emailAddress}>
                  <Text style={[styles.inputLable, { marginLeft: spacing.m }]}>
                    Email ID
                  </Text>
                  <CustomInputText
                    editable={false}
                    placeHolderColor={"#999999"}
                    value={values.emailID}
                    errorMsg={touched.emailID && errors.emailID}
                    label={"Email"}
                    onValChange={(val) => {
                      setFieldValue("emailID", val);
                    }}
                  />
                </View>
                <View style={styles.radioBtn}>
                  <RadioWithLabel
                    label="Male"
                    onClick={() => {
                      if (!maleVal) {
                        setFieldValue("genderRadioVal", "male");
                        setMaleVal(true);
                        setFemaleVal(false);
                        setOtherVal(false);
                      } else {
                        setMaleVal(false);
                        setFieldValue("genderRadioVal", "");
                      }
                    }}
                    customStyles={styles.radio}
                    isChecked={maleVal}
                  />
                  <RadioWithLabel
                    label="Female"
                    onClick={() => {
                      if (!femaleVal) {
                        setFieldValue("genderRadioVal", "female");
                        setFemaleVal(true);
                        setMaleVal(false);
                        setOtherVal(false);
                      } else {
                        setFemaleVal(false);
                        setFieldValue("genderRadioVal", "");
                      }
                    }}
                    customStyles={styles.radio}
                    isChecked={femaleVal}
                  />
                  <RadioWithLabel
                    label="Other"
                    onClick={() => {
                      if (!otherVal) {
                        setFieldValue("genderRadioVal", "other");
                        setOtherVal(true);
                        setFemaleVal(false);
                        setMaleVal(false);
                      } else {
                        setOtherVal(false);
                        setFieldValue("genderRadioVal", "");
                      }
                    }}
                    customStyles={styles.radio}
                    isChecked={otherVal}
                  />
                </View>
                {touched.genderRadioVal && errors.genderRadioVal && (
                  <Text style={{ marginLeft: spacing.m, color: COLORS.Red }}>
                    {touched.genderRadioVal && errors.genderRadioVal}
                  </Text>
                )}

                <View style={styles.radioBtnn}>
                  <RadioWithLabel
                    label="Married"
                    onClick={() => {
                      if (!marriedVal) {
                        setFieldValue("martialRadioVal", "married");

                        setMarriedVal(true);
                        setSingleVal(false);
                      } else {
                        setMarriedVal(false);
                        setFieldValue("martialRadioVal", "");
                      }
                    }}
                    customStyles={styles.radio}
                    isChecked={marriedVal}
                  />
                  <RadioWithLabel
                    label="Single"
                    onClick={() => {
                      if (!singleVal) {
                        setFieldValue("martialRadioVal", "unmarried");

                        setSingleVal(true);
                        setMarriedVal(false);
                      } else {
                        setSingleVal(false);
                        setFieldValue("martialRadioVal", "");
                      }
                    }}
                    customStyles={styles.radio}
                    isChecked={singleVal}
                  />
                </View>
                {touched.martialRadioVal && errors.martialRadioVal && (
                  <Text style={{ marginLeft: spacing.m, color: COLORS.Red }}>
                    {touched.martialRadioVal && errors.martialRadioVal}
                  </Text>
                )}
                <View>
                  <CustomInputText
                    value={values.alternateMobNumber}
                    maxLength={10}
                    errorMsg={
                      touched.alternateMobNumber && errors.alternateMobNumber
                    }
                    label={"Alternate mobile number (Optional)"}
                    onValChange={(val) => {
                      setFieldValue("alternateMobNumber", val);
                    }}
                  />
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      setAddReferenceError("");
                      navigateToAddReference();
                    }}
                  >
                    {Platform.OS == "ios" ? (
                      <View   style={{
                        alignItems:"center",
                        flexDirection:"row"
                      }}>
                        <View
                          style={{
                            flex:1,
                            borderColor: COLORS.DustyGrey,
                            borderBottomWidth: 1,
                            marginHorizontal: spacing.m,
                            marginTop: spacing.s,
                            paddingBottom: spacing.s,
                          }}
                        >
                          <Text style={{ color: COLORS.RoyalBlue }}>
                            {"   Add reference contact"}
                            <Text style={{ color: COLORS.Red }}>*</Text>
                          </Text>
                        </View>
                        <Icon style={{position:"absolute",right:20}} icon={PlusIcon} />
                      </View>
                    ) : (
                      <CustomInputText
                        value={values.referenceContactNumber}
                        editable={false}
                        maxLength={10}
                        isRequired={true}
                        errorMsg={
                          touched.referenceContactNumber &&
                          errors.referenceContactNumber
                        }
                        label={"Add reference contact"}
                        iconName={PlusIcon}
                        onValChange={(val) => {
                          setFieldValue("referenceContactNumber", val);
                        }}
                      />
                    )}
                    {addReferenceError && (
                      <Text
                        style={{ marginLeft: spacing.m, color: COLORS.Red }}
                      >
                        {addReferenceError}
                      </Text>
                    )}
                  </TouchableOpacity>

                  <Text style={styles.label}>
                    {"Require 1 personal & 1 work reference"}
                  </Text>
                </View>
                <View style={styles.titleBox}>
                  <ButtonComponent
                    title={mode == "edit" ? "Save" : "Next"}
                    buttonLoading={buttonLoader}
                    onPress={()=>{
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
                    customStyles={styles.button}
                  />
                </View>
              </View>
            )}
          </Formik>
        </View>
      </View>
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
      <CustomModal
        confirmColor={COLORS.RobinGreen}
        iconName={Oops}
        buttonLoader={false}
        hideOnPress={() => {}}
        onConfirm={() => {
          navigation.goBack();
        }}
        onDismiss={() => {}}
        buttonLable={"Okay"}
        secondaryText={"Verification Under\n Process."}
        isVisible={underVerificationModal}
      />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  label: {
    color: COLORS.Black,
    fontFamily: fontFamily.LatoItalic,
    marginLeft: spacing.s,
    marginTop: spacing.xxss,
  },
  main: {
    paddingTop: spacing.xxxl,
    paddingBottom: spacing.xxl,
  },
  titleBox: {
    paddingLeft: spacing.m,
    paddingRight: spacing.m,
  },
  topView: {
    flexDirection: "row",
    paddingLeft: spacing.m,
    paddingRight: spacing.m,
  },
  subTitle: {
    fontSize: 24,
    color: COLORS.RoyalBlue,
    fontFamily: fontFamily.LatoBold,
    lineHeight: 30,
    width: "80%",
  },
  addressProof: {
    fontSize: 18,
    color: COLORS.RobinGreen,
    fontFamily: fontFamily.LatoBold,
    lineHeight: 30,
    width: "80%",
    marginTop: spacing.m,
  },
  radioBtn: {
    flexDirection: "row",
    marginTop: spacing.m,
    paddingLeft: spacing.m,
    paddingRight: spacing.m,
  },
  radioBtnn: {
    flexDirection: "row",
    width: "58%",
    marginTop: spacing.m,
    paddingLeft: spacing.m,
    paddingRight: spacing.m,
  },
  radio: {
    color: COLORS.RoyalBlue,
    fontSize: 18,
    marginRight: spacing.m,
    width: 95,
    justifyContent: "space-between",
  },
  button: {
    alignSelf: "flex-start",
    marginTop: spacing.xl,
    width: 116,
  },
  inputLable: {
    fontSize: 14,
    lineHeight: 24,
    color: COLORS.RoyalBlue,
    fontFamily: fontFamily.LatoMedium,
  },
  emailAddress: {
    width: "100%",
    marginTop: spacing.xxs,
  },
});

export default PersonalDetails;
