import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import Back from "../../assets/vectors/Back";
import ContactListForwardArrow from "../../assets/vectors/ContactListForwardArrow";
import CrossIcon from "../../assets/vectors/CrossIcon";
import SearchIcon from "../../assets/vectors/SearchIcon";
import UserIcon from "../../assets/vectors/UserIcon";
import Icon from "../../components/global/Icon";
import COLORS from "../../constants/Colors";
import fontFamily from "../../constants/FontFamily";
import { spacing } from "../../constants/Spacing";
import { setPersonalReferenceAction } from "../../services/redux/action/actions";
import { setWorkReferenceAction } from "../../services/redux/action/actions";
import ContactListUserCard from "./component/ContactListUser";
import ReferenceModal from "./component/ReferenceModal";

let personalList = ["Family", "Friends", "Relation", "Other"];
let presentWorkList = ["Team Member", "Reporting Manager", "Colleague"];

function AddReferenceContactList(props: any) {
  const { contactNumber, referenceMode } = props.route?.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [selectName, setSelectName] = useState<string>("");
  const [selectNumber, setSelectNumber] = useState<string>("");
  const [showPersonalModal, setShowPersonalModal] = useState<boolean>(false);
  const [showPresentWorkModal, setShowPresentWorkModal] =
    useState<boolean>(false);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [radioVal, setRadioVal] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);

  const setData = (name: string, number: string, relation: string) => {
    const res =
      referenceMode == "Personal"
        ? dispatch(
            setPersonalReferenceAction({
              refName: name,
              refNumber: number,
              refRelation: relation,
            })
          )
        : dispatch(
            setWorkReferenceAction({
              refName: name,
              refNumber: number,
              refRelation: relation,
            })
          );

    setShowPersonalModal(false);
    setShowPresentWorkModal(false);
    navigation.goBack();
  };

  useEffect(() => {
    setFilteredDataSource(contactNumber);
  }, []);

  const searchFilterFunction = async (text: string) => {
    if (text) {
      const newData = await contactNumber?.filter(function (item: any) {
        const itemData = item.displayName ? item.displayName.toUpperCase() : "";
        const textData = text.toUpperCase();

        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearchText(text);
    } else {
      setFilteredDataSource(contactNumber);
      setSearchText(text);
    }
  };

  return (
    <Pressable
      onPress={() => {
        setShowSearchBar(false);
      }}
      style={{ flex: 1, backgroundColor: COLORS.Polar }}
    >
      <View style={styles.bar}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon icon={Back} />
          </TouchableOpacity>
          <Text style={styles.title}>Add Reference</Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            setShowSearchBar(true);
          }}
        >
          <Icon icon={SearchIcon} />
        </TouchableOpacity>
      </View>
      {showSearchBar && (
        <View style={styles.searchBoxView}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: COLORS.White,
            }}
          >
            <Icon icon={SearchIcon} color={COLORS.White} />
            <TextInput
              onChangeText={(val) => {
                searchFilterFunction(val);
              }}
              placeholder={"Search by Name"}
              placeholderTextColor={COLORS.RoyalBlue}
              style={[styles.textFieldStyle]}
            />
          </View>
        </View>
      )}
      {selectName && selectNumber && (
        <View
          style={{
            margin: spacing.sxs,
            width: 100,
            alignItems: "center",
          }}
        >
          <View>
            <View style={styles.userIcon}>
              <Icon icon={UserIcon} />
            </View>
            <TouchableOpacity
              style={styles.cross}
              onPress={() => {
                setSelectName("");
                setSelectNumber("");
              }}
            >
              <Icon fill={COLORS.RegentGray} icon={CrossIcon} />
            </TouchableOpacity>
          </View>
          <Text
            numberOfLines={1}
            style={{
              color: COLORS.RoyalBlue,
              lineHeight: 24,
              fontFamily: fontFamily.LatoMedium,
             
            }}
          >
            {selectName}
          </Text>
        </View>
      )}

      <View style={{ flex: 1, backgroundColor: COLORS.White }}>
        <FlatList
          data={filteredDataSource}
          renderItem={({ item }) => {
            return (
              <ContactListUserCard
                onPress={() => {
                  setSelectName(item?.displayName);
                  setSelectNumber(item?.phoneNumbers[0]?.number);
                }}
                isSelected={
                  selectNumber == item?.phoneNumbers[0]?.number &&
                  selectName == item?.displayName
                    ? true
                    : false
                }
                name={item?.displayName}
                number={item?.phoneNumbers[0]?.number}
              />
            );
          }}
        />
        {selectName && selectNumber && (
          <TouchableOpacity
            onPress={() => {
              referenceMode == "Personal"
                ? setShowPersonalModal(true)
                : setShowPresentWorkModal(true);
            }}
            style={{
              position: "absolute",
              right: 20,
              bottom: 20,
            }}
          >
            <Icon icon={ContactListForwardArrow} />
          </TouchableOpacity>
        )}
      </View>
      <ReferenceModal
        selectedValue={radioVal}
        header={"Personal"}
        isGrouped={false}
        onConfirm={() => {
          radioVal && setData(selectName, selectNumber, radioVal);
        }}
        onDismiss={() => {}}
        dataMap={personalList}
        onPressRadioButton={(item) => {
          setRadioVal(item);
        }}
        hideOnPress={() => {
          setShowPersonalModal(false);
        }}
        isVisible={showPersonalModal}
      />
      <ReferenceModal
        selectedValue={radioVal}
        header={"Persent Work"}
        isGrouped={true}
        onConfirm={() => {
          radioVal && setData(selectName, selectNumber, radioVal);
        }}
        onDismiss={() => {
          setShowPresentWorkModal(false);
        }}
        dataMap={presentWorkList}
        onPressRadioButton={(item) => {
          setRadioVal(item);
        }}
        blueButtonLabel={"Allow"}
        hideOnPress={() => {
          setShowPresentWorkModal(false);
        }}
        isVisible={showPresentWorkModal}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    marginTop: spacing.xxll,
    marginHorizontal: spacing.m,
    paddingBottom: spacing.m,
    justifyContent: "space-between",
  },
  title: {
    color: COLORS.RoyalBlue,
    fontFamily: fontFamily.LatoBold,
    fontSize: 24,
    lineHeight: 30,
    marginLeft: spacing.s,
  },
  userIcon: {
    height: 50,
    width: 50,
    backgroundColor: COLORS.White,
    borderRadius: 50,
    borderColor: COLORS.RoyalBlue,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cross: { position: "absolute", right: -12, top: -18 },
  textFieldStyle: {
    flex: 1,
    borderColor: COLORS.RoyalBlue,
    justifyContent: "center",
    alignContent: "center",
    color: COLORS.Black,
    fontFamily: fontFamily.LatoRegular,
    marginLeft: 5,
    paddingRight: 5,
  },
  searchBoxView: {
    height: 40,
    alignItems: "center",
    width: "95%",
    marginBottom: spacing.m,
    alignSelf: "flex-end",
    borderColor: COLORS.RoyalBlue,
    borderWidth: 1,
    flexDirection: "row",
    top: 6,
    right: 10,
    borderRadius: 5,
    padding: 2,
    justifyContent: "space-between",
  },
});
export default AddReferenceContactList;
