import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import OnBoardLogo from "../../assets/vectors/OnBoardLogo";
import ButtonComponent from "../../components/global/ButtonComponent";
import Icon from "../../components/global/Icon";
import COLORS from "../../constants/Colors";
import fontFamily from "../../constants/FontFamily";
import {
  NoInternet,
  OnBoardOne,
  OnBoardThree,
  OnBoardTwo,
} from "../../constants/Images";
import { spacing } from "../../constants/Spacing";

function OnBoard() {
  const [count, setCount] = useState<number>(0);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Icon
        icon={OnBoardLogo}
        style={{ position: "absolute", top: 20, left: 20 }}
      />

      {count === 1 ? (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontFamily: fontFamily.LatoRegular,
              marginTop: -40,
              color: COLORS.RobinGreen,
            }}
          >
            Flexible salary advance
          </Text>
          <Text
            style={{
              fontSize: 35,
              color: COLORS.RobinGreen,
              fontFamily: fontFamily.LatoBold,
            }}
          >
            Plans from 5k to 50k.
          </Text>

          <Image source={OnBoardTwo} style={{}} resizeMode="contain" />
        </View>
      ) : count === 2 ? (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image source={OnBoardThree} style={{}} resizeMode="contain" />
          <View style={{ alignItems: "center", marginTop: "40%" }}>
            <Text
              style={{
                fontSize: 35,
                color: COLORS.RobinGreen,
                fontFamily: fontFamily.LatoBold,
              }}
            >
              Easy
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontFamily: fontFamily.LatoRegular,
                color: COLORS.RobinGreen,
              }}
            >
              Repayment options.
            </Text>
          </View>
        </View>
      ) : (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={OnBoardOne}
            // style={{ marginTop: "40%" }}
            resizeMode="contain"
          />
          <Text
            style={{
              fontSize: 35,
              color: COLORS.RobinGreen,
              fontFamily: fontFamily.LatoBold,
            }}
          >
            {"Wait no longer\nFor your salary.\n"}{" "}
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontFamily: fontFamily.LatoRegular,
              marginTop: -40,
              color: COLORS.RobinGreen,
            }}
          >
            Make any day your salary day
          </Text>
        </View>
      )}
      <ButtonComponent
        buttonLoading={false}
        title={"Next ➝"}
        onPress={() => {
          count === 2 ? navigation.navigate("Login") : setCount(count + 1);
        }}
        customTextStyles={{ fontSize: 12 }}
        customStyles={{
          backgroundColor: COLORS.RobinGreen,
          height: 40,
          position: "absolute",
          bottom: 20,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Polar,
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default OnBoard;

{
  /* <ButtonComponent
          buttonLoading={false}
          title={"Next ➝"}
          onPress={() => {}}
          customTextStyles={{ fontSize: 12 }}
          customStyles={{
            backgroundColor: COLORS.RobinGreen,
            height: 40,
            marginVertical: spacing.mm,
          }}
        /> */
}
