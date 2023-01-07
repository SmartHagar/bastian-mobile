/** @format */

import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import useLogin from '../../../stores/login';
import logo from '../../../assets/images/logo.png';

import {useNavigation} from '@react-navigation/native';
import colors from '../../../styles/colors';

const Akun = () => {
  const navigation = useNavigation();
  const {setLogout} = useLogin();
  const handleLogout = async () => {
    const cek = await setLogout();
    if (cek) {
      navigation.navigate('Login');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          marginTop: '20%',
        }}>
        <Text
          style={{
            color: colors.blue,
            fontFamily: 'Poppins-ExtraBold',
            fontSize: 20,
            textAlign: 'center',
          }}>
          Pimpinan
        </Text>
        <Text
          style={{
            color: colors.blue,
            fontFamily: 'Poppins-ExtraBold',
            fontSize: 20,
            textAlign: 'center',
          }}>
          Fakultas Sains & Teknologi
        </Text>
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
      <View>
        <TouchableOpacity onPress={handleLogout}>
          <View
            style={{
              borderWidth: 1,
              borderColor: colors.pink,
              borderRadius: 10,
              paddingHorizontal: 20,
              paddingVertical: 5,
            }}>
            <Text style={{color: colors.dark, fontFamily: 'Poppins-SemiBold'}}>
              Logout
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Akun;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
