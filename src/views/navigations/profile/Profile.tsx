import React, { FC, useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ColorValue,
} from "react-native";
import PageWrapper from "../../../components/global/PageWrapper";
import COLORS from "../../../constants/Colors";
import { spacing } from "../../../constants/Spacing";
import Icon, { IconProp } from "../../../components/global/Icon";
import ProfilePanCardIcon from "../../../assets/vectors/ProfilePanCardIcon";
import EmployementDetails from "../../../assets/vectors/EmployementDetails";
import KycDetailsIcon from "../../../assets/vectors/KycDetails";
import ArrowRight from "../../../assets/vectors/ArrowRight";
import STRINGS from "../../../constants/locale";
import BankDetails from "../../../assets/vectors/BankDetails";
import fontFamily from "../../../constants/FontFamily";
import personalDetails from "../../../assets/vectors/PersonalDetails";
import MenuIcon from "../../../assets/vectors/MenuIcon";
import CircularProgress from "react-native-circular-progress-indicator";
import { useNavigation } from "@react-navigation/native";
import { getAuthToken } from "../../../services/redux/selector/selector";
import { getProfileDetails } from "../../../services/api-services/api";
import { useSelector } from "react-redux";
import Loader from "../../../components/global/FullScreenLoader";

interface InfoRowProps {
  iconName?: IconProp;
  title: string;
  percentage: string;
  onPress: () => void;
  progressColor: ColorValue;
}

const ProfileInfoRow: FC<InfoRowProps> = ({
  iconName,
  title,
  percentage,
  onPress,
  progressColor,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.profileInfoRow}>
      <View style={styles.aboutMain}>
        <Icon icon={iconName} style={styles.icon} />
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.rightSection}>
        <Text style={[styles.percentage, { color: progressColor }]}>
          {percentage}
        </Text>
        <Icon icon={ArrowRight} />
      </View>
    </TouchableOpacity>
  );
};

const Profile = () => {
  const navigation = useNavigation();
  const token = useSelector(getAuthToken);
  const [profileData, setProfileData] = useState<
    Record<string, string | undefined>
  >({});
  const [panProgress, setPanProgressData] = useState<number>(0);
  const [kycProgress, setKycProgress] = useState<number>(0);
  const [employementProgress, setEmployementProgressData] = useState<number>(0);
  const [personalProgress, setPersonalProgressData] = useState<number>(0);
  const [bankProgress, setbankProgressData] = useState<number>(0);
  const [totalProgress, setTotalProgress] = useState<number>(0);
  const [loader, setLoader] = useState<boolean>(false);
  const getProfileDetailData = async () => {
    const userDetails = await getProfileDetails(token);
    const data = userDetails.data?.response.user;

    const profileImage = data?.profile_image ? 20 : 0;
    const panCardImage = data?.financial_details[0].pan_card_image ? 20 : 0;
    const pancardName = data?.financial_details[0].pan_user_name ? 20 : 0;
    const pannumber = data?.financial_details[0].pan_number ? 20 : 0;
    const DOB = data?.dob ? 20 : 0;
    const adharFrontImage = data?.financial_details[0].aadhar_front_image
      ? 5
      : 0;
    const adharBackImage = data?.financial_details[0]?.aadhar_back_image
      ? 5
      : 0;
    const dlFrontImage = data?.financial_details[0]?.dl_front_image ? 5 : 0;
    const dlBackImage = data?.financial_details[0]?.dl_back_image ? 5 : 0;
    const voterFrontImage = data?.financial_details[0]?.voter_id_front_image
      ? 5
      : 0;
    const voterBackImage = data?.financial_details[0].voter_id_back_image
      ? 5
      : 0;
    const adharNumber = data?.aadhar_no ? 5 : 0;
    const dlNumber = data?.financial_details[0].dl_number ? 5 : 0;
    const voterNumber = data?.financial_details[0].voter_id_number ? 5 : 0;
    const currentAddOne = data?.current_address_details.address ? 5 : 0;
    const currentAddTwo = data?.current_address_details.locality ? 5 : 0;
    const currentAddState = data?.current_address_details.state.id ? 5 : 0;
    const currentAddCity = data?.current_address_details.city.id ? 5 : 0;
    const currentAddPinCode = data?.current_address_details.pincode ? 5 : 0;
    const currentAddResidingFrom = data?.current_address_details.staying_years
      ? 5
      : 0;
    const permanentAddOne = data?.permanent_address_details.address ? 5 : 0;
    const permanentAddTwo = data?.permanent_address_details.locality ? 5 : 0;
    const permanentAddState = data?.permanent_address_details.state.id ? 5 : 0;
    const permanentAddCity = data?.permanent_address_details.city.id ? 0 : 0;
    const permanentAddPinCode = data?.permanent_address_details.pincode ? 5 : 0;
    const permanentAddResidingFrom = data?.permanent_address_details
      .staying_years
      ? 5
      : 0;

    const EmployementSlip1 = data?.pay_slips[0]?.doc_src ? 10 : 0;
    const EmployementSlip2 = data?.pay_slips[1]?.doc_src ? 10 : 0;
    const EmployementSlip3 = data?.pay_slips[2]?.doc_src ? 10 : 0;
    const companyName = data?.official_details[0]?.company_name ? 10 : 0;
    const officialemailId = data?.official_details[0].office_email ? 10 : 0;
    const officialContactNumber = data?.official_details[0].office_contact_no
      ? 10
      : 0;
    const designation = data?.official_details[0].designation ? 10 : 0;
    const joiningDate = data?.official_details[0].joining_date ? 10 : 0;
    const companyAddOne = data?.office_address_details.address ? 2 : 0;
    const companyAddTwo = data?.office_address_details.locality ? 2 : 0;
    const companyAddState = data?.office_address_details.state.id ? 2 : 0;
    const companyAddCity = data?.office_address_details.city.id ? 2 : 0;
    const companyAddPinCode = data?.office_address_details.pincode ? 2 : 0;
    const monthlyNetIncome = data?.official_details[0].monthly_home_salary
      ? 10
      : 0;
    const personalMobile = data?.contact_no ? 10 : 0;
    const personalEmail = data?.email ? 10 : 0;
    const gender = data?.gender ? 10 : 0;
    const martialStatus = data?.marital_status ? 10 : 0;
    const alternateNumber = data?.alternate_no ? 10 : 0;
    const personalRefNumber = data?.reference_contact_no_2 ? 10 : 0;
    const personalName = data?.reference_contact_name_2 ? 10 : 0;
    const personalRelation = data?.reference_contact_relation_2 ? 5 : 0;
    const workName = data?.reference_contact_name_1 ? 10 : 0;
    const workrefNumber = data?.reference_contact_no_1 ? 10 : 0;
    const workRelation = data?.reference_contact_relation_1 ? 5 : 0;

    const bankdetailSlip = data?.bank_statement ? 50 : 0;
    const bankName = data?.financial_details[0].bank_name ? 10 : 0;
    const accNumber = data?.financial_details[0].account_no ? 10 : 0;
    const accName = data?.financial_details[0].account_name ? 10 : 0;
    const ifscCode = data?.financial_details[0].ifsc_code ? 10 : 0;
    const branchName = data?.financial_details[0].bank_address ? 10 : 0;

    const kycProgressData =
      adharFrontImage +
      adharBackImage +
      dlFrontImage +
      dlBackImage +
      voterFrontImage +
      voterBackImage +
      adharNumber +
      dlNumber +
      voterNumber +
      currentAddOne +
      currentAddTwo +
      currentAddState +
      currentAddCity +
      currentAddPinCode +
      currentAddResidingFrom +
      permanentAddOne +
      permanentAddTwo +
      permanentAddState +
      permanentAddCity +
      permanentAddPinCode +
      permanentAddResidingFrom;

    const employmentProgressData =
      EmployementSlip1 +
      EmployementSlip2 +
      EmployementSlip3 +
      companyName +
      officialemailId +
      officialContactNumber +
      designation +
      joiningDate +
      companyAddOne +
      companyAddTwo +
      companyAddState +
      companyAddCity +
      companyAddPinCode +
      monthlyNetIncome;

    const panProgressdata =
      profileImage + panCardImage + pancardName + pannumber + DOB;

    const personalProgressData =
      personalMobile +
      personalEmail +
      gender +
      martialStatus +
      alternateNumber +
      personalRefNumber +
      personalName +
      personalRelation +
      workName +
      workrefNumber +
      workRelation;

    const bankProgressData =
      bankdetailSlip + bankName + accNumber + accName + ifscCode + branchName;

    setPanProgressData(panProgressdata);
    setKycProgress(kycProgressData);
    setEmployementProgressData(employmentProgressData);
    setPersonalProgressData(personalProgressData);
    setbankProgressData(bankProgressData);
    setTotalProgress(
      (panProgressdata +
        kycProgressData +
        employmentProgressData +
        bankProgressData +
        personalProgressData) /
      5
    );
    setLoader(false)

    setProfileData({
      firstName: data?.first_name,
      lastName: data?.last_name,
      profileImage: data?.profile_image,
    });
  };
  const fetchingData = useCallback(async () => {
    setLoader(true)
    getProfileDetailData();
  }, []);
  useEffect(() => {
    fetchingData();
  }, []);

  const fetchProfileDeatails = async () => {
    const response = await getProfileDetails(token);
  };

  useEffect(() => {
    fetchProfileDeatails();
  }, []);

  return (
    <PageWrapper>
      <View style={styles.topSection}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Icon icon={MenuIcon} />
        </TouchableOpacity>
        <View style={styles.profileUpperSection}>
          <View style={styles.profile}>
            <CircularProgress
              value={totalProgress}
              strokeLinecap={"butt"}
              inActiveStrokeWidth={6}
              activeStrokeWidth={6}
              radius={55}
              activeStrokeColor={COLORS.RoyalBlue}
              inActiveStrokeColor={COLORS.White}
            />
            {profileData.profileImage ? (
              <Image
                source={{ uri: profileData.profileImage }}
                style={styles.profileImageContainer}
              />
            ) : (
              <Image
                source={require("../../../assets/images/Logo.png")}
                style={styles.profileImageContainer}
              />
            )}
          </View>
          <Text style={styles.userName}>
            {(profileData?.firstName ?? "----") +
              " " +
              (profileData?.lastName ?? "----")}
          </Text>
          <Text style={styles.profileCompleted}>
            Profile completed – {totalProgress}%
          </Text>
        </View>
      </View>
      <ScrollView style={styles.profileInfoContainer}>
        <ProfileInfoRow
          onPress={() => {
            navigation.navigate("PanCard", {
              mode: "edit",
            });
          }}
          iconName={ProfilePanCardIcon}
          title={STRINGS.profile.panCard}
          percentage={panProgress + "%"}
          progressColor={
            panProgress < 91 && panProgress > 61
              ? COLORS.Orange
              : panProgress < 61
                ? COLORS.Red
                : COLORS.Green
          }
        />
        <ProfileInfoRow
          onPress={() => {
            navigation.navigate("AddressProof", {
              mode: "edit",
            });
          }}
          iconName={KycDetailsIcon}
          title={STRINGS.profile.kycDetails}
          percentage={kycProgress + "%"}
          progressColor={
            kycProgress < 91 && kycProgress > 61
              ? COLORS.Orange
              : kycProgress < 61
                ? COLORS.Red
                : COLORS.Green
          }
        />
        <ProfileInfoRow
          onPress={() => {
            navigation.navigate("EmploymentDetails", {
              mode: "edit",
            });
          }}
          iconName={EmployementDetails}
          title={STRINGS.profile.employeeDetails}
          percentage={employementProgress + "%"}
          progressColor={
            employementProgress < 91 && employementProgress > 61
              ? COLORS.Orange
              : employementProgress < 61
                ? COLORS.Red
                : COLORS.Green
          }
        />
        <ProfileInfoRow
          onPress={() => {
            navigation.navigate("PersonalDetails", {
              mode: "edit",
            });
          }}
          iconName={personalDetails}
          title={STRINGS.profile.personalDetails}
          percentage={personalProgress + "%"}
          progressColor={
            personalProgress < 91 && personalProgress > 61
              ? COLORS.Orange
              : personalProgress < 61
                ? COLORS.Red
                : COLORS.Green
          }
        />
        <ProfileInfoRow
          onPress={() => {
            navigation.navigate("BankDetails", {
              mode: "edit",
            });
          }}
          iconName={BankDetails}
          title={STRINGS.profile.bankDetails}
          percentage={bankProgress + "%"}
          progressColor={
            bankProgress < 91 && bankProgress > 61
              ? COLORS.Orange
              : bankProgress < 61
                ? COLORS.Red
                : COLORS.Green
          }
        />
      </ScrollView>
      <Loader isVisible={loader} />
    </PageWrapper>
  );
};
const styles = StyleSheet.create({
  topSection: {
    marginLeft: spacing.m,
    marginRight: spacing.m,
    marginTop: spacing.xxss,
    marginBottom: 14,
  },
  profileUpperSection: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  profile: {
    borderWidth: 1,
    borderColor: COLORS.Transparent,
    borderRadius: 55,
    width: 110,
    height: 110,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    elevation: 6,
  },
  profileImageContainer: {
    height: 100,
    width: 100,
    borderRadius: 50,
    position: "absolute",
  },
  profileInfoContainer: {
    flex: 1,
    backgroundColor: COLORS.Polar,
    paddingLeft: spacing.m,
    paddingRight: spacing.m,
    paddingTop: spacing.xxll,
  },
  profileInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: COLORS.RegentGray,
    borderBottomWidth: 1,
    paddingBottom: spacing.xss,
    paddingTop: spacing.m,
    paddingHorizontal: spacing.xxxs,
  },
  aboutMain: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: COLORS.RoyalBlue,
    fontSize: 16,
    lineHeight: 18,
    fontFamily: fontFamily.LatoBold,
    marginLeft: spacing.xs,
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  percentage: {
    marginRight: spacing.m,
    fontSize: 14,
    lineHeight: 18,
    fontFamily: fontFamily.LatoBold,
  },
  icon: {
    width: 20,
    height: 30,
  },
  userName: {
    fontSize: 24,
    fontFamily: fontFamily.LatoBold,
    lineHeight: 30,
    textAlign: "center",
    color: COLORS.White,
  },
  profileCompleted: {
    textAlign: "center",
    fontSize: 14,
    fontFamily: fontFamily.LatoBold,
    lineHeight: 24,
    color: COLORS.White,
  },
});

export default Profile;
