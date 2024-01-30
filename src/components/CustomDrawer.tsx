import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import PageWrapper from "./global/PageWrapper";
import CircularIcon from "./global/CircularIcon";
import COLORS from "../constants/Colors";
import Icon from "./global/Icon";
import { spacing } from "../constants/Spacing";
import LogoIcon from "../assets/vectors/LogoIcon";
import FeedBack from "../assets/vectors/StarIcon";
import PayEMI from "../assets/vectors/PayEMI";
import FAQIcon from "../assets/vectors/FAQ";
import Cross from "../assets/vectors/CrossIcon";
import Support from "../assets/vectors/AtRateIcon";
import Policies from "../assets/vectors/ProfilePanCardIcon";
import UserIcon from "../assets/vectors/UserIcon";
import ArrowRight from "../assets/vectors/ArrowRight";
import STRINGS from "../constants/locale";
import fontFamily from "../constants/FontFamily";
import { useNavigation } from "@react-navigation/native";
import { getProfileDetails } from "../services/api-services/api";
import { useSelector } from "react-redux";
import { getAuthToken } from "../services/redux/selector/selector";
import DeviceInfo from "react-native-device-info";

const CustomDrawer = (props: any) => {
  const token = useSelector(getAuthToken);
  const navigation = useNavigation();
  const [payEMILink, setPayEMILlink] = useState<string>("");
  const { closeDrawer } = props.navigation.navigation;

  const getProfileDetailData = async () => {
    const userDetails = await getProfileDetails(token);
    const data = userDetails.data.response.user;

    setPayEMILlink(data.payment_link_url);
  };

  useEffect(() => {
    getProfileDetailData();
  }, []);

  const data = [
    {
      iconName: UserIcon,
      title: STRINGS.sideMenu.aboutUs,
      screenName: "",
      link: "https://salaryday.in/about.html",
    },
    {
      iconName: FAQIcon,
      title: STRINGS.sideMenu.faq,
      screenName: "",
      link: "https://salaryday.in/faq.html",
    },
    {
      iconName: Policies,
      title: STRINGS.sideMenu.policies,
      screenName: "",
      link: "https://salaryday.in/privacy-policies.html",
    },
    {
      iconName: PayEMI,
      title: STRINGS.sideMenu.payEmi,
      screenName: "",
      link: payEMILink,
    },
    {
      iconName: Support,
      title: STRINGS.sideMenu.support,
      screenName: "",
      link: "https://salaryday.in/contactus.html",
    },
  ];

  return (
    <PageWrapper>
      <View style={styles.drawerContainer}>
        <TouchableOpacity
          style={{ alignItems: "flex-end" }}
          onPress={() => closeDrawer()}
        >
          <Icon icon={Cross} />
        </TouchableOpacity>
        <View>
          <CircularIcon iconName={LogoIcon} customStyles={styles.logo} />
        </View>
      </View>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: COLORS.Polar,
          paddingLeft: spacing.m,
          paddingRight: spacing.m,
        }}
      >
        <View>
          {data?.map((item: any, index: number) => {
            return (
              <TouchableOpacity
                style={styles.drawerRow}
                onPress={() => {
                  item.link
                    ? navigation.navigate("CustomWebView" as any, {
                        link: item?.link,
                      })
                    : console.log("wrong");
                }}
                key={index}
              >
                <View style={styles.aboutMain}>
                  <Icon icon={item.iconName} />
                  <Text style={styles.title}>{item.title}</Text>
                </View>
                <View>
                  <Icon icon={ArrowRight} />
                </View>
              </TouchableOpacity>
            );
          })}
          <TouchableOpacity
            style={styles.drawerRow}
            onPress={() => {
              Linking.openURL(
                `http://play.google.com/store/apps/details?id=${DeviceInfo.getBundleId()}`
              );
            }}
          >
            <View style={styles.aboutMain}>
              <Icon icon={FeedBack} />
              <Text style={styles.title}>{"Feedback"}</Text>
            </View>
            <View>
              <Icon icon={ArrowRight} />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </PageWrapper>
  );
};
const styles = StyleSheet.create({
  logo: {
    backgroundColor: COLORS.White,
    marginLeft: spacing.m,
    marginTop: spacing.m,
    marginBottom: spacing.m,
  },
  drawerContainer: {
    marginLeft: spacing.m,
    marginRight: spacing.m,
    marginTop: spacing.xxss,
    marginBottom: spacing.l,
  },
  sideMenu: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: COLORS.RegentGray,
    borderBottomWidth: 1,
    paddingBottom: spacing.xss,
    paddingTop: spacing.m,
  },
  drawerRow: {
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
});

export default CustomDrawer;
