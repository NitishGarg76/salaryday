import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Platform,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import ContactsIcon from "../../../assets/vectors/Contacts";
import DeviceInfoIcon from "../../../assets/vectors/DeviceInfo";
import InstalledApplication from "../../../assets/vectors/InstalledApplication";
import Key from "../../../assets/vectors/Key";
import Location from "../../../assets/vectors/Location";
import PhotosAndMediaFiles from "../../../assets/vectors/PhotosAndMediaFiles";
import Sms from "../../../assets/vectors/Sms";
import UserInfo from "../../../assets/vectors/UserInfo";
import CircularIcon from "../../../components/global/CircularIcon";
import PageWrapper from "../../../components/global/PageWrapper";
import COLORS from "../../../constants/Colors";
import fontFamily from "../../../constants/FontFamily";
import { spacing } from "../../../constants/Spacing";
import PermissionCard from "./Components/PermissionCard";
import ButtonComponent from "../../../components/global/ButtonComponent";
import STRINGS from "../../../constants/locale";
import { useNavigation } from "@react-navigation/native";
import CustomModal from "../../../components/global/CustomModal";
import DisclaimerIcon from "../../../assets/vectors/DisclaimerIcon";
import Geocoder from "react-native-geocoding";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  privacyAndPolicy,
  saveContacts,
  saveCustomerLocation,
  saveCustomerSMS,
  saveDeviceInfo,
} from "../../../services/api-services/api";
import Contacts from "react-native-contacts";
import {
  PERMISSIONS,
  request,
  requestMultiple,
} from "react-native-permissions";
import { useDispatch, useSelector } from "react-redux";
import Geolocation from "@react-native-community/geolocation";
import DeviceInfo from "react-native-device-info";
import { setGeolocationAction } from "../../../services/redux/action/actions";
import { getAuthToken } from "../../../services/redux/selector/selector";
import Oops from "../../../assets/vectors/Oops";
import SmsAndroid from "react-native-get-sms-android";
import moment from "moment";
import TurnLocationOn from "../../../assets/vectors/TurnLocationOn";

let list = [
  {
    heading: STRINGS.permission.sms,
    para: STRINGS.permission.smsPara,
    icon: Sms,
  },
  {
    heading: STRINGS.permission.location,
    para: STRINGS.permission.locationPara,
    icon: Location,
  },
  {
    heading: STRINGS.permission.photos,
    para: STRINGS.permission.photosPara,
    icon: PhotosAndMediaFiles,
  },
  {
    heading: STRINGS.permission.contacts,
    para: STRINGS.permission.contactsPara,
    icon: ContactsIcon,
  },
  {
    heading: STRINGS.permission.deviceInfo,
    para: STRINGS.permission.deviceInfoPara,
    icon: DeviceInfoIcon,
  },
  {
    heading: STRINGS.permission.installedApps,
    para: STRINGS.permission.installedAppsPara,
    icon: InstalledApplication,
  },
  {
    heading: STRINGS.permission.userInfo,
    para: STRINGS.permission.userInfoPara,
    icon: UserInfo,
  },
];
const Permission = () => {
  // const [contactListData, setContactListData] = useState<[]>([]);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const token = useSelector(getAuthToken);
  // const deviceinfo = DeviceInfo.getDeviceToken();
  // const [longitudeVal, setLongitudeVal] = useState<string>("");
  // const [latitudeVal, setLatitudeVal] = useState<string>("");
  // const [userAddress, setUserAddress] = useState<string>("");
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [modalError, setErrorModal] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [locationPopUp, setLocationPopUp] = useState<boolean>(false);
  const [buttonLoader, setButtonLoader] = useState<boolean>(false);
  const [fetchLoc, setFetchLoc] = useState<boolean>(false);
  // const [smsArray, setSMSArray] = useState<[]>([]);

  const navigateToMobile = () => {
    navigation.navigate("EnterMobileNumber");
  };

  const acceptPrivacyAndPolicy = async (value: number) => {
    let payload = {
      privacy_policy: value,
    };
    setButtonLoader(true);
    const response = await privacyAndPolicy(payload, token);
    if (response?.data?.success) {
      setButtonLoader(false);
      setShowModal(false);
      navigateToMobile();
    } else {
      setButtonLoader(false);
      setErrorModal(response.data.message);
      setShowErrorModal(true);
    }
  };
  const getCords = async () => {
    if (Platform.OS == "android") {
      requestMultiple([
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
      ]).then(async (statuses) => {
        if (
          statuses[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION] == "granted" &&
          statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] == "granted"
        ) {
          await Geolocation.getCurrentPosition(
            //Will give you the current location
            (position) => {
              //getting the Longitude from the location json
              const currentLongitude = JSON.stringify(
                position.coords.longitude
              );

              //getting the Latitude from the location json
              const currentLatitude = JSON.stringify(position.coords.latitude);
              console.log("test latitude ", currentLatitude);
              console.log("test longtiude ", currentLongitude);
              getUserAddress(currentLatitude, currentLongitude);
              // setLatitudeVal(currentLatitude);
              // setLongitudeVal(currentLongitude);
              dispatch(
                setGeolocationAction({
                  lon: currentLongitude,
                  lat: currentLatitude,
                })
              );
            },
            (error) => {
              if (error.code === 2) {
                setLocationPopUp(true)

              }

              console.log("try luck herecc", error.code);
            },
            {
              enableHighAccuracy: true,
              timeout: 20000,
              maximumAge: 1000,
            }
          );
        } else {
          console.log(statuses);
        }
      });
    }
  };

  useEffect(() => {
    Geocoder.init("AIzaSyDcuwvlqNt_Veup4YxeIQoMUDVK9ZrZaFE");
    getCords();
  }, [fetchLoc]);

  const requestPermissions = (msgList: any, listContact: any) => {
    console.log("ek bar");
    if (Platform.OS == "android") {
      requestMultiple([
        PERMISSIONS.ANDROID.CAMERA,
        PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        PERMISSIONS.ANDROID.READ_CONTACTS,
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        PERMISSIONS.ANDROID.READ_SMS,
      ]).then(async (statuses) => {
        if (
          statuses[PERMISSIONS.ANDROID.READ_SMS] == "granted" &&
          statuses[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] == "granted" &&
          statuses[PERMISSIONS.ANDROID.CAMERA] == "granted" &&
          statuses[PERMISSIONS.ANDROID.READ_CONTACTS] == "granted" &&
          statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] == "granted"
        ) {
          saveInfoDevice();
          saveCustomerContact(listContact);
          setShowModal(true);
          readCustomerSMSData(msgList);
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
          saveInfoDevice();
          // saveLocation();
          saveCustomerContact(listContact);
          setShowModal(true);
          // getUserAddress();
        } else {
          console.log(statuses);
        }
      });
    }
  };
  const readCustomerSMSData = async (messageArray: any) => {
    let payload = {
      sms: messageArray,
    };

    const response = await saveCustomerSMS(payload, token);
    if (response.data.success) {
      console.log("sms read true response", response.data.message);
    } else {
      console.log("sms read false responce", response.data.message);
    }
  };
  const saveInfoDevice = async () => {
    let payload = {
      device: Platform.OS,
      device_id: await DeviceInfo.getUniqueId(),
      token: await AsyncStorage.getItem("fcmToken"),
      android_version: DeviceInfo.getSystemVersion(),
      modal_name: await DeviceInfo.getModel(),
      is_installed: 1,
    };

    console.log("saveInfoDevice_payload finally", payload);
    const response = await saveDeviceInfo(payload, token);
    if (response.data.success) {
      console.log("print true", response.data.message);
    } else {
      console.log("print else", response.data.message);
    }
  };
  const saveLocation = async (
    ValLatitude: any,
    valLongitude: any,
    valAddress: any
  ) => {
    let payload = {
      lat: ValLatitude,
      long: valLongitude,
      address: valAddress,
    };
    // console.log("saveLocation nitish ", payload);
    const response = await saveCustomerLocation(payload, token);

    if (response.data.success) {
      console.log("print true api res", response.data.message);
    } else {
      console.log("print else", response.data.message);
    }
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
          readCustomerSMS(contactArr);
          console.log("contact array", contactArr);
          // setContactListData(contactArr);
        });
      } else {
        console.log("something went wrong");
      }
    });
  };

  const saveCustomerContact = async (phoneListData: any) => {
    let payload = { contacts: phoneListData };

    const response = await saveContacts(payload, token);

    if (response.data.success) {
      console.log("print true", response.data.message);
    } else {
      console.log("print else", response.data.message);
    }
  };
  const getUserAddress = async (latValue: any, longValue: any) => {
    await Geocoder.from(latValue, longValue)
      .then((json) => {
        var addressComponent = json.results[0].formatted_address;
        console.log("comp add", addressComponent);
        // setUserAddress(addressComponent);
        saveLocation(latValue, longValue, addressComponent);
      })
      .catch((error) => {
        console.warn(error);
      });
  };
  const readCustomerSMS = async (contactsList: any) => {
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
            SmsAndroid.list(
              JSON.stringify(filter),

              (fail: string) => {
                console.log("Failed with this error: " + fail);
              },
              async (count: any, smsList: string) => {
                var arr = JSON.parse(smsList);
                console.log("hfhf", arr);
                var array: [] = [];
                if (arr.length === 0) {
                  requestPermissions(array, contactsList);
                  arr.length == 0 && console.log("zzeerroo oooo");
                } else {
                  for (let index = 0; index < arr.length; index++) {
                    console.log("arr.length", index);

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
                          moment(element["date_sent"]).format("YYYY-MM-DD") +
                          "",
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
                      // setSMSArray(array);
                    }

                    (arr.length == index + 1 || arr.length == 0) &&
                      requestPermissions(array, contactsList);
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
      <CircularIcon iconName={Key} customStyles={styles.key} />
      <Text style={styles.title}>{STRINGS.permission.permission}</Text>
      <Text style={styles.label}>{STRINGS.permission.infoMandatory}</Text>
      <ScrollView>
        <View style={{ flex: 1, backgroundColor: COLORS.Polar }}>
          {list.map((item, index) => {
            return (
              <PermissionCard
                key={index}
                heading={item.heading}
                iconName={item.icon}
                para={item.para}
              />
            );
          })}
          <Text
            style={[
              styles.tAndC,
              { color: COLORS.Black, marginTop: spacing.ll },
            ]}
          >
            {STRINGS.permission.pleaseRefer}
            <Text
              onPress={() =>
                navigation.navigate("CustomWebView" as any, {
                  link: "https://salaryday.in/privacy-policies.html",
                })
              }
              style={[styles.tAndC, { color: COLORS.RoyalBlue }]}
            >
              {STRINGS.permission.privacyPolicy}
            </Text>

            {STRINGS.permission.dataCollected}
          </Text>
          <Text
            style={[
              styles.tAndC,
              { color: COLORS.Black, marginTop: spacing.ll },
            ]}
          >
            {STRINGS.permission.agreeTandC}
            <Text style={[styles.tAndC, { color: COLORS.RoyalBlue }]}>
              {STRINGS.permission.phoneWaSms}
            </Text>
            <Text style={[styles.tAndC, { color: COLORS.Black }]}>
              {STRINGS.permission.and}
            </Text>
            <Text style={[styles.tAndC, { color: COLORS.RoyalBlue }]}>
              {STRINGS.permission.email}
            </Text>
          </Text>
          <ButtonComponent
            title={STRINGS.permission.buttonLabel}
            onPress={() => {
              getContacts();
            }}
            buttonLoading={false}
            customStyles={styles.button}
          />
        </View>
        <CustomModal
          buttonLoader={buttonLoader}
          iconName={DisclaimerIcon}
          isVisible={showModal}
          hideOnPress={() => {
            setShowModal(false);
          }}
          onConfirm={() => acceptPrivacyAndPolicy(1)}
          onDismiss={() => {
            setShowModal(false);
          }}
          isButtonGroup={true}
          secondaryText={
            "We do not collect, read or store your personal SMS. We read and assess only financial transactional SMS pertaining salary credits, UAN details, and bank account. Since our loan services are meant for salaried professionals, financial transactional SMS enables us to assess your credit eligibility."
          }
        />
        <CustomModal
          iconName={Oops}
          buttonLoader={false}
          hideOnPress={() => {
            setShowErrorModal(false);
          }}
          onConfirm={() => {
            setShowErrorModal(false);
          }}
          onDismiss={() => { }}
          buttonLable={"Okay"}
          secondaryText={modalError}
          isVisible={showErrorModal}
        />
        <CustomModal
          iconName={TurnLocationOn}
          buttonLoader={false}
          hideOnPress={() => {
            setShowErrorModal(false);
          }}
          onConfirm={() => {
            if (Platform.OS === "ios") {
              Linking.openURL("app-settings:");
              setLocationPopUp(false)
              setTimeout(() => {
                setFetchLoc(true)
              }, 2000)

            } else {
              Linking.openSettings()
              setLocationPopUp(false)
              setTimeout(() => {
                setFetchLoc(true)
              }, 2000)

            }

          }}
          onDismiss={() => { }}
          linkText={"Location"}
          buttonLable={"Okay"}
          secondaryText={"\nPlease turn on your location"}
          isVisible={locationPopUp}
        />
      </ScrollView>
    </PageWrapper>
  );
};
const styles = StyleSheet.create({
  tAndC: {
    marginHorizontal: spacing.m,
    textAlign: "justify",
    lineHeight: 18,
    fontFamily: fontFamily.LatoSemiBold,
  },
  button: {
    width: "100%",
    borderRadius: 0,
    marginTop: spacing.xxl,
  },
  key: {
    backgroundColor: COLORS.White,
    height: 100,
    width: 100,
    borderRadius: 50,
    marginLeft: spacing.m,
    marginTop: spacing.m,
  },
  title: {
    fontSize: 24,
    color: COLORS.White,
    lineHeight: 30,
    marginLeft: spacing.m,
    fontFamily: fontFamily.LatoBold,
  },
  label: {
    fontSize: 16,
    color: COLORS.White,
    lineHeight: 20,
    marginLeft: spacing.m,
    marginTop: spacing.xxss,
    marginRight: spacing.xxss,
    marginBottom: spacing.m,
    fontFamily: fontFamily.LatoBold,
  },
});
export default Permission;
