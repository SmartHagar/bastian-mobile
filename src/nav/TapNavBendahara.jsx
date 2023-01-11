/** @format */

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Dashboard from '../screens/bendahara/dashboard/Dashboard';
import Items from '../screens/bendahara/items/Items';
import Akun from '../screens/bendahara/akun/Akun';

import Icon from 'react-native-vector-icons/AntDesign';

import myColors from '../styles/colors';

// icons
import NotificationContext from '../tools/NotificationContext';
import Kantin from '../screens/bendahara/kantin/Kantin';

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
                size={24}
                color={focused ? myColors.pink : myColors.yellow}
              />
            ),
          }}
        />
        <BendaharaTab.Screen
          name="Unit"
          component={Items}
          options={{
            headerTitleAlign: 'center',
            headerTitleStyle: {fontSize: 16, fontFamily: 'Poppins-Medium'},
            headerTintColor: '#fff',
            headerStyle: {backgroundColor: myColors.primary},
            tabBarLabel: 'Unit',
            tabBarIcon: ({focused, color, size}) => (
              <Icon
                name="pushpino"
                size={24}
                color={focused ? myColors.pink : myColors.yellow}
              />
            ),
            headerRight: () => (
              <TouchableOpacity onPress={openItem}>
                <Icon
                  name="pluscircleo"
                  size={24}
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
          name="Kantin"
          component={Kantin}
          options={{
            headerTitleAlign: 'center',
            headerTitleStyle: {fontSize: 16, fontFamily: 'Poppins-Medium'},
            headerTintColor: '#fff',
            headerStyle: {backgroundColor: myColors.primary},
            tabBarLabel: 'Kantin',
            tabBarIcon: ({focused, color, size}) => (
              <Icon
                name="creditcard"
                size={24}
                color={focused ? myColors.pink : myColors.yellow}
              />
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
