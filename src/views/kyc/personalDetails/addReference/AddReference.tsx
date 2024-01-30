import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import Back from "../../../../assets/vectors/Back";
import Icon from "../../../../components/global/Icon";
import COLORS from "../../../../constants/Colors";
import fontFamily from "../../../../constants/FontFamily";
import { spacing } from "../../../../constants/Spacing";
import DownArrowIcon from "../../../../assets/vectors/DownArrow";
import ButtonComponent from "../../../../components/global/ButtonComponent";
import STRINGS from "../../../../constants/locale";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInputText from "../../../../components/global/CustomInputText";
import { Dropdown } from "react-native-element-dropdown";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuthToken,
  getPersonalReferenceDetails,
  getWorkReferenceDetails,
} from "../../../../services/redux/selector/selector";
import { PermissionsAndroid } from "react-native";
import Contacts, { Contact } from "react-native-contacts";
import Loader from "../../../../components/global/FullScreenLoader";
import {
  setPersonalReferenceAction,
  setWorkReferenceAction,
} from "../../../../services/redux/action/actions";
import { getProfileDetails } from "../../../../services/api-services/api";
import CustomModal from "../../../../components/global/CustomModal";
import Oops from "../../../../assets/vectors/Oops";

const personalList = [
  { label: "Family", value: "1" },
  { label: "Friend", value: "2" },
  { label: "Relation", value: "3" },
  { label: "Other", value: "4" },
];
const workReferenceData = [
  { label: "Team Member", value: "1" },
  { label: "Reporting Manager", value: "2" },
  { label: "Colleague", value: "3" },
];

function AddReference(props?: any) {
  const mode = props?.route?.params?.mode;
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [buttonLoader, setButtonLoader] = useState<boolean>(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [contactsList, setContactsList] = useState<Contact[]>();
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [modalError, setErrorModal] = useState<string>("");
  const personalRefData = useSelector(getPersonalReferenceDetails);
  const token = useSelector(getAuthToken);
  const workRefData = useSelector(getWorkReferenceDetails);

  const validationSchema = Yup.object().shape({
    personalMobNum: personalRefData.refNumber
      ? Yup.string().matches(/^[0-9]+$/, "Please enter a valid Number.")
      : Yup.string()
          .required("This field is mandatory.")
          .matches(/^[0-9]+$/, "Please enter a valid Number.")
          .min(10, "Please enter atleast 10 digit official number."),
    personalName: personalRefData.refName
      ? Yup.string()
          .matches(/^[a-zA-Z0-9 ]+$/, "Please enter a valid company name.")
          .trim()
      : Yup.string()
          .required("This field is mandatory")
          .matches(/^[a-zA-Z0-9 ]+$/, "Please enter a valid company name")
          .min(2, "Too Short!")
          .trim(),
    personalempType: personalRefData.refRelation
      ? Yup.string()
      : Yup.string().required("This field is mandatory."),
    workMobNum: workRefData.refNumber
      ? Yup.string().matches(/^[0-9]+$/, "Please enter a valid Number.")
      : Yup.string()
          .required("This field is mandatory.")
          .matches(/^[0-9]+$/, "Please enter a valid Number.")
          .min(10, "Please enter atleast 10 digit official number."),
    workName: workRefData.refNumber
      ? Yup.string()
          .matches(/^[a-zA-Z0-9 ]+$/, "Please enter a valid company name.")
          .trim()
      : Yup.string()
          .required("This field is mandatory")
          .matches(/^[a-zA-Z0-9 ]+$/, "Please enter a valid company name.")
          .min(2, "Too Short!")
          .trim(),
    workEmpType: workRefData.refNumber
      ? Yup.string()
      : Yup.string().required("This field is mandatory."),
  });

  const getContacts = () => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: "Contacts",
      message: "This app would like to view your contacts.",
      buttonPositive: "Please accept bare mortal",
    })
      .then((res) => {
        setButtonLoader(true);
        Contacts.getAll()
          .then((contacts) => {
            setButtonLoader(false);
            setContactsList(contacts);
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((error) => {
        console.error("Permission error: ", error);
      });
  };
  useEffect(() => {
    getContacts();
  }, []);
  const getProfileDetailData = async () => {
    const userDetails = await getProfileDetails(token);
    const data = userDetails.data?.response.user;
    mode == "edit"
      ? dispatch(
          setPersonalReferenceAction({
            refName: data?.reference_contact_name_2,
            refNumber: data?.reference_contact_no_2,
            refRelation: data?.reference_contact_relation_2,
          })
        )
      : console.log("Something went wrong");
    mode == "edit"
      ? dispatch(
          setWorkReferenceAction({
            refName: data?.reference_contact_name_1,
            refNumber: data?.reference_contact_no_1,
            refRelation: data?.reference_contact_relation_1,
          })
        )
      : console.log("Something went wrong");
  };
  useEffect(() => {
    getProfileDetailData();
  }, []);
  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.container}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            style={{ marginHorizontal: spacing.m, marginTop: spacing.sxs }}
            icon={Back}
          />
        </TouchableOpacity>
        <View style={{ paddingLeft: spacing.m }}>
          <Text style={styles.heading}>
            {STRINGS.addReference.addReference}
          </Text>
          <Text style={styles.subTitle}>
            {STRINGS.addReference.addReferenceTitle}
          </Text>
        </View>
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          <View style={styles.personalBox}>
            <Text style={styles.personalTxt}>
              {STRINGS.addReference.personalReference}
            </Text>
            <ButtonComponent
              title={"Add"}
              buttonLoading={false}
              onPress={() => {
                navigation.navigate("AddReferenceContactList", {
                  contactNumber: contactsList,
                  referenceMode: "Personal",
                });
              }}
              customStyles={styles.button}
            />
          </View>
          <Formik
            enableReinitialize
            initialValues={{
              personalMobNum: personalRefData?.refNumber ?? "",
              personalName: personalRefData?.refName ?? "",
              personalempType: "",
              workMobNum: workRefData?.refNumber ?? "",
              workName: workRefData?.refName ?? "",
              workEmpType: "",
            }}
            onSubmit={(values) => {
              dispatch(
                setPersonalReferenceAction({
                  refName: values.personalName ?? personalRefData.refName,
                  refNumber: values.personalMobNum ?? personalRefData.refNumber,
                  refRelation:
                    values.personalempType ?? personalRefData.refRelation,
                })
              );
              dispatch(
                setWorkReferenceAction({
                  refName: values.workName ?? workRefData.refName,
                  refNumber: values.workMobNum ?? workRefData.refNumber,
                  refRelation: values.workEmpType ?? workRefData.refRelation,
                })
              );
              navigation.goBack();
            }}
            validationSchema={validationSchema}
          >
            {({
              handleSubmit,
              errors,
              isValid,
              setFieldValue,
              touched,
              values,
            }) => (
              <View>
                <View>
                  <CustomInputText
                    value={values.personalMobNum}
                    errorMsg={
                      personalRefData.refNumber
                        ? ""
                        : touched.personalMobNum && errors.personalMobNum
                    }
                    isRequired={true}
                    label={"Mobile Number"}
                    customStyles={styles.input}
                    onValChange={(val) => {
                      setFieldValue("personalMobNum", val);
                    }}
                  />
                  <CustomInputText
                    value={values.personalName}
                    errorMsg={
                      personalRefData.refName
                        ? ""
                        : touched.personalName && errors.personalName
                    }
                    isRequired={true}
                    label={"Name"}
                    customStyles={styles.input}
                    onValChange={(val) => {
                      console.log("pr name", val);
                      setFieldValue("personalName", val);
                    }}
                  />

                  <View style={styles.dropdownContainer}>
                    <Dropdown
                      style={[
                        styles.dropdown,
                        isFocus && { borderColor: "blue" },
                      ]}
                      selectedTextStyle={styles.selectedTextStyle}
                      data={personalList}
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder={
                        personalRefData.refRelation
                          ?"  "+ personalRefData.refRelation
                          : "Relation"
                      }
                      placeholderStyle={{ color: COLORS.RoyalBlue }}
                      value={value}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={(item) => {
                        dispatch(
                          setPersonalReferenceAction({
                            refName:
                              values?.personalName ?? personalRefData?.refName,
                            refNumber:
                              values?.personalMobNum ??
                              personalRefData?.refNumber,
                            refRelation: item.label,
                          })
                        );
                        setFieldValue("personalempType", item.label);
                        setIsFocus(false);
                      }}
                      renderRightIcon={() => <Icon icon={DownArrowIcon} />}
                    />
                    {touched.personalempType && errors.personalempType && (
                      <Text style={{ color: COLORS.Red }}>
                        {personalRefData.refRelation
                          ? ""
                          : touched.personalempType && errors.personalempType}
                      </Text>
                    )}
                  </View>
                </View>
                <View style={styles.personalBox}>
                  <Text style={styles.personalTxt}>
                    {STRINGS.addReference.workReference}
                  </Text>
                  <ButtonComponent
                    buttonLoading={false}
                    title={"Add"}
                    onPress={() => {
                      setButtonLoader(true);
                      navigation.navigate("AddReferenceContactList", {
                        contactNumber: contactsList,
                        referenceMode: "Work",
                      });
                      setButtonLoader(false);
                    }}
                    customStyles={styles.button}
                  />
                </View>
                <View>
                  <CustomInputText
                    value={values.workMobNum}
                    errorMsg={
                      workRefData.refNumber
                        ? ""
                        : touched.workMobNum && errors.workMobNum
                    }
                    isRequired={true}
                    label={"Mobile Number"}
                    customStyles={styles.input}
                    onValChange={(val) => {
                      setFieldValue("workMobNum", val);
                    }}
                  />
                  <CustomInputText
                    value={values.workName}
                    errorMsg={
                      workRefData.refName
                        ? ""
                        : touched.workName && errors.workName
                    }
                    isRequired={true}
                    label={"Name"}
                    customStyles={styles.input}
                    onValChange={(val) => {
                      setFieldValue("workName", val);
                    }}
                  />
                  <View style={styles.dropdownContainer}>
                    <Dropdown
                      style={[
                        styles.dropdown,
                        isFocus && { borderColor: "blue" },
                      ]}
                      selectedTextStyle={styles.selectedTextStyle}
                      data={workReferenceData}
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder={
                        workRefData.refRelation
                          ? "  "+workRefData.refRelation
                          : "Relation"
                      }
                      placeholderStyle={{ color: COLORS.RoyalBlue }}
                      value={value}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={(item) => {
                        dispatch(
                          setWorkReferenceAction({
                            refName: values?.workName ?? workRefData?.refName,
                            refNumber:
                              values?.workMobNum ?? workRefData?.refNumber,
                            refRelation: item.label,
                          })
                        );
                        setFieldValue("workEmpType", item.label);
                        setIsFocus(false);
                      }}
                      renderRightIcon={() => <Icon icon={DownArrowIcon} />}
                    />
                    {touched.workEmpType && errors.workEmpType && (
                      <Text style={{ color: COLORS.Red }}>
                        {workRefData.refRelation
                          ? ""
                          : touched.workEmpType && errors.workEmpType}
                      </Text>
                    )}
                  </View>
                </View>
                <View style={styles.footerButton}>
                  <ButtonComponent
                    title={"Save & Proceed"}
                    buttonLoading={false}
                    onPress={() => {
                      if (
                        personalRefData?.refNumber &&
                        workRefData?.refNumber
                      ) {
                        if (
                          personalRefData?.refNumber === workRefData?.refNumber
                        ) {
                          setErrorModal(
                            "Personal and Work reference can't be same"
                          );
                          setShowErrorModal(true);
                        } else {
                          navigation.goBack();
                        }
                      } else {
                        handleSubmit();
                      }
                    }}
                    customStyles={styles.buttonSave}
                  />
                </View>
              </View>
            )}
          </Formik>
        </ScrollView>
        {buttonLoader && <Loader isVisible={buttonLoader} />}
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
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.Polar,
  },
  heading: {
    fontSize: 24,
    fontFamily: fontFamily.LatoBold,
    color: COLORS.RoyalBlue,
    lineHeight: 30,
    marginTop: spacing.m,
  },
  subTitle: {
    color: COLORS.RobinGreen,
    fontSize: 18,
    lineHeight: 24,
    fontFamily: fontFamily.LatoSemiBold,
    marginTop: spacing.xs,
  },
  personalBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: spacing.m,
    paddingHorizontal: spacing.m,
  },
  personalTxt: {
    fontSize: 18,
    lineHeight: 24,
    fontFamily: fontFamily.LatoSemiBold,
    marginTop: spacing.xs,
    color: COLORS.Black,
    alignItems: "center",
  },
  button: {
    backgroundColor: COLORS.RobinGreen,
    borderWidth: 1,
    borderColor: COLORS.RoyalBlue,
    paddingHorizontal: spacing.xxl,
    alignItems: "center",
  },
  footerButton: {
    alignSelf: "flex-start",
    marginTop: spacing.xxll,
  },
  buttonSave: {
    fontSize: 20,
    fontFamily: fontFamily.LatoBold,
    marginLeft: spacing.s,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.DustyGrey,
    color: COLORS.Black,
    placeholderTextColor: COLORS.RoyalBlue,
  },
  dropdownContainer: {
    paddingHorizontal: 20,
  },
  dropdown: {
    height: Platform.OS == "ios" ? 45 : 50,
    borderBottomColor: COLORS.DustyGrey,
    borderBottomWidth: 1,
    paddingLeft: spacing.xxxs,
    paddingRight: spacing.xxs,
    marginTop: Platform.OS == "ios" ? spacing.s : spacing.xxss,
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
});

export default AddReference;
