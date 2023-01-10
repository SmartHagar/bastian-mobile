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
import TextComp from '../../../components/form/TextComp';
import colors from '../../../styles/colors';

const Kantin = () => {
  return (
    <View className="flex-1">
      <View className="flex-row justify-between mx-2 mt-2">
        {/* Pemasukan */}
        <TouchableOpacity className="w-[48%] h-16">
          <ImageBackground
            source={yellowRetangle}
            resizeMode="stretch"
            className="h-full justify-center items-center">
            <Text className="text-[14px] font-[Poppins-BoldItalic] text-white">
              Pemasukan
            </Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity className="w-[48%] h-16">
          <ImageBackground
            source={blueRetangle}
            resizeMode="stretch"
            className="h-full justify-center items-center">
            <Text className="text-[14px] font-[Poppins-BoldItalic] text-white">
              Pengeluaran
            </Text>
          </ImageBackground>
        </TouchableOpacity>
        {/* Pengeluaran */}
      </View>
      {/* Buku Kas */}
      <View className="mt-2">
        <View className="h-12 justify-center -mx-10">
          <View>
            <ImageBackground
              source={pinkRetangle}
              resizeMode="stretch"
              className="h-full justify-center items-center">
              <Text className="text-[14px] font-[Poppins-BoldItalic] text-white px-2">
                Buku Kas
              </Text>
            </ImageBackground>
          </View>
        </View>
        <View className="flex-row justify-center space-x-2 mt-2">
          <TouchableOpacity className="h-10">
            <ImageBackground
              source={pinkRetangle}
              resizeMode="stretch"
              className="h-full justify-center items-center">
              <Text className="text-[14px] font-[Poppins-BoldItalic] text-white px-[5%]">
                Bulanan
              </Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity className="h-10">
            <ImageBackground
              source={pinkRetangle}
              resizeMode="stretch"
              className="h-full justify-center items-center">
              <Text className="text-[14px] font-[Poppins-BoldItalic] text-white px-[5%]">
                Semester
              </Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity className="h-10">
            <ImageBackground
              source={pinkRetangle}
              resizeMode="stretch"
              className="h-full justify-center items-center">
              <Text className="text-[14px] font-[Poppins-BoldItalic] text-white px-[5%]">
                Tahunan
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Kantin;

const styles = StyleSheet.create({});
