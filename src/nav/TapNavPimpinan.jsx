/** @format */

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import myColors from '../styles/colors';

// icons
import NotificationContext from '../tools/NotificationContext';
import Dashboard from '../screens/pimpinan/dashboard/Dashboard';
import Laporan from '../screens/pimpinan/laporan/Laporan';
import Akun from '../screens/pimpinan/akun/Akun';
import {Icon} from '@rneui/themed';

const PimpinanTab = createBottomTabNavigator();

const TapNavPimpinan = () => {
  const [tapOpen, setTapOpen] = useState(0);
  const openItem = () => {
    setTapOpen(tapOpen + 1);
    // setTapOpen(true);
  };
  return (
    <NotificationContext.Provider value={tapOpen}>
      <PimpinanTab.Navigator
        initialRouteName="Pimpinan"
        screenOptions={{
          tabBarActiveTintColor: myColors.pink,
          tabBarInactiveTintColor: myColors.yellow,
          tabBarStyle: {backgroundColor: myColors.primary},
          tabBarHideOnKeyboard: true,
        }}>
        <PimpinanTab.Screen
          name="Home"
          component={Dashboard}
          options={{
            headerTitleAlign: 'center',
            headerTitleStyle: {fontSize: 16, fontFamily: 'Poppins-Medium'},
            headerTintColor: '#fff',
            headerStyle: {backgroundColor: myColors.primary},
            tabBarLabel: 'Home',
            tabBarIcon: ({focused, color, size}) => (
              <Icon
                name="barchart"
                size={24}
                type="antdesign"
                color={focused ? myColors.pink : myColors.yellow}
              />
            ),
          }}
        />
        <PimpinanTab.Screen
          name="LaporanPimpinan"
          component={Laporan}
          options={{
            headerTitleAlign: 'center',
            headerTitleStyle: {fontSize: 16, fontFamily: 'Poppins-Medium'},
            headerTitle: 'Laporan',
            headerTintColor: '#fff',
            headerStyle: {backgroundColor: myColors.primary},
            tabBarLabel: 'Laporan',
            tabBarIcon: ({focused, color, size}) => (
              <Icon
                name="exclefile1"
                size={24}
                type="antdesign"
                color={focused ? myColors.pink : myColors.yellow}
              />
            ),
          }}
        />
        <PimpinanTab.Screen
          name="AkunPimpinan"
          component={Akun}
          options={{
            headerTitleAlign: 'center',
            headerTitleStyle: {fontSize: 16, fontFamily: 'Poppins-Medium'},
            headerTitle: 'Akun',
            headerTintColor: '#fff',
            headerStyle: {backgroundColor: myColors.primary},
            tabBarLabel: 'Akun',
            tabBarIcon: ({focused, color, size}) => (
              <Icon
                name="contacts"
                size={24}
                type="antdesign"
                color={focused ? myColors.pink : myColors.yellow}
              />
            ),
          }}
        />
      </PimpinanTab.Navigator>
    </NotificationContext.Provider>
  );
};

export default TapNavPimpinan;

const styles = StyleSheet.create({});
