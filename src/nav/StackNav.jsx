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
import TransaksiKantin from '../screens/bendahara/kantin/transaksi/Transaksi';

// pimpinan
import TapNavPimpinan from './TapNavPimpinan';

// laporan buku kas
import PertahunBukuKas from '../screens/bendahara/laporan/buku-kas/Pertahun';
import PersemesterBukuKas from '../screens/bendahara/laporan/buku-kas/Persemester';
import PerbulanBukuKas from '../screens/bendahara/laporan/buku-kas/Perbulan';
// laporan kantin
import PertahunKantin from '../screens/bendahara/laporan/kantin/Pertahun';
import PersemesterKantin from '../screens/bendahara/laporan/kantin/Persemester';
import PerbulanKantin from '../screens/bendahara/laporan/kantin/Perbulan';
import TapNavStaf from './TapNavStaf';

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
        <Stack.Screen
          name="TransaksiKantin"
          options={{headerShown: false}}
          component={TransaksiKantin}
        />
        {/* Laporan buku kas*/}
        <Stack.Screen
          name="lap-buku-kas-pertahun"
          options={{
            headerTitleAlign: 'center',
            headerTitleStyle: {fontSize: 16, fontFamily: 'Poppins-Medium'},
            headerTintColor: '#fff',
            headerStyle: {backgroundColor: myColors.primary},
            headerTitle: 'Laporan Buku Kas Pertahun',
          }}
          component={PertahunBukuKas}
        />
        <Stack.Screen
          name="lap-buku-kas-persemester"
          options={{
            headerTitleAlign: 'center',
            headerTitleStyle: {fontSize: 16, fontFamily: 'Poppins-Medium'},
            headerTintColor: '#fff',
            headerStyle: {backgroundColor: myColors.primary},
            headerTitle: 'Laporan Buku Kas Persemester',
          }}
          component={PersemesterBukuKas}
        />
        <Stack.Screen
          name="lap-buku-kas-perbulan"
          options={{
            headerTitleAlign: 'center',
            headerTitleStyle: {fontSize: 16, fontFamily: 'Poppins-Medium'},
            headerTintColor: '#fff',
            headerStyle: {backgroundColor: myColors.primary},
            headerTitle: 'Laporan Buku Kas Perbulan',
          }}
          component={PerbulanBukuKas}
        />
        {/* laporan kantin */}
        <Stack.Screen
          name="lap-kantin-pertahun"
          options={{
            headerTitleAlign: 'center',
            headerTitleStyle: {fontSize: 16, fontFamily: 'Poppins-Medium'},
            headerTintColor: '#fff',
            headerStyle: {backgroundColor: myColors.primary},
            headerTitle: 'Laporan Kantin Pertahun',
          }}
          component={PertahunKantin}
        />
        <Stack.Screen
          name="lap-kantin-persemester"
          options={{
            headerTitleAlign: 'center',
            headerTitleStyle: {fontSize: 16, fontFamily: 'Poppins-Medium'},
            headerTintColor: '#fff',
            headerStyle: {backgroundColor: myColors.primary},
            headerTitle: 'Laporan Kantin Persemester',
          }}
          component={PersemesterKantin}
        />
        <Stack.Screen
          name="lap-kantin-perbulan"
          options={{
            headerTitleAlign: 'center',
            headerTitleStyle: {fontSize: 16, fontFamily: 'Poppins-Medium'},
            headerTintColor: '#fff',
            headerStyle: {backgroundColor: myColors.primary},
            headerTitle: 'Laporan Kantin Perbulan',
          }}
          component={PerbulanKantin}
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
  //   jika role pimpinan
  const roleStaf = () => {
    return (
      <>
        <Stack.Screen
          name="DashboardStaf"
          options={{headerShown: false}}
          component={TapNavStaf}
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
        {/* if already login role Staf */}
        {roleStaf()}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNav;

const styles = StyleSheet.create({});
