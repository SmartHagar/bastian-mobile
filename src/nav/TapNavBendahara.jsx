/** @format */

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Dashboard from '../screens/bendahara/dashboard/Dashboard';
import Items from '../screens/bendahara/items/Items';
import Akun from '../screens/bendahara/akun/Akun';

import {Icon} from '@rneui/themed';

import myColors from '../styles/colors';

// icons
import NotificationContext from '../tools/NotificationContext';
import colors from '../styles/colors';

const BendaharaTab = createBottomTabNavigator();

const TapNavBendahara = () => {
  const [tapOpen, setTapOpen] = useState(0);
  const openItem = () => {
    setTapOpen(tapOpen + 1);
    // setTapOpen(true);
  };
  return (
    <NotificationContext.Provider value={tapOpen}>
      <BendaharaTab.Navigator
        initialRouteName="Bendahara"
        screenOptions={{
          tabBarActiveTintColor: myColors.pink,
          tabBarInactiveTintColor: myColors.yellow,
          tabBarStyle: {backgroundColor: myColors.primary},
          tabBarHideOnKeyboard: true,
        }}>
        <BendaharaTab.Screen
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
                name="home"
                type="antdesign"
                size={24}
                color={focused ? myColors.pink : myColors.yellow}
              />
            ),
          }}
        />
        <BendaharaTab.Screen
          name="Items"
          component={Items}
          options={{
            headerTitleAlign: 'center',
            headerTitleStyle: {fontSize: 16, fontFamily: 'Poppins-Medium'},
            headerTintColor: '#fff',
            headerStyle: {backgroundColor: myColors.primary},
            tabBarLabel: 'Items',
            tabBarIcon: ({focused, color, size}) => (
              <Icon
                name="pushpino"
                type="antdesign"
                size={24}
                color={focused ? myColors.pink : myColors.yellow}
              />
            ),
            headerRight: () => (
              <TouchableOpacity onPress={openItem}>
                <Icon
                  name="plus"
                  type="evilicon"
                  size={30}
                  color="#fff"
                  style={{
                    marginEnd: 20,
                  }}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <BendaharaTab.Screen
          name="Akun"
          component={Akun}
          options={{
            headerTitleAlign: 'center',
            headerTitleStyle: {fontSize: 16, fontFamily: 'Poppins-Medium'},
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
      </BendaharaTab.Navigator>
    </NotificationContext.Provider>
  );
};

export default TapNavBendahara;

const styles = StyleSheet.create({});
