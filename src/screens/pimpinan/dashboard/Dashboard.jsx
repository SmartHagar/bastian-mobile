/** @format */

import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {DashboarContext} from '../../../components/pimpinan/contexts/DashboardContext';
import LineChartComp from '../../../components/pimpinan/chart/LineChartComp';
import useSaldo from '../../../stores/saldo.js';
import colors from '../../../styles/colors';
import YearSelect from '../../../components/select/YearSelect';

// dimensions
const winWidth = Dimensions.get('window').width;
const winHeight = Dimensions.get('window').height;

const Dashboard = () => {
  const {setTransaksi, transaksi} = useSaldo();
  const [pemasukan, setPemasukan] = useState();
  const [pengeluaran, setPengeluaran] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    const pemasukan = await setTransaksi('pemasukan', '');
    setPemasukan(pemasukan.data);
    const pengeluaran = await setTransaksi('pengeluaran', '');
    setPengeluaran(pengeluaran.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const pilihTahunPemasukan = async psTahun => {
    setIsLoading(true);
    const pemasukan = await setTransaksi('pemasukan', '', psTahun);
    setPemasukan(pemasukan.data);
    setIsLoading(false);
  };
  const pilihTahunPengeluaran = async psTahun => {
    const pengeluaran = await setTransaksi('pengeluaran', '', psTahun);
    setPengeluaran(pengeluaran.data);
  };

  const grafikPemasukan = () => {
    return pemasukan.length > 0 ? (
      <LineChartComp
        transaksi={pemasukan}
        chartConfig={{
          backgroundGradientFrom: colors.blue,
          backgroundGradientTo: colors.pink,
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
      />
    ) : (
      <Text
        style={{
          color: colors.pink,
          marginVertical: 10,
          textAlign: 'center',
          fontSize: 15,
          fontFamily: 'Poppins-ExtraBold',
        }}>
        Tidak ada data
      </Text>
    );
  };
  const grafikPengeluaran = () => {
    return pengeluaran.length > 0 ? (
      <LineChartComp
        transaksi={pengeluaran}
        chartConfig={{
          backgroundGradientFrom: colors.blue,
          backgroundGradientTo: colors.yellow,
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
      />
    ) : (
      <Text
        style={{
          color: colors.pink,
          marginVertical: 10,
          textAlign: 'center',
          fontSize: 15,
          fontFamily: 'Poppins-ExtraBold',
        }}>
        Tidak ada data
      </Text>
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <DashboarContext.Provider value={{transaksi}}>
          <View>
            {/* Grafik Pemasukan */}
            {pemasukan && (
              <View>
                <Text
                  style={{
                    color: colors.dark,
                    textAlign: 'center',
                    fontFamily: 'Poppins-Regular',
                  }}>
                  Silahkan memilih Tahun untuk melihat grafik pemasukan
                </Text>
                <View style={{alignItems: 'center'}}>
                  <YearSelect
                    pilihTahun={pilihTahunPemasukan}
                    isReset={false}
                  />
                </View>
                {!isLoading && grafikPemasukan()}
              </View>
            )}
            {/* Grafik Pengeluaran */}
            {pengeluaran && (
              <View>
                <Text
                  style={{
                    color: colors.dark,
                    textAlign: 'center',
                    fontFamily: 'Poppins-Regular',
                  }}>
                  Silahkan memilih Tahun untuk melihat grafik pengeluaran
                </Text>
                <View style={{alignItems: 'center'}}>
                  <YearSelect
                    pilihTahun={pilihTahunPengeluaran}
                    isReset={false}
                  />
                </View>
                {!isLoading && grafikPengeluaran()}
                {/* */}
              </View>
            )}
          </View>
        </DashboarContext.Provider>
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
