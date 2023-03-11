import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import yellowRetangle from '../../../assets/retangle/yellow.png';
import pinkRetangle from '../../../assets/retangle/pink.png';
import blueRetangle from '../../../assets/retangle/blue.png';
import {useNavigation} from '@react-navigation/native';
import colors from '../../../styles/colors';

const Laporan = () => {
  const navigation = useNavigation();
  return (
    <View className="flex-1">
      {/* buku kas umum */}
      <View className="mb-10">
        <View>
          <View className="h-12 justify-center -mx-10">
            <View className="border" style={{borderColor: colors.pink}}>
              <Text
                className="text-[16px] font-[Poppins-BoldItalic] py-2 text-center"
                style={{color: colors.dark}}>
                Buku Kas Umum
              </Text>
            </View>
          </View>
        </View>
        {/* Buku Kas */}
        <View className="mt-1">
          <View className="flex-row justify-center space-x-2">
            <TouchableOpacity
              className="h-10"
              onPress={() => navigation.navigate('lap-buku-kas-perbulan')}>
              {/* lap-kantin-perbulan*/}
              <ImageBackground
                source={pinkRetangle}
                resizeMode="stretch"
                className="h-full justify-center items-center">
                <Text className="text-[14px] font-[Poppins-SemiBold] text-white px-[5%]">
                  Bulanan
                </Text>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity
              className="h-10"
              onPress={() => navigation.navigate('lap-buku-kas-persemester')}>
              <ImageBackground
                source={pinkRetangle}
                resizeMode="stretch"
                className="h-full justify-center items-center">
                <Text className="text-[14px] font-[Poppins-SemiBold] text-white px-[5%]">
                  Semester
                </Text>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity
              className="h-10"
              onPress={() => navigation.navigate('lap-buku-kas-pertahun')}>
              <ImageBackground
                source={pinkRetangle}
                resizeMode="stretch"
                className="h-full justify-center items-center">
                <Text className="text-[14px] font-[Poppins-SemiBold] text-white px-[5%]">
                  Tahunan
                </Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* kantin */}
      <View>
        <View>
          <View className="h-12 justify-center -mx-10">
            <View className="border" style={{borderColor: colors.pink}}>
              <Text
                className="text-[16px] font-[Poppins-BoldItalic] py-2 text-center"
                style={{color: colors.dark}}>
                Buku Kas Kantin
              </Text>
            </View>
          </View>
        </View>
        {/* Buku Kas */}
        <View className="mt-1">
          <View className="flex-row justify-center space-x-2">
            <TouchableOpacity
              className="h-10"
              onPress={() => navigation.navigate('lap-kantin-perhari')}>
              <ImageBackground
                source={pinkRetangle}
                resizeMode="stretch"
                className="h-full justify-center items-center">
                <Text className="text-[14px] font-[Poppins-SemiBold] text-white px-[5%]">
                  Perhari
                </Text>
              </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity
              className="h-10"
              onPress={() => navigation.navigate('lap-kantin-perbulan')}>
              {/* lap-kantin-pertahun */}
              <ImageBackground
                source={pinkRetangle}
                resizeMode="stretch"
                className="h-full justify-center items-center">
                <Text className="text-[14px] font-[Poppins-SemiBold] text-white px-[5%]">
                  Bulanan
                </Text>
              </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity
              className="h-10"
              onPress={() => navigation.navigate('lap-kantin-pertahun')}>
              <ImageBackground
                source={pinkRetangle}
                resizeMode="stretch"
                className="h-full justify-center items-center">
                <Text className="text-[14px] font-[Poppins-SemiBold] text-white px-[5%]">
                  Tahunan
                </Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Laporan;

const styles = StyleSheet.create({});
