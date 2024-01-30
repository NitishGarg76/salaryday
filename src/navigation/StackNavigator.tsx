import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from "../views/navigations/home/Home";
import MyLoan from '../views/navigations/myLoan/MyLoan';
import Plans from '../views/navigations/plans/Plans';
import Profile from '../views/navigations/profile/Profile';

export type BottomStackParamList = {
  Home: undefined;
  Plans: undefined;
  MyLoan: undefined;
  Profile: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends BottomStackParamList {}
  }
}
const Stack = createNativeStackNavigator<BottomStackParamList>();

const HomeTabStack = () => {
  return (
    
    <Stack.Navigator  screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

const PlansStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Plans" component={Plans} />
    </Stack.Navigator>
  );
};

const MyLoanStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MyLoan" component={MyLoan} />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

export {HomeTabStack, MyLoanStack, PlansStack, ProfileStack};
