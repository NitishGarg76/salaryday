import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Back from "../../../../assets/vectors/Back";
import Icon from "../../../../components/global/Icon";
import COLORS from "../../../../constants/Colors";
import fontFamily from "../../../../constants/FontFamily";
import { spacing } from "../../../../constants/Spacing";
import ButtonComponent from "../../../../components/global/ButtonComponent";
import CustomInputText from "../../../../components/global/CustomInputText";
import { SafeAreaView } from "react-native-safe-area-context";
import RadioWithLabel from "../../components/RadioWithLabel";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { setUserCurrentAddressAction } from "../../../../services/redux/action/actions";
import {
  getAuthToken,
  getUserCurrentAddressDetails,
} from "../../../../services/redux/selector/selector";
import {
  getCityList,
  getProfileDetails,
  getStateList,
  getStayingYears,
} from "../../../../services/api-services/api";
import CustomDropDown from "../../../../components/global/CustomDropDown";

const CurrentAddress = (props: any) => {
  const { mode } = props.route?.params;
  const token = useSelector(getAuthToken);

  const [isFocus, setIsFocus] = useState<boolean>(false);
  const navigation = useNavigation();
  const [ownHouse, setOwnHouse] = useState<boolean>(false);
  const [rentHouse, setRentHouse] = useState<boolean>(false);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [stayYearList, setStayYearList] = useState([]);

  const currentAddDetails = useSelector(getUserCurrentAddressDetails);
  useEffect(() => {
    fetchStateList();
    fetchStayingyears();
    fetchCityList(currentAddDetails?.state)
    getProfileDetailData();
  }, []);
  const getProfileDetailData = async () => {
    const userDetails = await getProfileDetails(token);
    const data = userDetails.data?.response.user.current_address_details;
    dispatch(
      setUserCurrentAddressAction({
        addOne: data?.address ?? currentAddDetails?.addOne,
        addTwo: data?.locality ?? currentAddDetails?.addTwo,
        city: data?.city?.id ?? currentAddDetails?.city,
        pinCode: data?.pincode ?? currentAddDetails?.pinCode,
        state: data?.state?.id ?? currentAddDetails?.state,
        radioVal: currentAddDetails?.radioVal ?? "",
        residingFrom: data?.staying_years ?? currentAddDetails?.residingFrom,
      })
    )
  };

  const fetchStateList = async () => {
    const stateListData = await getStateList(token);
    setStateList(stateListData.data.response);
  };

  const fetchCityList = async (stateId: any) => {
    const fetchdata = await getCityList(token, stateId);
    setCityList(fetchdata.data.response);
  };
  const fetchStayingyears = async () => {
    const satyingYears = await getStayingYears(token);
    setStayYearList(satyingYears.data.response);
  };
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    addOne: Yup.string().required("This field is mandatory.").trim(),
    addTwo: Yup.string().required("This field is mandatory.").trim(),
    city: Yup.string().required("This field is mandatory."),
    pinCode: Yup.string()
      .required("Required.")
      .matches(/^[0-9]+$/, "Please enter a valid pin.")
      .min(6, "Too Short!"),
    state: Yup.string().required("This field is mandatory."),
    radioVal: Yup.string().required("This field is mandatory."),
    residingFrom: Yup.string().required("This field is mandatory."),
  });

  console.log("da ta ta", currentAddDetails)
  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.main}>
      <View style={styles.main}>
        <View style={{ marginTop: spacing.s, marginLeft: spacing.sxs }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon icon={Back} />
          </TouchableOpacity>
          <Text style={styles.heading}>Current Address</Text>
          <Text style={styles.subTitle}>
            Share your current address for verification
          </Text>
          <Formik
            enableReinitialize
            initialValues={{
              addOne: currentAddDetails?.addOne ?? "",
              addTwo: currentAddDetails?.addTwo ?? "",
              city: currentAddDetails?.city ?? "",
              pinCode: currentAddDetails?.pinCode ?? "",
              state: currentAddDetails?.state ?? "",
              radioVal: currentAddDetails?.radioVal ?? "",
              residingFrom: Number(currentAddDetails?.residingFrom) ?? "",
            }}
            onSubmit={(values) => {
              console.log(values)
              dispatch(setUserCurrentAddressAction(values));
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
                    value={values.addOne}
                    errorMsg={touched.addOne && errors.addOne}
                    isRequired={true}
                    label={"Address Line 1"}
                    onValChange={(val) => {
                      setFieldValue("addOne", val);
                    }}
                  />
                  <CustomInputText
                    value={values.addTwo}
                    errorMsg={touched.addTwo && errors.addTwo}
                    isRequired={true}
                    label={"Address Line 2"}
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
                      dispatch(
                        setUserCurrentAddressAction({
                          addOne: values.addOne ?? currentAddDetails.addOne,
                          addTwo: values.addTwo ?? currentAddDetails.addTwo,
                          city: "",
                          pinCode: values.pinCode ?? currentAddDetails.pinCode,
                          state: item.id,
                          radioVal: currentAddDetails?.radioVal ?? "",
                          residingFrom:
                            values.residingFrom ??
                            currentAddDetails.residingFrom,
                        })
                      );
                      fetchCityList(item.id);
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
                          setFieldValue("radioVal", "Own house");
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
                          setFieldValue("radioVal", "Rent house");

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
                  {touched.residingFrom && errors.residingFrom && (
                    <Text style={{ color: COLORS.Red, marginLeft: spacing.m }}>
                      {touched.residingFrom && errors.residingFrom}
                    </Text>
                  )}
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
export default CurrentAddress;
