/** @format */

import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../auth/Login';
import myColors from '../styles/colors';

// Bendahara
import TapNavBendahara from './TapNavBendahara';
import TransaksiBend from '../screens/bendahara/transaksi/Transaksi';
import KwitansiBend from '../screens/bendahara/kwitansi/Kwitansi';
import BukuKasBend from '../screens/bendahara/buku-kas/BukuKas';
// pimpinan
import TapNavPimpinan from './TapNavPimpinan';

const Stack = createNativeStackNavigator();

const StackNav = () => {
  //   jika role bendahara
  const roleBendahara = () => {
    return (
      <>
        <Stack.Screen
          name="DashboardBendahara"
          options={{headerShown: false}}
          component={TapNavBendahara}
        />
        <Stack.Screen
          name="TransaksiBend"
          options={{headerShown: false}}
          component={TransaksiBend}
        />
        <Stack.Screen
          name="KwitanisBend"
          options={{headerShown: false}}
          component={KwitansiBend}
        />
        <Stack.Screen
          name="BukuKasBend"
          component={BukuKasBend}
          options={{
            headerTitleAlign: 'center',
            headerTitleStyle: {fontSize: 16, fontFamily: 'Poppins-Medium'},
            headerTintColor: '#fff',
            headerStyle: {backgroundColor: myColors.primary},
            headerTitle: 'Buku Kas',
          }}
        />
      </>
    );
  };
  //   jika role pimpinan
  const rolePimpinan = () => {
    return (
      <>
        <Stack.Screen
          name="DashboardPimpinan"
          options={{headerShown: false}}
          component={TapNavPimpinan}
        />
      </>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          options={{headerShown: false}}
          component={Login}
        />
        {/* if already login role bendahara */}
        {roleBendahara()}
        {/* if already login role ketua */}
        {rolePimpinan()}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNav;

const styles = StyleSheet.create({});
