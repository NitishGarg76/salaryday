import React, { FC, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import TAndC from "../../../assets/vectors/TAndC";
import Introduction from "../../../assets/vectors/Introduction";
import ButtonComponent from "../../../components/global/ButtonComponent";
import CircularIcon from "../../../components/global/CircularIcon";
import PageWrapper from "../../../components/global/PageWrapper";
import License from "../../../assets/vectors/License";
import COLORS from "../../../constants/Colors";
import Law from "../../../assets/vectors/Law";
import STRINGS from "../../../constants/locale";
import Change from "../../../assets/vectors/Change";
import Services from "../../../assets/vectors/Services";
import PrivacyPolicy from "../../../assets/vectors/PrivacyPolicy";
import Force from "../../../assets/vectors/Force";
import Limitation from "../../../assets/vectors/Limitation";
import Restriction from "../../../assets/vectors/Restriction";
import Termination from "../../../assets/vectors/Termination";
import Company from "../../../assets/vectors/Company";
import Sites from "../../../assets/vectors/Sites";
import Indemnity from "../../../assets/vectors/Indemnity";
import Miscellaneous from "../../../assets/vectors/Miscellaneous";
import fontFamily from "../../../constants/FontFamily";
import { spacing } from "../../../constants/Spacing";
import Icon, { IconProp } from "../../../components/global/Icon";
import { Colors } from "react-native-paper";
import Warranties from "../../../assets/vectors/Warranties";
import { useNavigation } from "@react-navigation/native";
import { termsAndConditions } from "../../../services/api-services/api";
import { useSelector } from "react-redux";
import { getAuthToken } from "../../../services/redux/selector/selector";

interface headingProps {
  title: string;
  iconName: IconProp;
}
const Heading: FC<headingProps> = ({ title, iconName }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        marginLeft: spacing.m,
        marginTop: spacing.m,
        alignItems: "center",
      }}
    >
      <Icon icon={iconName} />
      <Text style={styles.headingTitle}>{title}</Text>
    </View>
  );
};
const TermsAndCondition: FC = ({}) => {
  const navigateToPermission = () => {
    navigation.navigate("Permission");
    
  };
  const token = useSelector(getAuthToken);
  const [buttonLoader, setButtonLoader] = useState<boolean>(false);
  const navigation = useNavigation();
  
  const acceptTAndC = async (values: number) => {
    let payload = {
      terms_conditions: values,
    };
    setButtonLoader(true);
    const response = await termsAndConditions(payload, token);
    setButtonLoader(false);
    if (response.data.success) {
      navigateToPermission();
    } else {
      setButtonLoader(false);
    }
  };
  

  return (
    <PageWrapper>
      <CircularIcon iconName={TAndC} customStyles={styles.key} />
      <Text style={styles.title}>
        {STRINGS.termsAndCondition.termsAndCondition}
      </Text>
      <Text style={styles.label}>{STRINGS.termsAndCondition.tAndCPara}</Text>
      <ScrollView>
        <View style={{ flex: 1, backgroundColor: COLORS.Polar }}>
          <View>
            <Heading
              title={STRINGS.termsAndCondition.introduction}
              iconName={Introduction}
            />
            <Text style={styles.introParas}>
              {STRINGS.termsAndCondition.introParaOne}
            </Text>
            <Text style={styles.introParas}>
              {STRINGS.termsAndCondition.introParaTwo}
            </Text>
            <Text style={styles.subParaheading}>
              {STRINGS.termsAndCondition.definition}
            </Text>
            <Text style={styles.subParasecond}>
              <Text style={styles.subParasecondHeading}>
                {STRINGS.termsAndCondition.endUsers}
              </Text>
              <Text>{STRINGS.termsAndCondition.endUsersPara}</Text>
            </Text>

            <Text style={styles.subParasecond}>
              <Text style={styles.subParasecondHeading}>
                {STRINGS.termsAndCondition.loan}
              </Text>
              {STRINGS.termsAndCondition.loanPara}
            </Text>

            <Text style={styles.subParasecond}>
              <Text style={styles.subParasecondHeading}>
                {STRINGS.termsAndCondition.loanAgreement}
              </Text>
              {STRINGS.termsAndCondition.loanAgreementPara}
            </Text>

            <Text style={styles.subParasecond}>
              <Text style={styles.subParasecondHeading}>
                {STRINGS.termsAndCondition.onlineStores}
              </Text>
              {STRINGS.termsAndCondition.onlineStoresPara}
            </Text>

            <Text style={styles.subParasecond}>
              <Text style={styles.subParasecondHeading}>
                {STRINGS.termsAndCondition.outstandingAmount}
              </Text>
              {STRINGS.termsAndCondition.outstandingAmountPara}
            </Text>

            <Text style={styles.subParasecond}>
              <Text style={styles.subParasecondHeading}>
                {STRINGS.termsAndCondition.platform}
              </Text>
              {STRINGS.termsAndCondition.platformPara}
            </Text>

            <Text style={styles.subParasecond}>
              <Text style={styles.subParasecondHeading}>
                {STRINGS.termsAndCondition.services}
              </Text>
              {STRINGS.termsAndCondition.servicesPara}
            </Text>

            <Text style={styles.subParasecond}>
              <Text style={styles.subParasecondHeading}>
                {STRINGS.termsAndCondition.thirdParty}
              </Text>
              {STRINGS.termsAndCondition.thirdPartyPara}
            </Text>

            <Text style={styles.subParasecond}>
              <Text style={styles.subParasecondHeading}>
                {STRINGS.termsAndCondition.userData}
              </Text>
              {STRINGS.termsAndCondition.userDataPara}
            </Text>

            <Text style={styles.subParasecond}>
              <Text style={styles.subParasecondHeading}>
                {STRINGS.termsAndCondition.website}
              </Text>
              {STRINGS.termsAndCondition.websitePara}
            </Text>
          </View>
          <View>
            <Heading
              title={STRINGS.termsAndCondition.licenseHeading}
              iconName={License}
            />
            <Text style={styles.subParaheading}>
              {STRINGS.termsAndCondition.license}
            </Text>
            <Text style={styles.licensePara}>
              {STRINGS.termsAndCondition.licensePara}
            </Text>
            <Text style={styles.subParaheading}>
              {STRINGS.termsAndCondition.scope}
            </Text>
            <Text style={styles.licensePara}>
              {STRINGS.termsAndCondition.scopePara}
            </Text>
            <Text style={styles.subParaheading}>
              {STRINGS.termsAndCondition.maintenance}
            </Text>
            <Text style={styles.licensePara}>
              {STRINGS.termsAndCondition.maintenancePara}
            </Text>
            <Text style={styles.subParaheading}>
              {STRINGS.termsAndCondition.updates}
            </Text>
            <Text style={styles.licensePara}>
              {STRINGS.termsAndCondition.updatesPara}
            </Text>
          </View>
          <View>
            <Heading
              title={STRINGS.termsAndCondition.restrictionHeadings}
              iconName={Restriction}
            />
            <Text style={styles.subParaheading}>
              {STRINGS.termsAndCondition.restriction}
            </Text>
            <Text style={styles.introPara}>
              {STRINGS.termsAndCondition.restrictionPointOne}
            </Text>
            <Text style={styles.introPara}>
              {STRINGS.termsAndCondition.restrictionPointTwo}
            </Text>
            <Text style={styles.introPara}>
              {STRINGS.termsAndCondition.restrictionPointThree}
            </Text>
            <Text style={styles.introPara}>
              {STRINGS.termsAndCondition.restrictionPointFour}
            </Text>
            <Text style={styles.introPara}>
              {STRINGS.termsAndCondition.restrictionPointFive}
            </Text>
            <Text style={styles.introPara}>
              {STRINGS.termsAndCondition.restrictionPointSix}
            </Text>
            <Text style={styles.introPara}>
              {STRINGS.termsAndCondition.restrictionPointSeven}
            </Text>
            <Text style={styles.introPara}>
              {STRINGS.termsAndCondition.restrictionPointEight}
            </Text>
            <Text style={styles.introPara}>
              {STRINGS.termsAndCondition.restrictionPointNine}
            </Text>
            <Text style={styles.introPara}>
              {STRINGS.termsAndCondition.restrictionPointTen}
            </Text>
            <Text style={styles.introPara}>
              {STRINGS.termsAndCondition.restrictionPointEleven}
            </Text>
            <Text style={styles.introPara}>
              {STRINGS.termsAndCondition.restrictionPointTwelve}
            </Text>
            <Text style={styles.subParaheading}>
              {STRINGS.termsAndCondition.restrictionHeading}
            </Text>
            <Text style={styles.licensePara}>
              {STRINGS.termsAndCondition.restrictionSubPara}
            </Text>
          </View>
          <View>
            <Heading
              title={STRINGS.termsAndCondition.companyHeading}
              iconName={Company}
            />
            <Text style={styles.introPara}>
              {STRINGS.termsAndCondition.propertyRights}
            </Text>
          </View>
          <View>
            <Heading
              title={STRINGS.termsAndCondition.sitesHeading}
              iconName={Sites}
            />
            <Text style={styles.introPara}>
              {STRINGS.termsAndCondition.sitesParaOne}
            </Text>
            <Text style={styles.introPara}>
              {STRINGS.termsAndCondition.sitesParaTwo}
            </Text>
          </View>
          <View>
            <Heading
              title={STRINGS.termsAndCondition.servicesHeading}
              iconName={Services}
            />
            <Text style={styles.introPara}>
              {STRINGS.termsAndCondition.servicesParaOne}
            </Text>
            <Text style={styles.licensePara}>
              {STRINGS.termsAndCondition.servicesParaTwo}
            </Text>
            <Text style={styles.licensePara}>
              {STRINGS.termsAndCondition.servicesParaThree}
            </Text>
          </View>
          <View>
            <Heading
              title={STRINGS.termsAndCondition.terminationHeading}
              iconName={Termination}
            />
            <Text style={styles.introPara}>
              {STRINGS.termsAndCondition.termination}
            </Text>
            <View style={styles.treminationPoints}>
              <Text style={styles.licensePara}>
                {STRINGS.termsAndCondition.terminationPointOne}
              </Text>
              <Text style={styles.licensePara}>
                {STRINGS.termsAndCondition.terminationPointTwo}
              </Text>
              <Text style={styles.licensePara}>
                {STRINGS.termsAndCondition.terminationPointThree}
              </Text>
              <Text style={styles.licensePara}>
                {STRINGS.termsAndCondition.terminationPointFour}
              </Text>
              <Text style={styles.licensePara}>
                {STRINGS.termsAndCondition.terminationPointFive}
              </Text>
            </View>
            <Text style={styles.introPara}>
              {STRINGS.termsAndCondition.terminationParaOne}
            </Text>
            <Text style={styles.introPara}>
              {STRINGS.termsAndCondition.terminationParaTwo}
            </Text>
          </View>
          <View>
            <Heading
              title={STRINGS.termsAndCondition.WarrantiesHeading}
              iconName={Warranties}
            />
            <Text style={styles.introPara}>
              {STRINGS.termsAndCondition.warranties}
            </Text>
            <Text style={styles.introPara}>
              {STRINGS.termsAndCondition.warrantiesParaOne}
            </Text>
            <Text style={styles.licensePara}>
              {STRINGS.termsAndCondition.warrantiesParaTwo}
            </Text>
          </View>
          <View>
            <Heading
              title={STRINGS.termsAndCondition.IndemnityHeading}
              iconName={Indemnity}
            />
            <Text style={styles.introPara}>
              {STRINGS.termsAndCondition.indemnify}
            </Text>
          </View>
          <View>
            <Heading
              title={STRINGS.termsAndCondition.LimitationHeading}
              iconName={Limitation}
            />
            <Text style={styles.introPara}>
              {STRINGS.termsAndCondition.limitation}
            </Text>
          </View>
          <View>
            <Heading
              title={STRINGS.termsAndCondition.forceHeading}
              iconName={Force}
            />
            <Text style={styles.introPara}>
              {STRINGS.termsAndCondition.fouce}
            </Text>
          </View>
          <View>
            <Heading
              title={STRINGS.termsAndCondition.privacyHeading}
              iconName={PrivacyPolicy}
            />
            <Text style={styles.introPara}>
              {STRINGS.termsAndCondition.privacyPolicy}
              <Text style={styles.subprivacy}>
                {STRINGS.termsAndCondition.privacyp}
              </Text>
            </Text>
          </View>
          <View>
            <Heading
              title={STRINGS.termsAndCondition.changeHeading}
              iconName={Change}
            />
            <Text style={styles.introPara}>
              {STRINGS.termsAndCondition.change}
            </Text>
          </View>
          <View>
            <Heading
              title={STRINGS.termsAndCondition.jurisdictionHeading}
              iconName={Law}
            />
            <Text style={styles.introPara}>
              {STRINGS.termsAndCondition.jurisdiction}
            </Text>
          </View>
          <View>
            <Heading
              title={STRINGS.termsAndCondition.miscellaneousHeading}
              iconName={Miscellaneous}
            />
            <Text style={styles.missCellHeading}>
              {STRINGS.termsAndCondition.miscellaneous}
            </Text>
            <Text style={styles.licensePara}>
              {STRINGS.termsAndCondition.miscellaneousPara}
            </Text>
            <Text style={styles.missCellHeading}>
              {STRINGS.termsAndCondition.waiver}
            </Text>
            <Text style={styles.licensePara}>
              {STRINGS.termsAndCondition.waiverPara}
            </Text>
            <Text style={styles.missCellHeading}>
              {STRINGS.termsAndCondition.severability}:
            </Text>
            <Text style={styles.licensePara}>
              {STRINGS.termsAndCondition.severabilityPara}
            </Text>
            <Text style={styles.referralText}>
              {STRINGS.termsAndCondition.referralProgram}
            </Text>
            <Text style={styles.licensePara}>
              {STRINGS.termsAndCondition.referralProgramParaOne}
            </Text>
            <Text style={styles.licensePara}>
              {STRINGS.termsAndCondition.referralProgramParaTwo}
            </Text>
            <Text style={styles.licensePara}>
              {STRINGS.termsAndCondition.referralProgramParaThree}
            </Text>
            <Text style={styles.licensePara}>
              {STRINGS.termsAndCondition.referralProgramParaFour}
            </Text>
            <Text style={styles.licensePara}>
              {STRINGS.termsAndCondition.referralProgramParaFive}
            </Text>
            <Text style={styles.licensePara}>
              {STRINGS.termsAndCondition.referralProgramParaSix}
            </Text>
            <Text style={styles.licensePara}>
              {STRINGS.termsAndCondition.referralProgramParaSeven}
            </Text>
          </View>
          <View>
            <Text style={styles.subParaheading}>
              {STRINGS.termsAndCondition.violations}
            </Text>
            <Text style={styles.introPara}>
              {STRINGS.termsAndCondition.violationsHeading}
            </Text>
            <Text style={styles.emailText}>
              {STRINGS.termsAndCondition.tAndCEmail}
            </Text>
            <Text style={styles.introPara}>
              {STRINGS.termsAndCondition.follow}
              <Text style={styles.linking}>
                {STRINGS.termsAndCondition.termAndCondition}
              </Text>
              {STRINGS.termsAndCondition.termAndConditionText}
            </Text>
            <Text style={styles.licensePara}>
              {STRINGS.termsAndCondition.privacyText}

              <Text style={styles.linking}>
                {STRINGS.termsAndCondition.privacyLink}
              </Text>
              {STRINGS.termsAndCondition.privacyContent}
            </Text>
          </View>
          <ButtonComponent
            title={"Accept & Proceed"}
            buttonLoading={buttonLoader}
            onPress={() => {
              acceptTAndC(1);
            }}
            customStyles={styles.button}
          />
        </View>
      </ScrollView>
    </PageWrapper>
  );
};
const styles = StyleSheet.create({
  key: {
    backgroundColor: COLORS.White,
    height: 100,
    width: 100,
    marginLeft: spacing.m,
    marginTop: spacing.m,
    borderRadius: 50,
  },
  title: {
    fontSize: 24,
    color: COLORS.White,
    lineHeight: 30,
    marginLeft: spacing.m,
    marginTop: spacing.sms,
    fontFamily: fontFamily.LatoBold,
  },
  label: {
    fontSize: 10,
    color: COLORS.White,
    lineHeight: 18,
    marginLeft: spacing.m,
    marginTop: spacing.sxs,
    marginRight: spacing.m,
    marginBottom: spacing.m,
    fontFamily: fontFamily.LatoBold,
  },
  headingTitle: {
    fontSize: 12,
    lineHeight: 12,
    color: COLORS.RoyalBlue,
    marginLeft: spacing.xxs,
    fontFamily: fontFamily.LatoBold,
  },
  missCellHeading: {
    fontSize: 8,
    lineHeight: 12,
    marginLeft: spacing.xxxxxl,
    marginRight: spacing.m,
    color: COLORS.RoyalBlue,
    fontFamily: fontFamily.LatoBold,
    marginTop: spacing.xxss,
  },

  introPara: {
    marginLeft: spacing.xxxxxl,
    marginRight: spacing.m,
    fontSize: 6,
    color: Colors.black,
    fontFamily: fontFamily.LatoMedium,
    textAlign: "justify",
    marginTop: spacing.xxss,
  },
  introParas: {
    fontSize: 6,
    marginLeft: spacing.xxxxxl,
    marginRight: spacing.m,
    fontFamily: fontFamily.LatoBold,
    textAlign: "justify",
    marginTop: spacing.xxss,
    color: Colors.black,
  },
  introSubPara: {
    marginLeft: spacing.xxxxxl,
    marginRight: spacing.m,
    marginTop: spacing.xxss,
    fontSize: 6,
    color: Colors.black,
    fontFamily: fontFamily.LatoMedium,
    textAlign: "justify",
  },
  button: {
    width: "100%",
    borderRadius: 0,
    marginTop: spacing.xxl,
  },
  subParaheading: {
    fontSize: 8,
    lineHeight: 12,
    color: COLORS.RoyalBlue,
    marginLeft: spacing.xxxxxl,
    marginTop: spacing.xxss,
    fontFamily: fontFamily.LatoBold,
  },
  subParasecond: {
    marginLeft: spacing.xxxxxl,
    marginRight: spacing.m,
    marginTop: spacing.xxss,
    fontSize: 6,
    color: Colors.black,
    fontFamily: fontFamily.LatoMedium,

    textAlign: "justify",
  },
  subParasecondHeading: {
    fontSize: 8,
    color: Colors.black,
    fontFamily: fontFamily.LatoBold,
  },
  licensePara: {
    marginLeft: spacing.xxxxxl,
    marginRight: spacing.m,
    fontSize: 6,
    color: Colors.black,
    fontFamily: fontFamily.LatoMedium,
    textAlign: "justify",
  },
  referralText: {
    marginLeft: spacing.xxxxxl,
    marginRight: spacing.m,
    color: Colors.black,
    fontSize: 8,
    fontFamily: fontFamily.LatoMedium,
    marginTop: spacing.xxss,
  },
  emailText: {
    marginLeft: spacing.xxxxxl,
    marginRight: spacing.m,
    fontSize: 10,
    color: COLORS.RoyalBlue,
  },
  linking: {
    borderBottomColor: "red",
    borderBottomWidth: 5,
    marginBottom: 30,
    color: COLORS.RoyalBlue,
  },
  treminationPoints: {
    marginTop: spacing.xxss,
  },
  subprivacy: {
    fontSize: 6,
    color: COLORS.RoyalBlue,
  },
});

export default TermsAndCondition;
