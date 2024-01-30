import React, { useCallback, useEffect, useState } from "react";
import {
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
  BackHandler,
} from "react-native";
import OneOfFive from "../../../assets/vectors/OneOfFive";
import PanCardIcon from "../../../assets/vectors/PanCardIcon";
import KycUserIcon from "../../../assets/vectors/KycUserIcon";
import KycCameraIcon from "../../../assets/vectors/KycCameraIcon";
import ButtonComponent from "../../../components/global/ButtonComponent";
import CircularIcon from "../../../components/global/CircularIcon";
import Icon from "../../../components/global/Icon";
import UploadDocument from "../../../components/global/UploadDocument";
import { spacing } from "../../../constants/Spacing";
import COLORS from "../../../constants/Colors";
import STRINGS from "../../../constants/locale";
import CustomInputText from "../../../components/global/CustomInputText";
import { SafeAreaView } from "react-native-safe-area-context";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { launchCamera } from "react-native-image-picker";
import { request, PERMISSIONS } from "react-native-permissions";
import { useSelector } from "react-redux";
import RNFS from "react-native-fs";
import * as Yup from "yup";
import DocumentPicker, { types } from "react-native-document-picker";
import {
  getProfileDetails,
  panAdd,
  panUpdate,
  updateProfilePic,
} from "../../../services/api-services/api";
import Calendar from "../../../assets/vectors/Calendar";
import { Formik } from "formik";
import {
  getAuthToken,
  getEligibilityDetails,
} from "../../../services/redux/selector/selector";
import fontFamily from "../../../constants/FontFamily";
import CustomModal from "../../../components/global/CustomModal";
import Oops from "../../../assets/vectors/Oops";

const PanCard = (props: any) => {
  const mode = props?.route?.params?.mode ?? "New";
  const data = useSelector(getEligibilityDetails);
  const navigation = useNavigation();
  const [underVerificationModal, setUnderVerificationModal] =
    useState<boolean>(false);
  const navigateToEmploymentDetails = () => {
    const resetAction = CommonActions.reset({
      index: 0,
      routes: [{ name: "EmploymentDetails" }],
    });

    mode != "edit" ? navigation.dispatch(resetAction) : navigation.goBack();
  };
  const [panCardURL, setPanCardURL] = useState<string>("");
  const [verificationData, setVerificationData] = useState<any>(0);
  const [imageURL, setImageURL] = useState<string>("");
  const [buttonLoader, setButtonLoader] = useState<boolean>(false);
  const [selfieError, setSelfieError] = useState<string>("");
  const [panImgError, setPanImgError] = useState<string>("");
  const token = useSelector(getAuthToken);

  const [panCardData, setPanCardData] = useState<
    Record<string, string | undefined>
  >({});
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [modalError, setErrorModal] = useState<string>("");
  useEffect(() => {
    getProfileDetailData();
  }, []);
  const getProfileDetailData = async () => {
    const userDetails = await getProfileDetails(token);
    const data = userDetails?.data?.response.user;
    console.log("data?.status on pan", data?.status);
    setVerificationData(data?.status);
    setImageURL(data?.profile_image);
    setPanCardURL(data?.financial_details[0].pan_card_image);
    setPanCardData({
      imageProfile: data?.profile_image,
      imagePancard: data?.financial_details[0].pan_card_image,
      panNumber: data?.financial_details[0].pan_number,
      panName: data?.financial_details[0].pan_user_name,
      dob: data?.dob,
    });
  };
  const clickImage = async () => {
    request(
      Platform.OS == "android"
        ? PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE &&
            PERMISSIONS.ANDROID.CAMERA
        : PERMISSIONS.IOS.PHOTO_LIBRARY && PERMISSIONS.IOS.CAMERA
    ).then((result: string) => {
      if (result == "granted") {
        launchCamera(
          {
            mediaType: "photo",
            cameraType: "front",
            includeBase64: true,
          },

          (response: any) => {
            console.log("res here", response);
            if (response.didCancel) {
            } else if (response.errorMessage) {
              setErrorModal(response.errorCode);
              setShowErrorModal(true);
            } else {
              if (response.errorCode == "camera_unavailable") {
                setErrorModal(response.errorCode);
                setShowErrorModal(true);
                return 0;
              }
              setImageURL(
                "data:image/jpg;base64," + response?.assets[0]?.base64
              );
              setSelfieError("");
            }
          }
        );
      } else {
        Linking.openSettings();
      }
    });
  };

  const submitData = async (
    imageVal: string,
    panVal: string,
    panName: any,
    panNumber: any
  ) => {
    setButtonLoader(true);
    let payloadProfilePic = {
      profile_image: imageVal,
    };
    console.log("pay load", payloadProfilePic);
    let payloadPan = {
      pan_card_image: panVal,
      pan_user_name: panName,
      pan_number: panNumber,
      dob: panCardData?.dob ?? data?.dobValue,
    };

    let profilePicRes: any = "";
    let panAddRes: any = "";
    if (imageVal.includes("https://") || panVal.includes("https://")) {
      setErrorModal(
        "change both profile pic and PanCard image to update the changes."
      );
      setShowErrorModal(true);
    } else {
      profilePicRes = await updateProfilePic(payloadProfilePic, token);
      panAddRes =
        mode == "edit"
          ? await panUpdate(payloadPan, token)
          : await panAdd(payloadPan, token);
    }

    setButtonLoader(false);
    if (profilePicRes.data?.success && panAddRes.data?.success) {
      navigateToEmploymentDetails();
    } else {
      setErrorModal(
        profilePicRes.data?.message + "\n" + panAddRes.data.message
      );
      setShowErrorModal(true);
    }
  };
  const uploadImg = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        presentationStyle: "fullScreen",
        type: [types.images],
        copyTo: "documentDirectory",
      });
      if (res.size! <= 8000000) {
        await RNFS.readFile(res.uri, "base64")
          .then((data) => {
            var convertToBase64 = "data:" + res.type + ";" + "base64," + data;

            setPanCardURL(convertToBase64);
            setPanImgError("");
          })
          .catch(() => {});
      } else {
        setPanCardURL("");
        setPanImgError("This field allow only 8 mb.");
      }
    } catch (e) {
      if (DocumentPicker.isCancel(e)) {
        console.log("Canceled from single doc picker.");
      } else {
        setErrorModal(JSON.stringify(e));
        setShowErrorModal(true);
        throw e;
      }
    }
  };
  const validationSchema = Yup.object().shape({
    panName: Yup.string()
      .required("This field is mandatory.")
      .matches(/^[a-zA-Z ]+$/, "Please enter a valid name.")
      .min(2, "Please enter at least 2 char."),
    panNumber: Yup.string()
      .matches(
        /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
        "Please write your valid PAN Card number."
      )
      .min(10, "Please enter 10 char.")
      .required("This field is mandatory."),
  });

  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Formik
          enableReinitialize
          initialValues={{
            panName: panCardData?.panName ?? "",
            panNumber: panCardData?.panNumber ?? "",
          }}
          onSubmit={(values) => {
            if (!imageURL) {
              setSelfieError("This field is mandatory");
              if (!panCardURL) {
                setPanImgError("This field is mandatory");
              }
            } else if (!panCardURL) {
              setPanImgError("This field is mandatory");
            } else {
              submitData(
                imageURL,
                panCardURL,
                values.panName,
                values.panNumber
              );
            }
          }}
          validationSchema={validationSchema}
        >
          {({ handleSubmit, errors, setFieldValue, touched, values }) => (
            <>
              <View style={styles.icon}>
                <View style={{ position: "relative" }}>
                  {imageURL ? (
                    <Image source={{ uri: imageURL }} style={styles.image} />
                  ) : (
                    <Icon icon={KycUserIcon} />
                  )}
                  <TouchableOpacity
                    onPress={() => {
                      clickImage();
                    }}
                    style={styles.cameraIconContainer}
                  >
                    <CircularIcon
                      iconName={KycCameraIcon}
                      customStyles={styles.camera}
                    />
                  </TouchableOpacity>
                </View>

                {mode != "edit" && <Icon icon={OneOfFive} />}
              </View>
              {selfieError && (
                <Text style={{ color: COLORS.Red, marginLeft: spacing.m }}>
                  {selfieError}
                </Text>
              )}
              <UploadDocument
                format={"Only jpg,png format with max\n size 8MB"}
                imageURL={panCardURL}
                onPress={() => uploadImg()}
                iconName={PanCardIcon}
                documentName={STRINGS.panCard.title}
                heading={STRINGS.panCard.heading}
                subHeading={STRINGS.panCard.subHeading}
              />
              {panImgError && (
                <Text style={{ color: COLORS.Red, marginLeft: spacing.m }}>
                  {panImgError}
                </Text>
              )}
              <CustomInputText
                setToUpperCase={"characters"}
                value={values.panName}
                errorMsg={touched.panName && errors.panName}
                isRequired={true}
                label={"Name as on PAN card"}
                onValChange={(val) => setFieldValue("panName", val)}
              />
              <CustomInputText
                setToUpperCase={"characters"}
                maxLength={10}
                value={values.panNumber}
                errorMsg={touched.panNumber && errors.panNumber}
                isRequired={true}
                label={"PAN card number"}
                onValChange={(val) => setFieldValue("panNumber", val)}
              />
              <View style={styles.tab}>
                <Text style={styles.label}>{"  Date of Birth"}</Text>
                <View style={styles.row}>
                  <Text>{panCardData?.dob ?? data.dobValue}</Text>
                  <Icon style={{ marginLeft: spacing.sxs }} icon={Calendar} />
                </View>
              </View>
              <ButtonComponent
                title={"Submit"}
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
            </>
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
        onDismiss={() => {}}
        buttonLable={"Okay"}
        secondaryText={modalError}
        isVisible={showErrorModal}
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
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center" },
  label: {
    color: COLORS.RoyalBlue,
    marginBottom: Platform.OS == "android" ? spacing.s : 10,
    paddingTop: spacing.s,
  },
  tab: {
    marginTop: Platform.OS == "ios" ? spacing.s : spacing.sxs,
    flexDirection: "row",
    alignItems: "center",
    borderColor: COLORS.DustyGrey,
    borderBottomWidth: 1,
    marginHorizontal: spacing.mm,
    justifyContent: "space-between",
  },
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: COLORS.Polar,
  },
  button: {
    alignSelf: "flex-start",
    marginVertical: "20%",
    marginLeft: spacing.m,
  },
  icon: {
    flexDirection: "row",
    marginVertical: spacing.m,
    marginHorizontal: spacing.m,
    justifyContent: "space-between",
  },
  cameraIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  camera: {
    backgroundColor: COLORS.RoyalBlue,
    borderColor: COLORS.White,
    borderWidth: 2,
    height: 30,
    width: 30,
  },
  image: {
    height: 100,
    width: 100,
    borderwidth: 2,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: COLORS.RobinGreen,
  },
  format: {
    fontFamily: fontFamily.LatoItalic,
    marginTop: spacing.xs,
    color: COLORS.MineShaft,
  },
});
export default PanCard;
