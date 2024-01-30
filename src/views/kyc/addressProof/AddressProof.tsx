import { CommonActions, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Back from "../../../assets/vectors/Back";
import PanCardIcon from "../../../assets/vectors/PanCardIcon";
import SecurityPassBook from "../../../assets/vectors/SecurityPassBook";
import ThreeOfFive from "../../../assets/vectors/ThreeOfFive";
import ButtonComponent from "../../../components/global/ButtonComponent";
import CustomInputText from "../../../components/global/CustomInputText";
import Icon from "../../../components/global/Icon";
import COLORS from "../../../constants/Colors";
import fontFamily from "../../../constants/FontFamily";
import { spacing } from "../../../constants/Spacing";
import RadioWithLabel from "../components/RadioWithLabel";
import AddressProofCard from "./components/AddressProofCard";
import DocumentPicker, { types } from "react-native-document-picker";
import * as Yup from "yup";
import { Formik } from "formik";
import PDFIcon from "../../../assets/vectors/PDFIcon";
import CustomModal from "../../../components/global/CustomModal";
import RNFS from "react-native-fs";
import {
  getProfileDetails,
  profileUpdate,
  sendOtpOnAdhar,
  uploadAdhaarDrivingVoterProof,
  verifyOtpONAadhar,
} from "../../../services/api-services/api";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuthToken,
  getGeolocationCordinatesDetails,
  getPersonalReferenceDetails,
  getUserCurrentAddressDetails,
  getUserPermanentAddressDetails,
  getWorkReferenceDetails,
} from "../../../services/redux/selector/selector";
import VerifyAadharOTPComponent from "../../../components/global/VerifyAdhaarOtpComponent";
import Perfect from "../../../assets/vectors/Perfect";
import {
  setAddressProofAction,
  setGeolocationAction,
  setPersonalReferenceAction,
  setUserCurrentAddressAction,
  setUserPermanentAddressAction,
  setWorkReferenceAction,
} from "../../../services/redux/action/actions";
import Oops from "../../../assets/vectors/Oops";
import Loader from "../../../components/global/FullScreenLoader";
import { Platform } from "react-native";

const AddressProof = (props: any) => {
  const mode = props?.route?.params?.mode ?? "New";
  const navigation = useNavigation();
  const navigateToPersonalDetails = () => {
    const resetAction = CommonActions.reset({
      index: 0,
      routes: [{ name: "PersonalDetails" }],
    });
    mode != "edit" ? navigation.dispatch(resetAction) : navigation.goBack();
  };
  const [showModal, setShowModal] = useState<boolean>(false);
  const [frontButtonLoader, setFrontButtonLoader] = useState<boolean>(false);
  const [backButtonLoader, setBackButtonLoader] = useState<boolean>(false);
  const [frontFilePath, setFrontFilePath] = useState<string | null>();
  const [backFilePath, setBackFilePath] = useState<string | null>();
  const [adharRadio, setAdharRadio] = useState<boolean>(false);
  const [frontImagePath, setFrontImagePath] = useState<string>();
  const [backImagePath, setBackImagePath] = useState<string>();
  const [drivingLicenceRadio, setDrivingLicenceRadio] =
    useState<boolean>(false);
  const [voterRadio, setVoterRadio] = useState<boolean>(false);
  const [buttonLoader, setButtonLoader] = useState<boolean>(false);
  const [adharnumValue, setAdharNumValue] = useState<string>();
  const token = useSelector(getAuthToken);
  const [verifyOtpLoader, setVerifyOtpLoader] = useState<boolean>(false);
  const [showPerfectModal, setShowPerfectModal] = useState<boolean>(false);
  const [showNextModal, setShowNextModal] = useState<boolean>(false);
  const [getOtpLoader, setGetOtpLoader] = useState<boolean>(false);
  const [showVerifyModal, setShowVerifyModal] = useState<boolean>(false);
  const [PermanentAdd, setPermanentAdd] = useState<boolean>(false);
  const [underVerificationModal, setUnderVerificationModal] =
    useState<boolean>(false);
  const [receivedOTP, setreceivedOTP] = useState();
  const [transactionidVal, setTransactionIDVal] = useState<string>("");
  const [adhaarVerificationError, setAdhaarVerificationError] =
    useState<string>("");
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [modalError, setErrorModal] = useState<string>("");
  const dispatch = useDispatch();
  const [sizeError, setSizeError] = useState<string>("");
  const [addressProofData, setAddressProofData] = useState<
    Record<string, string | undefined>
  >({});
  const [userId, setUserID] = useState<number>(0);
  const [loader, setLoader] = useState<boolean>(false);
  const currentAddressDetails = useSelector(getUserCurrentAddressDetails);
  const permanentAddressDetails = useSelector(getUserPermanentAddressDetails);
  const cords = useSelector(getGeolocationCordinatesDetails);
  const workReferenceContact = useSelector(getWorkReferenceDetails);
  const personalReferenceContact = useSelector(getPersonalReferenceDetails);
  const [currentAddError, setCurrentAddError] = useState<string>("");
  const [permanentAddError, setpermanentAddError] = useState<string>("");
  const [userContactNumber, setUserContactNumber] = useState();
  const [fullCurrentAddress, setFullCurrentAddress] = useState<string>("");
  const [fullPermanentAddress, setFullPermanentAddress] = useState<string>("");
  const [verificationData, setVerificationData] = useState<any>(0);

  useEffect(() => {
    getProfileDetailData();
    mode == "edit"
      ? setDrivingLicenceRadio(true)
      : setDrivingLicenceRadio(false);
  }, []);
  const getProfileDetailData = async () => {
    const userDetails = await getProfileDetails(token);
    const data = userDetails.data?.response.user;
    setFullCurrentAddress(data?.current_address);
    setFullPermanentAddress(data?.permanent_address);
    setUserID(data?.current_address_details?.user_id);
    setVerificationData(data?.status);
    // if (mode == "edit") {
    //   if (data?.status == 0) {
    //     setUnderVerificationModal(false)
    //   } else if (data?.status == 1) {
    //     setUnderVerificationModal(false)
    //   } else if (data?.status == 2) {
    //     setUnderVerificationModal(false)
    //   } else if (data?.status == 3) {
    //     setUnderVerificationModal(false)
    //   } else if (data?.status == 4) {
    //     setUnderVerificationModal(false)
    //   } else if (data?.status == 8) {
    //     setUnderVerificationModal(false)
    //   } else if (data?.status == 9) {
    //     setUnderVerificationModal(false)
    //   } else {
    //     setUnderVerificationModal(true)
    //   }
    // }
    const contactNumber = data?.contact_no;
    setUserContactNumber(contactNumber?.replace(/.(?=.{3,}$)/g, "X "));

    mode == "edit"
      ? dispatch(
          setPersonalReferenceAction({
            refName: data?.reference_contact_name_2,
            refNumber: data?.reference_contact_no_2,
            refRelation: data?.reference_contact_relation_2,
          })
        )
      : null;
    mode == "edit"
      ? dispatch(
          setWorkReferenceAction({
            refName: data?.reference_contact_name_1,
            refNumber: data?.reference_contact_no_1,
            refRelation: data?.reference_contact_relation_1,
          })
        )
      : null;
    mode == "edit"
      ? dispatch(
          setUserCurrentAddressAction({
            addOne: data?.current_address_details?.address,
            addTwo: data?.current_address_details?.locality,
            city: data?.current_address_details?.city.id,
            pinCode: data?.current_address_details?.pincode,
            radioVal: "",
            residingFrom: data?.current_address_details?.staying_years,
            state: data?.current_address_details?.state.id,
          })
        )
      : null;
    mode == "edit"
      ? dispatch(
          setGeolocationAction({
            lon: data?.current_address_details.long,
            lat: data?.current_address_details.lat,
          })
        )
      : null;
    mode == "edit"
      ? dispatch(
          setUserPermanentAddressAction({
            addOne: data?.permanent_address_details?.address,
            addTwo: data?.permanent_address_details?.locality,
            city: data?.permanent_address_details?.city?.id,
            pinCode: data?.permanent_address_details?.pincode,
            radioVal: "",
            residingFrom: data?.permanent_address_details?.staying_years,
            state: data?.permanent_address_details?.state?.id,
          })
        )
      : null;
    setAddressProofData({
      gender: data?.gender,
      martialStatus: data?.marital_status,
      frontAdhaar: data?.financial_details[0]?.aadhar_front_image,
      backAdhaar: data?.financial_details[0]?.aadhar_back_image,
      frontDriving: data?.financial_details[0]?.dl_front_image,
      backDriving: data?.financial_details[0]?.dl_back_image,
      frontVoter: data?.financial_details[0]?.voter_id_front_image,
      backVoter: data?.financial_details[0]?.voter_id_back_image,
      numberAdhar: data?.aadhar_no,
      numberDrivingLicence: data?.financial_details[0]?.dl_number,
      numberVoter: data?.financial_details[0]?.voter_id_number,
      addressCurrentAdhaar: data?.current_address,
      adressPermanentAdhaar: data?.permanent_address,
    });
    mode == "edit"
      ? data?.is_different == 1
        ? setPermanentAdd(true)
        : setPermanentAdd(false)
      : setPermanentAdd(false);
    if (data?.financial_details[0]?.dl_front_image.includes("pdf")) {
      setFrontFilePath(data?.financial_details[0]?.dl_front_image);
    } else {
      setFrontImagePath(data?.financial_details[0]?.dl_front_image);
    }
    if (data?.financial_details[0].dl_back_image.includes("pdf")) {
      setBackFilePath(data?.financial_details[0]?.dl_back_image);
    } else {
      setBackImagePath(data?.financial_details[0]?.dl_back_image);
    }
  };
  const uploadPDF = async (
    loader: (arg0: boolean) => void,
    setFrontOrBackImage: (arg0: string) => void,
    setFrontOrBackFile: (arg0: string | null) => void
  ) => {
    loader(true);
    try {
      const res = await DocumentPicker.pickSingle({
        presentationStyle: "fullScreen",
        type: [types.allFiles],
        copyTo: "documentDirectory",
      });

      if (res.size! <= 8000000) {
        if (res.type == "image/jpeg") {
          await RNFS.readFile(res.uri, "base64")
            .then((data) => {
              var convertToBase64 = "data:" + res.type + ";" + "base64," + data;
              setFrontOrBackImage(convertToBase64);
              setFrontOrBackFile("");
              setSizeError("");
            })
            .catch(() => {});
        } else if (res.type == "application/pdf") {
          await RNFS.readFile(res.uri, "base64")
            .then((data) => {
              var convertToBase64 = "data:" + res.type + ";" + "base64," + data;
              setFrontOrBackFile(convertToBase64);
              setFrontOrBackImage("");
              setSizeError("");
            })
            .catch(() => {});
        }
      } else {
        setFrontOrBackFile("");
        setFrontOrBackImage("");
        setSizeError("This field allow only 8 mb");
      }
      loader(false);
    } catch (e) {
      if (DocumentPicker.isCancel(e)) {
        loader(false);
        //If user canceled the document selection
      } else {
        //For Unknown Error
        loader(false);
        throw e;
      }
    }
  };

  const validationSchema = Yup.object().shape({
    adharNumber: adharRadio
      ? Yup.string()
          .matches(/^[0-9]+$/, "Please enter your valid Aadhar Card number.")
          .max(12, "Please enter 12 digit Aadhar number.")
      : voterRadio
      ? Yup.string()
          .matches(/^[A-Z0-9/]+$/, "Please provide your valid Voter ID.")
          .max(10, "Please enter 10 digit voter number.")
      : Yup.string()
          .matches(
            /^[a-zA-Z0-9-/]+[ ]*[a-zA-Z0-9-/]+$/,
            "Please provide your valid licence ID."
          )
          .max(16, "Please enter 16 digit Driving Licence number."),
    radioVal:
      mode == "edit"
        ? Yup.string()
        : Yup.string().required("This field is mandatory."),
  });
  const sendData = async (
    addressProof: string,
    cardNumber: string,
    frontImage: string,
    backImage: string
  ) => {
    setButtonLoader(true);
    let payloadProfilePic = {
      gender: addressProofData.gender ?? "male",
      marital_status: addressProofData.martialStatus ?? "unmarried",
      alternate_no: null,
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
      is_different: PermanentAdd ? 1 : 0,
      permanent_address: PermanentAdd
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
      reference_contact_relation_1:
        workReferenceContact.refRelation ?? "Relation",
      reference_contact_name_1: workReferenceContact.refName ?? "test",
      reference_contact_no_1: workReferenceContact.refNumber ?? 1111111111,
      reference_contact_relation_2:
        personalReferenceContact.refRelation ?? "Relation",
      reference_contact_name_2: personalReferenceContact.refName ?? "test",
      reference_contact_no_2: personalReferenceContact.refNumber ?? 1111111110,
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
        staying_years: PermanentAdd
          ? permanentAddressDetails.residingFrom
          : currentAddressDetails.residingFrom,
        address: PermanentAdd
          ? permanentAddressDetails.addOne
          : currentAddressDetails.addOne,
        locality: PermanentAdd
          ? permanentAddressDetails.addTwo
          : currentAddressDetails.addTwo,
        city: PermanentAdd
          ? permanentAddressDetails.city
          : currentAddressDetails.city,
        state: PermanentAdd
          ? permanentAddressDetails.state
          : currentAddressDetails.state,
        pincode: PermanentAdd
          ? permanentAddressDetails.pinCode
          : currentAddressDetails.pinCode,
      },
    };

    let payloadAadhar = {
      address_proof: addressProof,
      aadhar_no: cardNumber,
      aadhar_front_image: frontImage,
      aadhar_back_image: backImage,
    };

    let payloadDrivingLicence = {
      address_proof: addressProof,
      dl_number: cardNumber,
      dl_front_image: frontImage,

      dl_back_image: backImage,
    };

    let payloadVoterId = {
      address_proof: addressProof,
      voter_id_number: cardNumber,
      voter_id_front_image: frontImage,

      voter_id_back_image: backImage,
    };
    if (frontImage.includes("https://") || backImage.includes("https://")) {
      setShowErrorModal(true);
      setErrorModal("Update both front and back image to make the changes!");
    } else {
      let res = await profileUpdate(payloadProfilePic, token);

      if (res.data.success) {
        let response = await uploadAdhaarDrivingVoterProof(
          adharRadio
            ? payloadAadhar
            : drivingLicenceRadio
            ? payloadDrivingLicence
            : payloadVoterId,
          token
        );
        if (response.data?.success) {
          if (adharRadio) {
            setShowModal(true);
          } else {
            navigateToPersonalDetails();
          }
        } else {
          setErrorModal(response.data?.message);
          setShowErrorModal(true);
          setShowModal(false);
        }
      } else {
        setErrorModal(res.data?.message);
        setShowErrorModal(true);
        setShowModal(false);
      }
    }
    setButtonLoader(false);
  };

  const getOtpOnAadhar = async (user_id_data: any) => {
    setLoader(true);
    setShowModal(false);
    setGetOtpLoader(true);
    setUserID(user_id_data);
    let payload = { user_id: user_id_data, aadhar: adharnumValue };
    const response = await sendOtpOnAdhar(payload, token);
    setGetOtpLoader(false);
    setLoader(false);
    if (response.data?.response.success) {
      const transactionID = response.data?.response.data?.client_id;
      setTransactionIDVal(transactionID);
      setShowVerifyModal(true);
      setShowModal(false);
    } else {
      setErrorModal(response.data?.message);
      setShowErrorModal(true);
      setShowVerifyModal(false);
    }
  };
  const resendOTPONAdhaar = async () => {
    let payload = { user_id: userId, aadhar: adharnumValue };
    const response = await sendOtpOnAdhar(payload, token);
    if (response.data?.response.success) {
      const transactionID = response.data?.response.data?.client_id;
      setTransactionIDVal(transactionID);
    } else {
      setErrorModal(response.data?.message);
      setShowErrorModal(true);
      setShowVerifyModal(false);
    }
  };
  const verifyOTPReceivedONAadhar = async (otpVal: any) => {
    setVerifyOtpLoader(true);

    let payload = {
      user_id: userId,
      transaction_id: transactionidVal,
      otp: otpVal,
    };

    const response = await verifyOtpONAadhar(payload, token);
    setVerifyOtpLoader(false);
    console.log("otp very resp", response);
    if (response.data.code == 200) {
      setShowPerfectModal(true);
      setShowVerifyModal(false);
    } else {
      setErrorModal(response.data?.message);
      setShowErrorModal(true);
      setAdhaarVerificationError(response.data?.message);
    }
  };
  return (
    <ScrollView>
      <View style={{ marginHorizontal: spacing.m }}>
        <View
          style={[
            styles.app,
            { justifyContent: mode != "edit" ? "flex-end" : "space-between" },
          ]}
        >
          {mode == "edit" ? (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon icon={Back} />
            </TouchableOpacity>
          ) : null}
          {mode != "edit" && <Icon icon={ThreeOfFive} />}
        </View>
        <Text style={styles.header}>{"Let’s get to know your \naddress"}</Text>
        <Text style={styles.label}>Upload your address proof</Text>
      </View>
      <View>
        <Formik
          enableReinitialize
          initialValues={{
            adharNumber: adharRadio
              ? addressProofData?.numberAdhar ?? ""
              : drivingLicenceRadio
              ? addressProofData?.numberDrivingLicence ?? ""
              : voterRadio
              ? addressProofData?.numberVoter ?? ""
              : "",
            radioVal: adharRadio
              ? "aadhar"
              : voterRadio
              ? "voter"
              : drivingLicenceRadio
              ? "dl"
              : "",
          }}
          onSubmit={(val) => {
            setAdharNumValue(val.adharNumber);
            if (
              !currentAddressDetails.addOne ||
              !currentAddressDetails.addTwo ||
              !currentAddressDetails.city ||
              !currentAddressDetails.state ||
              !currentAddressDetails.pinCode
            ) {
              if (PermanentAdd) {
                if (
                  !permanentAddressDetails.addOne ||
                  !permanentAddressDetails.addTwo ||
                  !permanentAddressDetails.city ||
                  !permanentAddressDetails.state ||
                  !permanentAddressDetails.pinCode
                ) {
                  setpermanentAddError("This Field is Mandatory");
                }
              }
              setCurrentAddError("This Field is Mandatory");
            } else {
              sendData(
                val.radioVal,
                val.adharNumber,
                frontFilePath ? frontFilePath! : frontImagePath!,
                backFilePath ? backFilePath! : backImagePath!
              );

              dispatch(
                setAddressProofAction({
                  adharNumber: val.adharNumber,
                  radioVal: val.radioVal,
                  permanentSameAsCurrent: PermanentAdd,
                })
              );
            }
          }}
          validationSchema={validationSchema}
        >
          {({ handleSubmit, errors, setFieldValue, touched, values }) => (
            <View>
              <View style={{ marginLeft: spacing.m }}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  <View style={styles.row}>
                    <RadioWithLabel
                      label={"Aadhaar"}
                      isChecked={adharRadio}
                      onClick={() => {
                        if (mode != "edit") {
                          setFrontFilePath("");
                          setFrontImagePath("");
                          setBackImagePath("");
                          setBackFilePath("");
                        }
                        if (adharRadio == false) {
                          setAdharRadio(true);
                          setFieldValue("radioVal", "aadhar");
                          setDrivingLicenceRadio(false);
                          setVoterRadio(false);

                          if (mode == "edit") {
                            if (
                              addressProofData?.frontAdhaar?.includes("pdf")
                            ) {
                              setFrontFilePath(addressProofData.frontAdhaar);
                              setFrontImagePath("");
                            } else {
                              setFrontImagePath(addressProofData.frontAdhaar);
                              setFrontFilePath("");
                            }
                            if (addressProofData?.backAdhaar?.includes("pdf")) {
                              setBackFilePath(addressProofData.backAdhaar);
                              setBackImagePath("");
                            } else {
                              setBackFilePath("");
                              setBackImagePath(addressProofData.backAdhaar);
                            }
                          }
                        } else {
                          setFieldValue("radioVal", "");
                          setAdharRadio(false);
                        }
                      }}
                    />

                    <RadioWithLabel
                      label={"Driving Licence"}
                      isChecked={drivingLicenceRadio}
                      onClick={() => {
                        if (mode != "edit") {
                          setFrontFilePath("");
                          setFrontImagePath("");
                          setBackImagePath("");
                          setBackFilePath("");
                        }
                        if (drivingLicenceRadio == false) {
                          setFieldValue("radioVal", "dl");
                          setDrivingLicenceRadio(true);
                          setAdharRadio(false);

                          setVoterRadio(false);
                          if (mode == "edit") {
                            if (
                              addressProofData?.frontDriving?.includes("pdf")
                            ) {
                              setFrontFilePath(addressProofData.frontDriving);
                              setFrontImagePath("");
                            } else {
                              setFrontFilePath("");

                              setFrontImagePath(addressProofData.frontDriving);
                            }
                            if (
                              addressProofData?.backDriving?.includes("pdf")
                            ) {
                              setBackFilePath(addressProofData.backDriving);
                              setBackImagePath("");
                            } else {
                              setBackFilePath("");
                              setBackImagePath(addressProofData.backDriving);
                            }
                          }
                        } else {
                          setFieldValue("radioVal", "");
                          setDrivingLicenceRadio(false);
                        }
                      }}
                    />
                    <RadioWithLabel
                      label={"Voter ID"}
                      isChecked={voterRadio}
                      onClick={() => {
                        if (mode != "edit") {
                          setFrontFilePath("");
                          setFrontImagePath("");
                          setBackImagePath("");
                          setBackFilePath("");
                        }
                        if (voterRadio == false) {
                          setVoterRadio(true);
                          setDrivingLicenceRadio(false);
                          setFieldValue("radioVal", "voter");
                          setAdharRadio(false);
                          if (mode == "edit") {
                            if (addressProofData?.frontVoter?.includes("pdf")) {
                              setFrontFilePath(addressProofData.frontVoter);
                              setFrontImagePath("");
                            } else {
                              setFrontFilePath("");
                              setFrontImagePath(addressProofData.frontVoter);
                            }
                            if (addressProofData?.backVoter?.includes("pdf")) {
                              setBackFilePath(addressProofData.backVoter);
                              setBackImagePath("");
                            } else {
                              setBackFilePath("");
                              setBackImagePath(addressProofData.backVoter);
                            }
                          }
                        } else {
                          setVoterRadio(false);
                          setFieldValue("radioVal", "");
                        }
                      }}
                    />
                  </View>
                </ScrollView>

                {touched.radioVal && errors.radioVal && (
                  <Text style={{ color: COLORS.Red }}>
                    {touched.radioVal && errors.radioVal}
                  </Text>
                )}
                <Text
                  style={[
                    styles.format,
                    {
                      color: sizeError ? COLORS.Red : COLORS.MineShaft,
                    },
                  ]}
                >
                  {sizeError
                    ? sizeError
                    : "Only pdf, jpg,png format with max size 8MB"}
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <AddressProofCard
                    label={"Front"}
                    iconName={frontFilePath ? PDFIcon : PanCardIcon}
                    onUpload={() =>
                      uploadPDF(
                        setFrontButtonLoader,
                        setFrontImagePath,
                        setFrontFilePath
                      )
                    }
                    loader={frontButtonLoader}
                    imageURL={frontImagePath ? frontImagePath : ""}
                  />
                  <AddressProofCard
                    label={"Back"}
                    iconName={backFilePath ? PDFIcon : SecurityPassBook}
                    onUpload={() =>
                      uploadPDF(
                        setBackButtonLoader,
                        setBackImagePath,
                        setBackFilePath
                      )
                    }
                    loader={backButtonLoader}
                    imageURL={backImagePath ? backImagePath : ""}
                  />
                </View>
              </View>
              <CustomInputText
                value={values.adharNumber}
                isRequired={true}
                errorMsg={touched.adharNumber && errors.adharNumber}
                label={
                  voterRadio
                    ? "Voter ID"
                    : drivingLicenceRadio
                    ? "Driving Licence"
                    : "Aadhar Number"
                }
                onValChange={(val) => {
                  setFieldValue("adharNumber", val);
                  {
                    adharRadio && setAdharNumValue(val);
                  }
                }}
              />

              <TouchableOpacity
                onPress={() => {
                  setCurrentAddError("");
                  navigation.navigate("CurrentAddress", {
                    mode: mode != "edit" ? "New User" : "edit",
                  });
                }}
              >
                {Platform.OS == "ios" ? (
                  <View
                    style={{
                      borderColor: COLORS.DustyGrey,
                      borderBottomWidth: 1,
                      marginHorizontal: spacing.m,
                      marginTop: spacing.s,
                      paddingBottom: spacing.s,
                    }}
                  >
                    <Text
                      style={{
                        color: fullCurrentAddress
                          ? COLORS.Black
                          : COLORS.RoyalBlue,
                      }}
                    >
                      {fullCurrentAddress
                        ? "   " + fullCurrentAddress
                        : "  Current/Temporary address"}
                      <Text
                        style={{
                          color: fullCurrentAddress
                            ? COLORS.Transparent
                            : COLORS.Red,
                        }}
                      >
                        *
                      </Text>
                    </Text>
                  </View>
                ) : (
                  <CustomInputText
                    value={fullCurrentAddress}
                    editable={false}
                    isRequired={true}
                    label={"Current/Temporary address"}
                    onValChange={(val) =>
                      setFieldValue("currentOrTempAddress", val)
                    }
                  />
                )}
              </TouchableOpacity>
              {currentAddError && (
                <Text style={{ color: COLORS.Red, marginLeft: spacing.m }}>
                  {currentAddError}
                </Text>
              )}
              <View style={styles.box}>
                <Text style={styles.text}>
                  Permanent address
                  <Text style={[styles.text, { color: COLORS.Black }]}>
                    {"\nSame as current"}
                  </Text>
                </Text>

                <RadioWithLabel
                  label={"No    "}
                  isChecked={PermanentAdd}
                  onClick={() => {
                    PermanentAdd
                      ? setPermanentAdd(false)
                      : setPermanentAdd(true);
                  }}
                />
              </View>
              {PermanentAdd && (
                <TouchableOpacity
                  onPress={() => {
                    setpermanentAddError("");
                    navigation.navigate("PermanentAddress", {
                      mode: mode != "edit" ? "New User" : "edit",
                    });
                  }}
                >
                  {Platform.OS == "ios" ? (
                    <View
                      style={{
                        borderColor: COLORS.DustyGrey,
                        borderBottomWidth: 1,
                        marginHorizontal: spacing.m,
                        marginTop: spacing.s,
                        paddingBottom: spacing.s,
                      }}
                    >
                      <Text
                        style={{
                          color: fullCurrentAddress
                            ? COLORS.Black
                            : COLORS.RoyalBlue,
                        }}
                      >
                        {fullPermanentAddress
                          ? "   " + fullPermanentAddress
                          : "  Permanent address"}
                        {!fullCurrentAddress && (
                          <Text style={{ color: COLORS.Red }}>*</Text>
                        )}
                      </Text>
                    </View>
                  ) : (
                    <CustomInputText
                      value={fullPermanentAddress}
                      editable={false}
                      isRequired={true}
                      label={"Permanent address"}
                      onValChange={(val) =>
                        setFieldValue("permanentAddress", val)
                      }
                    />
                  )}
                </TouchableOpacity>
              )}
              {PermanentAdd && permanentAddError && (
                <Text style={{ color: COLORS.Red, marginLeft: spacing.m }}>
                  {permanentAddError}
                </Text>
              )}

              <ButtonComponent
                title={mode == "edit" ? "Save" : "Next"}
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
      <Loader isVisible={loader} />
      <CustomModal
        buttonLoader={getOtpLoader}
        hideOnPress={() => {
          setShowModal(false);
        }}
        onConfirm={async () => {
          const userDetails = await getProfileDetails(token);
          const data = userDetails.data?.response.user;
          userDetails.data.success
            ? getOtpOnAadhar(data?.current_address_details?.user_id)
            : null;
        }}
        onDismiss={() => {
          setShowModal(false);
        }}
        isButtonGroup={true}
        primaryText={"Is your Aadhaar linked to your mobile number? "}
        denyColor={COLORS.RoyalBlue}
        secondaryText={""}
        denyLabel={"No"}
        buttonLable={"Yes"}
        isVisible={showModal}
      />
      <VerifyAadharOTPComponent
        onCross={() => {
          console.log("bdshvdagc");
          setShowVerifyModal(false);
          setShowNextModal(true);
        }}
        userMobileNumber={"+91 " + userContactNumber}
        buttonLoader={verifyOtpLoader}
        isVisible={showVerifyModal}
        hideOnPress={() => {
          setShowVerifyModal(false);
        }}
        errorMsg={adhaarVerificationError}
        onPressResend={() => {
          resendOTPONAdhaar();
        }}
        setValue={(code) => {
          setreceivedOTP(code);
        }}
        onPressVerify={() => {
          verifyOTPReceivedONAadhar(receivedOTP);
        }}
      />
      <CustomModal
        buttonLoader={false}
        hideOnPress={() => {
          setShowPerfectModal(false);
        }}
        onConfirm={() => {
          const resetAction = CommonActions.reset({
            index: 0,
            routes: [{ name: "PersonalDetails" }],
          });
          mode != "edit"
            ? navigation.dispatch(resetAction)
            : navigation.goBack();
          setShowPerfectModal(false);
        }}
        iconName={Perfect}
        onDismiss={() => {}}
        isButtonGroup={false}
        primaryText={"Your Aadhaar has been verified successfully."}
        denyColor={COLORS.RoyalBlue}
        buttonLable={"Got It"}
        isVisible={showPerfectModal}
      />
      <CustomModal
        buttonLoader={false}
        hideOnPress={() => {
          setShowNextModal(false);
        }}
        onConfirm={() => {
          setShowNextModal(false);
        }}
        onDismiss={() => {}}
        isButtonGroup={false}
        primaryText={"Please upload your Driving Licence or Voter ID."}
        denyColor={COLORS.RoyalBlue}
        buttonLable={"Sure"}
        isVisible={showNextModal}
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
  modalBox: {
    backgroundColor: COLORS.Black + "85",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    backgroundColor: COLORS.White,
    borderRadius: 15,
    height: 600,
    width: "80%",
    alignItems: "center",
    paddingTop: spacing.l,
  },
  header: {
    color: COLORS.RoyalBlue,
    fontFamily: fontFamily.LatoBold,
    fontSize: 24,
    lineHeight: 30,
  },
  app: {
    flexDirection: "row",
    marginTop: spacing.xxll,
    marginLeft: spacing.sxs,
    alignItems: "center",
  },
  label: {
    color: COLORS.RobinGreen,
    fontFamily: fontFamily.LatoSemiBold,
    fontSize: 18,
    lineHeight: 24,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    marginTop: spacing.m,
  },
  format: {
    fontFamily: fontFamily.LatoItalic,
    marginTop: spacing.xs,
  },
  box: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing.xxxxxl,
    marginHorizontal: spacing.m,
  },
  text: {
    fontFamily: fontFamily.LatoMedium,
    lineHeight: 24,
    color: COLORS.RoyalBlue,
  },
  button: {
    alignSelf: "flex-start",
    marginVertical: 55,
    paddingHorizontal: spacing.xxll,
    marginLeft: spacing.m,
    width: 116,
  },
});

export default AddressProof;
