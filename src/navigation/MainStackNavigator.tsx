import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "../views/splash/Splash";
import Eligibility from "../views/eligibility/Eligibility";
import Permission from "../views/authentication/permission/Permission";
import Login from "../views/authentication/login/Login";
import VerifyOtp from "../views/authentication/verifyOtp/VerifyOtp";
import AddressProof from "../views/kyc/addressProof/AddressProof";
import BankDetails from "../views/kyc/bankDetails/BankDetails";
import EmploymentDetails from "../views/kyc/employmentDetails/EmploymentDetails";
import PanCard from "../views/kyc/panCard/PanCard";
import PersonalDetails from "../views/kyc/personalDetails/PersonalDetails";
import TermsAndCondition from "../views/authentication/termsAndCondition/TermsAndCondition";
import EnterMobileNumber from "../views/authentication/enterMobileNumber/EnterMobileNumber";
import AddReference from "../views/kyc/personalDetails/addReference/AddReference";
import CurrentAddress from "../views/kyc/personalDetails/currentAddress/CurrentAddress";
import PlanDetails from "../views/planDetails/PlanDetails";
import LoanDetails from "../views/loanDetails/LoanDetails";
import DrawerNavigator from "./DrawerNavigator";
import CompanyAddress from "../views/companyAddress/CompanyAddress";
import AddReferenceContactList from "../views/addReferenceContactList/AddReferenceContactList";
import PermanentAddress from "../views/permanentAddress/PermanentAddress";
import CustomWebView from "../components/global/CustomWebView";
import Emandate from "../views/navigations/myLoan/components/Emandate";
import NoInternetConnection from "../NoInternetConnection/NoInternetConnection";
import { useNetInfo } from "@react-native-community/netinfo";
import { PlansStack } from "./StackNavigator";
import OnBoard from "../views/onBoard/OnBoarding";

export type RootStackParamList = {
  Splash: undefined;
  Dashboard: undefined;
  Login: undefined;
  Permission: undefined;
  VerifyOtp: {
    mobileNumber: string;
  };
  Eligibility: undefined;
  AddressProof: {
    mode: string;
  };
  BankDetails: {
    mode: string;
  };
  EmploymentDetails: {
    mode: string;
  };
  PanCard: {
    mode: string;
  };
  PersonalDetails: {
    mode: string;
  };
  EnterMobileNumber: undefined;
  TermsAndCondition: undefined;
  AddReference: {
    mode: string;
  };
  CurrentAddress: {
    mode: string;
  };
  PlanDetails: undefined;
  LoanDetails: undefined;
  CompanyAddress: undefined;
  AddReferenceContactList: {
    contactNumber: any;
    referenceMode: any;
  };
  PermanentAddress: {
    mode: string;
  };
  OnBoard:undefined;
  PlansStack: undefined;
  CustomWebView: undefined;
  Emandate: undefined;
  NoInternetConnection: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

const Stack = createNativeStackNavigator<RootStackParamList>();
const MainStackNavigator = () => {
  const netInfo = useNetInfo().isConnected;

  return (
    <Stack.Navigator
      initialRouteName={"Splash"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen
        name="Dashboard"
        component={!netInfo ? NoInternetConnection : DrawerNavigator}
      />
       <Stack.Screen
        name="OnBoard"
        component={!netInfo ? NoInternetConnection : OnBoard}
      />
      <Stack.Screen
        name="Login"
        component={!netInfo ? NoInternetConnection : Login}
      />
      <Stack.Screen
        name="Permission"
        component={!netInfo ? NoInternetConnection : Permission}
      />
      <Stack.Screen
        name="VerifyOtp"
        component={!netInfo ? NoInternetConnection : VerifyOtp}
      />
      <Stack.Screen
        name="Eligibility"
        component={!netInfo ? NoInternetConnection : Eligibility}
      />
      <Stack.Screen
        name="AddressProof"
        component={!netInfo ? NoInternetConnection : AddressProof}
      />
      <Stack.Screen
        name="BankDetails"
        component={!netInfo ? NoInternetConnection : BankDetails}
      />
      <Stack.Screen
        name="EmploymentDetails"
        component={!netInfo ? NoInternetConnection : EmploymentDetails}
      />
      <Stack.Screen
        name="PanCard"
        component={!netInfo ? NoInternetConnection : PanCard}
      />
      <Stack.Screen
        name="PersonalDetails"
        component={!netInfo ? NoInternetConnection : PersonalDetails}
      />
      <Stack.Screen
        name="AddReference"
        component={!netInfo ? NoInternetConnection : AddReference}
      />
      <Stack.Screen
        name="CurrentAddress"
        component={!netInfo ? NoInternetConnection : CurrentAddress}
      />
      <Stack.Screen
        name="TermsAndCondition"
        component={!netInfo ? NoInternetConnection : TermsAndCondition}
      />
      <Stack.Screen
        name="EnterMobileNumber"
        component={!netInfo ? NoInternetConnection : EnterMobileNumber}
      />
      <Stack.Screen
        name="PlanDetails"
        component={!netInfo ? NoInternetConnection : PlanDetails}
      />
      <Stack.Screen
        name="LoanDetails"
        component={!netInfo ? NoInternetConnection : LoanDetails}
      />
      <Stack.Screen
        name="CompanyAddress"
        component={!netInfo ? NoInternetConnection : CompanyAddress}
      />
      <Stack.Screen
        name="CustomWebView"
        component={!netInfo ? NoInternetConnection : CustomWebView}
      />
      <Stack.Screen
        name="NoInternetConnection"
        component={NoInternetConnection}
      />
      {/* <Stack.Screen name="PlansStack" component={PlansStack} /> */}
      <Stack.Screen
        name="AddReferenceContactList"
        component={!netInfo ? NoInternetConnection : AddReferenceContactList}
      />
      <Stack.Screen
        name="Emandate"
        component={!netInfo ? NoInternetConnection : Emandate}
      />
      <Stack.Screen
        name="PermanentAddress"
        component={!netInfo ? NoInternetConnection : PermanentAddress}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
