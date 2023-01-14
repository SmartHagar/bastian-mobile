/** @format */

import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {DashboarContext} from '../../../components/pimpinan/contexts/DashboardContext';
import LineChartComp from '../../../components/pimpinan/chart/LineChartComp';
import useSaldo from '../../../stores/saldo.js';
import colors from '../../../styles/colors';
import YearSelect from '../../../components/select/YearSelect';
import GrafikPertahun from '../../../components/grafik/GrafikPertahun';
import GrafikPerbulan from '../../../components/grafik/GrafikPerbulan';

const Dashboard = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <ScrollView horizontal={true} className="min-h-[300px]">
          <GrafikPertahun />
        </ScrollView>
        <ScrollView horizontal={true} className="min-h-[300px]">
          <GrafikPerbulan />
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
