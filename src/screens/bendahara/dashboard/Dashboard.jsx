/** @format */

import {
  BackHandler,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MenuHome from '../../../components/bendahara/MenuHome';
import logo from '../../../assets/images/logo.png';
import colors from '../../../styles/colors';
import useSaldo from '../../../stores/saldo';
import showRupiah from '../../../services/rupiah';
import useSaldoKantin from '../../../stores/api/saldo-kantin';

const winWidth = Dimensions.get('window').width;
const winHeight = Dimensions.get('window').height;

const Dashboard = ({navigation}) => {
  // get data
  const {arrData, setSaldo, pemasukanTerakhir, pengeluaranTerakhir} =
    useSaldo();

  const {
    setSaldoKantin,
    dtSaldoKantin,
    pemasukanTerakhirKantin,
    pengeluaranTerakhirKantin,
  } = useSaldoKantin();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setSaldo();
      setSaldoKantin();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  // exit
  const [exitApp, setExitApp] = useState(0);
  const backAction = () => {
    setTimeout(() => {
      setExitApp(0);
    }, 2000); // 2 seconds to tap second-time

    if (exitApp === 0) {
      setExitApp(exitApp + 1);

      ToastAndroid.show(
        'Sekali lagi untuk keluar aplikasi',
        ToastAndroid.SHORT,
      );
    } else if (exitApp === 1) {
      BackHandler.exitApp();
    }
    return true;
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  });

  return (
    <SafeAreaView>
      <ScrollView>
        {/* menu */}
        <View style={{marginTop: 20}}>
          <MenuHome />
        </View>
        {/* logo */}
        <Image
          source={logo}
          style={{
            width: 110,
            height: 107,
            resizeMode: 'stretch',
            alignSelf: 'center',
            marginVertical: 20,
          }}
        />
        {/* Pemasukan dan pengeluaran */}
        <View style={styles.containerInfo}>
          {/* saldo terakhir */}
          <View>
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                textAlign: 'center',
                fontSize: 16,
                color: colors.blue,
              }}>
              FST
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                textAlign: 'center',
                fontSize: 18,
                color: colors.blue,
              }}>
              Saldo Terakhir
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-MediumItalic',
                textAlign: 'center',
                fontSize: 14,
                color: colors.pink,
              }}>
              {arrData.saldo && showRupiah(arrData.saldo)}
            </Text>
          </View>
          {/* pemasukan terakhir */}
          <View style={{marginTop: 30}}>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                textAlign: 'left',
                fontSize: 16,
                color: colors.primary,
              }}>
              Pemasukan Terakhir
            </Text>
            {/* item */}
            <View
              style={{
                borderWidth: 1,
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 10,
                borderColor: '#aec4f0',
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  textAlign: 'left',
                  fontSize: 14,
                  color: colors.dark,
                  marginBottom: -10,
                }}>
                {pemasukanTerakhir?.item?.nama}
              </Text>
              <Text
                style={{
                  fontFamily: 'Charmonman-Regular',
                  textAlign: 'left',
                  fontSize: 16,
                  color: colors.pink,
                }}>
                {showRupiah(parseInt(pemasukanTerakhir?.jumlah))}
              </Text>
            </View>
          </View>
          {/* pengeluaran terakhir */}
          <View style={{marginTop: 20}}>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                textAlign: 'left',
                fontSize: 16,
                color: colors.primary,
              }}>
              Pengeluaran Terakhir
            </Text>
            {/* item */}
            <View
              style={{
                borderWidth: 1,
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 10,
                borderColor: '#aec4f0',
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  textAlign: 'left',
                  fontSize: 14,
                  color: colors.dark,
                  marginBottom: -10,
                }}>
                {/* pengeluaranTerakhir */}
                {pengeluaranTerakhir?.item?.nama}
              </Text>
              <Text
                style={{
                  fontFamily: 'Charmonman-Regular',
                  textAlign: 'left',
                  fontSize: 16,
                  color: colors.pink,
                }}>
                {showRupiah(parseInt(pengeluaranTerakhir?.jumlah))}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.containerInfo}>
          {/* saldo terakhir */}
          <View>
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                textAlign: 'center',
                fontSize: 16,
                color: colors.blue,
              }}>
              Kantin
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                textAlign: 'center',
                fontSize: 18,
                color: colors.blue,
              }}>
              Saldo Terakhir
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-MediumItalic',
                textAlign: 'center',
                fontSize: 14,
                color: colors.pink,
              }}>
              {dtSaldoKantin.saldo && showRupiah(dtSaldoKantin.saldo)}
            </Text>
          </View>
          {/* pemasukan terakhir */}
          <View style={{marginTop: 30}}>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                textAlign: 'left',
                fontSize: 16,
                color: colors.primary,
              }}>
              Pemasukan Terakhir
            </Text>
            {/* item */}
            <View
              style={{
                borderWidth: 1,
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 10,
                borderColor: '#aec4f0',
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  textAlign: 'left',
                  fontSize: 14,
                  color: colors.dark,
                  marginBottom: -10,
                }}>
                {pemasukanTerakhirKantin?.ket}
              </Text>
              <Text
                style={{
                  fontFamily: 'Charmonman-Regular',
                  textAlign: 'left',
                  fontSize: 16,
                  color: colors.pink,
                }}>
                {showRupiah(parseInt(pemasukanTerakhirKantin?.jumlah))}
              </Text>
            </View>
          </View>
          {/* pengeluaran terakhir */}
          <View style={{marginTop: 20}}>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                textAlign: 'left',
                fontSize: 16,
                color: colors.primary,
              }}>
              Pengeluaran Terakhir
            </Text>
            {/* item */}
            <View
              style={{
                borderWidth: 1,
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 10,
                borderColor: '#aec4f0',
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  textAlign: 'left',
                  fontSize: 14,
                  color: colors.dark,
                  marginBottom: -10,
                }}>
                {/* pengeluaranTerakhir */}
                {pengeluaranTerakhirKantin?.ket}
              </Text>
              <Text
                style={{
                  fontFamily: 'Charmonman-Regular',
                  textAlign: 'left',
                  fontSize: 16,
                  color: colors.pink,
                }}>
                {showRupiah(parseInt(pengeluaranTerakhirKantin?.jumlah))}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  containerInfo: {
    width: winWidth - 30,
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    shadowColor: colors.blue,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    alignSelf: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginBottom: 20,
  },
});
