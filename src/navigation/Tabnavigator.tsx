import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View, Text, Platform } from "react-native";
import {
  HomeTabStack,
  MyLoanStack,
  PlansStack,
  ProfileStack,
} from "./StackNavigator";
import COLORS from "../constants/Colors";
import Icon from "../components/global/Icon";
import HomeIcon from "../assets/vectors/HomeIcon";
import Briefcase from "../assets/vectors/Briefcase";
import MyLoanIcon from "../assets/vectors/MyLoansIcon";
import ProfileIcon from "../assets/vectors/ProfileIcon";
import fontFamily from "../constants/FontFamily";
import { useSelector } from "react-redux";
import { getKycCompletedStatus } from "../services/redux/selector/selector";

export type TabStackParamList = {
  HomeTabStack: undefined;
  PlansStack: undefined;
  MyLoanStack: undefined;
  ProfileStack: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends TabStackParamList { }
  }
}
const Tab = createBottomTabNavigator<TabStackParamList>();

const BottomTabNavigator = () => {
  const isKycDone = useSelector(getKycCompletedStatus)
  return (
    <Tab.Navigator
      initialRouteName={isKycDone ? "HomeTabStack" : "PlansStack"}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { ...styles.tabBarStyle },
      }}
    >
      <Tab.Screen
        name="HomeTabStack"
        component={HomeTabStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabBarView}>
              <Icon
                icon={HomeIcon}
                stroke={focused ? COLORS.RoyalBlue : COLORS.RegentGray}
              />
              <Text
                style={[
                  styles.tabBarLabel,
                  { color: focused ? COLORS.RoyalBlue : COLORS.RegentGray },
                ]}
              >
                Home
              </Text>
              {focused && <View style={styles.activeBorder}></View>}
            </View>
          ),
        }}
      />
      <Tab.Screen

        name="PlansStack"
        component={PlansStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabBarView}>
              <Icon
                icon={Briefcase}
                stroke={focused ? COLORS.RoyalBlue : COLORS.RegentGray}
              />
              <Text
                style={[
                  styles.tabBarLabel,
                  { color: focused ? COLORS.RoyalBlue : COLORS.RegentGray },
                ]}
              >
                Plans
              </Text>
              {focused && <View style={styles.activeBorder}></View>}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="MyLoanStack"
        component={MyLoanStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabBarView}>
              <Icon
                icon={MyLoanIcon}
                stroke={focused ? COLORS.RoyalBlue : COLORS.RegentGray}
              />
              <Text
                style={[
                  styles.tabBarLabel,
                  { color: focused ? COLORS.RoyalBlue : COLORS.RegentGray },
                ]}
              >
                My Loans
              </Text>
              {focused && <View style={styles.activeBorder}></View>}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabBarView}>
              <Icon
                icon={ProfileIcon}
                stroke={focused ? COLORS.RoyalBlue : COLORS.RegentGray}
              />
              <Text
                style={[
                  styles.tabBarLabel,
                  { color: focused ? COLORS.RoyalBlue : COLORS.RegentGray },
                ]}
              >
                Profile
              </Text>
              {focused && <View style={styles.activeBorder}></View>}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  tabBarImage: { width: 16, height: 16 },
  tabBarStyle: {
    backgroundColor: COLORS.White,
    height: Platform.OS == "ios" ? 100 : 70,
    position: "absolute",
    borderTopColor: COLORS.RobinGreen,
    borderTopWidth: 1,
  },
  tabBarView: {
    alignItems: "center",
    justifyContent: "center",
  },
  tabBarLabel: {
    fontSize: 14,
    fontFamily: fontFamily.LatoBold,
    lineHeight: 18,
    top: 5,
  },
  activeBorder: {
    width: "100%",
    height: 4,
    backgroundColor: COLORS.RoyalBlue,
    position: "absolute",
    top: -16,
  },
});

export default BottomTabNavigator;
