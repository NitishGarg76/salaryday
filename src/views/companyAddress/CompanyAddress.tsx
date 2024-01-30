import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Back from "../../assets/vectors/Back";
import ButtonComponent from "../../components/global/ButtonComponent";
import CustomInputText from "../../components/global/CustomInputText";
import Icon from "../../components/global/Icon";
import COLORS from "../../constants/Colors";
import fontFamily from "../../constants/FontFamily";
import { spacing } from "../../constants/Spacing";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { setCompanyAddressAction } from "../../services/redux/action/actions";
import { getAuthToken, getCompanyAddressDetails } from "../../services/redux/selector/selector";
import { useNavigation } from "@react-navigation/native";
import {
  getCityList,
  getProfileDetails,
  getStateList,
} from "../../services/api-services/api";
import CustomDropDown from "../../components/global/CustomDropDown";

function CompanyAddress() {
  const dispatch = useDispatch();
  const token = useSelector(getAuthToken);
  const navigation = useNavigation();
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const compAddDtails = useSelector(getCompanyAddressDetails)
  console.log("compAddDtails testing", compAddDtails)
  const getProfileDetailData = async () => {
    const userDetails = await getProfileDetails(token);
    const data = userDetails?.data?.response?.user;

    dispatch(setCompanyAddressAction({
      addOne: data?.office_address_details?.address ?? compAddDtails?.addOne,
      addTwo: data?.office_address_details?.locality ?? compAddDtails?.addTwo,
      state: data?.office_address_details?.state.id ?? compAddDtails?.state,
      city: data?.office_address_details?.city?.id ?? compAddDtails?.city,
      pinCode: data?.office_address_details?.pincode ?? compAddDtails?.pinCode
    }));

  };
  useEffect(() => {
    getProfileDetailData();
    fetchStateList();
    fetchCityList(compAddDtails?.state)
  }, []);

  const fetchStateList = async () => {
    const stateListData = await getStateList(token);
    setStateList(stateListData.data.response);
  };

  const fetchCityList = async (stateId: any) => {
    const fetchdata = await getCityList(token, stateId);
    setCityList(fetchdata.data.response);
  };

  const validationSchema = Yup.object().shape({
    addOne: Yup.string().required("This field is mandatory.").trim(),
    addTwo: Yup.string().required("This field is mandatory.").trim(),
    city: Yup.string().required("This field is mandatory."),
    pinCode: Yup.string()
      .required("Required.")
      .matches(/^[0-9]+$/, "Please enter a valid pin.")
      .min(6, "Too Short!"),
    state: Yup.string().required("This field is mandatory."),
  });

  return (
    <View style={styles.main}>
      <View style={{ paddingHorizontal: spacing.m, marginTop: spacing.xxll }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon icon={Back} />
        </TouchableOpacity>
        <Text style={styles.heading}>Company Address</Text>
        <Text style={styles.subTitle}>
          Share your company address for verification
        </Text>
        <Formik
          enableReinitialize
          initialValues={{
            addOne: compAddDtails?.addOne ?? "",
            addTwo: compAddDtails?.addTwo ?? "",
            city: compAddDtails?.city ?? "",
            pinCode: compAddDtails?.pinCode ?? "",
            state: compAddDtails?.state ?? "",
          }}
          onSubmit={(values) => {
            navigation.goBack();
            dispatch(setCompanyAddressAction(values));
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
                    setIsFocus(false);
                    dispatch(setCompanyAddressAction({
                      addOne: values.addOne ?? compAddDtails.addOne,
                      addTwo: values.addTwo ?? compAddDtails.addTwo,
                      state: item.id,
                      city: "",
                      pinCode: values.pinCode ?? compAddDtails.pinCode,
                    }))
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
  );
}

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
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default CompanyAddress;
