import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Back from "../../assets/vectors/Back";
import ButtonComponent from "../../components/global/ButtonComponent";
import CustomInputText from "../../components/global/CustomInputText";
import COLORS from "../../constants/Colors";
import fontFamily from "../../constants/FontFamily";
import { spacing } from "../../constants/Spacing";
import RadioWithLabel from "../kyc/components/RadioWithLabel";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Yup from "yup";
import Icon from "../../components/global/Icon";
import {
  getAuthToken,
  getUserPermanentAddressDetails,
} from "../../services/redux/selector/selector";
import { setUserPermanentAddressAction } from "../../services/redux/action/actions";
import {
  getCityList,
  getProfileDetails,
  getStateList,
  getStayingYears,
} from "../../services/api-services/api";
import CustomDropDown from "../../components/global/CustomDropDown";

const PermanentAddress = (props: any) => {
  const { mode } = props.route?.params;
  const token = useSelector(getAuthToken);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [stayYearList, setStayYearList] = useState([]);
  const [ownHouse, setOwnHouse] = useState<boolean>(false);
  const [rentHouse, setRentHouse] = useState<boolean>(false);
  useEffect(() => {
    fetchStateList();
    fetchCityList(permanentAddDetails?.state)
    fetchStayingyears();
    getProfileDetailData();
  }, []);
  const permanentAddDetails = useSelector(getUserPermanentAddressDetails);
  const getProfileDetailData = async () => {
    const userDetails = await getProfileDetails(token);
    const data = userDetails?.data?.response?.user?.permanent_address_details;
    dispatch(
      setUserPermanentAddressAction({
        addOne: data?.address ?? permanentAddDetails?.addOne,
        addTwo: data?.locality ?? permanentAddDetails?.addTwo,
        state: data?.state.id ?? permanentAddDetails?.state,
        city: data?.city.id ?? permanentAddDetails?.city,
        pinCode: data?.pincode ?? permanentAddDetails?.pinCode,
        radioVal: permanentAddDetails?.radioVal ?? "",
        residingFrom: data?.staying_years ?? permanentAddDetails?.residingFrom,
      })
    )
  };
  const fetchStateList = async () => {
    const stateListData = await getStateList(token);
    setStateList(stateListData.data?.response);
  };

  const fetchCityList = async (stateId: any) => {
    const fetchdata = await getCityList(token, stateId);
    setCityList(fetchdata.data?.response);
  };

  const fetchStayingyears = async () => {
    const satyingYears = await getStayingYears(token);
    setStayYearList(satyingYears.data?.response);
  };

  const navigateToBankDetails = () => {
    navigation.navigate("AddressProof", {
      mode: mode != "edit" ? "New User" : "edit",
    });
  };

  const validationSchema = Yup.object().shape({
    state: Yup.string().required("This field is mandatory."),
    radioVal: Yup.string().required("This field is mandatory."),
    addOne: Yup.string().required("This field is mandatory.").trim(),
    city: Yup.string().required("This field is mandatory."),
    pinCode: Yup.string()
      .required("Required.")
      .matches(/^[0-9]+$/, "Please enter a valid pin.")
      .min(6, "Too Short!"),
    addTwo: Yup.string().required("This field is mandatory.").trim(),
    residingFrom: Yup.string().required("This field is mandatory."),
  });

  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.main}>
      <View style={styles.main}>
        <View style={{ marginTop: spacing.s, marginLeft: spacing.sxs }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon icon={Back} />
          </TouchableOpacity>
          <Text style={styles.heading}>Permanent Address</Text>
          <Text style={styles.subTitle}>
            Share your permanent address for verification
          </Text>
          <Formik
            enableReinitialize
            initialValues={{
              addOne: permanentAddDetails?.addOne ?? "",
              addTwo: permanentAddDetails?.addTwo ?? "",
              city: permanentAddDetails?.city ?? "",
              pinCode: permanentAddDetails?.pinCode ?? "",
              state: permanentAddDetails?.state ?? "",
              radioVal: permanentAddDetails?.radioVal ?? "",
              residingFrom: Number(permanentAddDetails?.residingFrom) ?? "",
            }}
            onSubmit={(values) => {
              dispatch(setUserPermanentAddressAction(values));
              navigateToBankDetails();
            }}
            validationSchema={validationSchema}
          >
            {({ handleSubmit, errors, setFieldValue, touched, values }) => (
              <View>
                <View>
                  <CustomInputText
                    value={values.addOne}
                    errorMsg={touched.addOne && errors.addOne}
                    isRequired={true}
                    label="Address Line 1"
                    onValChange={(val) => {
                      setFieldValue("addOne", val);
                    }}
                  />
                  <CustomInputText
                    value={values.addTwo}
                    errorMsg={touched.addTwo && errors.addTwo}
                    isRequired={true}
                    label="Address Line 2"
                    onValChange={(val) => {
                      setFieldValue("addTwo", val);
                    }}
                  />
                  <CustomDropDown
                    search={true}
                    isFocus={isFocus}
                    dataList={stateList}
                    value={values.state}
                    onChangeItem={(item) => {
                      setFieldValue("state", item.id);
                      fetchCityList(item.id);
                      dispatch(
                        setUserPermanentAddressAction({
                          addOne:
                            values.addOne ?? permanentAddDetails.addressOne,
                          addTwo:
                            values.addTwo ?? permanentAddDetails.addressTwo,
                          state: item.id,
                          city: "",
                          pinCode:
                            values.pinCode ?? permanentAddDetails.pinCode,
                          radioVal: permanentAddDetails?.radioVal ?? "",
                          residingFrom:
                            values.residingFrom ??
                            permanentAddDetails.residingFrom,
                        })
                      );
                      setIsFocus(false);
                    }}
                    errorMessage={touched.state && errors.state}
                    labelField={"state"}
                    valueField={"id"}
                    placeHolder={"State"}
                    onFocus={() => {
                      setIsFocus(true);
                    }}
                    onBlur={() => {
                      setIsFocus(false);
                    }}
                  />
                  <CustomDropDown
                    search={true}
                    isFocus={isFocus}
                    dataList={cityList}
                    value={values.city}
                    onChangeItem={(item) => {
                      setFieldValue("city", item.id);
                      setIsFocus(false);
                    }}
                    errorMessage={touched.city && errors.city}
                    labelField={"city"}
                    valueField={"id"}
                    placeHolder={"City"}
                    onFocus={() => {
                      setIsFocus(true);
                    }}
                    onBlur={() => {
                      setIsFocus(false);
                    }}
                  />
                  <CustomInputText
                    maxLength={6}
                    value={values.pinCode}
                    errorMsg={touched.pinCode && errors.pinCode}
                    isRequired={true}
                    label="Pin Code"
                    onValChange={(val) => {
                      setFieldValue("pinCode", val);
                    }}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingLeft: spacing.s,
                      marginTop: spacing.xxxxl,
                    }}
                  >
                    <RadioWithLabel
                      label="Own house"
                      isChecked={ownHouse}
                      onClick={() => {
                        if (ownHouse) {
                          setOwnHouse(false);
                          setFieldValue("radioVal", "");
                        } else {
                          setOwnHouse(true);
                          setFieldValue("radioVal", "own house");
                          setRentHouse(false);
                        }
                      }}
                    />
                    <RadioWithLabel
                      label="Rent house"
                      isChecked={rentHouse}
                      onClick={() => {
                        if (rentHouse) {
                          setRentHouse(false);
                          setFieldValue("radioVal", "");
                        } else {
                          setRentHouse(true);
                          setFieldValue("radioVal", "rent house");

                          setOwnHouse(false);
                        }
                      }}
                    />
                  </View>
                  {touched.radioVal && errors.radioVal && (
                    <Text style={{ color: COLORS.Red, marginLeft: spacing.m }}>
                      {touched.radioVal && errors.radioVal}
                    </Text>
                  )}
                  <CustomDropDown
                    search={false}
                    isFocus={isFocus}
                    dataList={stayYearList}
                    value={values.residingFrom}
                    onChangeItem={(item) => {
                      setFieldValue("residingFrom", item.id);
                      setIsFocus(false);
                    }}
                    errorMessage={touched.residingFrom && errors.residingFrom}
                    labelField={"staying_years"}
                    valueField={"id"}
                    placeHolder={"Residing From"}
                    onFocus={() => {
                      setIsFocus(true);
                    }}
                    onBlur={() => {
                      setIsFocus(false);
                    }}
                  />
                </View>
                <View style={styles.footerButton}>
                  <ButtonComponent
                    buttonLoading={false}
                    title={"Save"}
                    onPress={handleSubmit}
                    customStyles={styles.buttonSave}
                  />
                </View>
              </View>
            )}
          </Formik>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  main: {
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
    paddingLeft: spacing.m,
  },
  buttonSave: {
    fontSize: 20,
    fontFamily: fontFamily.LatoBold,
    width: 178,
    height: 48,
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
    height: 50,
    borderBottomColor: COLORS.DustyGrey,
    borderBottomWidth: 1,
    paddingLeft: spacing.xxxs,
    paddingRight: spacing.xxs,
    marginTop: 6,
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
export default PermanentAddress;
