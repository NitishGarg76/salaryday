import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomTabNavigator from "./Tabnavigator";
import COLORS from "../constants/Colors";
import { spacing } from "../constants/Spacing";
import CustomDrawer from "../components/CustomDrawer";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(navigation) => <CustomDrawer navigation={navigation} />}
      initialRouteName={"DrawerHome"}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: COLORS.White,
        drawerInactiveTintColor: "#333",
        drawerLabelStyle: {
          fontSize: 18,
          lineHeight: 22,
          marginLeft: -spacing.s,
          marginTop: spacing.xxxxs,
        },
        drawerStyle: {
          backgroundColor: COLORS.RoyalBlue,
          width: "95%",
        },
      }}
    >
      <Drawer.Screen name="DrawerHome" component={BottomTabNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
